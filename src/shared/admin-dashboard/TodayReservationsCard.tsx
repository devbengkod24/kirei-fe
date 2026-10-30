import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { formatTimeWIB } from "@/lib/date";
import { ReservationStatusBadge } from "@/shared/reservation/ReservationStatusBadge";
import type { ReservationRequest } from "@/types/reservation";

export interface TodayReservationsCardProps {
  reservations: ReservationRequest[];
  allHref: string;
  className?: string;
}

export function TodayReservationsCard({ reservations, allHref, className = "" }: TodayReservationsCardProps) {
  return (
    <Card as="section" aria-labelledby="today-reservations-title" className={`flex flex-col gap-3 p-3 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Image src="/icons/reservation.svg" alt="" width={20} height={20} />
          <h2 id="today-reservations-title" className="text-sm font-medium">
            Reservasi Hari Ini
          </h2>
        </div>
        <Link
          href={allHref}
          className="-my-3 inline-flex min-h-11 items-center gap-1.5 text-[11px] text-primary underline-offset-4 hover:underline"
        >
          Lihat semua
          <Image src="/icons/chevron-right-all.svg" alt="" width={4} height={6} />
        </Link>
      </div>

      {reservations.length === 0 ? (
        <p className="py-8 text-center text-xs text-muted">Belum ada reservasi yang disetujui untuk hari ini.</p>
      ) : (
        <div role="region" aria-labelledby="today-reservations-title" tabIndex={0} className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-xs">
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="px-4 py-2 font-medium">Pemesan</th>
                <th scope="col" className="px-4 py-2 font-medium">Ruangan</th>
                <th scope="col" className="px-4 py-2 font-medium">Keperluan</th>
                <th scope="col" className="px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id} className="border-b border-border last:border-b-0">
                  <td className="max-w-[180px] truncate px-4 py-2 tracking-[0.05em]" title={reservation.borrowerName}>
                    {reservation.borrowerName}
                  </td>
                  <td className="px-4 py-2 tracking-[0.05em] whitespace-nowrap">
                    {reservation.roomName}
                    <span className="ml-1 text-muted">{formatTimeWIB(reservation.startsAt)}</span>
                  </td>
                  <td className="px-4 py-2 tracking-[0.05em]">{reservation.purpose}</td>
                  <td className="px-4 py-2">
                    <ReservationStatusBadge status={reservation.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}
