"use client";

import { useState } from "react";
import type { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { applyFormErrors } from "@/lib/api/form-errors";
import { saveDraft, type DraftDetails } from "@/shared/reservation-draft/draftStorage";
import { createReservation } from "./createReservation";
import type { ReservationIntent } from "./schema";

export interface UseReservationSubmitOptions<TInput extends FieldValues, TOutput> {
  defaults: TInput;
  toRequest: (values: TOutput) => Parameters<typeof createReservation>[0];
  /** Laravel field names to form fields, for 422 errors. */
  fieldMap: Partial<Record<string, FieldPath<TInput>>>;
  /** Extra state to clear when the borrower starts another reservation. */
  onReset?: () => void;
  /** What the draft list shows for a saved draft. Drafts are kept in this browser only. */
  toDraft?: (values: TOutput) => Pick<DraftDetails, "unitName" | "purpose">;
}

/** The request without the letter and status, which are added when the draft is sent. */
function draftBody(request: Parameters<typeof createReservation>[0]): Record<string, unknown> {
  const body: Record<string, unknown> = { ...request };
  delete body.letter;
  delete body.status;
  return body;
}

/**
 * Flow shared by every booking form: validate the first step, open the summary, send or save a
 * draft, map Laravel errors back onto the form, and start over afterwards.
 */
export function useReservationSubmit<TInput extends FieldValues, TOutput>(
  form: UseFormReturn<TInput, unknown, TOutput>,
  { defaults, toRequest, fieldMap, onReset, toDraft }: UseReservationSubmitOptions<TInput, TOutput>,
) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [result, setResult] = useState<ReservationIntent | null>(null);

  const openSummary = async (fields: FieldPath<TInput>[]) => {
    if (await form.trigger(fields)) {
      form.clearErrors("root");
      setDialogOpen(true);
    }
  };

  const submit = (intent: ReservationIntent) => {
    form.setValue("intent" as FieldPath<TInput>, intent as never);
    void form.handleSubmit(async (values) => {
      if (intent === "draft") {
        const request = toRequest(values);
        const details = toDraft && {
          type: request.type,
          startsAt: request.starts_at,
          endsAt: request.ends_at,
          ...toDraft(values),
        };
        if (details && saveDraft(details, draftBody(request))) {
          setResult("draft");
        } else {
          form.setError("root.server", {
            message: "Browser ini tidak bisa menyimpan draft. Unggah surat lalu tekan Pesan, atau coba browser lain.",
          });
        }
        return;
      }
      const response = await createReservation(toRequest(values));
      if (response.ok) {
        setResult(response.intent);
      } else if ("validation" in response) {
        applyFormErrors(response.validation, form.setError, fieldMap);
      } else {
        form.setError("root.server", { message: response.message });
      }
    })();
  };

  const createAnother = () => {
    form.reset(defaults);
    setResult(null);
    setDialogOpen(false);
    onReset?.();
  };

  return {
    dialogOpen,
    result,
    openSummary,
    submit,
    createAnother,
    // after a successful send, closing starts a fresh form
    close: () => (result ? createAnother() : setDialogOpen(false)),
  };
}
