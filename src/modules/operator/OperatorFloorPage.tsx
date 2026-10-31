"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SelectInput } from "@/components/form/Field";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { MaskIcon } from "@/components/ui/MaskIcon";
import { formatTimeRangeWIB, toWibDateKey } from "@/lib/date";
import type { TimeSlot } from "@/shared/reservation-form/sportsHallSlots";
import type { ReservationRecord } from "@/types/reservation";
import { CreateReservationPanel } from "./CreateReservationPanel";
import type { OperatorFloorData } from "./getOperatorFloor";
import { deleteReservation } from "./operatorReservations";
import { ReservationDetailPanel } from "./ReservationDetailPanel";
import { defaultHourFilter, FILTER_HOURS, filterSlots, slotReservation } from "./slots";

const displayTime = (time: string) => time.replace(":", ".");

function EmptyState({ children }: { children: React.ReactNode }) {
  return <Card className="px-6 py-16 text-center text-sm text-muted">{children}</Card>;
}

/** Availability of every room on the operator's floor today, in 10-minute slots. */
export function OperatorFloorPage({ data }: { data: OperatorFloorData | null }) {
  if (!data) {
    return <EmptyState>Akun Anda belum ditugaskan ke lantai mana pun. Hubungi Admin Universitas untuk penugasan lantai.</EmptyState>;
  }
  if (data.floor.rooms.length === 0) {
    return (
      <EmptyState>
        Belum ada ruangan di {data.buildingName} lantai {data.floor.number}. Ruangan ditambahkan oleh Admin Universitas lewat Kelola
        Denah.
      </EmptyState>
    );
  }
  return <FloorAvailability data={data} />;
}

