import Image from "next/image";

export interface ReservationStatsProps {
  totalReservations: number;
  penaltyCount: number;
  penaltyLimit: number;
}

export function ReservationStats({ totalReservations, penaltyCount, penaltyLimit }: ReservationStatsProps) {
  return (
    <dl className="grid grid-cols-2 gap-1">
      <div className="flex items-center gap-2 rounded-md bg-info-soft p-2">
        <span className="flex rounded-md bg-info-soft p-1">
          <Image src="/icons/stat-reservation.svg" alt="" width={25} height={25} />
        </span>
        <div className="flex flex-col-reverse">
          <dt className="text-[11px] leading-4">Total Reservasi</dt>
          <dd className="text-[25px] leading-[25px] font-semibold text-info">{totalReservations}</dd>
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-md bg-warning-soft p-2">
        <span className="flex rounded-md bg-warning-soft p-1">
          <Image src="/icons/stat-penalty.svg" alt="" width={25} height={25} />
        </span>
        <div className="flex flex-col-reverse">
          <dt className="text-[11px] leading-4">Total Penalti</dt>
          <dd className="flex items-end gap-0.5">
            <span className="text-[25px] leading-[25px] font-semibold text-warning">{penaltyCount}</span>
            <span className="text-[13px] leading-4">
              <span aria-hidden="true">/</span>
              <span className="sr-only">dari batas</span>
              {penaltyLimit}
            </span>
          </dd>
        </div>
      </div>
    </dl>
  );
}
