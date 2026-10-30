import { toWibDateKey, toWibTimeKey, wibToIso } from "@/lib/date";
import type { Building, FloorPlanRoom, UnitBooking, RoomCategory } from "@/types/facility";

export type RoomStatus = "selected" | "booked" | "available" | "filtered";

export interface RoomStatusInput {
  bookings: UnitBooking[];
  /** ISO 8601, null while the time range is incomplete or invalid */
  startsAt: string | null;
  endsAt: string | null;
  category: RoomCategory | null;
  selectedRoomId: string;
  /** Admins may take a booked slot and move the existing reservation. */
  canUseBookedSlot: boolean;
}

/** Half-open ranges [start, end): a booking ending at 10:00 does not clash with one starting at 10:00. */
export function rangesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return Date.parse(aStart) < Date.parse(bEnd) && Date.parse(bStart) < Date.parse(aEnd);
}

export function isRoomBooked(roomId: string, bookings: UnitBooking[], startsAt: string, endsAt: string) {
  return bookings.some(
    (booking) => booking.unitId === roomId && rangesOverlap(booking.startsAt, booking.endsAt, startsAt, endsAt),
  );
}

export function roomStatus(room: FloorPlanRoom, input: RoomStatusInput): { status: RoomStatus; selectable: boolean } {
  if (input.category && room.category !== input.category) return { status: "filtered", selectable: false };

  const booked =
    input.startsAt !== null && input.endsAt !== null && isRoomBooked(room.id, input.bookings, input.startsAt, input.endsAt);
  const selectable = !booked || input.canUseBookedSlot;

  if (room.id === input.selectedRoomId && selectable) return { status: "selected", selectable };
  return { status: booked ? "booked" : "available", selectable };
}

/** ISO range for the chosen WIB date and times, or null when it is incomplete or not increasing. */
export function toIsoRange(dateKey: string, startTime: string, endTime: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateKey) || !startTime || !endTime || endTime <= startTime) return null;
  return { startsAt: wibToIso(dateKey, startTime), endsAt: wibToIso(dateKey, endTime) };
}

/**
 * Starting values for the date and time fields: the next full hour for two hours.
 * Late in the evening it moves to 08:00 the next day.
 */
export function defaultSchedule(now: Date) {
  const hour = Number(toWibTimeKey(now).slice(0, 2));
  const pad = (value: number) => String(value).padStart(2, "0");

  if (hour + 1 > 21) {
    return { date: toWibDateKey(now.getTime() + 24 * 60 * 60 * 1000), startTime: "08:00", endTime: "10:00" };
  }
  return { date: toWibDateKey(now), startTime: `${pad(hour + 1)}:00`, endTime: `${pad(hour + 3)}:00` };
}

/**
 * Who approves a room reservation, shown to the borrower before sending. Null when the room
 * belongs to the borrower's own faculty or to the university.
 */
export function crossFacultyApprover(userFakultasId: string | null, building: Building) {
  if (building.fakultasId === null || building.fakultasId === userFakultasId) return null;
  return building.fakultasName ?? building.name;
}
