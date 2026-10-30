/** "2026-10-30" shifted by `days`, as a WIB wall-clock ISO string at `time`. */
export function wibDateTime(todayKey: string, days: number, time: string) {
  const [year, month, day] = todayKey.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + days));
  return `${shifted.toISOString().slice(0, 10)}T${time}:00+07:00`;
}
