"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useId } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useCountdown } from "@/hooks/useCountdown";
import { formatLongDateWIB, formatTimeRangeWIB } from "@/lib/date";
import { letterFileSchema } from "@/shared/reservation/letter";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";
import type { ReservationDraft } from "@/types/reservation";
import { submitDraft, type DraftActionResult } from "./draftActions";
import { DeadlineTimer } from "./DeadlineTimer";

const schema = z.object({
  letter: z.custom<File | null>((value) => value instanceof File, "Unggah surat peminjaman dulu.").pipe(letterFileSchema),
});
type LetterInput = z.input<typeof schema>;
type LetterValues = z.output<typeof schema>;

export interface DraftCardProps {
  draft: ReservationDraft;
  onSubmitted: (draft: ReservationDraft, result: DraftActionResult) => void;
  onRequestCancel: (draft: ReservationDraft) => void;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <dt className="text-primary">{label}</dt>
      <dd className="break-words">{children}</dd>
    </div>
  );
}

export function DraftCard({ draft, onSubmitted, onRequestCancel }: DraftCardProps) {
  const countdown = useCountdown(draft.letterDeadline);
  const expired = countdown?.expired ?? false;
  const id = useId();
  const fileId = `${id}-letter`;
  const errorId = `${id}-letter-error`;

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LetterInput, unknown, LetterValues>({ resolver: zodResolver(schema), defaultValues: { letter: null } });
  const letter = useWatch({ control, name: "letter" });

  const submit = handleSubmit(async (values) => {
    onSubmitted(draft, await submitDraft(draft.id, values.letter));
  });

  return (
    <article aria-labelledby={`${id}-title`} className="grid gap-4 lg:grid-cols-[minmax(0,724fr)_minmax(0,394fr)] lg:gap-6">
      <Card className="flex flex-col gap-4 p-4">
        <h2 id={`${id}-title`} className="sr-only">
          Draft {draft.unitName}, {formatLongDateWIB(draft.startsAt)}
        </h2>

        {expired ? (
          <div className="flex items-center gap-3 rounded-md bg-danger-soft px-4 py-3.5">
            <Image src="/icons/calendar-clock.svg" alt="" width={20} height={20} />
            <p className="text-xs leading-5 font-semibold tracking-wide text-danger">
              Tenggat unggah sudah lewat
              <span className="block font-medium">Surat tidak bisa diunggah lagi untuk draft ini. Batalkan, lalu buat reservasi baru bila masih perlu.</span>
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-3 rounded-md bg-primary-soft px-4 py-3.5">
            <Image src="/icons/calendar-clock.svg" alt="" width={20} height={20} />
            <p className="text-xs leading-5 font-semibold tracking-wide text-primary">
              Email konfirmasi telah dikirim!
              <span className="block font-medium text-muted">Pastikan membaca peraturan dan mengecek kembali reservasi anda.</span>
            </p>
          </div>
        )}

        <form
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            void submit();
          }}
          className="flex flex-col gap-4"
        >
          <dl className="grid grid-cols-1 gap-x-6 gap-y-4 text-xs sm:grid-cols-3 sm:gap-x-10">
            <div className="flex flex-col gap-4">
              <Field label="Email">{draft.bookerEmail}</Field>
              <Field label="Nama Pemesan">{draft.bookerName}</Field>
            </div>
            <div className="flex flex-col gap-4">
              <Field label="Waktu Reservasi">
                {formatLongDateWIB(draft.startsAt)}
                <br />
                {formatTimeRangeWIB(draft.startsAt, draft.endsAt)}
              </Field>
              <Field label="Tipe Reservasi">{RESERVATION_TYPE_LABEL[draft.type]}</Field>
            </div>
            <div className="flex flex-col gap-4 sm:gap-7">
              <Field label="Dipinjam">{draft.unitName}</Field>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] tracking-wide text-primary uppercase" id={`${id}-letter-label`}>
                  Surat Peminjaman
                </span>
                <label
                  htmlFor={fileId}
                  aria-disabled={expired || undefined}
                  className={`flex min-h-11 items-center justify-between gap-2 rounded-inner border px-2 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-border-focus ${
                    errors.letter ? "border-danger-strong" : "border-border"
                  } ${expired ? "bg-page text-muted" : "hover:bg-primary-soft"}`}
                >
                  <input
                    id={fileId}
                    type="file"
                    accept="application/pdf,.pdf"
                    disabled={expired}
                    aria-labelledby={`${id}-letter-label`}
                    aria-invalid={errors.letter ? true : undefined}
                    aria-describedby={errors.letter ? errorId : undefined}
                    onChange={(event) => setValue("letter", event.target.files?.[0] ?? null, { shouldValidate: true })}
                    className="sr-only"
                  />
                  <span className="min-w-0 truncate tracking-wide">{letter ? letter.name : "Upload Surat"}</span>
                  <Image src="/icons/upload.svg" alt="" width={10} height={10} />
                </label>
                {errors.letter && (
                  <p id={errorId} className="text-[11px] text-danger">
                    {errors.letter.message}
                  </p>
                )}
              </div>
            </div>
          </dl>

          <div className="flex flex-wrap justify-end gap-4">
            <Button variant="danger-outline" onClick={() => onRequestCancel(draft)} disabled={isSubmitting}>
              Batal
            </Button>
            <Button type="submit" variant="primary-outline" disabled={expired || isSubmitting}>
              {isSubmitting ? "Mengirim..." : "Pesan"}
            </Button>
          </div>
        </form>
      </Card>

      <DeadlineTimer id={`${id}-deadline`} deadline={draft.letterDeadline} countdown={countdown} />
    </article>
  );
}
