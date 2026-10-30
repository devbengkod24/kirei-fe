import { isInPeriod, type TimePeriod } from "@/lib/period";
import type { ReportCategory, UserReport } from "@/types/report";

export type SortOrder = "terbaru" | "terlama";

export interface ReportFilter {
  sort: SortOrder;
  period: TimePeriod;
  /** Empty means every category. */
  categories: ReportCategory[];
  /** Free text matched against the room code, e.g. "H.5.6". */
  room: string;
}

export const DEFAULT_REPORT_FILTER: ReportFilter = { sort: "terbaru", period: "semua", categories: [], room: "" };

export function isDefaultReportFilter(filter: ReportFilter) {
  return (
    filter.sort === "terbaru" && filter.period === "semua" && filter.categories.length === 0 && filter.room.trim() === ""
  );
}

export function filterReports(reports: UserReport[], filter: ReportFilter, now: Date | string): UserReport[] {
  const room = filter.room.trim().toLowerCase();
  const direction = filter.sort === "terbaru" ? -1 : 1;

  return reports
    .filter((report) => isInPeriod(report.createdAt, filter.period, now))
    .filter((report) => filter.categories.length === 0 || filter.categories.includes(report.category))
    .filter((report) => room === "" || (report.roomCode ?? "").toLowerCase().includes(room))
    .sort((a, b) => direction * (Date.parse(a.createdAt) - Date.parse(b.createdAt)));
}
