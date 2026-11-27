import { SKS_SLOTS, type SksSlot } from "@/config/sks";
import { toWibTimeKey } from "@/lib/date";
import type { UnitBooking } from "@/types/facility";
import { roomBookingsOnDay } from "./availability";

export interface RoomSksBooking {
  start: string;
  end: string;
  label?: string;
  isLecture: boolean;
}

export interface RoomSksCell {
  slot: SksSlot;
  booking: RoomSksBooking | null;
}

const overlaps = (startA: string, endA: string, startB: string, endB: string) => startA < endB && startB < endA;

/**
 * Maps a room's bookings on one WIB day onto the 15 official SKS slots (`07:00-21:00 WIB`),
 * preferring lecture labels when both exist in the same slot.
 */
export function buildRoomSksCells(roomId: string, bookings: UnitBooking[], dateKey: string): RoomSksCell[] {
  const dayBookings: RoomSksBooking[] = roomBookingsOnDay(roomId, bookings, dateKey)
    .map((booking) => ({
      start: toWibTimeKey(booking.startsAt),
      end: toWibTimeKey(booking.endsAt),
      label: booking.label,
      isLecture: Boolean(booking.label?.toLowerCase().startsWith("jadwal kuliah")),
    }))
    .sort((a, b) => Number(b.isLecture) - Number(a.isLecture) || a.start.localeCompare(b.start));

  return SKS_SLOTS.map((slot) => ({
    slot,
    booking: dayBookings.find((item) => overlaps(item.start, item.end, slot.start, slot.end)) ?? null,
  }));
}

/** Whether a room's SKS slot overlaps the currently chosen `[startTime, endTime]` range. */
export function slotInChosenRange(slot: SksSlot, startTime: string, endTime: string): boolean {
  if (!/^\d{2}:\d{2}$/.test(startTime) || !/^\d{2}:\d{2}$/.test(endTime) || endTime <= startTime) {
    return false;
  }
  return overlaps(slot.start, slot.end, startTime, endTime);
}

/**
 * Computes the next `[startTime, endTime]` when the user clicks a free SKS slot:
 * - On another room (or when no valid current range fits), selects that single SKS slot.
 * - On the already-selected room, extends the range across contiguous free slots when clicking
 *   before or after the current range; otherwise resets to the clicked SKS slot.
 * - On a slot inside the current range, unselects it: the first or last slot shrinks the range from
 *   that end, a middle slot drops itself and the slots after it (a range has no holes), and the only
 *   chosen slot returns null, meaning the room is unselected.
 */
export function pickSksSlotRange(
  cells: readonly RoomSksCell[],
  clickedIndex: number,
  isSameSelectedRoom: boolean,
  currentStart: string,
  currentEnd: string,
): { startTime: string; endTime: string } | null {
  const clicked = cells[clickedIndex];
  if (!clicked) return { startTime: currentStart, endTime: currentEnd };

  const single = { startTime: clicked.slot.start, endTime: clicked.slot.end };
  if (!isSameSelectedRoom) return single;

  const validCurrent =
    /^\d{2}:\d{2}$/.test(currentStart) && /^\d{2}:\d{2}$/.test(currentEnd) && currentEnd > currentStart;
  if (!validCurrent) return single;

  const startIdx = cells.findIndex((cell) => cell.slot.start === currentStart);
  const endIdx = cells.findIndex((cell) => cell.slot.end === currentEnd);
  if (startIdx === -1 || endIdx === -1) return single;

  if (clickedIndex >= startIdx && clickedIndex <= endIdx) {
    if (startIdx === endIdx) return null;
    if (clickedIndex === startIdx) return { startTime: cells[startIdx + 1].slot.start, endTime: currentEnd };
    return { startTime: currentStart, endTime: cells[clickedIndex - 1].slot.end };
  }

  if (clickedIndex > endIdx) {
    const allFree = cells.slice(startIdx, clickedIndex + 1).every((cell) => cell.booking === null);
    if (allFree) return { startTime: currentStart, endTime: clicked.slot.end };
  }

  if (clickedIndex < startIdx) {
    const allFree = cells.slice(clickedIndex, endIdx + 1).every((cell) => cell.booking === null);
    if (allFree) return { startTime: clicked.slot.start, endTime: currentEnd };
  }

  return single;
}
