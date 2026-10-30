import { isInPeriod, type TimePeriod } from "@/lib/period";
import type { Announcement, AnnouncementCategory } from "@/types/announcement";
import type { SortOrder } from "@/shared/reports/filterReports";

export interface AnnouncementFilter {
  sort: SortOrder;
  period: TimePeriod;
  /** Empty means every category. */
  categories: AnnouncementCategory[];
  /** Empty means every author. */
  authors: string[];
}

export const DEFAULT_ANNOUNCEMENT_FILTER: AnnouncementFilter = { sort: "terbaru", period: "semua", categories: [], authors: [] };

export function isDefaultAnnouncementFilter(filter: AnnouncementFilter) {
  return filter.sort === "terbaru" && filter.period === "semua" && filter.categories.length === 0 && filter.authors.length === 0;
}

export function filterAnnouncements(
  announcements: Announcement[],
  filter: AnnouncementFilter,
  now: Date | string,
): Announcement[] {
  const direction = filter.sort === "terbaru" ? -1 : 1;
  return announcements
    .filter((announcement) => isInPeriod(announcement.publishedAt, filter.period, now))
    .filter((announcement) => filter.categories.length === 0 || filter.categories.includes(announcement.category))
    .filter((announcement) => filter.authors.length === 0 || filter.authors.includes(announcement.authorName))
    .sort((a, b) => direction * (Date.parse(a.publishedAt) - Date.parse(b.publishedAt)));
}
