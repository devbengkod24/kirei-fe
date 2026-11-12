import { formatDateLongWIB, formatDateShortWIB, formatDayRangeShortWIB, formatDayRangeWIB } from "@/lib/date";
import type { ReservationType } from "@/types/reservation";

/** Vehicles are booked by whole days (00.00 WIB to 00.00 after the last day), so they show no time. */
export const isWholeDayType = (type: ReservationType) => type === "kendaraan";

type Timed = { type: ReservationType; startsAt: string; endsAt: string };

/** "Selasa, 20 Oktober 2026"; for a vehicle trip its days, e.g. "12 – 14 November 2026". */
export function reservationDateLong(reservation: Timed): string {
  return isWholeDayType(reservation.type)
    ? formatDayRangeWIB(reservation.startsAt, reservation.endsAt)
    : formatDateLongWIB(reservation.startsAt);
}

/** "20 Okt 2026"; for a vehicle trip its days, e.g. "12 – 14 Nov 2026". */
export function reservationDateShort(reservation: Timed): string {
  return isWholeDayType(reservation.type)
    ? formatDayRangeShortWIB(reservation.startsAt, reservation.endsAt)
    : formatDateShortWIB(reservation.startsAt);
}
