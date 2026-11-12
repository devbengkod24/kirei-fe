import { describe, expect, it } from "vitest";
import { reservationDateLong, reservationDateShort } from "./reservationTime";

describe("reservation dates", () => {
  const room = { type: "ruangan" as const, startsAt: "2026-11-12T01:00:00.000Z", endsAt: "2026-11-12T03:00:00.000Z" };
  // whole WIB days, 12 to 14 November
  const trip = { type: "kendaraan" as const, startsAt: "2026-11-11T17:00:00.000Z", endsAt: "2026-11-14T17:00:00.000Z" };

  it("shows a room's day", () => {
    expect(reservationDateLong(room)).toBe("Kamis, 12 November 2026");
    expect(reservationDateShort(room)).toBe("12 Nov 2026");
  });

  it("shows every day of a vehicle trip", () => {
    expect(reservationDateLong(trip)).toBe("12 – 14 November 2026");
    expect(reservationDateShort(trip)).toBe("12 – 14 Nov 2026");
  });
});
