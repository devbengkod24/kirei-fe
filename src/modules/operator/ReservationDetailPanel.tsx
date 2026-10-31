"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatTimeRangeWIB } from "@/lib/date";
import type { ReservationRecord } from "@/types/reservation";

export interface ReservationDetailPanelProps {
  reservation: ReservationRecord;
  canDelete: boolean;
  onClose: () => void;
  /** Resolves to an error message, or null once the reservation is deleted. */
  onDelete: (reservation: ReservationRecord) => Promise<string | null>;
}

export function ReservationDetailPanel({ reservation, canDelete, onClose, onDelete }: ReservationDetailPanelProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [confirming, setConfirming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const time = formatTimeRangeWIB(reservation.startsAt, reservation.endsAt);

  // Moves focus (and, on phones, the scroll position) to the panel when another slot is opened.
  useEffect(() => headingRef.current?.focus(), [reservation.id]);

  const remove = async () => {
    setDeleting(true);
    const message = await onDelete(reservation);
    setDeleting(false);
    if (message) {
      setConfirming(false);
      setError(message);
    }
  };

  return (
    <section aria-labelledby="reservation-detail-title" className="flex flex-col gap-3 rounded-lg border border-border p-3">
      <div className="flex items-center justify-between gap-2 border-b border-border pb-1">
        <h3 id="reservation-detail-title" ref={headingRef} tabIndex={-1} className="flex-1 text-center text-sm font-semibold">
          Detail Reservasi
        </h3>
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail reservasi"
          className="-mr-2 flex size-11 items-center justify-center rounded-md text-muted hover:bg-primary-soft hover:text-ink"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-xs">
        <dt>Ruangan</dt>
        <dd className="text-primary">{reservation.unitName}</dd>
        <dt>Pemesan</dt>
        <dd className="text-primary">{reservation.bookerName}</dd>
        <dt>Keperluan</dt>
        <dd className="text-primary">{reservation.purpose}</dd>
        <dt>Waktu</dt>
        <dd className="text-primary">{time}</dd>
      </dl>

      {error && (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
      {canDelete && (
        <Button variant="danger" onClick={() => setConfirming(true)} className="mt-auto self-end">
          Hapus
        </Button>
      )}

      <Modal
        open={confirming}
        onClose={() => setConfirming(false)}
        title="Hapus reservasi?"
        footer={
          <>
            <Button variant="outline" onClick={() => setConfirming(false)} disabled={deleting}>
              Batal
            </Button>
            <Button variant="danger" onClick={remove} disabled={deleting}>
              {deleting ? "Menghapus..." : "Hapus reservasi"}
            </Button>
          </>
        }
      >
        <p className="text-sm">
          Reservasi {reservation.unitName} oleh {reservation.bookerName}, {time}, akan dihapus dan slotnya menjadi tersedia.
        </p>
      </Modal>
    </section>
  );
}
