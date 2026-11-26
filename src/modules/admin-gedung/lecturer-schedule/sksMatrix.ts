import { SKS_SLOTS, type SksSlot } from "@/config/sks";
import { toWibDateKey, toWibTimeKey } from "@/lib/date";
import type { TimelineItem } from "@/shared/floor-timeline/timelineDetail";
import type { ReservationRecord } from "@/types/reservation";
import type { ClassSchedule } from "@/types/schedule";

const overlapsRange = (startA: string, endA: string, startB: string, endB: string) => startA < endB && startB < endA;

function scheduleFitsSlot(schedule: ClassSchedule, slot: SksSlot): boolean {
  if (schedule.sksSlot && schedule.sksCount) {
    return slot.slot >= schedule.sksSlot && slot.slot < schedule.sksSlot + schedule.sksCount;
  }
  return overlapsRange(toWibTimeKey(schedule.startsAt), toWibTimeKey(schedule.endsAt), slot.start, slot.end);
}

function reservationFitsSlot(reservation: ReservationRecord, slot: SksSlot): boolean {
  return overlapsRange(toWibTimeKey(reservation.startsAt), toWibTimeKey(reservation.endsAt), slot.start, slot.end);
}

/**
 * Returns every schedule and approved reservation occupying a single room and SKS slot on `dateKey`,
 * ordered with Siadin classes before reservations.
 */
export function itemsForRoomSlot(
  roomCode: string,
  dateKey: string,
  slot: SksSlot,
  schedules: ClassSchedule[],
  reservations: ReservationRecord[],
): TimelineItem[] {
  const classes: TimelineItem[] = schedules
    .filter((item) => item.unitName === roomCode && toWibDateKey(item.startsAt) === dateKey && scheduleFitsSlot(item, slot))
    .map((schedule) => ({ kind: "siadin", schedule }));

  const bookings: TimelineItem[] = reservations
    .filter((item) => item.unitName === roomCode && toWibDateKey(item.startsAt) === dateKey && reservationFitsSlot(item, slot))
    .map((reservation) => ({ kind: "reservasi", reservation }));

  return [...classes, ...bookings];
}

/** Builds a lookup map of room code -> array of slot items aligned with `SKS_SLOTS`. */
export function buildSksMatrix(
  roomCodes: string[],
  dateKey: string,
  schedules: ClassSchedule[],
  reservations: ReservationRecord[],
): Map<string, TimelineItem[][]> {
  const matrix = new Map<string, TimelineItem[][]>();
  for (const code of roomCodes) {
    matrix.set(
      code,
      SKS_SLOTS.map((slot) => itemsForRoomSlot(code, dateKey, slot, schedules, reservations)),
    );
  }
  return matrix;
}
