import { connection } from "next/server";
import { getDataMode } from "@/lib/data-mode/getDataMode";
import { buildAnnouncementsMock } from "@/mocks/announcements";
import type { AdminScope } from "@/shared/admin-scope";
import type { Announcement } from "@/types/announcement";

/**
 * Announcements for a faculty scope: an admin's own faculty, all faculties for admin universitas
 * (null), or what a borrower sees (their faculty plus university-wide ones).
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- the mock has one faculty; the API filters by scope
export async function getAnnouncements(scope: AdminScope): Promise<Announcement[]> {
  await connection();
  // TODO: replace with the orval client for announcements (no-store, filtered by scope.fakultasId).
  // The "empty" data mode starts without announcements; the ones made in the browser are added on the client.
  return (await getDataMode()) === "sample" ? buildAnnouncementsMock(new Date()) : [];
}
