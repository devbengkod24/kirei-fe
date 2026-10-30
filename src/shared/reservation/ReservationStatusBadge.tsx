import { Badge, type BadgeProps, type BadgeTone } from "@/components/ui/Badge";
import type { ReservationStatus } from "@/types/reservation";

/** One label and color per status, shared by borrower and admin screens. */
export const RESERVATION_STATUS: Record<ReservationStatus, { label: string; tone: BadgeTone }> = {
  draft: { label: "Draft", tone: "neutral" },
  menunggu_konfirmasi: { label: "Menunggu", tone: "warning" },
  disetujui: { label: "Disetujui", tone: "success" },
  ditolak: { label: "Ditolak", tone: "danger" },
  selesai: { label: "Selesai", tone: "primary" },
  dibatalkan: { label: "Dibatalkan", tone: "danger" },
};

export function reservationStatusLabel(status: ReservationStatus) {
  return RESERVATION_STATUS[status].label;
}

/** `md` (default) is the pill used in tables; `sm` fits inside cards. */
export function ReservationStatusBadge({ status, size = "md" }: { status: ReservationStatus; size?: BadgeProps["size"] }) {
  const { label, tone } = RESERVATION_STATUS[status];
  return (
    <Badge tone={tone} size={size}>
      {label}
    </Badge>
  );
}
