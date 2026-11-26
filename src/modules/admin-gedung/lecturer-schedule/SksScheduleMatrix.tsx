"use client";

import { useMemo } from "react";
import { MaskIcon } from "@/components/ui/MaskIcon";
import { SKS_SLOTS, type SksSlot } from "@/config/sks";
import type { TimelineRoom } from "@/shared/floor-timeline/FloorTimeline";
import { itemKey, type TimelineItem } from "@/shared/floor-timeline/timelineDetail";
import type { ReservationRecord } from "@/types/reservation";
import type { ClassSchedule } from "@/types/schedule";
import { buildSksMatrix } from "./sksMatrix";

export interface SksScheduleMatrixProps {
  rooms: TimelineRoom[];
  dateKey: string;
  reservations: ReservationRecord[];
  schedules: ClassSchedule[];
  activeKey: string | null;
  onOpen: (item: TimelineItem, anchor: HTMLElement, container: HTMLElement) => void;
}

const LEGEND = [
  { label: "Jadwal Siadin", className: "border-warning/40 border-l-[3px] border-l-warning-strong bg-warning-soft" },
  { label: "Reservasi", className: "border-primary/30 border-l-[3px] border-l-primary bg-primary-soft" },
];

const displayTime = (time: string) => time.replace(":", ".");

function SlotCard({
  item,
  roomCode,
  slot,
  active,
  onOpen,
}: {
  item: TimelineItem;
  roomCode: string;
  slot: SksSlot;
  active: boolean;
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const slotRange = `${displayTime(slot.start)} - ${displayTime(slot.end)} WIB`;
  const activeRing = active ? "ring-2 ring-primary ring-offset-1" : "";

  if (item.kind === "siadin") {
    const { courseName, lecturerName, classGroup, sksCount } = item.schedule;
    return (
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        aria-expanded={active}
        aria-label={`${roomCode} slot ${slot.slot} (${slotRange}), ${courseName}${classGroup ? `, ${classGroup}` : ""}, ${lecturerName}. Lihat detail`}
        title={`${courseName} (${slotRange}) - ${lecturerName}`}
        className={`flex min-h-11 w-full cursor-pointer flex-col gap-1.5 rounded-md border border-warning/35 border-l-[3px] border-l-warning-strong bg-surface p-2 text-left transition-colors hover:bg-warning-soft/45 ${activeRing}`}
      >
        <span className="line-clamp-2 text-xs font-semibold leading-snug text-primary">{courseName}</span>
        {classGroup && (
          <span className="inline-flex w-fit max-w-full truncate rounded-sm border border-border bg-page px-1.5 py-0.5 text-[10px] font-medium text-ink">
            {classGroup}
          </span>
        )}
        <span className="truncate text-[11px] leading-tight text-muted">{lecturerName}</span>
        <span className="flex items-center justify-between gap-1 pt-0.5">
          <span className="rounded-sm bg-warning-soft px-1.5 py-0.5 text-[10px] font-medium text-ink">
            {sksCount ? `${sksCount} SKS · ${slot.session}` : slot.session}
          </span>
          <span className="text-[10px] font-medium text-primary">Detail</span>
        </span>
      </button>
    );
  }

  const { bookerName, purpose } = item.reservation;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-expanded={active}
      aria-label={`${roomCode} slot ${slot.slot} (${slotRange}), reservasi oleh ${bookerName}. Lihat detail`}
      title={`${bookerName} (${slotRange}) - ${purpose}`}
      className={`flex min-h-11 w-full cursor-pointer flex-col gap-1.5 rounded-md border border-primary/25 border-l-[3px] border-l-primary bg-surface p-2 text-left transition-colors hover:bg-primary-soft ${activeRing}`}
    >
      <span className="line-clamp-2 text-xs font-semibold leading-snug text-ink">{bookerName}</span>
      <span className="line-clamp-2 text-[11px] leading-tight text-muted">{purpose}</span>
      <span className="flex items-center justify-between gap-1 pt-0.5">
        <span className="rounded-sm bg-primary-soft px-1.5 py-0.5 text-[10px] font-medium text-primary">Reservasi</span>
        <span className="text-[10px] font-medium text-primary">Detail</span>
      </span>
    </button>
  );
}

