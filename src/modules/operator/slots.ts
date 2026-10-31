import { toWibDateKey, toWibTimeKey } from "@/lib/date";
import { buildSlots, type TimeSlot } from "@/shared/reservation-form/sportsHallSlots";
import type { ReservationRecord } from "@/types/reservation";
import type { ClassSchedule } from "@/types/schedule";

/** Hours the floor can be booked, WIB. */
export const OPEN_TIME = "07:00";
export const CLOSE_TIME = "21:00";
const STEP_MINUTES = 10;

/** Every 10-minute boundary of the day ("07:00", "07:10", ... "21:00"), for the time pickers. */
export const SLOT_TIMES = [...buildSlots(OPEN_TIME, CLOSE_TIME, STEP_MINUTES).map((slot) => slot.start), CLOSE_TIME];

/** Whole hours offered by the "Filter Jam" pickers. */
export const FILTER_HOURS = SLOT_TIMES.filter((time) => time.endsWith(":00"));

export const toMinutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));

/** A stretch of the room's day: free, a Siadin class, or a reservation. Times are WIB "HH:mm". */
export type TimelineSegment =
  | ({ kind: "free" } & TimeSlot)
  | ({ kind: "siadin"; schedule: ClassSchedule } & TimeSlot)
  | ({ kind: "reservasi"; reservation: ReservationRecord } & TimeSlot);

/**
 * The room's day between `from` and `to` as consecutive segments, with free gaps filled in.
 * Anything on another day or in another room is left out.
 */
export function buildTimeline(
  dateKey: string,
  roomCode: string,
  from: string,
  to: string,
  reservations: ReservationRecord[],
  schedules: ClassSchedule[],
): TimelineSegment[] {
  const onThisDay = (item: { unitName: string; startsAt: string }) =>
    item.unitName === roomCode && toWibDateKey(item.startsAt) === dateKey;
  const times = (item: { startsAt: string; endsAt: string }) => ({ start: toWibTimeKey(item.startsAt), end: toWibTimeKey(item.endsAt) });

  const busy: TimelineSegment[] = [
    ...schedules.filter(onThisDay).map((schedule) => ({ kind: "siadin" as const, schedule, ...times(schedule) })),
    ...reservations.filter(onThisDay).map((reservation) => ({ kind: "reservasi" as const, reservation, ...times(reservation) })),
  ].sort((a, b) => a.start.localeCompare(b.start));

  const segments: TimelineSegment[] = [];
  let cursor = from;
  for (const item of busy) {
    // shortcut: an overlap between a class and a reservation is clipped, not drawn side by side; Laravel prevents overlaps.
    const start = item.start > cursor ? item.start : cursor;
    const end = item.end < to ? item.end : to;
    if (start >= end) continue;
    if (start > cursor) segments.push({ kind: "free", start: cursor, end: start });
    segments.push({ ...item, start, end });
    cursor = end;
  }
  if (cursor < to) segments.push({ kind: "free", start: cursor, end: to });
  return segments;
}

/** Two hours from the current hour, kept inside opening hours. */
export function defaultHourFilter(now: Date) {
  const pad = (hour: number) => `${String(hour).padStart(2, "0")}:00`;
  const open = Number(OPEN_TIME.slice(0, 2));
  const close = Number(CLOSE_TIME.slice(0, 2));
  const from = Math.min(Math.max(Number(toWibTimeKey(now).slice(0, 2)), open), close - 2);
  return { from: pad(from), to: pad(from + 2) };
}
