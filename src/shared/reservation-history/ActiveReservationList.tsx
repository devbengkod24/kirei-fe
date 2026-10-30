import Link from "next/link";
import { Card } from "@/components/ui/Card";
import type { ReservationRecord, ReservationType } from "@/types/reservation";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";
import { ActiveReservationCard } from "./ActiveReservationCard";

export interface ActiveReservationListProps {
  tipe: ReservationType;
  today: ReservationRecord[];
  upcoming: ReservationRecord[];
  /** Shown in the empty state. Omit where the viewer cannot create reservations. */
  createHref?: string;
}

function Group({ id, title, reservations }: { id: string; title: string; reservations: ReservationRecord[] }) {
  if (reservations.length === 0) return null;

  return (
    <section aria-labelledby={id} className="flex flex-col gap-2">
      <h2 id={id} className="text-xs tracking-wide text-muted italic">
        {title}
      </h2>
      <div className="grid gap-3.5 xl:grid-cols-2">
        {reservations.map((reservation) => (
          <ActiveReservationCard key={reservation.id} reservation={reservation} />
        ))}
      </div>
    </section>
  );
}

export function ActiveReservationList({ tipe, today, upcoming, createHref }: ActiveReservationListProps) {
  if (today.length === 0 && upcoming.length === 0) {
    return (
      <Card className="flex flex-col items-center gap-1 px-6 py-12 text-center">
        <p className="text-sm font-medium">Tidak ada reservasi aktif untuk {RESERVATION_TYPE_LABEL[tipe]}.</p>
        <p className="text-xs text-muted">Reservasi yang sudah selesai, ditolak, atau dibatalkan ada di tab Riwayat.</p>
        {createHref && (
          <Link href={createHref} className="mt-1 inline-flex min-h-11 items-center text-xs font-medium text-primary underline-offset-4 hover:underline">
            Buat reservasi
          </Link>
        )}
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Group id="active-today" title="Hari ini" reservations={today} />
      <Group id="active-upcoming" title="Akan datang" reservations={upcoming} />
    </div>
  );
}
