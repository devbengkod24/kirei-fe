"use client";

import { useState } from "react";
import { Field, INPUT_CLASS } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { ReservationDetailDialog } from "@/shared/reservation/ReservationDetailDialog";
import type { ReservationRequest, ReservationType } from "@/types/reservation";

export interface RejectReservationDialogProps {
  reservation: ReservationRequest;
  onClose: () => void;
  onReject: (reason: string) => void;
}

const REASON_EXAMPLE: Record<ReservationType, string> = {
  ruangan: "Contoh: Ruangan dipakai untuk ujian prodi.",
  gor: "Contoh: GOR dipakai untuk acara universitas.",
  kendaraan: "Contoh: Semua kendaraan sudah terpakai pada tanggal itu.",
};

/** The reservation details with the reason the borrower will receive; no driver or cost panels. */
export function RejectReservationDialog({ reservation, onClose, onReject }: RejectReservationDialogProps) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string>();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!reason.trim()) return setError("Tulis alasan penolakan. Alasan ini dikirim ke pemesan.");
    onReject(reason.trim());
  };

  return (
    <ReservationDetailDialog
      reservation={reservation}
      onClose={onClose}
      title="Tolak Reservasi"
      intro={<p className="text-sm">Periksa detail pesanan, lalu tulis alasan penolakannya.</p>}
      outro={
        <form id="reject-reservation-form" onSubmit={submit} noValidate>
          <Field label="Alasan penolakan" htmlFor="reject-reason" error={error}>
            <textarea
              id="reject-reason"
              rows={3}
              value={reason}
              onChange={(event) => {
                setReason(event.target.value);
                setError(undefined);
              }}
              placeholder={REASON_EXAMPLE[reservation.type]}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "reject-reason-error" : undefined}
              className={INPUT_CLASS}
            />
          </Field>
        </form>
      }
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" form="reject-reservation-form" variant="danger-outline">
            Tolak reservasi
          </Button>
        </>
      }
    />
  );
}
