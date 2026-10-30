import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { formatDateTimeShortWIB } from "@/lib/date";
import type { Announcement, AnnouncementCategory } from "@/types/announcement";

const CATEGORY_BADGE: Record<AnnouncementCategory, { label: string; tone: "primary" | "danger" }> = {
  informasi: { label: "Informasi", tone: "primary" },
  pemberitahuan: { label: "Pemberitahuan", tone: "danger" },
};

export interface LatestAnnouncementsCardProps {
  announcements: Announcement[];
  allHref: string;
  className?: string;
}

export function LatestAnnouncementsCard({ announcements, allHref, className = "" }: LatestAnnouncementsCardProps) {
  return (
    <Card as="section" aria-labelledby="latest-announcements-title" className={`flex flex-col gap-2 p-3 ${className}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Image src="/icons/announcement.svg" alt="" width={20} height={20} />
          <h2 id="latest-announcements-title" className="text-[13px] font-medium">
            Pengumuman
          </h2>
        </div>
        <Link
          href={allHref}
          className="-my-3 inline-flex min-h-11 items-center gap-1.5 text-[11px] text-primary underline-offset-4 hover:underline"
        >
          Lihat semua
          <Image src="/icons/chevron-right-all.svg" alt="" width={4} height={6} />
        </Link>
      </div>

      {announcements.length === 0 ? (
        <p className="py-8 text-center text-xs text-muted">Belum ada pengumuman. Pengumuman dari admin akan muncul di sini.</p>
      ) : (
        <ul>
          {announcements.map((announcement) => {
            const badge = CATEGORY_BADGE[announcement.category];
            return (
              <li key={announcement.id} className="border-b border-border px-2 py-2">
                <article className="flex flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-[13px] leading-5 font-semibold tracking-[0.05em] text-primary">{announcement.title}</h3>
                    <Badge tone={badge.tone} className="min-w-24">
                      {badge.label}
                    </Badge>
                  </div>
                  <p className={`text-xs tracking-[0.06em] ${announcement.quote ? "" : "line-clamp-3"}`}>{announcement.body}</p>
                  {announcement.quote && (
                    <blockquote className="line-clamp-3 rounded-sm bg-neutral-soft px-2 py-1 text-xs">{announcement.quote}</blockquote>
                  )}
                  <p className="flex flex-wrap gap-x-4 text-[11px] tracking-[0.06em] text-muted">
                    <span>
                      Oleh <span className="font-semibold">{announcement.authorName}</span>
                    </span>
                    <time dateTime={announcement.publishedAt}>{formatDateTimeShortWIB(announcement.publishedAt)}</time>
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
