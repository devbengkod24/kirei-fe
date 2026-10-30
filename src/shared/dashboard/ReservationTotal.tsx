import Image from "next/image";

export interface ReservationTotalProps {
  totalReservations: number;
}

export function ReservationTotal({ totalReservations }: ReservationTotalProps) {
  return (
    <dl className="flex items-center gap-2 rounded-md bg-info-soft p-2">
      <span className="flex rounded-md bg-info-soft p-1">
        <Image src="/icons/stat-reservation.svg" alt="" width={25} height={25} />
      </span>
      <div className="flex flex-col-reverse">
        <dt className="text-[11px] leading-4">Total Reservasi</dt>
        <dd className="text-[25px] leading-[25px] font-semibold text-info">{totalReservations}</dd>
      </div>
    </dl>
  );
}
