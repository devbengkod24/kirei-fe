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

/** "09.30" */
export function formatTimeWIB(input: DateInput): string {
  const pick = partsOf(input, { hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  return `${pick("hour")}.${pick("minute")}`;
}

/** "09.30 - 10.20 WIB" */
export function formatTimeRangeWIB(start: DateInput, end: DateInput): string {
  return `${formatTimeWIB(start)} - ${formatTimeWIB(end)} WIB`;
}

/** "25 Feb 13.45 WIB" */
export function formatDateTimeShortWIB(input: DateInput): string {
  const pick = partsOf(input, { day: "numeric", month: "short" });
  return `${pick("day")} ${pick("month")} ${formatTimeWIB(input)} WIB`;
}

/** "2 Mar 2025" */
export function formatDateShortWIB(input: DateInput): string {
  const pick = partsOf(input, { day: "numeric", month: "short", year: "numeric" });
  return `${pick("day")} ${pick("month")} ${pick("year")}`;
}

/** "Selasa, 20 Oktober 2026" */
export function formatDateLongWIB(input: DateInput): string {
  const pick = partsOf(input, { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return `${pick("weekday")}, ${pick("day")} ${pick("month")} ${pick("year")}`;
}

/** "Hari ini", "Kemarin", or "2 Mar 2025", by WIB calendar day. */
export function formatRelativeDayWIB(input: DateInput, now: DateInput): string {
  const day = toWibDateKey(input);
  const today = toWibDateKey(now);
  if (day === today) return "Hari ini";
  const [year, month, date] = today.split("-").map(Number);
  const yesterday = new Date(Date.UTC(year, month - 1, date - 1)).toISOString().slice(0, 10);
  if (day === yesterday) return "Kemarin";
  return formatDateShortWIB(input);
}

/** "2026-10-20" + "10:20" (WIB wall clock) -> ISO string with the +07:00 offset. */
export function wibDateTimeToIso(dateKey: string, time: string): string {
  return `${dateKey}T${time}:00+07:00`;
}

/** "April", for a zero-based month index. */
export function monthName(monthIndex: number): string {
  return new Intl.DateTimeFormat("id-ID", { month: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(2000, monthIndex, 1)),
  );
}
