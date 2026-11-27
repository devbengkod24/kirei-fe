"use client";

import { RoomColumnLabel, RoomLabel } from "@/shared/room-grid/RoomGridHeaders";
import type { TimeSlot } from "@/shared/reservation-form/sportsHallSlots";
import type { FloorPlanRoom } from "@/types/facility";
import type { ReservationRecord } from "@/types/reservation";
import type { ClassSchedule } from "@/types/schedule";
import { buildTimeline, segmentSpan, toMinutes } from "./slots";
import { itemKey, type TimelineItem } from "./timelineDetail";

/** A room row on the calendar; any page's rooms fit, not only the operator's floor. */
export type TimelineRoom = Pick<FloorPlanRoom, "id" | "code" | "category">;

export interface FloorTimelineProps {
  /** One horizontal row per room, in this order. */
  rooms: TimelineRoom[];
  /** The WIB day shown, "YYYY-MM-DD". */
  dateKey: string;
  /** WIB "HH:mm" bounds of the hours shown; the page owns the filter. */
  from: string;
  to: string;
  /** Kept optional for caller compatibility; current-time indicator line is intentionally omitted. */
  now?: Date;
  /** Events are matched to a row by `unitName` and to the day by `startsAt`. */
  reservations: ReservationRecord[];
  schedules: ClassSchedule[];
  /** itemKey of the event whose detail popover is open. */
  activeKey: string | null;
  /** Opens the detail popover beside the clicked event, which sits inside the scrolling `container`. */
  onOpen: (item: TimelineItem, anchor: HTMLElement, container: HTMLElement) => void;
  /** Turns free gaps into clickable "create a reservation" areas; without it, empty grid cells stay clean. */
  onCreate?: (roomId: string, range: TimeSlot) => void;
}

// 2.4px per minute = 144px per hour (1 SKS 50m = 120px, 3 SKS 150m = 360px), smooth horizontal scroll across hours.
const PX_PER_MINUTE = 2.4;
const ROOM_COL_PX = 88;
const END_PAD_PX = 36;
const ROW_HEIGHT_PX = 76;

const LEGEND = [
  { label: "Jadwal Siadin", className: "border-warning/40 border-l-[3px] border-l-warning-strong bg-warning-soft" },
  { label: "Reservasi", className: "border-primary/30 border-l-[3px] border-l-primary bg-primary-soft" },
];

const pad = (value: number) => String(value).padStart(2, "0");
const displayTime = (time: string) => time.replace(":", ".");
const rangeLabel = (segment: TimeSlot) => `${displayTime(segment.start)} - ${displayTime(segment.end)}`;
const px = (minutes: number) => minutes * PX_PER_MINUTE;

function buildHourGrid(from: string, to: string) {
  const startMin = toMinutes(from);
  const endMin = toMinutes(to);
  const lines: { offset: number; label: string | null; major: boolean }[] = [];
  for (let minute = startMin; minute <= endMin; minute += 30) {
    const major = minute % 60 === 0;
    lines.push({
      offset: minute - startMin,
      label: major ? `${pad(Math.floor(minute / 60))}.${pad(minute % 60)}` : null,
      major,
    });
  }
  return lines;
}

/**
 * Google Calendar-style horizontal multi-room grid: sticky room column on the left, sticky WIB
 * hour axis across the top (scroll right to inspect later hours), and clean event cards per room.
 */
