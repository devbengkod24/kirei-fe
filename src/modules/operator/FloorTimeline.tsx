"use client";

import { useEffect, useRef } from "react";
import type { TimeSlot } from "@/shared/reservation-form/sportsHallSlots";
import type { FloorPlanRoom } from "@/types/facility";
import type { ReservationRecord } from "@/types/reservation";
import type { ClassSchedule } from "@/types/schedule";
import { buildTimeline, nowOffset, rulerTicks, segmentSpan, toMinutes } from "./slots";

export interface FloorTimelineProps {
  rooms: FloorPlanRoom[];
  dateKey: string;
  /** WIB "HH:mm" bounds of the filtered hours. */
  from: string;
  to: string;
  now: Date;
  reservations: ReservationRecord[];
  schedules: ClassSchedule[];
  canCreate: boolean;
  activeReservationId: string | null;
  onOpenReservation: (reservation: ReservationRecord) => void;
  onCreate: (roomId: string, range: TimeSlot) => void;
}

// 10 minutes is 44px wide, the smallest touch target, so the shortest clip stays tappable.
const PX_PER_MINUTE = 4.4;
// Matches w-20 on the sticky room column.
const HEAD_PX = 80;
// Room for the last ruler label, which is centred on the end of the range.
const END_PAD_PX = 24;

const LEGEND = [
  { label: "Jadwal Siadin", className: "border-warning bg-warning-soft" },
  { label: "Reservasi", className: "border-primary bg-primary-soft" },
  { label: "Kosong", className: "border-dashed border-muted bg-surface" },
];

const displayTime = (time: string) => time.replace(":", ".");
const rangeLabel = (segment: TimeSlot) => `${displayTime(segment.start)} - ${displayTime(segment.end)} WIB`;
const px = (minutes: number) => minutes * PX_PER_MINUTE;

