import { toWibDateKey } from "./date";

export type TimePeriod = "semua" | "hari_ini" | "minggu_ini" | "bulan_ini";

export const TIME_PERIOD_OPTIONS: { value: TimePeriod; label: string }[] = [
  { value: "semua", label: "Semua" },
  { value: "hari_ini", label: "Hari Ini" },
  { value: "minggu_ini", label: "Minggu Ini" },
  { value: "bulan_ini", label: "Bulan Ini" },
];

function shiftKey(key: string, days: number) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, day + days)).toISOString().slice(0, 10);
}

/** Whether the instant falls in the period around `now`, by WIB calendar day. Weeks start on Monday. */
export function isInPeriod(input: string, period: TimePeriod, now: Date | string): boolean {
  if (period === "semua") return true;
  const day = toWibDateKey(input);
  const today = toWibDateKey(now);
  if (period === "hari_ini") return day === today;
  if (period === "bulan_ini") return day.slice(0, 7) === today.slice(0, 7);

  const [year, month, date] = today.split("-").map(Number);
  const weekday = (new Date(Date.UTC(year, month - 1, date)).getUTCDay() + 6) % 7;
  const monday = shiftKey(today, -weekday);
  return day >= monday && day <= shiftKey(monday, 6);
}
