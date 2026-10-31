"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { SelectInput } from "@/components/form/Field";
import { Card } from "@/components/ui/Card";
import { MaskIcon } from "@/components/ui/MaskIcon";
import { formatDateLongWIB, formatTimeRangeWIB, toWibDateKey } from "@/lib/date";
import type { TimeSlot } from "@/shared/reservation-form/sportsHallSlots";
import type { ReservationRecord } from "@/types/reservation";
import { CreateReservationPanel } from "./CreateReservationPanel";
import type { OperatorFloorData } from "./getOperatorFloor";
import { deleteReservation } from "./operatorReservations";
import { ReservationDetailPanel } from "./ReservationDetailPanel";
import { RoomTimeline } from "./RoomTimeline";
import { buildTimeline, defaultHourFilter, FILTER_HOURS } from "./slots";

const displayTime = (time: string) => time.replace(":", ".");

function EmptyState({ children }: { children: React.ReactNode }) {
  return <Card className="px-6 py-16 text-center text-sm text-muted">{children}</Card>;
}

/** Today's schedule of every room on the operator's floor: Siadin classes, reservations, and free gaps. */
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
  const validRange = hours.from < hours.to;
  const timeline = validRange ? buildTimeline(dateKey, room.code, hours.from, hours.to, reservations, data.classSchedules) : [];
  const detail = reservations.find((reservation) => reservation.id === detailId) ?? null;

  const openReservation = (reservation: ReservationRecord) => {
    setNotice("");
    setDetailId(reservation.id);
  };

  const openCreate = (range?: TimeSlot) => {
    setNotice("");
    setDraft(range ?? timeline.find((segment) => segment.kind === "free") ?? { start: hours.from, end: hours.to });
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
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <h1 className="text-xs font-medium text-primary">
          Ketersediaan {data.buildingName} lantai {floor.number}
        </h1>
        <p className="flex items-center gap-1.5 text-xs">
          <MaskIcon src="/icons/calendar-outline.svg" size={14} className="text-muted" />
          <span className="sr-only">Hari ini:</span>
          <time dateTime={dateKey}>{formatDateLongWIB(data.now)}</time>
        </p>
      </div>
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

              {validRange ? (
                <div className="min-w-0 flex-1">
                  <RoomTimeline
                    roomCode={room.code}
                    segments={timeline}
                    from={hours.from}
                    to={hours.to}
                    canCreate={canCreate}
                    activeReservationId={detailId}
                    onOpenReservation={openReservation}
                    onCreate={openCreate}
                  />
                </div>
              ) : (
                <p className="flex-1 px-4 py-10 text-center text-sm text-muted">Jam akhir harus setelah jam awal. Ubah Filter Jam.</p>
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
                  busy={[...reservations, ...data.classSchedules]}
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
                  onClick={() => openCreate()}
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
