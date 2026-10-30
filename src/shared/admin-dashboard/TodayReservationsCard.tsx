import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { TABLE, TABLE_CELL, TABLE_HEAD_CELL, TABLE_ROW } from "@/components/ui/table";
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
        <>
          <table className={`hidden ${TABLE} text-left sm:table`}>
            <caption className="sr-only">Reservasi hari ini</caption>
            <thead>
              <tr className={TABLE_ROW}>
                <th scope="col" className={`${TABLE_HEAD_CELL} text-left`}>Pemesan</th>
                <th scope="col" className={`${TABLE_HEAD_CELL} text-left`}>Ruangan</th>
                <th scope="col" className={`${TABLE_HEAD_CELL} text-left`}>Keperluan</th>
                <th scope="col" className={`${TABLE_HEAD_CELL} text-center`}>Status</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id} className={`${TABLE_ROW} last:border-b-0`}>
                  <td className={`${TABLE_CELL} max-w-[180px] truncate`} title={reservation.borrowerName}>
                    {reservation.borrowerName}
                  </td>
                  <td className={`${TABLE_CELL} whitespace-nowrap`}>
                    {reservation.roomName}
                    <span className="ml-1 text-muted">{formatTimeWIB(reservation.startsAt)}</span>
                  </td>
                  <td className={TABLE_CELL}>{reservation.purpose}</td>
                  <td className={`${TABLE_CELL} text-center`}>
                    <ReservationStatusBadge status={reservation.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* On narrow screens the table becomes a list, like the borrower's history. */}
          <ul className="flex flex-col sm:hidden">
            {reservations.map((reservation) => (
              <li key={reservation.id} className="border-b border-border py-3 first:pt-0 last:border-b-0">
                <div className="mb-1 flex items-start justify-between gap-3">
                  <span className="min-w-0 text-sm font-medium break-words">{reservation.borrowerName}</span>
                  <ReservationStatusBadge status={reservation.status} size="sm" />
                </div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs">
                  <dt className="text-primary">Ruangan</dt>
                  <dd>
                    {reservation.roomName} <span className="text-muted">{formatTimeWIB(reservation.startsAt)} WIB</span>
                  </dd>
                  <dt className="text-primary">Keperluan</dt>
                  <dd className="break-words">{reservation.purpose}</dd>
                </dl>
              </li>
            ))}
          </ul>
        </>
      )}
    </Card>
  );
}
