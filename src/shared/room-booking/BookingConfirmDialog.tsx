"use client";

import Image from "next/image";
import { useState } from "react";
import { Field, INPUT_CLASS } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { formatDateLongWIB } from "@/lib/date";

export interface BookingSummary {
  bookerName: string;
  buildingName: string;
  roomCode: string;
  startsAt: string;
  start: string;
  end: string;
}

export interface BookingConfirmDialogProps {
  summary: BookingSummary;
  onClose: () => void;
  onConfirm: (purpose: string) => void;
}

const TERM = "text-[10px] tracking-[0.05em] text-primary uppercase";

export function BookingConfirmDialog({ summary, onClose, onConfirm }: BookingConfirmDialogProps) {
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState<string>();

  return (
    <Dialog
      open
      onClose={onClose}
      title="Detail Pemesanan"
      className="max-w-[464px]"
      footer={
        <>
          <Button variant="danger-outline" onClick={onClose}>
            Kembali
          </Button>
          <Button type="submit" form="booking-confirm-form" variant="primary-outline">
            Pesan
          </Button>
        </>
      }
    >
      <dl className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <dt className={TERM}>Pemesan</dt>
          <dd className="rounded-md border border-border px-2 py-3 text-sm tracking-[0.05em]">{summary.bookerName}</dd>
        </div>
        <div>
          <dt className={TERM}>Waktu peminjaman</dt>
          <dd className="flex flex-col text-xs">
            <span className="flex min-h-[30px] items-center gap-2">
              <Image src="/icons/admin/detail-date.svg" alt="" width={16} height={16} />
              {formatDateLongWIB(summary.startsAt)}
            </span>
            <span className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
              <span className="flex items-center gap-2">
                <Image src="/icons/admin/detail-time.svg" alt="" width={16} height={16} />
                {summary.start.replace(":", ".")} WIB
                <Image src="/icons/admin/detail-arrow.svg" alt="sampai" width={18} height={18} />
                {summary.end.replace(":", ".")} WIB
              </span>
              <span className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1">
                  <Image src="/icons/admin/detail-building.svg" alt="Gedung" width={13} height={15} />
                  {summary.buildingName}
                </span>
                <span className="flex items-center gap-1">
                  <Image src="/icons/admin/detail-room.svg" alt="Ruangan" width={19} height={19} />
                  {summary.roomCode}
                </span>
              </span>
            </span>
          </dd>
        </div>
      </dl>
      <form
        id="booking-confirm-form"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          if (!purpose.trim()) return setError("Tulis keperluan reservasi.");
          onConfirm(purpose.trim());
        }}
      >
        <Field label="Keperluan" htmlFor="booking-purpose" labelStyle="caps" error={error}>
          <input
            id="booking-purpose"
            value={purpose}
            onChange={(event) => {
              setPurpose(event.target.value);
              setError(undefined);
            }}
            placeholder="Contoh: Rapat dosen prodi"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "booking-purpose-error" : undefined}
            className={INPUT_CLASS}
          />
        </Field>
      </form>
    </Dialog>
  );
}
