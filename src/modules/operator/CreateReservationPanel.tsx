"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Field, INPUT_CLASS, SelectInput } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { MaskIcon } from "@/components/ui/MaskIcon";
import { applyFormErrors } from "@/lib/api/form-errors";
import { formatDateLongWIB, wibToIso } from "@/lib/date";
import { rangesOverlap } from "@/shared/reservation-form/availability";
import type { FloorPlanRoom } from "@/types/facility";
import type { ReservationRecord } from "@/types/reservation";
import {
  OPERATOR_RESERVATION_FIELD_MAP,
  operatorReservationSchema,
  type OperatorReservationValues,
} from "./operatorReservationSchema";
import { createOperatorReservation } from "./operatorReservations";
import { SLOT_TIMES } from "./slots";

export interface CreateReservationPanelProps {
  rooms: FloorPlanRoom[];
  /** Prefilled room, e.g. the track of the free gap the operator clicked. */
  roomId: string;
  dateKey: string;
  /** Prefilled times, e.g. from a free slot the operator clicked. */
  startTime: string;
  endTime: string;
  /** Everything already holding rooms today: reservations and Siadin classes. */
  busy: Pick<ReservationRecord, "unitName" | "startsAt" | "endsAt">[];
  onCreated: (reservation: ReservationRecord) => void;
  onCollapse: () => void;
}

const displayTime = (time: string) => time.replace(":", ".");

/** Books a room for today on behalf of a borrower at the desk. */
export function CreateReservationPanel({
  rooms,
  roomId,
  dateKey,
  startTime,
  endTime,
  busy,
  onCreated,
  onCollapse,
}: CreateReservationPanelProps) {
  const form = useForm<OperatorReservationValues>({
    resolver: zodResolver(operatorReservationSchema),
    defaultValues: { roomId, bookerName: "", purpose: "", startTime, endTime },
  });
  const { errors, isSubmitting } = form.formState;
  // The panel may open far from the slot that was clicked (above the list on phones).
  useEffect(() => form.setFocus("bookerName"), [form]);
  const invalid = (field: keyof OperatorReservationValues) =>
    errors[field] ? { "aria-invalid": true, "aria-describedby": `operator-${field}-error` } : {};

  const submit = form.handleSubmit(async (values) => {
    const room = rooms.find((item) => item.id === values.roomId);
    if (!room) return;
    const startsAt = wibToIso(dateKey, values.startTime);
    const endsAt = wibToIso(dateKey, values.endTime);
    const clash = busy.some(
      (item) => item.unitName === room.code && rangesOverlap(item.startsAt, item.endsAt, startsAt, endsAt),
    );
    if (clash) {
      form.setError("endTime", { message: `${room.code} sudah terpakai (kuliah atau reservasi) pada sebagian jam itu. Pilih jam lain.` });
      return;
    }

    const result = await createOperatorReservation(room, dateKey, values);
    if (result.ok) onCreated(result.reservation);
    else if ("validation" in result) applyFormErrors(result.validation, form.setError, OPERATOR_RESERVATION_FIELD_MAP);
    else form.setError("root.server", { message: result.message });
  });

  return (
    <section aria-labelledby="operator-create-title" className="flex flex-col gap-2">
      <form onSubmit={submit} noValidate className="flex flex-col gap-2">
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-3">
          <div className="flex items-stretch gap-2">
            <button
              type="button"
              onClick={onCollapse}
              aria-label="Tutup form buat reservasi"
              className="flex min-h-11 w-11 shrink-0 items-center justify-center rounded-md text-primary hover:bg-primary-soft"
            >
              <span className="flex size-7 items-center justify-center rounded-sm bg-primary text-on-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" />
                </svg>
              </span>
            </button>
            <div className="flex flex-1 flex-col items-center justify-center rounded-md bg-primary-soft px-2 py-1 text-center">
              <h2 id="operator-create-title" className="text-sm font-semibold text-primary">
                Buat Reservasi
              </h2>
              <p className="flex items-center gap-1.5 text-xs">
                <MaskIcon src="/icons/calendar-outline.svg" size={14} className="text-muted" />
                {formatDateLongWIB(wibToIso(dateKey, "12:00"))}
              </p>
            </div>
          </div>

          <Field label="Ruangan" htmlFor="operator-roomId" error={errors.roomId?.message}>
            <SelectInput id="operator-roomId" {...form.register("roomId")} {...invalid("roomId")}>
              {rooms.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.code}
                </option>
              ))}
            </SelectInput>
          </Field>

          <Field label="Nama Peminjam" htmlFor="operator-bookerName" error={errors.bookerName?.message}>
            <input id="operator-bookerName" {...form.register("bookerName")} {...invalid("bookerName")} className={INPUT_CLASS} />
          </Field>
          <Field label="Keperluan" htmlFor="operator-purpose" error={errors.purpose?.message}>
            <textarea id="operator-purpose" rows={3} {...form.register("purpose")} {...invalid("purpose")} className={`${INPUT_CLASS} max-h-40`} />
          </Field>

          <fieldset className="flex flex-col gap-1">
            <legend className="mb-1 text-xs text-primary">Waktu (WIB)</legend>
            <div className="flex items-end gap-2">
              <Field label="Mulai" htmlFor="operator-startTime" className="flex-1">
                <SelectInput id="operator-startTime" {...form.register("startTime")} {...invalid("startTime")}>
                  {SLOT_TIMES.slice(0, -1).map((time) => (
                    <option key={time} value={time}>
                      {displayTime(time)}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <span aria-hidden="true" className="pb-3">
                -
              </span>
              <Field label="Selesai" htmlFor="operator-endTime" className="flex-1">
                <SelectInput id="operator-endTime" {...form.register("endTime")} {...invalid("endTime")}>
                  {SLOT_TIMES.slice(1).map((time) => (
                    <option key={time} value={time}>
                      {displayTime(time)}
                    </option>
                  ))}
                </SelectInput>
              </Field>
            </div>
            {(errors.startTime || errors.endTime) && (
              <p id={errors.endTime ? "operator-endTime-error" : "operator-startTime-error"} className="text-[11px] text-danger">
                {errors.startTime?.message ?? errors.endTime?.message}
              </p>
            )}
          </fieldset>
        </div>

        {errors.root?.server && (
          <p role="alert" className="text-xs text-danger">
            {errors.root.server.message}
          </p>
        )}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Menyimpan..." : "Reservasi sekarang"}
        </Button>
      </form>
    </section>
  );
}
