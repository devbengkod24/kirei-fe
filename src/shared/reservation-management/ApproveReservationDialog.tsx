"use client";

import { Button } from "@/components/ui/Button";
import { ReservationDetailDialog } from "@/shared/reservation/ReservationDetailDialog";
import type { ReservationRequest } from "@/types/reservation";

export interface ApproveReservationDialogProps {
  reservation: ReservationRequest;
  onClose: () => void;
  onApprove: () => void;
}

/** The full reservation details with one more check before approving, since the borrower is notified right away. */
export function ApproveReservationDialog({ reservation, onClose, onApprove }: ApproveReservationDialogProps) {
  return (
    <ReservationDetailDialog
      reservation={reservation}
      onClose={onClose}
      title="Setujui Reservasi"
      intro={<p className="text-sm">Periksa detail pesanan sebelum menyetujui.</p>}
      footer={
        <>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button variant="success-outline" onClick={onApprove}>
            Setujui reservasi
          </Button>
        </>
      }
    />
  );
}
