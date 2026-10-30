import { wibToIso } from "@/lib/date";
import type { UnitBooking } from "@/types/facility";
import { rangesOverlap } from "./availability";

export interface TimeSlot {
  /** WIB wall-clock "HH:mm" */
  start: string;
  end: string;
}

export type SlotStatus = "available" | "booked" | "past";

/** Contiguous run of selected slots, by index into the day's slots. */
export interface SlotSelection {
  from: number;
  to: number;
}

const toMinutes = (time: string) => Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
const toTime = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

/** Fixed slots between the hall's opening and closing time. A last slot that would run past closing is dropped. */
export function buildSlots(openTime: string, closeTime: string, slotMinutes: number): TimeSlot[] {
  const slots: TimeSlot[] = [];
  for (let start = toMinutes(openTime); start + slotMinutes <= toMinutes(closeTime); start += slotMinutes) {
    slots.push({ start: toTime(start), end: toTime(start + slotMinutes) });
  }
  return slots;
}

export function slotStatus(dateKey: string, slot: TimeSlot, bookings: UnitBooking[], now: Date): SlotStatus {
  const startsAt = wibToIso(dateKey, slot.start);
  if (Date.parse(startsAt) <= now.getTime()) return "past";
  const endsAt = wibToIso(dateKey, slot.end);
  return bookings.some((booking) => rangesOverlap(booking.startsAt, booking.endsAt, startsAt, endsAt)) ? "booked" : "available";
}

/**
 * Clicking a slot next to the selection extends it, clicking either end shrinks it, and
 * clicking anywhere else starts a new selection there. The selection stays one unbroken run,
 * so it never spans a booked slot.
 */
export function toggleSlot(selection: SlotSelection | null, index: number, statuses: SlotStatus[]): SlotSelection | null {
  if (statuses[index] !== "available") return selection;
  if (!selection) return { from: index, to: index };

  const { from, to } = selection;
  if (index === from && index === to) return null;
  if (index === from) return { from: from + 1, to };
  if (index === to) return { from, to: to - 1 };
  if (index === from - 1) return { from: index, to };
  if (index === to + 1) return { from, to: index };
  return { from: index, to: index };
}

/** Today and the following days, for the day picker. */
export function upcomingDays(todayKey: string, count: number) {
  const [year, month, day] = todayKey.split("-").map(Number);
  return Array.from({ length: count }, (_, offset) => {
    const date = new Date(Date.UTC(year, month - 1, day + offset));
    return {
      dateKey: date.toISOString().slice(0, 10),
      weekday: new Intl.DateTimeFormat("id-ID", { weekday: "short", timeZone: "UTC" }).format(date),
      day: date.getUTCDate(),
    };
  });
}
