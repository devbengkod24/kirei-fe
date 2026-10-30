"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { monthName, toWibDateKey } from "@/lib/date";
import { buildMonthGrid, monthOfKey, monthRange, type CalendarCell } from "./calendar";

const WEEKDAYS = [
  { short: "Mo", long: "Senin" },
  { short: "Tu", long: "Selasa" },
  { short: "We", long: "Rabu" },
  { short: "Th", long: "Kamis" },
  { short: "Fri", long: "Jumat" },
  { short: "Sa", long: "Sabtu" },
  { short: "Su", long: "Minggu" },
];

const MONTHS_BACK = 6;
const MONTHS_AHEAD = 5;

const MARKER_LABEL = {
  past: "ada reservasi yang sudah lewat",
  upcoming: "ada reservasi mendatang",
} as const;

export interface ReservationLogCalendarProps {
  todayKey: string;
  /** ISO start times of the user's reservations */
  reservationStarts: string[];
  className?: string;
}

function cellClass(cell: CalendarCell) {
  if (!cell.inMonth) return "text-ink/40";
  if (cell.marker === "past") return "bg-calendar-past font-medium text-muted";
  if (cell.marker === "upcoming") return "bg-primary-soft font-medium text-primary";
  if (cell.isToday) return "font-semibold text-ink";
  return "text-ink";
}

export function ReservationLogCalendar({ todayKey, reservationStarts, className = "" }: ReservationLogCalendarProps) {
  const todayMonth = monthOfKey(todayKey);
  const options = monthRange(todayMonth, MONTHS_BACK, MONTHS_AHEAD);
  const [selected, setSelected] = useState(MONTHS_BACK);
  const month = options[selected];
  const weeks = buildMonthGrid(month, todayKey, reservationStarts.map(toWibDateKey));

  const labelOf = (option: typeof month) =>
    option.year === todayMonth.year ? monthName(option.monthIndex) : `${monthName(option.monthIndex)} ${option.year}`;

  return (
    <Card as="section" aria-labelledby="reservation-log-title" className={`flex flex-col gap-2.5 rounded-lg px-5 py-4 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-x-2">
        <div className="flex items-center gap-2.5">
          <Image src="/icons/calendar-log.svg" alt="" width={26} height={26} />
          <h2 id="reservation-log-title" className="text-[15px] font-medium whitespace-nowrap">
            Log Reservasi
          </h2>
        </div>
        <div className="relative">
          <label htmlFor="reservation-log-month" className="sr-only">
            Pilih bulan
          </label>
          <select
            id="reservation-log-month"
            value={selected}
            onChange={(event) => setSelected(Number(event.target.value))}
            className="min-h-11 appearance-none [field-sizing:content] rounded-md bg-transparent py-1 pr-8 pl-2.5 text-[15px] font-semibold text-primary hover:bg-primary-soft"
          >
            {options.map((option, index) => (
              <option key={`${option.year}-${option.monthIndex}`} value={index}>
                {labelOf(option)}
              </option>
            ))}
          </select>
          <Image
            src="/icons/chevron-down.svg"
            alt=""
            width={21}
            height={21}
            className="pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2"
          />
        </div>
      </div>

      <table className="w-full flex-1 table-fixed border-separate border-spacing-y-1 text-center">
        <caption className="sr-only">
          Kalender reservasi {labelOf(month)}. Abu-abu: reservasi yang sudah lewat. Biru: reservasi mendatang.
        </caption>
        <thead>
          <tr>
            {WEEKDAYS.map((weekday) => (
              <th key={weekday.short} scope="col" className="pb-1 font-brand text-[17px] font-semibold">
                <abbr title={weekday.long} className="no-underline">
                  {weekday.short}
                </abbr>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week) => (
            <tr key={week[0].dateKey}>
              {week.map((cell) => (
                <td key={cell.dateKey} className="p-0">
                  <span
                    className={`relative mx-auto flex size-[31px] items-center justify-center rounded-full text-[15px] ${cellClass(cell)}`}
                  >
                    <span aria-hidden="true">{cell.day}</span>
                    <span className="sr-only">
                      {cell.day} {monthName(Number(cell.dateKey.slice(5, 7)) - 1)}
                      {cell.isToday ? ", hari ini" : ""}
                      {cell.marker ? `, ${MARKER_LABEL[cell.marker]}` : ""}
                    </span>
                    {cell.isToday && (
                      <Image
                        src="/icons/today-dot.svg"
                        alt=""
                        width={5}
                        height={5}
                        className="absolute top-[26px] left-1/2 -translate-x-1/2"
                      />
                    )}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}
