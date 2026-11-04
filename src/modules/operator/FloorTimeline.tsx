"use client";

import { useEffect, useRef } from "react";
import { MaskIcon } from "@/components/ui/MaskIcon";
import type { TimeSlot } from "@/shared/reservation-form/sportsHallSlots";
import type { FloorPlanRoom } from "@/types/facility";
import type { ReservationRecord } from "@/types/reservation";
import type { ClassSchedule } from "@/types/schedule";
import { buildTimeline, nowOffset, rulerTicks, segmentSpan, toMinutes } from "./slots";
import { itemKey, type TimelineItem } from "./timelineDetail";

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
  /** itemKey of the clip whose detail popover is open. */
  activeKey: string | null;
  /** Opens the detail popover beside the clicked clip, which sits inside the scrolling `container`. */
  onOpen: (item: TimelineItem, anchor: HTMLElement, container: HTMLElement) => void;
  onCreate: (roomId: string, range: TimeSlot) => void;
}

// 10 minutes is 44px wide, the smallest touch target, so the shortest clip stays tappable.
const PX_PER_MINUTE = 4.4;
// Matches w-20 on the sticky room column.
const HEAD_PX = 80;
// Room for the last ruler label, which is centred on the end of the range.
const END_PAD_PX = 24;

const LEGEND = [
  { label: "Jadwal Siadin", className: "border-border border-l-[3px] border-l-warning-strong bg-surface" },
  { label: "Reservasi", className: "border-border border-l-[3px] border-l-primary bg-surface" },
  { label: "Berlangsung", className: "border-primary bg-primary-soft" },
  { label: "Kosong", className: "border-dashed border-muted" },
];

