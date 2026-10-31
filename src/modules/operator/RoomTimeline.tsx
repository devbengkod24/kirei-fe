"use client";

import type { TimeSlot } from "@/shared/reservation-form/sportsHallSlots";
import type { ReservationRecord } from "@/types/reservation";
import { toMinutes, type TimelineSegment } from "./slots";

export interface RoomTimelineProps {
  roomCode: string;
  segments: TimelineSegment[];
  /** WIB "HH:mm" bounds of the filtered hours. */
  from: string;
  to: string;
  canCreate: boolean;
  activeReservationId: string | null;
  onOpenReservation: (reservation: ReservationRecord) => void;
  onCreate: (range: TimeSlot) => void;
}

// 10 minutes is 44px, the smallest touch target, so the shortest block is still tappable.
const PX_PER_MINUTE = 4.4;

const LEGEND = [
  { label: "Jadwal Siadin", className: "border-warning bg-warning-soft" },
  { label: "Reservasi", className: "border-primary bg-primary-soft" },
  { label: "Kosong", className: "border-dashed border-muted bg-surface" },
];

const displayTime = (time: string) => time.replace(":", ".");
const rangeLabel = (segment: TimeSlot) => `${displayTime(segment.start)} - ${displayTime(segment.end)} WIB`;

/** One room's day as blocks on a time axis: classes from Siadin, reservations from KIREI, and the free gaps. */
export function RoomTimeline({ roomCode, segments, from, to, canCreate, activeReservationId, onOpenReservation, onCreate }: RoomTimelineProps) {
  const origin = toMinutes(from);
  const end = toMinutes(to);
  const hours = Array.from({ length: Math.floor((end - origin) / 60) + 1 }, (_, index) => origin + index * 60);
  const offset = (time: string) => (toMinutes(time) - origin) * PX_PER_MINUTE;

  return (
    <div className="flex flex-col gap-3 px-4">
      <ul aria-label="Keterangan warna" className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
        {LEGEND.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            <span aria-hidden="true" className={`size-3 rounded-sm border ${item.className}`} />
            {item.label}
          </li>
        ))}
      </ul>

      <div className="flex py-2">
        <div aria-hidden="true" className="relative w-12 shrink-0" style={{ height: (end - origin) * PX_PER_MINUTE }}>
          {hours.map((minute) => (
            <span
              key={minute}
              className="absolute left-0 -translate-y-1/2 text-[11px] leading-none text-muted"
              style={{ top: (minute - origin) * PX_PER_MINUTE }}
            >
              {String(minute / 60).padStart(2, "0")}.00
            </span>
          ))}
        </div>

        <div className="relative min-w-0 flex-1" style={{ height: (end - origin) * PX_PER_MINUTE }}>
          {hours.map((minute) => (
            <div key={minute} aria-hidden="true" className="absolute inset-x-0 border-t border-border" style={{ top: (minute - origin) * PX_PER_MINUTE }} />
          ))}
          <ol aria-label={`Jadwal ${roomCode}, ${displayTime(from)} - ${displayTime(to)} WIB`} className="absolute inset-0">
            {segments.map((segment) => {
              const box = "absolute inset-x-1 flex flex-col justify-start overflow-hidden rounded-md border px-3 py-1.5 text-left text-xs";
              const position = { top: offset(segment.start) + 1, height: (toMinutes(segment.end) - toMinutes(segment.start)) * PX_PER_MINUTE - 2 };
              const range = rangeLabel(segment);

              if (segment.kind === "siadin") {
                const { courseName, lecturerName } = segment.schedule;
                return (
                  <li
                    key={`siadin-${segment.schedule.id}`}
                    className={`${box} border-warning bg-warning-soft text-warning`}
                    style={position}
                    aria-label={`Jadwal Siadin ${range}: ${courseName}, ${lecturerName}`}
                    title={`${courseName}, ${lecturerName}`}
                  >
                    <span className="truncate font-semibold">{courseName}</span>
                    <span className="truncate text-[11px]">Siadin · {range}</span>
                  </li>
                );
              }

              if (segment.kind === "reservasi") {
                const { reservation } = segment;
                return (
                  <li key={`reservasi-${reservation.id}`} className="contents">
                    <button
                      type="button"
                      onClick={() => onOpenReservation(reservation)}
                      aria-pressed={reservation.id === activeReservationId}
                      aria-label={`Reservasi ${range} oleh ${reservation.bookerName}. Lihat detail`}
                      className={`${box} border-primary bg-primary-soft text-primary transition-colors hover:bg-info-soft ${
                        reservation.id === activeReservationId ? "ring-2 ring-primary" : ""
                      }`}
                      style={position}
                    >
                      <span className="truncate font-semibold">{reservation.bookerName}</span>
                      <span className="truncate text-[11px]">Reservasi · {range}</span>
                    </button>
                  </li>
                );
              }

              const free = (
                <>
                  <span className="truncate">Kosong · {range}</span>
                  {canCreate && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" className="shrink-0">
                      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                    </svg>
                  )}
                </>
              );
              const freeBox = `${box} flex-row items-center justify-between gap-2 border-dashed py-0 border-border text-muted`;
              return (
                <li key={`free-${segment.start}`} className="contents">
                  {canCreate ? (
                    <button
                      type="button"
                      onClick={() => onCreate({ start: segment.start, end: segment.end })}
                      aria-label={`Kosong ${range}. Buat reservasi`}
                      className={`${freeBox} transition-colors hover:border-primary hover:bg-primary-soft hover:text-primary`}
                      style={position}
                    >
                      {free}
                    </button>
                  ) : (
                    <div className={freeBox} style={position}>
                      {free}
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
