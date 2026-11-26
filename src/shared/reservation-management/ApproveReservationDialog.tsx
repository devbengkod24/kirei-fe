"use client";

import { Button } from "@/components/ui/Button";
import { ReservationDetailDialog } from "@/shared/reservation/ReservationDetailDialog";
import type { ReservationRequest } from "@/types/reservation";

export interface ApproveReservationDialogProps {
  reservation: ReservationRequest;
  onClose: () => void;
  onApprove: () => void;
  /** Panels beside the details, e.g. drivers and costs of a vehicle request. */
  aside?: React.ReactNode;
  /** Lets the admin record physical hard copy submission during verification. */
  onHardCopyChange?: (submitted: boolean) => void;
}

/** The full reservation details with one more check before approving, since the borrower is notified right away. */
export function ApproveReservationDialog({
  reservation,
  onClose,
  onApprove,
  aside,
  onHardCopyChange,
}: ApproveReservationDialogProps) {
  return (
    <ReservationDetailDialog
      reservation={reservation}
      onClose={onClose}
      title="Setujui Reservasi"
      aside={aside}
      onHardCopyChange={onHardCopyChange}
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
