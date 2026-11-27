"use client";

import { MaskIcon } from "@/components/ui/MaskIcon";
import { SKS_SLOTS } from "@/config/sks";
import type { FloorPlanRoom, UnitBooking } from "@/types/facility";
import type { RoomStatus } from "./availability";
import { ROOM_CATEGORY_SHORT } from "./labels";
import { buildRoomSksCells, pickSksSlotRange, slotInChosenRange } from "./roomCalendarSegments";

export interface RoomBookingCalendarProps {
  rooms: FloorPlanRoom[];
  bookings: UnitBooking[];
  dateKey: string;
  startTime: string;
  endTime: string;
  statuses: ReadonlyMap<string, { status: RoomStatus; selectable: boolean }>;
  selectedRoomId: string;
  onSelectRoom: (room: FloorPlanRoom) => void;
  onPickGap: (room: FloorPlanRoom, startTime: string, endTime: string) => void;
  onInspect: (room: FloorPlanRoom) => void;
  /** Grow to the parent's height (a flex column) instead of capping the table at 460px. */
  fill?: boolean;
  /** The "scroll right / click a free slot" hint next to the legend. */
  showHint?: boolean;
}

const LEGEND = [
  { label: "Dipilih", className: "border-plan-selected bg-plan-selected" },
  { label: "Jadwal Kuliah", className: "border-warning/40 border-l-[3px] border-l-warning-strong bg-warning-soft" },
  { label: "Dipesan", className: "border-danger/40 border-l-[3px] border-l-danger-strong bg-danger-soft" },
  { label: "Tersedia", className: "border-border bg-surface" },
];

const displayTime = (time: string) => time.replace(":", ".");

/**
 * Room-by-SKS-slot booking calendar: sticky room column on the left and 15 SKS slot columns
 * (`07.00-21.00 WIB` with campus breaks) across the top. Scroll right for later SKS slots and
 * click free cells to choose a room and time range.
 */
