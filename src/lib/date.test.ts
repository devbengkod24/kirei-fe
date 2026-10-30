import { describe, expect, it } from "vitest";
import {
  formatDateLongWIB,
  formatDateShortWIB,
  formatDateTimeShortWIB,
  formatDateWIB,
  formatFullDateWIB,
  formatRelativeDayWIB,
  formatTimeRangeWIB,
  formatTimeSpanWIB,
  monthName,
  toWibDateKey,
  toWibTimeKey,
  wibDateTimeToIso,
  wibToIso,
} from "./date";

describe("date (WIB)", () => {
  it("uses the WIB calendar day, not UTC", () => {
    // 18:30 UTC is already 01:30 the next day in WIB
    expect(toWibDateKey("2026-10-29T18:30:00Z")).toBe("2026-10-30");
    expect(toWibDateKey("2026-10-29T16:59:00Z")).toBe("2026-10-29");
  });

  it("formats dates and times for display", () => {
    expect(formatDateWIB("2026-11-18T02:30:00Z")).toBe("Rabu, 18 Nov 2026");
    expect(formatTimeRangeWIB("2026-11-18T02:30:00Z", "2026-11-18T03:20:00Z")).toBe("09.30 - 10.20 WIB");
    expect(formatDateTimeShortWIB("2026-02-25T06:45:00Z")).toBe("25 Feb 13.45 WIB");
    expect(formatDateLongWIB("2025-03-18T01:00:00Z")).toBe("Selasa, 18 Maret 2025");
    expect(formatDateShortWIB("2025-03-01T18:00:00Z")).toBe("2 Mar 2025");
    expect(formatFullDateWIB("2026-10-20T03:20:00Z")).toBe("20 Oktober 2026");
    expect(formatTimeSpanWIB("2025-03-18T01:00:00Z", "2025-03-18T03:00:00Z")).toBe("08.00 - 10.00");
  });

  it("converts between WIB wall-clock values and UTC", () => {
    expect(wibToIso("2026-10-30", "09:30")).toBe("2026-10-30T02:30:00.000Z");
    expect(wibToIso("2026-10-31", "01:00")).toBe("2026-10-30T18:00:00.000Z");
    expect(toWibTimeKey("2026-10-30T18:05:00Z")).toBe("01:05");
  });

  it("formats short and long dates", () => {
    expect(formatDateShortWIB("2025-03-02T01:00:00Z")).toBe("2 Mar 2025");
    expect(formatDateLongWIB("2026-10-20T03:20:00Z")).toBe("Selasa, 20 Oktober 2026");
  });

  it("labels today and yesterday by the WIB day", () => {
    const now = "2026-10-30T05:00:00Z";
    expect(formatRelativeDayWIB("2026-10-30T01:00:00Z", now)).toBe("Hari ini");
    // 20:00 UTC on the 29th is already the 30th in WIB
    expect(formatRelativeDayWIB("2026-10-29T20:00:00Z", now)).toBe("Hari ini");
    expect(formatRelativeDayWIB("2026-10-29T05:00:00Z", now)).toBe("Kemarin");
    expect(formatRelativeDayWIB("2026-10-20T05:00:00Z", now)).toBe("20 Okt 2026");
  });

  it("builds an ISO instant from a WIB date and time", () => {
    expect(new Date(wibDateTimeToIso("2026-10-20", "10:20")).toISOString()).toBe("2026-10-20T03:20:00.000Z");
  });

  it("names months in Indonesian", () => {
    expect(monthName(0)).toBe("Januari");
    expect(monthName(3)).toBe("April");
  });
});
