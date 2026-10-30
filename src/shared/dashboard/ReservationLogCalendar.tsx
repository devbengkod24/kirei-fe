"use client";

import React, { useState } from "react";
import { CalendarDayItem } from "@/types/dashboard";

export interface ReservationLogCalendarProps {
  initialMonth?: string;
  onSelectDate?: (day: CalendarDayItem) => void;
}

export function ReservationLogCalendar({
  initialMonth = "April",
  onSelectDate,
}: ReservationLogCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(initialMonth);
  const [monthMenuOpen, setMonthMenuOpen] = useState(false);
  const [selectedDayNumber, setSelectedDayNumber] = useState<number>(29);

  // Month list for switching
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni"];

  // Days of week
  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  // Calendar dates matching the screenshot
  const days: CalendarDayItem[] = [
    // Week 1 (Mo-Su)
    { dateNumber: 29, isCurrentMonth: false },
    { dateNumber: 30, isCurrentMonth: false },
    { dateNumber: 31, isCurrentMonth: false },
    { dateNumber: 1, isCurrentMonth: true },
    { dateNumber: 2, isCurrentMonth: true },
    { dateNumber: 3, isCurrentMonth: true },
    { dateNumber: 4, isCurrentMonth: true },

    // Week 2
    { dateNumber: 5, isCurrentMonth: true },
    { dateNumber: 6, isCurrentMonth: true },
    { dateNumber: 7, isCurrentMonth: true },
    { dateNumber: 8, isCurrentMonth: true },
    { dateNumber: 9, isCurrentMonth: true },
    { dateNumber: 10, isCurrentMonth: true },
    { dateNumber: 11, isCurrentMonth: true },

    // Week 3
    { dateNumber: 12, isCurrentMonth: true },
    { dateNumber: 13, isCurrentMonth: true },
    { dateNumber: 14, isCurrentMonth: true },
    { dateNumber: 15, isCurrentMonth: true },
    { dateNumber: 16, isCurrentMonth: true },
    { dateNumber: 17, isCurrentMonth: true },
    { dateNumber: 18, isCurrentMonth: true, hasActivity: true },

    // Week 4
    { dateNumber: 19, isCurrentMonth: true },
    { dateNumber: 20, isCurrentMonth: true, hasActivity: true },
    { dateNumber: 21, isCurrentMonth: true, hasActivity: true },
    { dateNumber: 22, isCurrentMonth: true },
    { dateNumber: 23, isCurrentMonth: true },
    { dateNumber: 24, isCurrentMonth: true },
    { dateNumber: 25, isCurrentMonth: true },

    // Week 5
    { dateNumber: 26, isCurrentMonth: true },
    { dateNumber: 27, isCurrentMonth: true },
    { dateNumber: 28, isCurrentMonth: true, hasPenalty: true },
    { dateNumber: 29, isCurrentMonth: true, isSelected: true },
    { dateNumber: 30, isCurrentMonth: true, isUpcoming: true },
    { dateNumber: 1, isCurrentMonth: false },
    { dateNumber: 2, isCurrentMonth: false },
  ];

  const handleDayClick = (day: CalendarDayItem) => {
    if (day.isCurrentMonth) {
      setSelectedDayNumber(day.dateNumber);
      onSelectDate?.(day);
    }
  };

  return (
    <div className="bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-[var(--radius-lg)] p-5 shadow-[var(--shadow-card)] flex flex-col justify-between">
      {/* Calendar Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <span className="text-[var(--text-primary)]" aria-hidden="true">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </span>
          <h3 className="text-base font-bold text-[var(--text-primary)]">Log Reservasi</h3>
        </div>

        {/* Month Selector Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setMonthMenuOpen(!monthMenuOpen)}
            aria-expanded={monthMenuOpen}
            aria-haspopup="listbox"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[var(--radius-md)] text-sm font-semibold text-[var(--brand-primary)] hover:bg-[var(--surface-muted)] focus-visible:outline-2"
          >
            <span>{currentMonth}</span>
            <svg
              className={`w-4 h-4 transition-transform ${monthMenuOpen ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {monthMenuOpen && (
            <div
              role="listbox"
              className="absolute right-0 mt-1 w-36 bg-[var(--surface-card)] border border-[var(--border-subtle)] rounded-[var(--radius-md)] shadow-[var(--shadow-elevated)] z-30 py-1"
            >
              {months.map((m) => (
                <button
                  key={m}
                  type="button"
                  role="option"
                  aria-selected={m === currentMonth}
                  onClick={() => {
                    setCurrentMonth(m);
                    setMonthMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-medium hover:bg-[var(--surface-muted)] ${
                    m === currentMonth ? "text-[var(--brand-primary)] font-bold bg-blue-50/50" : "text-[var(--text-primary)]"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center py-3">
        {weekDays.map((d) => (
          <div key={d} className="text-xs font-bold text-[var(--text-primary)]">
            {d}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-y-2 gap-x-1 text-center">
        {days.map((day, idx) => {
          const isSelected = day.isCurrentMonth && selectedDayNumber === day.dateNumber;
          let cellStyle = "text-[var(--text-primary)] font-medium hover:bg-slate-100";

          if (!day.isCurrentMonth) {
            cellStyle = "text-slate-400 font-normal";
          } else if (isSelected) {
            cellStyle = "bg-[var(--brand-primary)] text-white font-bold shadow-xs";
          } else if (day.isUpcoming) {
            cellStyle = "border-2 border-[var(--brand-secondary)] text-[var(--brand-secondary)] font-bold";
          } else if (day.hasActivity) {
            cellStyle = "bg-slate-200/80 text-[var(--text-primary)] font-semibold";
          }

          return (
            <div key={`${day.dateNumber}-${idx}`} className="flex flex-col items-center justify-center">
              <button
                type="button"
                disabled={!day.isCurrentMonth}
                onClick={() => handleDayClick(day)}
                aria-label={`${day.dateNumber} ${currentMonth}${isSelected ? ", terpilih" : ""}`}
                className={`relative w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full text-xs md:text-sm transition-colors focus-visible:outline-2 ${cellStyle}`}
              >
                <span>{day.dateNumber}</span>
              </button>

              {/* Penalty indicator dot */}
              {day.isCurrentMonth && day.hasPenalty && (
                <span
                  className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-0.5"
                  title="Pernah terlambat / kena penalti"
                  aria-label="Catatan penalti"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

