"use client";

import Image from "next/image";
import Link from "next/link";
import { useFormContext, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatLongDateWIB, wibToIso } from "@/lib/date";
import { LetterField } from "./LetterField";
import type { ReservationIntent, RoomReservationInput } from "./schema";

export interface ReservationSummaryDialogProps {
  open: boolean;
  onClose: () => void;
  requesterName: string;
  buildingName: string;
  roomCode: string;
  approver: string | null;
  submitting: boolean;
  onSubmit: (intent: ReservationIntent) => void;
  /** Set after the API accepted the reservation. */
  result: ReservationIntent | null;
  links: { history: string; drafts: string };
  onCreateAnother: () => void;
}

const LABEL = "text-[11px] tracking-wide text-primary uppercase";
const INPUT =
  "min-h-11 w-full rounded-md border border-border bg-surface px-3 py-2 text-sm aria-invalid:border-danger-strong";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-[11px] text-danger">
      {message}
    </p>
  );
}

export function ReservationSummaryDialog({
  open,
  onClose,
  requesterName,
  buildingName,
  roomCode,
  approver,
  submitting,
  onSubmit,
  result,
  links,
  onCreateAnother,
}: ReservationSummaryDialogProps) {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<RoomReservationInput>();
  const [date, startTime, endTime, letter] = useWatch({ control, name: ["date", "startTime", "endTime", "letter"] });

  if (result) {
    const submitted = result === "submit";
    return (
      <Modal open={open} onClose={onClose} title={submitted ? "Reservasi terkirim" : "Draft tersimpan"}>
        <p role="status" className="text-sm">
          {submitted
            ? `Reservasi ${roomCode} sedang menunggu konfirmasi admin${approver ? ` ${approver}` : ""}. Statusnya bisa dipantau di Reservasi & Riwayat.`
            : `Reservasi ${roomCode} disimpan sebagai draft. Unggah surat peminjaman di Draft Reservasi sebelum tenggatnya berakhir.`}
        </p>
        <div className="flex flex-wrap justify-end gap-2">
          <Button variant="outline" onClick={onCreateAnother}>
            Buat reservasi lain
          </Button>
          <Link
            href={submitted ? links.history : links.drafts}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-on-primary hover:bg-primary-hover"
          >
            {submitted ? "Lihat Reservasi & Riwayat" : "Buka Draft Reservasi"}
          </Link>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={open} onClose={onClose} title="Detail Pemesanan">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className={LABEL}>Peminjam</p>
          <p className="flex min-h-11 items-center rounded-md border border-border bg-page px-3 text-sm">{requesterName}</p>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="reservation-phone" className={LABEL}>
            No HP
          </label>
          <input
            id="reservation-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="081234567890"
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "reservation-phone-error" : undefined}
            className={INPUT}
            {...register("phone")}
          />
          <FieldError id="reservation-phone-error" message={errors.phone?.message} />
        </div>

        <div className="flex flex-col gap-1">
          <p className={LABEL}>Waktu Peminjaman</p>
          {date && startTime && endTime && (
            <div className="flex flex-col gap-1.5 text-sm">
              <p className="flex items-center gap-2">
                <Image src="/icons/calendar-outline.svg" alt="" width={16} height={16} />
                {formatLongDateWIB(wibToIso(date, startTime))}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                <p className="flex items-center gap-2">
                  <Image src="/icons/clock-outline.svg" alt="" width={16} height={16} />
                  {startTime.replace(":", ".")} WIB
                  <Image src="/icons/step-arrow.svg" alt="sampai" width={18} height={18} />
                  {endTime.replace(":", ".")} WIB
                </p>
                <p className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1">
                    <Image src="/icons/building-solid.svg" alt="" width={13} height={15} />
                    {buildingName}
                  </span>
                  <span className="flex items-center gap-1">
                    <Image src="/icons/classroom.svg" alt="" width={16} height={16} />
                    {roomCode}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="reservation-purpose" className={LABEL}>
            Keperluan
          </label>
          <textarea
            id="reservation-purpose"
            rows={2}
            placeholder="Contoh: Rapat pengurus bulanan"
            aria-invalid={errors.purpose ? true : undefined}
            aria-describedby={errors.purpose ? "reservation-purpose-error" : undefined}
            className={`${INPUT} resize-y`}
            {...register("purpose")}
          />
          <FieldError id="reservation-purpose-error" message={errors.purpose?.message} />
        </div>

        <div className="flex flex-col gap-1">
          <p className={LABEL}>Surat Peminjaman</p>
          <LetterField
            variant="inline"
            file={letter ?? null}
            onChange={(file) => setValue("letter", file, { shouldValidate: true })}
            error={errors.letter?.message}
          />
        </div>

        {approver && (
          <p className="rounded-md bg-primary-soft px-3 py-2 text-xs text-primary">
            Ruangan ini milik {approver}. Reservasi akan disetujui admin {approver}, tanpa surat tambahan.
          </p>
        )}

        {errors.root?.server && (
          <p role="alert" className="rounded-md bg-danger-soft px-3 py-2 text-xs text-danger">
            {errors.root.server.message}
          </p>
        )}
      </div>

      <div className="flex flex-wrap justify-end gap-2">
        <Button variant="danger-outline" onClick={onClose} disabled={submitting}>
          Kembali
        </Button>
        <Button variant="success-outline" onClick={() => onSubmit("draft")} disabled={submitting}>
          Simpan Draft
        </Button>
        <Button variant="primary-outline" onClick={() => onSubmit("submit")} disabled={submitting}>
          {submitting ? "Mengirim..." : "Pesan"}
        </Button>
      </div>
    </Modal>
  );
}
