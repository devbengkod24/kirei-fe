import { Badge, type BadgeTone } from "@/components/ui/Badge";
import type { ReservationStatus } from "@/types/reservation";

export const RESERVATION_STATUS: Record<ReservationStatus, { label: string; tone: BadgeTone }> = {
  menunggu_konfirmasi: { label: "Menunggu", tone: "warning" },
  disetujui: { label: "Disetujui", tone: "success" },
  ditolak: { label: "Ditolak", tone: "danger" },
  selesai: { label: "Selesai", tone: "primary" },
  dibatalkan: { label: "Dibatalkan", tone: "danger" },
};

export function ReservationStatusBadge({ status }: { status: ReservationStatus }) {
  const { label, tone } = RESERVATION_STATUS[status];
  return (
    <Badge tone={tone} className="min-w-[96px] rounded-md px-4 py-1 text-xs">
      {label}
    </Badge>
  );
}
