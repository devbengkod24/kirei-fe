import { describe, expect, it } from "vitest";
import { bookingRange, bookingTimeError, isRoomFree } from "./booking";

describe("bookingTimeError", () => {
  const today = "2026-10-30";

  it("accepts a future range on a future or current day", () => {
    expect(bookingTimeError({ dateKey: "2026-10-30", start: "10:20", end: "12:00" }, today)).toBeNull();
  });

  it("rejects past days and empty or reversed ranges", () => {
    expect(bookingTimeError({ dateKey: "2026-10-29", start: "10:00", end: "11:00" }, today)).toBe("Tanggal reservasi sudah lewat.");
    expect(bookingTimeError({ dateKey: "2026-10-31", start: "12:00", end: "12:00" }, today)).toBe(
      "Jam selesai harus setelah jam mulai.",
    );
    expect(bookingTimeError({ dateKey: "", start: "10:00", end: "11:00" }, today)).toBe("Pilih tanggal reservasi.");
  });
});

describe("isRoomFree", () => {
  const slots = [{ roomCode: "H.5.1", ...bookingRange({ dateKey: "2026-10-31", start: "10:00", end: "12:00" }) }];
  const range = (start: string, end: string) => bookingRange({ dateKey: "2026-10-31", start, end });

  it("detects overlaps in the same room only", () => {
    const { startsAt, endsAt } = range("11:00", "13:00");
    expect(isRoomFree("H.5.1", slots, startsAt, endsAt)).toBe(false);
    expect(isRoomFree("H.5.2", slots, startsAt, endsAt)).toBe(true);
  });

  it("allows back-to-back bookings", () => {
    const before = range("08:00", "10:00");
    const after = range("12:00", "13:00");
    expect(isRoomFree("H.5.1", slots, before.startsAt, before.endsAt)).toBe(true);
    expect(isRoomFree("H.5.1", slots, after.startsAt, after.endsAt)).toBe(true);
  });
});
