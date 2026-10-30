/**
 * Utilities for formatting dates and times in Western Indonesia Time (WIB / UTC+7).
 */

export const INDONESIAN_MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
] as const;

const INDONESIAN_MONTHS_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agt",
  "Sep",
  "Okt",
  "Nov",
  "Des",
] as const;

const INDONESIAN_DAYS = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
] as const;

export function formatDateWIB(dateInput: Date | string | number): string {
  const date = new Date(dateInput);
  const day = INDONESIAN_DAYS[date.getDay()];
  const dateNum = date.getDate();
  const month = INDONESIAN_MONTHS_SHORT[date.getMonth()];
  const year = date.getFullYear();

  return `${day}, ${dateNum} ${month} ${year}`;
}

export function formatTimeRangeWIB(startInput: Date | string, endInput: Date | string): string {
  const start = new Date(startInput);
  const end = new Date(endInput);

  const startHours = String(start.getHours()).padStart(2, "0");
  const startMinutes = String(start.getMinutes()).padStart(2, "0");
  const endHours = String(end.getHours()).padStart(2, "0");
  const endMinutes = String(end.getMinutes()).padStart(2, "0");

  return `${startHours}.${startMinutes} - ${endHours}.${endMinutes} WIB`;
}

export function formatAnnouncementDateWIB(dateInput: Date | string): string {
  const date = new Date(dateInput);
  const dateNum = date.getDate();
  const month = INDONESIAN_MONTHS_SHORT[date.getMonth()];
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${dateNum} ${month} ${hours}:${minutes} WIB`;
}

