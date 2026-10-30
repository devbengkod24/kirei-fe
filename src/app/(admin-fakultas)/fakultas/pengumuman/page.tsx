import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { AnnouncementManager } from "@/shared/announcements/AnnouncementManager";
import { getAnnouncements } from "@/shared/announcements/getAnnouncements";

export const metadata: Metadata = { title: "Pengumuman" };

export default async function Page() {
  const user = await requireRole(["admin_fakultas"]);
  const announcements = await getAnnouncements({ fakultasId: user.fakultasId });

  return <AnnouncementManager announcements={announcements} authorName={user.name} loadedAt={new Date().toISOString()} />;
}
