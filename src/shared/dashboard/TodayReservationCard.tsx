import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { formatDateWIB, formatTimeRangeWIB } from "@/lib/date";
import type { ReservationSummary } from "@/types/reservation";

export interface TodayReservationCardProps {
  reservation: ReservationSummary | null;
  detailHref: string;
  createHref: string;
  className?: string;
}

export function TodayReservationCard({ reservation, detailHref, createHref, className = "" }: TodayReservationCardProps) {
  return (
    <Card as="section" aria-labelledby="today-reservation-title" className={`flex flex-col gap-3 p-3 ${className}`}>
      <div className="flex items-center gap-2">
        <Image src="/icons/reservation.svg" alt="" width={21} height={21} />
        <h2 id="today-reservation-title" className="text-[13px] font-medium">
          Reservasi
        </h2>
      </div>

      {reservation ? (
        <div className="flex flex-wrap items-start justify-between gap-x-3 gap-y-2 p-1">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] text-muted italic">Hari ini</p>
            <p className="text-[13px] font-semibold text-primary">{formatDateWIB(reservation.startsAt)}</p>
            <p className="flex items-center gap-1.5 text-xs">
              <Image src="/icons/clock.svg" alt="" width={13} height={13} />
              {formatTimeRangeWIB(reservation.startsAt, reservation.endsAt)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1">
                <Image src="/icons/building.svg" alt="" width={13} height={15} />
                <span className="sr-only">Gedung:</span>
                {reservation.buildingName}
              </span>
              <span className="flex items-center gap-1">
                <Image src="/icons/room.svg" alt="" width={19} height={19} />
                <span className="sr-only">Ruangan:</span>
                {reservation.roomName}
              </span>
            </div>
            <Link
              href={detailHref}
              className="-my-3 inline-flex min-h-11 items-center gap-1.5 text-xs text-primary underline-offset-4 hover:underline"
            >
              Lihat detail
              <Image src="/icons/chevron-right-detail.svg" alt="" width={4} height={7} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-1 py-6 text-center">
          <p className="text-xs text-muted">Tidak ada reservasi untuk hari ini.</p>
          <Link href={createHref} className="inline-flex min-h-11 items-center text-xs font-medium text-primary underline-offset-4 hover:underline">
            Buat reservasi
          </Link>
        </div>
      )}
    </Card>
  );
}