/** Every room on the floor as a track on one time axis, like a video editor: Siadin classes, reservations, and free gaps. */
export function FloorTimeline({
  rooms,
  dateKey,
  from,
  to,
  now,
  reservations,
  schedules,
  canCreate,
  activeReservationId,
  onOpenReservation,
  onCreate,
}: FloorTimelineProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const total = toMinutes(to) - toMinutes(from);
  const ticks = rulerTicks(from, to);
  const current = nowOffset(now, dateKey, from, to);
  const nowLabel = current === null ? null : `${String(Math.floor((toMinutes(from) + current) / 60)).padStart(2, "0")}.${String((toMinutes(from) + current) % 60).padStart(2, "0")}`;

  // Bring the "now" marker into view when the range changes; the operator mostly cares about what is happening now.
  useEffect(() => {
    if (scrollerRef.current) scrollerRef.current.scrollLeft = current === null ? 0 : Math.max(0, px(current) - 40);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only on range changes, not every minute tick
  }, [from, to]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4">
        <ul aria-label="Keterangan warna" className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
          {LEGEND.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span aria-hidden="true" className={`size-3 rounded-sm border ${item.className}`} />
              {item.label}
            </li>
          ))}
        </ul>
        {nowLabel && (
          <p className="flex items-center gap-1.5 text-[11px]">
            <span aria-hidden="true" className="h-3 w-0.5 bg-info" />
            Sekarang {nowLabel} WIB
          </p>
        )}
      </div>

      <div ref={scrollerRef} className="overflow-x-auto border-y border-border">
        <div className="relative" style={{ width: HEAD_PX + px(total) + END_PAD_PX }}>
          <div aria-hidden="true" className="flex h-10 border-b border-border">
            <div className="sticky left-0 z-20 w-20 shrink-0 border-r border-border bg-surface" />
            <div className="relative flex-1">
              {ticks.map((tick) => (
                <span
                  key={tick.offset}
                  className={`absolute bottom-0 w-px bg-muted ${tick.label ? "h-2.5" : "h-1.5"}`}
                  style={{ left: px(tick.offset) }}
                />
              ))}
              {ticks
                .filter((tick) => tick.label)
                .map((tick) => (
                  <span
                    key={tick.label}
                    className={`absolute top-1 rounded-sm border border-border bg-surface px-1.5 text-[11px] leading-4 text-ink ${
                      tick.offset === 0 ? "" : "-translate-x-1/2"
                    }`}
                    style={{ left: px(tick.offset) }}
                  >
                    {tick.label}
                  </span>
                ))}
            </div>
          </div>

          <ul aria-label={`Jadwal ruangan, ${displayTime(from)} - ${displayTime(to)} WIB`}>
            {rooms.map((room) => {
              const segments = buildTimeline(dateKey, room.code, from, to, reservations, schedules);
              return (
                <li key={room.id} className="flex border-b border-border last:border-b-0">
                  <div className="sticky left-0 z-20 flex w-20 shrink-0 items-center border-r border-border bg-surface px-2">
                    <span className="truncate rounded-md border border-border bg-surface px-2 py-1 text-xs font-semibold">{room.code}</span>
                  </div>
                  <div className="relative h-14 flex-1">
                    {ticks
                      .filter((tick) => tick.label && tick.offset > 0)
                      .map((tick) => (
                        <span key={tick.offset} aria-hidden="true" className="absolute inset-y-0 w-px bg-border" style={{ left: px(tick.offset) }} />
                      ))}
                    <ol aria-label={`Jadwal ${room.code}`} className="absolute inset-0">
                      {segments.map((segment) => {
                        const span = segmentSpan(segment, from);
                        const position = { left: px(span.offset) + 1, width: px(span.length) - 2 };
                        const clip = "absolute inset-y-1.5 flex min-w-0 flex-col justify-center overflow-hidden rounded-md border px-2 text-left";
                        const range = rangeLabel(segment);

                        if (segment.kind === "siadin") {
                          const { courseName, lecturerName } = segment.schedule;
                          return (
                            <li
                              key={`siadin-${segment.schedule.id}`}
                              aria-label={`${room.code}, Jadwal Siadin ${range}: ${courseName}, ${lecturerName}`}
                              title={`${courseName}, ${lecturerName} (${range})`}
                              className={`${clip} border-warning bg-warning-soft text-warning`}
                              style={position}
                            >
                              <span className="truncate text-xs font-semibold">{courseName}</span>
                              <span className="truncate text-[11px]">Siadin · {lecturerName}</span>
                            </li>
                          );
                        }

                        if (segment.kind === "reservasi") {
                          const { reservation } = segment;
                          const active = reservation.id === activeReservationId;
                          return (
                            <li key={`reservasi-${reservation.id}`} className="contents">
                              <button
                                type="button"
                                onClick={() => onOpenReservation(reservation)}
                                aria-pressed={active}
                                aria-label={`${room.code}, reservasi ${range} oleh ${reservation.bookerName}. Lihat detail`}
                                title={`${reservation.bookerName} (${range})`}
                                className={`${clip} border-primary bg-primary-soft text-primary transition-colors hover:bg-primary-tint ${
                                  active ? "ring-2 ring-primary ring-offset-1" : ""
                                }`}
                                style={position}
                              >
                                <span className="truncate text-xs font-semibold">{reservation.bookerName}</span>
                                <span className="truncate text-[11px]">Reservasi · {range}</span>
                              </button>
                            </li>
                          );
                        }

                        const gapLabel = `${room.code} kosong ${range}`;
                        return (
                          <li key={`free-${segment.start}`} className="contents">
                            {canCreate ? (
                              <button
                                type="button"
                                onClick={() => onCreate(room.id, { start: segment.start, end: segment.end })}
                                aria-label={`${gapLabel}. Buat reservasi`}
                                title={range}
                                className={`${clip} flex-row items-center gap-1 border-dashed border-border text-muted transition-colors hover:border-primary hover:bg-primary-soft hover:text-primary`}
                                style={position}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" className="shrink-0">
                                  <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                                </svg>
                                <span className="truncate text-[11px]">Kosong</span>
                              </button>
                            ) : (
                              <span aria-label={gapLabel} className={`${clip} border-dashed border-border text-[11px] text-muted`} style={position}>
                                <span className="truncate">Kosong</span>
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </li>
              );
            })}
          </ul>

          {current !== null && (
            // The playhead from video editors, used here as "now"; it moves once a minute, never animated.
            <div aria-hidden="true" className="pointer-events-none absolute top-0 bottom-0 z-10" style={{ left: HEAD_PX + px(current) }}>
              <span className="absolute top-1 left-0 h-3 w-2.5 -translate-x-1/2 rounded-b-sm bg-info" />
              <span className="absolute top-0 bottom-0 left-0 w-0.5 -translate-x-1/2 bg-info" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
