import type { BadgeTone } from "@/components/ui/Badge";
import type { AnnouncementCategory } from "@/types/announcement";

export const ANNOUNCEMENT_CATEGORY: Record<AnnouncementCategory, { label: string; tone: BadgeTone }> = {
  informasi: { label: "Informasi", tone: "primary" },
  pemberitahuan: { label: "Pemberitahuan", tone: "danger" },
  pemeliharaan: { label: "Pemeliharaan", tone: "warning" },
};
