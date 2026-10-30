import { describe, expect, it } from "vitest";
import {
  formatDateTimeShortWIB,
  formatDateWIB,
  formatLongDateWIB,
  formatShortDateWIB,
  formatTimeRangeWIB,
  formatTimeSpanWIB,
  monthName,
  toWibDateKey,
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
    expect(formatLongDateWIB("2025-03-18T01:00:00Z")).toBe("Selasa, 18 Maret 2025");
    expect(formatShortDateWIB("2025-03-01T18:00:00Z")).toBe("2 Mar 2025");
    expect(formatTimeSpanWIB("2025-03-18T01:00:00Z", "2025-03-18T03:00:00Z")).toBe("08.00 - 10.00");
  });

  it("names months in Indonesian", () => {
    expect(monthName(0)).toBe("Januari");
    expect(monthName(3)).toBe("April");
  });
});
