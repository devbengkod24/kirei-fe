export type AnnouncementCategory = "informasi" | "pemberitahuan" | "pemeliharaan";

export interface Announcement {
  id: string;
  title: string;
  category: AnnouncementCategory;
  body: string;
  /** Quoted detail shown under the body, e.g. the reason a reservation was cancelled. */
  quote?: string;
  authorName: string;
  /** ISO 8601 (UTC) */
  publishedAt: string;
}
