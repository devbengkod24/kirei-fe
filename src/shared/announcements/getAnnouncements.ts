import { connection } from "next/server";
import { buildAnnouncementsMock } from "@/mocks/announcements";
import type { AdminScope } from "@/shared/admin-scope";
import type { Announcement } from "@/types/announcement";

/** Announcements an admin manages: the faculty's own, or all of them for admin universitas. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- the mock has one faculty; the API filters by scope
export async function getAnnouncements(scope: AdminScope): Promise<Announcement[]> {
  await connection();
  // TODO: replace with the orval client for announcements (no-store, filtered by scope.fakultasId).
  return buildAnnouncementsMock(new Date());
}
