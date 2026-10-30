import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { AnnouncementManager } from "@/shared/announcements/AnnouncementManager";
import { getAnnouncements } from "@/shared/announcements/getAnnouncements";

export const metadata: Metadata = { title: "Pengumuman" };

export default async function Page() {
  const user = await getCurrentUser();
  const announcements = await getAnnouncements({ fakultasId: user.fakultasId });

  return <AnnouncementManager announcements={announcements} loadedAt={new Date().toISOString()} />;
}
