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

/** Where a segment sits on the time axis: minutes from `from`, and its length in minutes. */
export function segmentSpan(segment: TimeSlot, from: string) {
  return { offset: toMinutes(segment.start) - toMinutes(from), length: toMinutes(segment.end) - toMinutes(segment.start) };
}

const pad = (value: number) => String(value).padStart(2, "0");

/** Ruler marks every 10 minutes; every half hour also carries a label such as "07.30". */
export function rulerTicks(from: string, to: string) {
  const start = toMinutes(from);
  const ticks: { offset: number; label: string | null }[] = [];
  for (let minute = start; minute <= toMinutes(to); minute += STEP_MINUTES) {
    ticks.push({ offset: minute - start, label: minute % 30 === 0 ? `${pad(Math.floor(minute / 60))}.${pad(minute % 60)}` : null });
  }
  return ticks;
}

/** Minutes from `from` to the current WIB time, or null on another day or outside the range. */
export function nowOffset(now: Date, dateKey: string, from: string, to: string) {
  if (toWibDateKey(now) !== dateKey) return null;
  const minute = toMinutes(toWibTimeKey(now));
  return minute >= toMinutes(from) && minute <= toMinutes(to) ? minute - toMinutes(from) : null;
}

/** Shows or hides a room's track. The last visible room stays, so the timeline is never empty. */
export function toggleRoom(visibleIds: string[], roomId: string): string[] {
  if (!visibleIds.includes(roomId)) return [...visibleIds, roomId];
  return visibleIds.length === 1 ? visibleIds : visibleIds.filter((id) => id !== roomId);
}

/** Two hours from the current hour, kept inside opening hours. */
export function defaultHourFilter(now: Date) {
  const hour = (value: number) => `${pad(value)}:00`;
  const open = Number(OPEN_TIME.slice(0, 2));
  const close = Number(CLOSE_TIME.slice(0, 2));
  const from = Math.min(Math.max(Number(toWibTimeKey(now).slice(0, 2)), open), close - 2);
  return { from: hour(from), to: hour(from + 2) };
}
