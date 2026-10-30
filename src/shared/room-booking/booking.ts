import { wibDateTimeToIso } from "@/lib/date";

export interface BookedSlot {
  roomCode: string;
  /** ISO 8601 (UTC) */
  startsAt: string;
  endsAt: string;
}

export const BOOKING_HOURS = Array.from({ length: 15 }, (_, index) => String(index + 7).padStart(2, "0"));
export const BOOKING_MINUTES = ["00", "10", "20", "30", "40", "50"];

export interface BookingTime {
  /** "YYYY-MM-DD" in WIB */
  dateKey: string;
  /** "HH:MM" in WIB */
  start: string;
  end: string;
}

export function bookingRange(time: BookingTime) {
  return { startsAt: wibDateTimeToIso(time.dateKey, time.start), endsAt: wibDateTimeToIso(time.dateKey, time.end) };
}

/** Message explaining why the chosen time cannot be booked, or null when it can. */
export function bookingTimeError(time: BookingTime, todayKey: string): string | null {
  if (!time.dateKey) return "Pilih tanggal reservasi.";
  if (time.dateKey < todayKey) return "Tanggal reservasi sudah lewat.";
  if (time.end <= time.start) return "Jam selesai harus setelah jam mulai.";
  return null;
}

/** True when no booked slot of the room overlaps [startsAt, endsAt). */
export function isRoomFree(roomCode: string, slots: BookedSlot[], startsAt: string, endsAt: string): boolean {
  const start = Date.parse(startsAt);
  const end = Date.parse(endsAt);
  return !slots.some(
    (slot) => slot.roomCode === roomCode && Date.parse(slot.startsAt) < end && start < Date.parse(slot.endsAt),
  );
}
