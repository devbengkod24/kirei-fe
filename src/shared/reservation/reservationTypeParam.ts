import { notFound } from "next/navigation";
import { RESERVATION_TYPES, type ReservationType } from "@/types/reservation";

export function isReservationType(value: string): value is ReservationType {
  return (RESERVATION_TYPES as readonly string[]).includes(value);
}

/** For generateStaticParams on routes with a `[tipe]` segment. */
export function reservationTypeParams() {
  return RESERVATION_TYPES.map((tipe) => ({ tipe }));
}

/** Reads the `[tipe]` segment; anything else is a 404. */
export function parseReservationTypeParam(value: string): ReservationType {
  if (!isReservationType(value)) notFound();
  return value;
}