export function RoomBookingCalendar({
  rooms,
  bookings,
  dateKey,
  startTime,
  endTime,
  statuses,
  selectedRoomId,
  onSelectRoom,
  onPickGap,
  onInspect,
  fill = false,
  showHint = true,
}: RoomBookingCalendarProps) {
  return (
    <div className={`flex flex-col gap-2 ${fill ? "min-h-0 flex-1" : ""}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <ul aria-label="Keterangan warna kalender" className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
          {LEGEND.map((item) => (
            <li key={item.label} className="flex items-center gap-1.5">
              <span aria-hidden="true" className={`size-3 rounded-sm border ${item.className}`} />
              {item.label}
            </li>
          ))}
        </ul>
        {showHint && (
          <p className="text-[11px] text-muted">
            Geser ke kanan untuk slot SKS lain. Klik slot kosong untuk memilih ruangan dan rentang SKS.
          </p>
        )}
      </div>

      <div
        className={`overflow-auto rounded-lg border border-border bg-surface ${fill ? "min-h-60 flex-1 lg:min-h-0" : "max-h-[460px]"}`}
      >
        <table className="w-max min-w-full border-separate border-spacing-0 text-left">
          <caption className="sr-only">Kalender ketersediaan ruangan per slot SKS, 07.00 sampai 21.00 WIB</caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="sticky top-0 left-0 z-30 w-28 min-w-28 border-r border-b border-border bg-page px-3 py-2.5 text-left text-[11px] font-semibold text-primary"
              >
                <span className="flex items-center gap-1.5">
                  <MaskIcon src="/icons/classroom.svg" size={14} />
                  Kelas
                </span>
              </th>
              {SKS_SLOTS.map((slot) => (
                <th
                  key={slot.slot}
                  scope="col"
                  className={`sticky top-0 z-20 w-32 min-w-32 border-r border-b border-border bg-page px-2 py-2 text-center align-middle last:border-r-0 ${
                    slot.afterBreak ? "border-l-2 border-l-border" : ""
                  }`}
                >
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink tabular-nums">
                      <MaskIcon src="/icons/clock-outline.svg" size={11} className="text-primary" />
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
              const info = statuses.get(room.id) ?? { status: "available" as RoomStatus, selectable: true };
              const filtered = info.status === "filtered";
              const isSelectedRoom = room.id === selectedRoomId && info.selectable;
              const cells = buildRoomSksCells(room.id, bookings, dateKey);

              return (
                <tr key={room.id} className={filtered ? "opacity-45" : ""}>
                  <th
                    scope="row"
                    className="sticky left-0 z-20 w-28 min-w-28 border-r border-b border-border bg-surface p-0 align-stretch"
                  >
                    <button
                      type="button"
                      aria-pressed={isSelectedRoom}
                      onClick={() => (info.selectable ? onSelectRoom(room) : onInspect(room))}
                      className={`flex h-full min-h-[60px] w-full cursor-pointer flex-col items-start justify-center px-3 py-2 text-left transition-colors ${
                        isSelectedRoom
                          ? "bg-plan-selected text-on-primary"
                          : info.selectable
                            ? "bg-surface text-ink hover:bg-primary-soft"
                            : "bg-page text-muted hover:bg-danger-soft/40"
                      }`}
                    >
                      <span className="w-full truncate text-xs font-semibold leading-tight">{room.code}</span>
                      <span
                        className={`w-full truncate text-[10px] font-normal leading-tight ${
                          isSelectedRoom ? "text-on-primary/90" : "text-muted"
                        }`}
                      >
                        {ROOM_CATEGORY_SHORT[room.category]}
                      </span>
                    </button>
                  </th>

                  {cells.map((cell, index) => {
                    const { slot, booking } = cell;
                    const slotRange = `${displayTime(slot.start)} - ${displayTime(slot.end)}`;
                    const breakClass = slot.afterBreak ? "border-l-2 border-l-border" : "";
                    const inChosenTime = !filtered && slotInChosenRange(slot, startTime, endTime);

                    if (booking) {
                      const title = booking.isLecture
                        ? booking.label?.replace(/^jadwal kuliah\s+/i, "") || "Jadwal Kuliah"
                        : booking.label || "Dipesan";
                      return (
                        <td
                          key={slot.slot}
                          className={`border-r border-b border-border p-1 align-middle last:border-r-0 ${breakClass} ${
                            booking.isLecture ? "bg-warning-soft/30" : "bg-danger-soft/35"
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => onInspect(room)}
                            title={`${room.code}: ${title} (${slotRange} WIB)`}
                            aria-label={`${room.code} slot ${slot.slot} (${slotRange} WIB) terpakai: ${title}. Klik untuk detail`}
                            className={`flex min-h-12 w-full cursor-pointer flex-col justify-center overflow-hidden rounded-md border border-l-[3px] px-2 py-1 text-left transition-colors ${
                              booking.isLecture
                                ? "border-warning/35 border-l-warning-strong bg-surface text-ink hover:bg-warning-soft/50"
                                : "border-danger/35 border-l-danger-strong bg-surface text-danger hover:bg-danger-soft/60"
                            }`}
                          >
                            <span className="truncate text-[11px] font-semibold leading-tight">{title}</span>
                            <span className="truncate text-[10px] leading-tight text-muted tabular-nums">
                              {booking.isLecture ? "Kuliah" : "Dipesan"}
                            </span>
                          </button>
                        </td>
                      );
                    }

                    if (filtered) {
                      return (
                        <td
                          key={slot.slot}
                          className={`border-r border-b border-border bg-page/40 p-1 text-center align-middle last:border-r-0 ${breakClass}`}
                        >
                          <span aria-hidden="true" className="text-xs text-muted/60">
                            -
                          </span>
                        </td>
                      );
                    }

                    const isPickedCell = isSelectedRoom && inChosenTime;
                    const nextRange = pickSksSlotRange(cells, index, isSelectedRoom, startTime, endTime);

                    return (
                      <td
                        key={slot.slot}
                        className={`border-r border-b border-border p-1 align-middle last:border-r-0 ${breakClass} ${
                          inChosenTime ? "bg-primary-soft/65" : "bg-surface"
                        }`}
                      >
                        <button
                          type="button"
                          aria-pressed={isPickedCell}
                          // null: the only chosen slot was clicked, so the room is unselected
                          onClick={() =>
                            nextRange ? onPickGap(room, nextRange.startTime, nextRange.endTime) : onSelectRoom(room)
                          }
                          title={
                            nextRange
                              ? `Pilih ${room.code} (${displayTime(nextRange.startTime)} - ${displayTime(nextRange.endTime)} WIB)`
                              : `Batalkan pilihan ${room.code}`
                          }
                          aria-label={`${isPickedCell ? "Batalkan" : "Pilih"} ${room.code} slot ${slot.slot} (${slotRange} WIB)`}
                          className={`flex min-h-12 w-full cursor-pointer flex-col items-center justify-center rounded-md border px-1.5 py-1 text-center transition-colors ${
                            isPickedCell
                              ? "border-plan-selected bg-plan-selected text-on-primary"
                              : "border-transparent text-transparent hover:border-dashed hover:border-primary/60 hover:bg-primary-soft hover:text-primary focus-visible:border-dashed focus-visible:border-primary focus-visible:bg-primary-soft focus-visible:text-primary"
                          }`}
                        >
                          <span className="truncate text-[11px] font-medium leading-tight">
                            {isPickedCell ? "Dipilih" : `Pilih`}
                          </span>
                          {isPickedCell && (
                            <span className="truncate text-[10px] leading-tight text-on-primary/90 tabular-nums">
                              Slot {slot.slot}
                            </span>
                          )}
                        </button>
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
