export type CalendarMarker = "past" | "upcoming" | null;

export interface CalendarCell {
  /** "2026-10-30" */
  dateKey: string;
  day: number;
  inMonth: boolean;
  isToday: boolean;
  marker: CalendarMarker;
}

export interface MonthRef {
  year: number;
  /** zero-based */
  monthIndex: number;
}

function keyOf(date: Date) {
  return date.toISOString().slice(0, 10);
}

/**
 * Builds a Monday-first month grid (5 or 6 weeks). Dates are plain calendar
 * days ("YYYY-MM-DD" in WIB), so the math runs in UTC to avoid DST/timezone drift.
 */
export function buildMonthGrid(month: MonthRef, todayKey: string, reservationKeys: Iterable<string>): CalendarCell[][] {
  const reserved = new Set(reservationKeys);
  const first = new Date(Date.UTC(month.year, month.monthIndex, 1));
  const daysInMonth = new Date(Date.UTC(month.year, month.monthIndex + 1, 0)).getUTCDate();
  const leading = (first.getUTCDay() + 6) % 7;
  const weekCount = Math.ceil((leading + daysInMonth) / 7);

  const weeks: CalendarCell[][] = [];
  for (let week = 0; week < weekCount; week++) {
    const cells: CalendarCell[] = [];
    for (let weekday = 0; weekday < 7; weekday++) {
      const date = new Date(Date.UTC(month.year, month.monthIndex, 1 - leading + week * 7 + weekday));
      const dateKey = keyOf(date);
      const inMonth = date.getUTCMonth() === month.monthIndex;
      let marker: CalendarMarker = null;
      if (inMonth && reserved.has(dateKey)) {
        marker = dateKey < todayKey ? "past" : "upcoming";
      }
      cells.push({ dateKey, day: date.getUTCDate(), inMonth, isToday: dateKey === todayKey, marker });
    }
    weeks.push(cells);
  }
  return weeks;
}

/** Months from `before` months ago to `after` months ahead of the given month. */
export function monthRange(center: MonthRef, before: number, after: number): MonthRef[] {
  const months: MonthRef[] = [];
  for (let offset = -before; offset <= after; offset++) {
    const date = new Date(Date.UTC(center.year, center.monthIndex + offset, 1));
    months.push({ year: date.getUTCFullYear(), monthIndex: date.getUTCMonth() });
  }
  return months;
}

export function monthOfKey(dateKey: string): MonthRef {
  const [year, month] = dateKey.split("-").map(Number);
  return { year, monthIndex: month - 1 };
}
