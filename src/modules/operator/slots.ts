import { toWibTimeKey, wibToIso } from "@/lib/date";
import { rangesOverlap } from "@/shared/reservation-form/availability";
import { buildSlots, type TimeSlot } from "@/shared/reservation-form/sportsHallSlots";
import type { ReservationRecord } from "@/types/reservation";

/** Hours the floor can be booked, WIB. */
export const OPEN_TIME = "07:00";
export const CLOSE_TIME = "21:00";
export const SLOT_MINUTES = 10;

/** Every slot boundary of the day ("07:00", "07:10", ... "21:00"), for the time pickers. */
export const SLOT_TIMES = [...buildSlots(OPEN_TIME, CLOSE_TIME, SLOT_MINUTES).map((slot) => slot.start), CLOSE_TIME];

/** Whole hours offered by the "Filter Jam" pickers. */
export const FILTER_HOURS = SLOT_TIMES.filter((time) => time.endsWith(":00"));

/** Slots shown for the hour filter; empty when the range is not increasing. */
export function filterSlots(from: string, to: string): TimeSlot[] {
  return from < to ? buildSlots(from, to, SLOT_MINUTES) : [];
}

/** The reservation holding this room during the slot, or null when the slot is free. */
export function slotReservation(dateKey: string, slot: TimeSlot, roomCode: string, reservations: ReservationRecord[]) {
  const startsAt = wibToIso(dateKey, slot.start);
  const endsAt = wibToIso(dateKey, slot.end);
  return (
    reservations.find(
      (reservation) => reservation.unitName === roomCode && rangesOverlap(reservation.startsAt, reservation.endsAt, startsAt, endsAt),
    ) ?? null
  );
}

/** Two hours from the current hour, kept inside opening hours. */
export function defaultHourFilter(now: Date) {
  const pad = (hour: number) => `${String(hour).padStart(2, "0")}:00`;
  const open = Number(OPEN_TIME.slice(0, 2));
  const close = Number(CLOSE_TIME.slice(0, 2));
  const from = Math.min(Math.max(Number(toWibTimeKey(now).slice(0, 2)), open), close - 2);
  return { from: pad(from), to: pad(from + 2) };
}