function FloorAvailability({ data }: { data: OperatorFloorData }) {
  const { floor, canCreate, canDelete } = data;
  const dateKey = toWibDateKey(data.now);
  const [roomId, setRoomId] = useState(floor.rooms[0].id);
  const [hours, setHours] = useState(() => defaultHourFilter(new Date(data.now)));
  const [reservations, setReservations] = useState(data.reservations);
  const [detailId, setDetailId] = useState<string | null>(null);
  // Times prefilled in the create form; null while the form is collapsed.
  const [draft, setDraft] = useState<TimeSlot | null>(null);
  const [notice, setNotice] = useState("");
  // Closing or deleting removes the focused panel, so focus returns to the slot section.
  const statusHeadingRef = useRef<HTMLHeadingElement>(null);
  const closeDetail = () => {
    setDetailId(null);
    statusHeadingRef.current?.focus();
  };

  const room = floor.rooms.find((item) => item.id === roomId) ?? floor.rooms[0];
  const slots = filterSlots(hours.from, hours.to);
  const detail = reservations.find((reservation) => reservation.id === detailId) ?? null;

  const openSlot = (slot: TimeSlot, reservation: ReservationRecord | null) => {
    setNotice("");
    if (reservation) setDetailId(reservation.id);
    else setDraft(slot);
  };

  const openCreate = () => {
    setNotice("");
    setDraft(slots.find((slot) => !slotReservation(dateKey, slot, room.code, reservations)) ?? { start: hours.from, end: hours.to });
  };

  const remove = async (reservation: ReservationRecord) => {
    const result = await deleteReservation(reservation.id);
    if (!result.ok) return result.message;
    setReservations((current) => current.filter((item) => item.id !== reservation.id));
    closeDetail();
    setNotice(`Reservasi ${reservation.unitName}, ${formatTimeRangeWIB(reservation.startsAt, reservation.endsAt)}, dihapus.`);
    return null;
  };

  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-xs font-medium text-primary">
        Ketersediaan {data.buildingName} lantai {floor.number}
      </h1>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <Card as="section" aria-labelledby="operator-rooms-title" className="flex flex-col gap-2 p-4">
            <h2 id="operator-rooms-title" className="flex items-center gap-1.5 text-xs font-medium text-primary">
              <Image src="/icons/classroom.svg" alt="" width={16} height={16} />
              Semua Ruangan
            </h2>
            <div role="group" aria-label="Pilih ruangan" className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
              {floor.rooms.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={item.id === room.id}
                  onClick={() => {
                    setRoomId(item.id);
                    setDetailId(null);
                    setNotice("");
                  }}
                  className={`min-h-11 rounded-md border text-xs transition-colors ${
                    item.id === room.id ? "border-primary bg-primary text-on-primary" : "border-border bg-surface hover:bg-primary-soft"
                  }`}
                >
                  {item.code}
                </button>
              ))}
            </div>
          </Card>

          <Card as="section" aria-labelledby="operator-status-title" className="flex flex-col gap-3 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3 px-4">
              <h2
                id="operator-status-title"
                ref={statusHeadingRef}
                tabIndex={-1}
                className="flex items-center gap-1.5 text-xs font-medium text-primary"
              >
                <MaskIcon src="/icons/calendar-clock.svg" size={18} />
                Status Ketersediaan {room.code}
              </h2>
              <fieldset className="flex items-center gap-2 text-xs">
                <legend className="sr-only">Filter jam</legend>
                <span aria-hidden="true">Filter Jam</span>
                <label htmlFor="operator-hour-from" className="sr-only">
                  Dari jam
                </label>
                <SelectInput
                  id="operator-hour-from"
                  value={hours.from}
                  onChange={(event) => setHours({ ...hours, from: event.target.value })}
                  className="text-xs"
                >
                  {FILTER_HOURS.slice(0, -1).map((time) => (
                    <option key={time} value={time}>
                      {displayTime(time)}
                    </option>
                  ))}
                </SelectInput>
                <span aria-hidden="true">-</span>
                <label htmlFor="operator-hour-to" className="sr-only">
                  Sampai jam
                </label>
                <SelectInput
                  id="operator-hour-to"
                  value={hours.to}
                  onChange={(event) => setHours({ ...hours, to: event.target.value })}
                  className="text-xs"
                >
                  {FILTER_HOURS.slice(1).map((time) => (
                    <option key={time} value={time}>
                      {displayTime(time)}
                    </option>
                  ))}
                </SelectInput>
              </fieldset>
            </div>

            <p role="status" className={notice ? "px-4 text-xs text-success" : "sr-only"}>
              {notice}
            </p>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch lg:pr-4">
              {detail && (
                <div className="px-4 lg:order-last lg:w-[234px] lg:shrink-0 lg:px-0">
                  <ReservationDetailPanel
                    reservation={detail}
                    canDelete={canDelete}
                    onClose={closeDetail}
                    onDelete={remove}
                  />
                </div>
              )}

              {slots.length === 0 ? (
                <p className="flex-1 px-4 py-10 text-center text-sm text-muted">Jam akhir harus setelah jam awal. Ubah Filter Jam.</p>
              ) : (
                <ul
                  aria-label={`Slot ${room.code}, ${displayTime(hours.from)} - ${displayTime(hours.to)} WIB`}
                  className="min-w-0 flex-1 gap-0 border-t border-border [column-rule:1px_solid_var(--color-border)] sm:columns-2 xl:columns-3"
                >
                  {slots.map((slot) => {
                    const reservation = slotReservation(dateKey, slot, room.code, reservations);
                    const label = `${displayTime(slot.start)} - ${displayTime(slot.end)} WIB`;
                    const content = (
                      <>
                        <span className="flex-1 text-left text-xs">{label}</span>
                        <Badge tone={reservation ? "primary" : "success"} size="md">
                          {reservation ? "Dipesan" : "Tersedia"}
                        </Badge>
                      </>
                    );
                    return (
                      <li key={slot.start} className="break-inside-avoid border-b border-border">
                        {reservation || canCreate ? (
                          <button
                            type="button"
                            onClick={() => openSlot(slot, reservation)}
                            aria-label={
                              reservation
                                ? `${label}, dipesan oleh ${reservation.bookerName}. Lihat detail`
                                : `${label}, tersedia. Buat reservasi`
                            }
                            className={`flex min-h-11 w-full items-center gap-3 py-2 pr-2 pl-4 transition-colors ${
                              reservation && reservation.id === detailId ? "bg-info-soft" : "hover:bg-page"
                            }`}
                          >
                            {content}
                            <MaskIcon src="/icons/chevron-right-detail.svg" size={16} />
                          </button>
                        ) : (
                          <div className="flex min-h-11 items-center gap-3 py-2 pr-10 pl-4">{content}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </Card>
        </div>

        {canCreate && (
          <aside aria-label="Buat reservasi" className="order-first lg:sticky lg:top-[88px] lg:order-none">
            {draft ? (
              <div className="lg:w-64">
                <CreateReservationPanel
                  key={`${room.id}-${draft.start}-${draft.end}`}
                  room={room}
                  dateKey={dateKey}
                  startTime={draft.start}
                  endTime={draft.end}
                  reservations={reservations}
                  onCollapse={() => {
                    setDraft(null);
                    statusHeadingRef.current?.focus();
                  }}
                  onCreated={(reservation) => {
                    setReservations((current) => [...current, reservation]);
                    setDraft(null);
                    statusHeadingRef.current?.focus();
                    setNotice(`Reservasi ${reservation.unitName}, ${formatTimeRangeWIB(reservation.startsAt, reservation.endsAt)}, dibuat.`);
                  }}
                />
              </div>
            ) : (
              <Card className="p-2 lg:min-h-[580px]">
                <button
                  type="button"
                  onClick={openCreate}
                  aria-label={`Buat reservasi ${room.code}`}
                  className="flex min-h-11 w-full items-center justify-center gap-2 rounded-md px-2 text-sm font-medium text-primary hover:bg-primary-soft"
                >
                  <span className="flex size-7 items-center justify-center rounded-sm bg-primary text-on-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path strokeLinecap="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                  <span className="lg:sr-only">Buat reservasi</span>
                </button>
              </Card>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