/**
 * Room-by-SKS-slot schedule matrix for Kelola Jadwal: sticky room column on the left and 15
 * 50-minute SKS slot columns (07.00-21.00 WIB with campus breaks) across the top, styled with
 * KIREI design tokens.
 */
export function SksScheduleMatrix({ rooms, dateKey, reservations, schedules, activeKey, onOpen }: SksScheduleMatrixProps) {
  const roomCodes = useMemo(() => rooms.map((room) => room.code), [rooms]);
  const matrix = useMemo(
    () => buildSksMatrix(roomCodes, dateKey, schedules, reservations),
    [roomCodes, dateKey, schedules, reservations],
  );

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
        <p className="text-[11px] text-muted">Geser ke kanan untuk melihat slot SKS lainnya. Klik kartu untuk detail.</p>
      </div>

      <div data-timeline-scroller className="max-h-[70vh] overflow-auto border-y border-border bg-surface">
        <table className="w-max min-w-full border-separate border-spacing-0 text-left">
          <caption className="sr-only">Matriks jadwal ruangan per slot SKS, 07.00 sampai 21.00 WIB</caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky top-0 left-0 z-30 w-28 min-w-28 border-r border-b border-border bg-page px-3 py-2.5 text-[11px] font-semibold text-primary"
              >
                <span className="flex items-center gap-1.5">
                  <MaskIcon src="/icons/classroom.svg" size={14} />
                  Ruang
                </span>
              </th>
              {SKS_SLOTS.map((slot) => (
                <th
                  key={slot.slot}
                  scope="col"
                  className={`sticky top-0 z-20 w-40 min-w-40 border-r border-b border-border bg-page px-2 py-2 text-center align-middle last:border-r-0 ${
                    slot.afterBreak ? "border-l-2 border-l-border" : ""
                  }`}
                >
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink tabular-nums">
                      <MaskIcon src="/icons/clock-outline.svg" size={12} className="text-primary" />
                      {displayTime(slot.start)} - {displayTime(slot.end)}
                    </span>
                    <span className="text-[10px] font-normal text-muted">
                      Slot {slot.slot} · {slot.session}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rooms.map((room) => {
              const cells = matrix.get(room.code) ?? [];
              return (
                <tr key={room.id}>
                  <th
                    scope="row"
                    className="sticky left-0 z-10 w-28 min-w-28 border-r border-b border-border bg-surface px-3 py-3 align-middle"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="flex size-6 shrink-0 items-center justify-center rounded-sm bg-primary-soft text-primary"
                      >
                        <MaskIcon src="/icons/room.svg" size={13} />
                      </span>
                      <span className="truncate text-xs font-semibold text-ink">{room.code}</span>
                    </div>
                  </th>

                  {SKS_SLOTS.map((slot, index) => {
                    const items = cells[index] ?? [];
                    const breakClass = slot.afterBreak ? "border-l-2 border-l-border" : "";

                    if (items.length === 0) {
                      return (
                        <td
                          key={slot.slot}
                          className={`border-r border-b border-border bg-page/30 px-2 py-3 text-center align-middle last:border-r-0 ${breakClass}`}
                        >
                          <span aria-label="Kosong" className="text-xs text-muted/65">
                            -
                          </span>
                        </td>
                      );
                    }

                    const hasSiadin = items.some((entry) => entry.kind === "siadin");
                    return (
                      <td
                        key={slot.slot}
                        className={`border-r border-b border-border p-1.5 align-top last:border-r-0 ${breakClass} ${
                          hasSiadin ? "bg-warning-soft/30" : "bg-primary-soft/60"
                        }`}
                      >
                        <div className="flex flex-col gap-1.5">
                          {items.map((item) => {
                            const key = itemKey(item);
                            return (
                              <SlotCard
                                key={`${slot.slot}-${key}`}
                                item={item}
                                roomCode={room.code}
                                slot={slot}
                                active={key === activeKey}
                                onOpen={openPopover(item)}
                              />
                            );
                          })}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