// Clips are white cards like a week calendar; the coloured left edge, icon, and type label tell them apart.
const CARD = "absolute inset-y-1.5 flex min-w-0 items-center gap-2 overflow-hidden rounded-lg border px-2 text-left";
const ACCENT = { siadin: "border-l-[3px] border-l-warning-strong", reservasi: "border-l-[3px] border-l-primary" } as const;
// Below this width only the title and time fit, so the icon and the detail are left out.
const ROOMY_PX = 120;

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
  activeKey,
  onOpen,
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

      <div ref={scrollerRef} data-timeline-scroller className="overflow-x-auto border-y border-border">
        <div className="relative" style={{ width: HEAD_PX + px(total) + END_PAD_PX }}>
          <div aria-hidden="true" className="flex h-10 border-b border-border">
            <div className="sticky left-0 z-20 w-20 shrink-0 border-r border-border bg-surface" />
            <div className="relative flex-1">
              {ticks.map((tick) => (
                <span
                  key={tick.offset}
                  className={`absolute bottom-0 w-px ${tick.label ? "h-2.5 bg-muted" : "h-1 bg-border"}`}
                  style={{ left: px(tick.offset) }}
                />
              ))}
              {ticks
                .filter((tick) => tick.label)
                .map((tick) => (
                  <span
                    key={tick.label}
                    className={`absolute top-2 text-[11px] leading-4 text-muted ${tick.offset === 0 ? "pl-1" : "-translate-x-1/2"}`}
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
                  <div className="relative h-[72px] flex-1 bg-page">
                    {ticks
                      .filter((tick) => tick.label && tick.offset > 0)
                      .map((tick) => (
                        <span key={tick.offset} aria-hidden="true" className="absolute inset-y-0 w-px bg-border" style={{ left: px(tick.offset) }} />
                      ))}
                    <ol aria-label={`Jadwal ${room.code}`} className="absolute inset-0">
                      {segments.map((segment) => {
                        const span = segmentSpan(segment, from);
                        const position = { left: px(span.offset) + 2, width: px(span.length) - 4 };
                        const roomy = position.width >= ROOMY_PX;
                        const range = rangeLabel(segment);
                        const ongoing = current !== null && span.offset <= current && current < span.offset + span.length;
                        const tone = ongoing ? "border-primary bg-primary-soft" : "border-border bg-surface shadow-xs";
                        const open = (item: TimelineItem) => (event: React.MouseEvent<HTMLButtonElement>) => {
                          const container = event.currentTarget.closest<HTMLElement>("[data-timeline-scroller]");
                          if (container) onOpen(item, event.currentTarget, container);
                        };
                        // The clip whose popover is open, like the selected card in a week calendar.
                        const activeRing = "border-primary ring-2 ring-primary ring-offset-1";

                        if (segment.kind === "siadin") {
                          const { courseName, lecturerName } = segment.schedule;
                          const item: TimelineItem = { kind: "siadin", schedule: segment.schedule };
                          const active = itemKey(item) === activeKey;
                          return (
                            <li key={`siadin-${segment.schedule.id}`} className="contents">
                              <button
                                type="button"
                                onClick={open(item)}
                                aria-haspopup="dialog"
                                aria-expanded={active}
                                aria-label={`${room.code}, Jadwal Siadin ${range}${ongoing ? ", sedang berlangsung" : ""}: ${courseName}, ${lecturerName}. Lihat detail`}
                                title={`${courseName}, ${lecturerName} (${range})`}
                                className={`${CARD} ${tone} ${ACCENT.siadin} transition-colors hover:bg-warning-soft ${active ? activeRing : ""}`}
                                style={position}
                              >
                                <ClipBody
                                  icon="/icons/notes.svg"
                                  iconClass="bg-warning-soft text-warning"
                                  title={courseName}
                                  range={range}
                                  kindLabel="Siadin"
                                  detail={lecturerName}
                                  ongoing={ongoing}
                                  roomy={roomy}
                                />
                              </button>
                            </li>
                          );
                        }

                        if (segment.kind === "reservasi") {
                          const { reservation } = segment;
                          const item: TimelineItem = { kind: "reservasi", reservation };
                          const active = itemKey(item) === activeKey;
                          return (
                            <li key={`reservasi-${reservation.id}`} className="contents">
                              <button
                                type="button"
                                onClick={open(item)}
                                aria-haspopup="dialog"
                                aria-expanded={active}
                                aria-label={`${room.code}, reservasi ${range} oleh ${reservation.bookerName}${ongoing ? ", sedang berlangsung" : ""}. Lihat detail`}
                                title={`${reservation.bookerName} (${range})`}
                                className={`${CARD} ${tone} ${ACCENT.reservasi} transition-colors hover:border-primary hover:bg-primary-soft ${
                                  active ? activeRing : ""
                                }`}
                                style={position}
                              >
                                <ClipBody
                                  icon="/icons/calendar-clock.svg"
                                  iconClass="bg-primary-soft text-primary"
                                  title={reservation.bookerName}
                                  range={range}
                                  kindLabel="Reservasi"
                                  detail={reservation.purpose}
                                  ongoing={ongoing}
                                  roomy={roomy}
                                />
                              </button>
                            </li>
                          );
                        }

                        const gapLabel = `${room.code} kosong ${range}`;
                        const free = `${CARD} justify-center gap-1 border-dashed border-border text-muted`;
                        return (
                          <li key={`free-${segment.start}`} className="contents">
                            {canCreate ? (
                              <button
                                type="button"
                                onClick={() => onCreate(room.id, { start: segment.start, end: segment.end })}
                                aria-label={`${gapLabel}. Buat reservasi`}
                                title={range}
                                className={`${free} transition-colors hover:border-primary hover:bg-primary-soft hover:text-primary`}
                                style={position}
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true" className="shrink-0">
                                  <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                                </svg>
                                <span className="truncate text-[11px]">Kosong</span>
                              </button>
                            ) : (
                              <span aria-label={gapLabel} className={`${free} text-[11px]`} style={position}>
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
              <span className="absolute top-7 bottom-0 left-0 w-px -translate-x-1/2 bg-primary" />
              <span className="absolute top-1.5 left-0 -translate-x-1/2 rounded-full bg-primary px-2 text-[11px] leading-5 font-semibold text-on-primary tabular-nums">
                {nowLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ClipBodyProps {
  icon: string;
  iconClass: string;
  title: string;
  range: string;
  /** "Siadin" or "Reservasi", always shown so the type does not rely on colour. */
  kindLabel: string;
  /** One short detail after the type, e.g. the lecturer or the purpose. */
  detail: string;
  ongoing: boolean;
  roomy: boolean;
}

/** Inside of a Siadin or reservation card: icon, bold title, time, and the type label. */
function ClipBody({ icon, iconClass, title, range, kindLabel, detail, ongoing, roomy }: ClipBodyProps) {
  return (
    <>
      {roomy && (
        <span className={`flex size-7 shrink-0 items-center justify-center rounded-md ${iconClass}`}>
          <MaskIcon src={icon} size={14} />
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="truncate text-xs font-semibold text-ink">{title}</span>
          {ongoing && roomy && (
            <span className="shrink-0 rounded-full bg-primary px-1.5 text-[10px] leading-4 font-medium text-on-primary">Berlangsung</span>
          )}
        </span>
        <span className="truncate text-[11px] text-muted">{range}</span>
        <span className="truncate text-[11px] text-muted">{roomy ? `${kindLabel} · ${detail}` : kindLabel}</span>
      </span>
    </>
  );
}
