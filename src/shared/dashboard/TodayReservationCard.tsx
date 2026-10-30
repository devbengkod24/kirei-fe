import React from "react";
import { ReservationItem } from "@/types/dashboard";

export interface TodayReservationCardProps {
  reservation?: ReservationItem | null;
  onViewDetail?: (reservationId: string) => void;
}

export function TodayReservationCard({
  reservation,
  onViewDetail,
}: TodayReservationCardProps) {
  return (
    <div className="bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)]">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-3 border-b border-[var(--border-subtle)] mb-4">
        <span className="text-[var(--text-primary)]" aria-hidden="true">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
        </span>
        <h3 className="text-base font-bold text-[var(--text-primary)] leading-none">Reservasi</h3>
      </div>

      {reservation ? (
        <div className="space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div>
              <span className="text-xs text-[var(--text-muted)] italic block">Hari ini</span>
              <span className="text-base font-extrabold text-[var(--brand-primary)] block mt-0.5">
                {reservation.dateLabel}
              </span>
            </div>

            {/* Location tags */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-md)] bg-[var(--surface-muted)] text-[var(--text-primary)] text-xs font-medium border border-[var(--border-subtle)]">
                <svg className="w-3.5 h-3.5 text-[var(--text-secondary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {reservation.buildingName}
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[var(--radius-md)] bg-[var(--surface-muted)] text-[var(--text-primary)] text-xs font-medium border border-[var(--border-subtle)]">
                <svg className="w-3.5 h-3.5 text-[var(--text-secondary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {reservation.roomName}
              </span>
            </div>
          </div>

          {/* Time range */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] font-medium">
              <svg className="w-4 h-4 text-[var(--text-muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
              </svg>
              <span>{reservation.timeRangeLabel}</span>
            </div>

            <button
              type="button"
              onClick={() => onViewDetail?.(reservation.id)}
              className="text-xs md:text-sm font-semibold text-[var(--brand-secondary)] hover:text-[var(--brand-primary)] hover:underline inline-flex items-center gap-1 py-1 focus-visible:outline-2"
            >
              <span>Lihat detail</span>
              <span aria-hidden="true">&gt;</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="py-6 text-center">
          <p className="text-sm text-[var(--text-muted)]">Tidak ada reservasi aktif untuk hari ini.</p>
          <a
            href="/reservasi/baru"
            className="mt-2 inline-block text-xs font-semibold text-[var(--brand-secondary)] hover:underline"
          >
            Buat reservasi baru &gt;
          </a>
        </div>
      )}
    </div>
  );
}