export function FloorTimeline({
  rooms,
  dateKey,
  from,
  to,
  reservations,
  schedules,
  activeKey,
  onOpen,
  onCreate,
}: FloorTimelineProps) {
  const totalMinutes = Math.max(60, toMinutes(to) - toMinutes(from));
  const timelineWidth = px(totalMinutes);
  const gridLines = buildHourGrid(from, to);

  const openPopover = (item: TimelineItem) => (event: React.MouseEvent<HTMLButtonElement>) => {
    const container = event.currentTarget.closest<HTMLElement>("[data-timeline-scroller]");
    if (container) onOpen(item, event.currentTarget, container);
  };

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
        {onCreate && (
          <p className="text-[11px] text-muted">Klik area kosong di baris kelas untuk membuat reservasi.</p>
        )}
      </div>

      <div
        data-timeline-scroller
        className="max-h-[70vh] overflow-auto border-y border-border bg-surface"
      >
        <div
          className="relative"
          style={{ width: ROOM_COL_PX + timelineWidth + END_PAD_PX, minWidth: "100%" }}
        >
          {/* Sticky top time header row: scroll right to see later hours */}
          <div className="sticky top-0 z-30 flex h-11 border-b border-border bg-surface">
            <div
              style={{ width: ROOM_COL_PX }}
              className="sticky left-0 z-40 flex shrink-0 items-center border-r border-border bg-page px-3"
            >
              <RoomColumnLabel />
            </div>
            <div aria-hidden="true" className="relative flex-1" style={{ width: timelineWidth + END_PAD_PX }}>
              {gridLines.map((line) => (
                <div
                  key={line.offset}
                  className="absolute inset-y-0"
                  style={{ left: px(line.offset) }}
                >
                  <span
                    className={`absolute bottom-0 w-px ${line.major ? "h-2.5 bg-border" : "h-1.5 bg-border/60"}`}
                  />
                  {line.label && (
                    <span
                      className={`absolute top-2.5 text-[11px] leading-none whitespace-nowrap text-muted tabular-nums ${
                        line.offset === 0 ? "left-1.5" : "-translate-x-1/2"
                      }`}
                    >
                      {line.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Room rows: sticky room code on the left, horizontal schedule track on the right */}
          <div
            role="region"
            aria-label={`Kalender jadwal kelas, ${displayTime(from)} - ${displayTime(to)} WIB`}
          >
            {rooms.map((room) => {
              const segments = buildTimeline(dateKey, room.code, from, to, reservations, schedules);
              return (
                <div
                  key={room.id}
                  style={{ height: ROW_HEIGHT_PX }}
                  className="flex border-b border-border last:border-b-0"
                >
                  {/* Sticky left room label */}
                  <div
                    style={{ width: ROOM_COL_PX }}
                    className="sticky left-0 z-20 flex shrink-0 items-center border-r border-border bg-surface px-3 text-ink"
                  >
                    <RoomLabel code={room.code} category={room.category} />
                  </div>

                  {/* Horizontal calendar track */}
                  <div
                    aria-label={`Jadwal ${room.code}`}
                    className="relative flex-1"
                    style={{ width: timelineWidth + END_PAD_PX }}
                  >
                    {/* Vertical hour and half-hour gridlines */}
                    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                      {gridLines.map((line) => (
                        <div
                          key={line.offset}
                          className={`absolute inset-y-0 border-l ${
                            line.major ? "border-border" : "border-dashed border-border/50"
                          }`}
                          style={{ left: px(line.offset) }}
                        />
                      ))}
                    </div>

                    {segments.map((segment) => {
                      const span = segmentSpan(segment, from);
                      const left = px(span.offset) + 2;
                      const width = Math.max(px(span.length) - 4, 36);
                      const range = rangeLabel(segment);
                      const showDetail = width >= 110;
                      const showTime = width >= 72;
                      const activeRing = "ring-2 ring-primary ring-offset-1";

                      if (segment.kind === "siadin") {
                        const { courseName, lecturerName, classGroup } = segment.schedule;
                        const item: TimelineItem = { kind: "siadin", schedule: segment.schedule };
                        const active = itemKey(item) === activeKey;
                        const meta = classGroup ? `${lecturerName} · ${classGroup}` : lecturerName;

                        return (
                          <button
                            key={`siadin-${segment.schedule.id}`}
                            type="button"
                            onClick={openPopover(item)}
                            aria-haspopup="dialog"
                            aria-expanded={active}
                            aria-label={`${room.code}, Jadwal Siadin ${range} WIB: ${courseName}, ${meta}. Lihat detail`}
                            title={`${courseName} (${range} WIB) - ${meta}`}
                            style={{ left, width }}
                            className={`absolute inset-y-1.5 z-10 flex cursor-pointer flex-col justify-center overflow-hidden rounded-md border border-warning/30 border-l-[3px] border-l-warning-strong bg-warning-soft/80 px-2.5 py-1 text-left transition-colors hover:bg-warning-soft ${
                              active ? activeRing : ""
                            }`}
                          >
                            <span className="truncate text-xs font-semibold leading-tight text-ink">
                              {courseName}
                            </span>
                            {showTime && (
                              <span className="truncate text-[11px] leading-tight text-muted tabular-nums">
                                {range} WIB
                              </span>
                            )}
                            {showDetail && (
                              <span className="truncate text-[11px] leading-tight text-muted">
                                {meta}
                              </span>
                            )}
                          </button>
                        );
                      }

                      if (segment.kind === "reservasi") {
                        const { reservation } = segment;
                        const item: TimelineItem = { kind: "reservasi", reservation };
                        const active = itemKey(item) === activeKey;

                        return (
                          <button
                            key={`reservasi-${reservation.id}`}
                            type="button"
                            onClick={openPopover(item)}
                            aria-haspopup="dialog"
                            aria-expanded={active}
                            aria-label={`${room.code}, reservasi ${range} WIB oleh ${reservation.bookerName}. Lihat detail`}
                            title={`${reservation.bookerName} (${range} WIB) - ${reservation.purpose}`}
                            style={{ left, width }}
                            className={`absolute inset-y-1.5 z-10 flex cursor-pointer flex-col justify-center overflow-hidden rounded-md border border-primary/25 border-l-[3px] border-l-primary bg-primary-soft px-2.5 py-1 text-left transition-colors hover:bg-primary-tint ${
                              active ? activeRing : ""
                            }`}
                          >
                            <span className="truncate text-xs font-semibold leading-tight text-ink">
                              {reservation.bookerName}
                            </span>
                            {showTime && (
                              <span className="truncate text-[11px] leading-tight text-muted tabular-nums">
                                {range} WIB
                              </span>
                            )}
                            {showDetail && (
                              <span className="truncate text-[11px] leading-tight text-muted">
                                {reservation.purpose}
                              </span>
                            )}
                          </button>
                        );
                      }

                      // Free gap: clickable on Operator page, clean empty grid on read-only views.
                      if (!onCreate) return null;
                      return (
                        <button
                          key={`free-${segment.start}`}
                          type="button"
                          onClick={() => onCreate(room.id, { start: segment.start, end: segment.end })}
                          aria-label={`${room.code} kosong ${range} WIB. Buat reservasi`}
                          title={`Buat reservasi ${room.code} (${range} WIB)`}
                          style={{ left, width }}
                          className="absolute inset-y-1.5 flex cursor-pointer items-center justify-center rounded-md border border-transparent text-[11px] text-transparent transition-colors hover:border-dashed hover:border-primary/50 hover:bg-primary-soft/60 hover:text-primary focus-visible:border-dashed focus-visible:border-primary focus-visible:bg-primary-soft/60 focus-visible:text-primary"
                        >
                          <span className="truncate px-1 font-medium">+ Buat reservasi</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
