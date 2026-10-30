/**
 * Date helpers. The API sends UTC/ISO 8601; everything shown to users is WIB (Asia/Jakarta).
 */

export const WIB_TIME_ZONE = "Asia/Jakarta";

type DateInput = Date | string | number;

function partsOf(input: DateInput, options: Intl.DateTimeFormatOptions) {
  const parts = new Intl.DateTimeFormat("id-ID", { timeZone: WIB_TIME_ZONE, ...options }).formatToParts(
    new Date(input),
  );
  const pick = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return pick;
}

/** "2026-10-30" for the WIB calendar day of the given instant. */
export function toWibDateKey(input: DateInput): string {
  const pick = partsOf(input, { year: "numeric", month: "2-digit", day: "2-digit" });
  return `${pick("year")}-${pick("month")}-${pick("day")}`;
}

/** "Rabu, 18 Nov 2026" */
export function formatDateWIB(input: DateInput): string {
  const pick = partsOf(input, { weekday: "long", day: "numeric", month: "short", year: "numeric" });
  return `${pick("weekday")}, ${pick("day")} ${pick("month")} ${pick("year")}`;
}

/** WIB wall-clock date ("2026-10-30") and time ("09:30") as an ISO 8601 UTC string. */
export function wibToIso(dateKey: string, time: string): string {
  return new Date(`${dateKey}T${time}:00+07:00`).toISOString();
}

/** "09:30", the WIB wall-clock time in the format of <input type="time">. */
export function toWibTimeKey(input: DateInput): string {
  const pick = partsOf(input, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  return `${pick("hour")}:${pick("minute")}`;
}

/** "Rabu, 18 November 2026" */
export function formatLongDateWIB(input: DateInput): string {
  const pick = partsOf(input, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return `${pick("weekday")}, ${pick("day")} ${pick("month")} ${pick("year")}`;
}

/** "18 November 2026" */
export function formatFullDateWIB(input: DateInput): string {
  const pick = partsOf(input, { day: "numeric", month: "long", year: "numeric" });
  return `${pick("day")} ${pick("month")} ${pick("year")}`;
}

/** "18 Nov 2026" */
export function formatShortDateWIB(input: DateInput): string {
  const pick = partsOf(input, { day: "numeric", month: "short", year: "numeric" });
  return `${pick("day")} ${pick("month")} ${pick("year")}`;
}

/** "09.30" */
export function formatTimeWIB(input: DateInput): string {
  const pick = partsOf(input, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  return `${pick("hour")}.${pick("minute")}`;
}

/** "09.30 - 10.20 WIB" */
export function formatTimeRangeWIB(start: DateInput, end: DateInput): string {
  return `${formatTimeWIB(start)} - ${formatTimeWIB(end)} WIB`;
}

/** "09.30 - 10.20", for places where a header already says WIB. */
export function formatTimeSpanWIB(start: DateInput, end: DateInput): string {
  return `${formatTimeWIB(start)} - ${formatTimeWIB(end)}`;
}

/** "25 Feb 13.45 WIB" */
export function formatDateTimeShortWIB(input: DateInput): string {
  const pick = partsOf(input, { day: "numeric", month: "short" });
  return `${pick("day")} ${pick("month")} ${formatTimeWIB(input)} WIB`;
}

/** "April", for a zero-based month index. */
export function monthName(monthIndex: number): string {
  return new Intl.DateTimeFormat("id-ID", { month: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(2000, monthIndex, 1)),
  );
}
