"use client";

import Image from "next/image";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pagination } from "@/components/ui/Pagination";
import { Popover } from "@/components/ui/Popover";
import { usePagination } from "@/hooks/usePagination";
import { formatRelativeDayWIB, formatTimeWIB } from "@/lib/date";
import { FILTER_BUTTON } from "@/shared/reports/UserReportList";
import type { Announcement } from "@/types/announcement";
import { ANNOUNCEMENT_CATEGORY } from "./announcement-labels";
import { AnnouncementFilterForm } from "./AnnouncementFilterForm";
import { CreateAnnouncementDialog } from "./CreateAnnouncementDialog";
import { DEFAULT_ANNOUNCEMENT_FILTER, filterAnnouncements, isDefaultAnnouncementFilter } from "./filterAnnouncements";

export type AnnouncementManagerProps = {
  announcements: Announcement[];
  loadedAt: string;
} & (
  | {
      /** Shows "Tambah Pengumuman"; borrowers only read. */
      canManage: true;
      /** Name shown as the author of announcements created here. */
      authorName: string;
    }
  | { canManage?: false; authorName?: never }
);

/** Announcement list with filter; admins also get a "Tambah Pengumuman" form. */
export function AnnouncementManager({ announcements: initial, loadedAt, canManage, authorName }: AnnouncementManagerProps) {
  const [announcements, setAnnouncements] = useState(initial);
  const [filter, setFilter] = useState(DEFAULT_ANNOUNCEMENT_FILTER);
  const [filterOpen, setFilterOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [notice, setNotice] = useState("");
  const visible = filterAnnouncements(announcements, filter, loadedAt);
  const paging = usePagination(visible, 10);
  const filtered = !isDefaultAnnouncementFilter(filter);
  const authors = [...new Set(announcements.map((announcement) => announcement.authorName))];

  return (
    <Card as="section" aria-labelledby="announcements-title" className="flex flex-col gap-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="announcements-title" className="text-base font-semibold tracking-[0.05em]">
          Pengumuman
        </h2>
        <div className="flex flex-wrap gap-2">
          <Popover
            open={filterOpen}
            onOpenChange={setFilterOpen}
            label="Filter pengumuman"
            triggerClassName={FILTER_BUTTON}
            trigger={
              <>
                <Image src="/icons/admin/filter.svg" alt="" width={14} height={14} />
                Filter{filtered && <span className="sr-only"> (aktif)</span>}
                {filtered && <span aria-hidden="true" className="ml-1 rounded-sm bg-surface px-1 text-[10px] text-primary">aktif</span>}
              </>
            }
          >
            <AnnouncementFilterForm
              value={filter}
              authors={authors}
              onApply={(next) => {
                setFilter(next);
                paging.setPage(1);
                setFilterOpen(false);
              }}
            />
          </Popover>
          {canManage && (
            <button type="button" onClick={() => setCreating(true)} className={FILTER_BUTTON}>
              <Image src="/icons/admin/plus.svg" alt="" width={14} height={14} />
              Tambah Pengumuman
            </button>
          )}
        </div>
      </div>

      <p role="status" className={notice ? "-mt-3 text-sm text-success" : "sr-only"}>
        {notice}
      </p>

      {visible.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-12 text-center">
          <p className="text-sm text-muted">
            {announcements.length > 0
              ? "Tidak ada pengumuman yang cocok dengan filter."
              : canManage
                ? "Belum ada pengumuman. Pengumuman yang Anda buat akan tampil di dashboard peminjam."
                : "Belum ada pengumuman."}
          </p>
          {filtered && (
            <Button variant="outline" onClick={() => setFilter(DEFAULT_ANNOUNCEMENT_FILTER)}>
              Hapus filter
            </Button>
          )}
        </div>
      ) : (
        <ul className="flex flex-col gap-6">
          {paging.items.map((announcement) => {
            const badge = ANNOUNCEMENT_CATEGORY[announcement.category];
            return (
              <li key={announcement.id} className="flex flex-col gap-2 sm:flex-row sm:gap-4">
                <div className="flex shrink-0 items-center gap-3 sm:w-[112px] sm:flex-col sm:items-start sm:gap-2 sm:border-r sm:border-border sm:pr-4">
                  <p className="flex gap-1 text-[10px] font-medium text-muted sm:flex-col sm:gap-0">
                    <span>{formatRelativeDayWIB(announcement.publishedAt, loadedAt)}</span>
                    <time dateTime={announcement.publishedAt}>{formatTimeWIB(announcement.publishedAt)} WIB</time>
                  </p>
                  <Badge tone={badge.tone} className="text-[10px]">
                    {badge.label}
                  </Badge>
                </div>
                <article className="flex min-w-0 flex-1 flex-col gap-2 text-xs text-muted">
                  <h3 className="font-semibold text-primary">{announcement.title}</h3>
                  <p>{announcement.body}</p>
                  {announcement.quote && <blockquote className="rounded-sm bg-neutral-soft p-2">{announcement.quote}</blockquote>}
                  <p className="text-[10px]">
                    Oleh <span className="font-semibold">{announcement.authorName}</span>
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      )}

      <Pagination
        page={paging.page}
        pageCount={paging.pageCount}
        pageSize={paging.pageSize}
        onPageChange={paging.setPage}
        onPageSizeChange={paging.setPageSize}
      />

      {canManage && creating && (
        <CreateAnnouncementDialog
          onClose={() => setCreating(false)}
          onCreate={(created) => {
            setAnnouncements((current) => [
              { id: `ann-new-${Date.now()}`, ...created, authorName, publishedAt: new Date().toISOString() },
              ...current,
            ]);
            setCreating(false);
            setNotice(`Pengumuman "${created.title}" diterbitkan.`);
          }}
        />
      )}
    </Card>
  );
}
