import React from "react";
import { Badge } from "@/components/ui/Badge";
import { AnnouncementItem } from "@/types/dashboard";

export interface AnnouncementsCardProps {
  announcements: AnnouncementItem[];
  onViewAll?: () => void;
}

export function AnnouncementsCard({
  announcements,
  onViewAll,
}: AnnouncementsCardProps) {
  return (
    <div className="bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-3">
        <div className="flex items-center gap-2">
          <span className="text-[var(--text-primary)]" aria-hidden="true">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
              />
            </svg>
          </span>
          <h3 className="text-base font-bold text-[var(--text-primary)]">Pengumuman</h3>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="text-xs font-semibold text-[var(--brand-secondary)] hover:text-[var(--brand-primary)] hover:underline inline-flex items-center gap-1 focus-visible:outline-2"
        >
          <span>Lihat semua</span>
          <span aria-hidden="true">&gt;</span>
        </button>
      </div>

      {/* Announcements List */}
      <div className="divide-y divide-[var(--border-subtle)]">
        {announcements.map((item) => (
          <article key={item.id} className="py-3.5 first:pt-1 last:pb-1">
            {/* Title & Badge */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <h4 className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--brand-primary)] transition-colors">
                {item.title}
              </h4>
              <Badge variant={item.category === "informasi" ? "info" : "danger"}>
                {item.categoryLabel}
              </Badge>
            </div>

            {/* Content or cancellation reason */}
            {item.cancellationReason ? (
              <div className="space-y-2 mt-1">
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                  {item.content}
                </p>
                <div className="p-2.5 rounded-[var(--radius-md)] bg-slate-100/90 border border-slate-200/80 text-xs text-slate-700 leading-relaxed">
                  {item.cancellationReason}
                </div>
              </div>
            ) : (
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 mt-1">
                {item.content}
              </p>
            )}

            {/* Author and Date Meta */}
            <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] mt-2 pt-1">
              <span>Oleh {item.authorName}</span>
              <time dateTime={item.publishedAt}>{item.publishedAt}</time>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

