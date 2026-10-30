"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { INPUT_CLASS, SelectInput } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatDateShortWIB } from "@/lib/date";
import { ROOM_TYPE_LABEL } from "@/shared/rooms/room-labels";
import type { Room, RoomType } from "@/types/room";
import { BookingConfirmDialog } from "./BookingConfirmDialog";
import { BOOKING_HOURS, BOOKING_MINUTES, bookingRange, bookingTimeError, isRoomFree } from "./booking";
import { FloorPlan, type PlanRoomState } from "./FloorPlan";
import type { RoomBookingData } from "./getRoomBookingData";

export interface RoomBookingFormProps {
  data: RoomBookingData;
  bookerName: string;
}

const STEPS = [
  { icon: "/icons/admin/step-date.svg", label: "Pilih lokasi & tanggal" },
  { icon: "/icons/admin/step-time.svg", label: "Pilih waktu reservasi" },
  { icon: "/icons/admin/step-room.svg", label: "Lihat denah & pilih ruangan yang tersedia" },
];

const LEGEND = [
  { label: "Dipilih", className: "bg-info" },
  { label: "Tidak tersedia", className: "bg-danger-strong" },
  { label: "Tersedia", className: "bg-calendar-past" },
];

function SidePanelTitle({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <h2 className="flex min-h-[25px] items-center gap-1 rounded-md bg-primary-soft px-2 py-1 text-xs font-semibold tracking-[0.02em] text-primary">
      <Image src={icon} alt="" width={16} height={16} />
      {children}
    </h2>
  );
}

