import { describe, expect, it } from "vitest";
import { buildMonthGrid, monthRange } from "./calendar";

describe("buildMonthGrid", () => {
  // April 2026 starts on a Wednesday, like the Figma mockup
  const april = { year: 2026, monthIndex: 3 };

  it("starts on Monday and pads with the neighbouring months", () => {
    const weeks = buildMonthGrid(april, "2026-04-28", []);
    expect(weeks).toHaveLength(5);
    expect(weeks[0].map((cell) => cell.day)).toEqual([30, 31, 1, 2, 3, 4, 5]);
    expect(weeks[0][0].inMonth).toBe(false);
    expect(weeks[4].map((cell) => cell.day)).toEqual([27, 28, 29, 30, 1, 2, 3]);
  });

  it("marks today and splits reservations into past and upcoming", () => {
    const weeks = buildMonthGrid(april, "2026-04-28", ["2026-04-18", "2026-04-28", "2026-04-29", "2026-05-01"]);
    const cells = weeks.flat();
    const byKey = (key: string) => cells.find((cell) => cell.dateKey === key)!;

    expect(byKey("2026-04-18").marker).toBe("past");
    expect(byKey("2026-04-28")).toMatchObject({ isToday: true, marker: "upcoming" });
    expect(byKey("2026-04-29").marker).toBe("upcoming");
    // days outside the shown month are never marked
    expect(byKey("2026-05-01").marker).toBeNull();
  });

  it("uses six weeks when the month needs it", () => {
    // August 2026 starts on a Saturday and has 31 days
    expect(buildMonthGrid({ year: 2026, monthIndex: 7 }, "2026-08-01", [])).toHaveLength(6);
  });
});

describe("monthRange", () => {
  it("crosses year boundaries", () => {
    const months = monthRange({ year: 2026, monthIndex: 10 }, 1, 2);
    expect(months).toEqual([
      { year: 2026, monthIndex: 9 },
      { year: 2026, monthIndex: 10 },
      { year: 2026, monthIndex: 11 },
      { year: 2027, monthIndex: 0 },
    ]);
  });
});
