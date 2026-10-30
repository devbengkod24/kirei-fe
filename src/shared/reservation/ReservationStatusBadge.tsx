import { Badge, type BadgeProps } from "@/components/ui/Badge";
import type { ReservationStatus } from "@/types/reservation";

const STATUS_DISPLAY: Record<ReservationStatus, { label: string; tone: NonNullable<BadgeProps["tone"]> }> = {
  draft: { label: "Draft", tone: "neutral" },
  menunggu_konfirmasi: { label: "Menunggu konfirmasi", tone: "neutral" },
  disetujui: { label: "Disetujui", tone: "primary" },
  selesai: { label: "Selesai", tone: "success" },
  ditolak: { label: "Ditolak", tone: "danger" },
  dibatalkan: { label: "Dibatalkan", tone: "danger" },
};

export function reservationStatusLabel(status: ReservationStatus) {
  return STATUS_DISPLAY[status].label;
}

export function ReservationStatusBadge({ status, size = "sm" }: { status: ReservationStatus; size?: BadgeProps["size"] }) {
  const { label, tone } = STATUS_DISPLAY[status];
  return (
    <Badge tone={tone} size={size} className={size === "md" ? "uppercase" : ""}>
      {label}
    </Badge>
  );
}
