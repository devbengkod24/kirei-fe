import { describe, expect, it } from "vitest";
import { isInPeriod } from "./period";

describe("isInPeriod", () => {
  // Friday 30 Oct 2026, 12:00 WIB
  const now = "2026-10-30T05:00:00Z";

  it("matches today by the WIB day", () => {
    expect(isInPeriod("2026-10-29T18:00:00Z", "hari_ini", now)).toBe(true);
    expect(isInPeriod("2026-10-29T10:00:00Z", "hari_ini", now)).toBe(false);
  });

  it("uses a Monday to Sunday week", () => {
    expect(isInPeriod("2026-10-26T01:00:00Z", "minggu_ini", now)).toBe(true);
    expect(isInPeriod("2026-11-01T10:00:00Z", "minggu_ini", now)).toBe(true);
    expect(isInPeriod("2026-10-25T10:00:00Z", "minggu_ini", now)).toBe(false);
  });

  it("matches the calendar month", () => {
    expect(isInPeriod("2026-10-01T01:00:00Z", "bulan_ini", now)).toBe(true);
    expect(isInPeriod("2026-09-30T10:00:00Z", "bulan_ini", now)).toBe(false);
    expect(isInPeriod("2020-01-01T00:00:00Z", "semua", now)).toBe(true);
  });
});