function TimeSelect({ legend, value, onChange }: { legend: string; value: string; onChange: (value: string) => void }) {
  const [hour, minute] = value.split(":");
  const id = useId();
  const select = "min-h-11 appearance-none rounded-md bg-primary-soft px-2 text-center text-xs text-primary";

  return (
    <fieldset className="flex flex-col items-center gap-1">
      <legend className="mb-1 w-full text-center text-[10px] font-semibold tracking-[0.05em] text-primary">{legend}</legend>
      <div className="flex items-center gap-1">
        <label htmlFor={`${id}-h`} className="sr-only">
          Jam {legend.toLowerCase()}
        </label>
        <select id={`${id}-h`} value={hour} onChange={(event) => onChange(`${event.target.value}:${minute}`)} className={select}>
          {BOOKING_HOURS.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <span aria-hidden="true">:</span>
        <label htmlFor={`${id}-m`} className="sr-only">
          Menit {legend.toLowerCase()}
        </label>
        <select id={`${id}-m`} value={minute} onChange={(event) => onChange(`${hour}:${event.target.value}`)} className={select}>
          {BOOKING_MINUTES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
    </fieldset>
  );
}

/** Book a room for the admin's own use: pick floor, date and time, then a free room on the plan. */
export function RoomBookingForm({ data, bookerName }: RoomBookingFormProps) {
  const [buildingId, setBuildingId] = useState(data.buildings[0]?.id ?? "");
  const building = data.buildings.find((item) => item.id === buildingId);
  const [floor, setFloor] = useState(building?.floors[0] ?? 0);
  const [dateKey, setDateKey] = useState(data.todayKey);
  const [start, setStart] = useState("10:00");
  const [end, setEnd] = useState("12:00");
  const [typeFilter, setTypeFilter] = useState<RoomType | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [slots, setSlots] = useState(data.bookedSlots);
  const [confirming, setConfirming] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const time = { dateKey, start, end };
  const timeError = bookingTimeError(time, data.todayKey);
  const range = bookingRange(time);
  const floorRooms = data.rooms.filter((room) => room.buildingId === buildingId && room.floor === floor && room.plan);
  const isFree = (room: Room) => room.isActive && !timeError && isRoomFree(room.code, slots, range.startsAt, range.endsAt);
  const selected = floorRooms.find((room) => room.id === selectedId && isFree(room)) ?? null;

  const stateOf = (room: Room): PlanRoomState => {
    if (typeFilter && room.type !== typeFilter) return "filtered-out";
    if (!isFree(room)) return "unavailable";
    return room.id === selected?.id ? "selected" : "available";
  };

  const submit = () => {
    if (timeError) return setError(timeError);
    if (!selected) return setError("Pilih ruangan yang tersedia pada denah.");
    setError("");
    setConfirming(true);
  };

  if (data.buildings.length === 0) {
    return (
      <Card className="px-6 py-12 text-center text-sm text-muted">
        Belum ada ruangan fakultas yang bisa dipesan. Ruangan dan denah ditambahkan oleh Admin Universitas.
      </Card>
    );
  }

  return (
    <div className="grid gap-2 lg:grid-cols-[1fr_257px]">
      <Card className="flex min-w-0 flex-col gap-3 p-3">
        <section aria-labelledby="booking-steps-title" className="flex flex-col gap-1 rounded-md bg-primary-soft p-3">
          <h2 id="booking-steps-title" className="flex items-center gap-2 text-sm font-semibold tracking-[0.02em]">
            <Image src="/icons/admin/steps.svg" alt="" width={20} height={20} />
            Tahapan Reservasi
          </h2>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
            {STEPS.map((step, index) => (
              <li key={step.label} className="flex items-center gap-2">
                {index > 0 && <Image src="/icons/admin/step-arrow.svg" alt="" width={18} height={18} />}
                <Image src={step.icon} alt="" width={16} height={16} />
                {step.label}
              </li>
            ))}
          </ol>
        </section>

        <hr className="border-border" />

        <div className="grid gap-3 xl:grid-cols-[1fr_356px]">
          <div className="flex min-w-0 flex-col gap-2">
            <div className="overflow-x-auto rounded-md border border-border p-4">
              {floorRooms.length === 0 ? (
                <p className="py-16 text-center text-sm text-muted">
                  Denah {building?.name} lantai {floor} belum tersedia.
                </p>
              ) : (
                <FloorPlan
                  label={`Denah ${building?.name} lantai ${floor}`}
                  rooms={floorRooms}
                  stateOf={stateOf}
                  onSelect={(room) => {
                    setSelectedId(room.id);
                    setError("");
                  }}
                />
              )}
            </div>
            <ul aria-label="Keterangan warna denah" className="flex flex-wrap gap-4 text-[11px]">
              {LEGEND.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <span aria-hidden="true" className={`size-3 rounded-full ${item.className}`} />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <div role="group" aria-label="Tampilkan tipe ruangan" className="flex flex-wrap gap-1">
              {(Object.keys(ROOM_TYPE_LABEL) as RoomType[]).map((type) => (
                <button
                  key={type}
                  type="button"
                  aria-pressed={typeFilter === type}
                  onClick={() => setTypeFilter(typeFilter === type ? null : type)}
                  className={`min-h-11 rounded-sm px-2 text-[11px] transition-colors ${
                    typeFilter === type ? "bg-primary-soft font-medium text-primary" : "bg-neutral-soft text-muted hover:text-ink"
                  }`}
                >
                  {ROOM_TYPE_LABEL[type]}
                </button>
              ))}
            </div>
            <figure className="overflow-hidden rounded-lg bg-primary-soft">
              <div className="relative aspect-[355/211] bg-page">
                {selected?.photoUrl ? (
                  <Image src={selected.photoUrl} alt={`Foto ruang ${selected.code}`} fill sizes="356px" className="object-cover" />
                ) : (
                  <p className="flex size-full items-center justify-center px-6 text-center text-xs text-muted">
                    {selected ? "Belum ada foto ruangan." : "Pilih ruangan pada denah untuk melihat fotonya."}
                  </p>
                )}
              </div>
              <figcaption className="px-3 py-3 text-base font-semibold">Ruang: {selected?.code ?? "belum dipilih"}</figcaption>
            </figure>
          </div>
        </div>

        <hr className="border-border" />

        <section aria-labelledby="booking-rules-title" className="flex flex-col gap-2 rounded-md bg-primary-soft p-3">
          <h2 id="booking-rules-title" className="flex items-center gap-2 text-sm font-semibold tracking-[0.02em]">
            <Image src="/icons/admin/rules.svg" alt="" width={20} height={20} />
            Peraturan Reservasi
          </h2>
          <ol className="list-decimal pl-5 text-[11px] leading-[17px]">
            {data.rules.map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ol>
        </section>
      </Card>

      <div className="flex flex-col gap-2">
        <Card className="flex flex-col gap-3 p-3">
          <SidePanelTitle icon="/icons/admin/building-primary.svg">Gedung & Lantai</SidePanelTitle>
          <label className="flex items-center gap-2 rounded-md border border-border px-2 py-1 text-xs">
            Lokasi :
            <div className="flex-1">
              <SelectInput
                value={buildingId}
                onChange={(event) => {
                  const next = data.buildings.find((item) => item.id === event.target.value);
                  setBuildingId(event.target.value);
                  setFloor(next?.floors[0] ?? 0);
                }}
                className="min-h-10 border-0 bg-primary-soft py-1 text-xs font-medium text-primary"
              >
                {data.buildings.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </SelectInput>
            </div>
          </label>
          <label className="flex items-center gap-2 rounded-md border border-border px-2 py-1 text-xs">
            Lantai
            <div className="flex-1">
              <SelectInput
                value={floor}
                onChange={(event) => setFloor(Number(event.target.value))}
                className="min-h-10 border-0 bg-primary-soft py-1 text-xs font-medium text-primary"
              >
                {building?.floors.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </SelectInput>
            </div>
          </label>
        </Card>

        <Card className="flex flex-col gap-2 p-3">
          <SidePanelTitle icon="/icons/admin/date-primary.svg">
            <label htmlFor="booking-date">Tanggal Reservasi</label>
          </SidePanelTitle>
          <input
            id="booking-date"
            type="date"
            min={data.todayKey}
            value={dateKey}
            onChange={(event) => setDateKey(event.target.value)}
            className={`${INPUT_CLASS} text-xs`}
          />
        </Card>

        <Card className="flex flex-col gap-3 p-3">
          <SidePanelTitle icon="/icons/admin/time-primary.svg">Pemilihan Jam Reservasi</SidePanelTitle>
          <div className="flex items-end justify-center gap-2 rounded-md border border-border px-2 py-2">
            <TimeSelect legend="Mulai" value={start} onChange={setStart} />
            <span aria-hidden="true" className="pb-3">
              -
            </span>
            <TimeSelect legend="Selesai" value={end} onChange={setEnd} />
          </div>
          {timeError && <p className="text-xs text-danger">{timeError}</p>}
        </Card>

        <Button onClick={submit} className="w-full">
          Reservasi sekarang
        </Button>
        <p role="status" className={error ? "text-xs text-danger" : notice ? "text-xs text-success" : "sr-only"}>
          {error || notice}
        </p>
      </div>

      {confirming && selected && building && (
        <BookingConfirmDialog
          summary={{ bookerName, buildingName: building.name, roomCode: selected.code, startsAt: range.startsAt, start, end }}
          onClose={() => setConfirming(false)}
          onConfirm={() => {
            // TODO: POST the reservation through the orval client; the API assigns the ticket code.
            setSlots((current) => [...current, { roomCode: selected.code, ...range }]);
            setSelectedId(null);
            setConfirming(false);
            setNotice(`Reservasi ${selected.code} pada ${formatDateShortWIB(range.startsAt)}, ${start.replace(":", ".")} - ${end.replace(":", ".")} WIB dibuat.`);
          }}
        />
      )}
    </div>
  );
}
