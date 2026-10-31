import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { AnnouncementManager } from "@/shared/announcements/AnnouncementManager";
import { getAnnouncements } from "@/shared/announcements/getAnnouncements";

export const metadata: Metadata = { title: "Pengumuman" };

export default async function Page() {
  const user = await requireRole(["admin_universitas"]);
  const announcements = await getAnnouncements({ fakultasId: null });

  return <AnnouncementManager announcements={announcements} canManage authorName={user.name} loadedAt={new Date().toISOString()} />;
}
