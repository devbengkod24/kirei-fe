"use client";

import { useState } from "react";
import { Field, INPUT_CLASS } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatDateShortWIB } from "@/lib/date";
import type { ReservationRequest } from "@/types/reservation";

export interface RejectReservationDialogProps {
  reservation: ReservationRequest;
  onClose: () => void;
  onReject: (reason: string) => void;
}

export function RejectReservationDialog({ reservation, onClose, onReject }: RejectReservationDialogProps) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string>();

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!reason.trim()) return setError("Tulis alasan penolakan. Alasan ini dikirim ke pemesan.");
    onReject(reason.trim());
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Tolak Reservasi"
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
    >
      <p className="text-sm">
        Reservasi <span className="font-semibold">{reservation.roomName}</span> oleh{" "}
        <span className="font-semibold">{reservation.borrowerName}</span> pada {formatDateShortWIB(reservation.startsAt)}.
      </p>
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
            placeholder="Contoh: Ruangan dipakai untuk ujian prodi."
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "reject-reason-error" : undefined}
            className={INPUT_CLASS}
          />
        </Field>
      </form>
    </Modal>
  );
}
