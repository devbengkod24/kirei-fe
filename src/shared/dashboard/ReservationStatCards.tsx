import React from "react";

export interface ReservationStatCardsProps {
  totalReservations: number;
  totalPenalties: number;
  maxPenalties?: number;
}

export function ReservationStatCards({
  totalReservations,
  totalPenalties,
  maxPenalties = 3,
}: ReservationStatCardsProps) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {/* Total Reservasi Card */}
      <div className="bg-[var(--stat-blue-bg)] border border-[var(--stat-blue-border)] rounded-[var(--radius-lg)] p-4 flex items-center gap-3.5 shadow-xs">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-[var(--radius-md)] bg-blue-100/80 flex items-center justify-center text-[var(--stat-blue-icon)]"
          aria-hidden="true"
        >
          {/* Book / Notebook Icon */}
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <div className="min-w-0">
          <div className="text-2xl lg:text-3xl font-extrabold text-[var(--stat-blue-text)] leading-none">
            {totalReservations}
          </div>
          <div className="mt-1 text-xs font-medium text-[var(--text-secondary)] truncate">
            Total Reservasi
          </div>
        </div>
      </div>

      {/* Total Penalti Card */}
      <div className="bg-[var(--stat-amber-bg)] border border-[var(--stat-amber-border)] rounded-[var(--radius-lg)] p-4 flex items-center gap-3.5 shadow-xs">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-[var(--radius-md)] bg-amber-100/80 flex items-center justify-center text-[var(--stat-amber-icon)]"
          aria-hidden="true"
        >
          {/* Warning Triangle Icon */}
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <div className="min-w-0">
          <div className="text-2xl lg:text-3xl font-extrabold text-[var(--stat-amber-text)] leading-none">
            {totalPenalties}
            <span className="text-lg lg:text-xl font-bold text-amber-700/80">/{maxPenalties}</span>
          </div>
          <div className="mt-1 text-xs font-medium text-[var(--text-secondary)] truncate">
            Total Penalti
          </div>
        </div>
      </div>
    </div>
  );
}

