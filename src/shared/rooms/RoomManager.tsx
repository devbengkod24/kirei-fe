"use client";

import Image from "next/image";
import { useState } from "react";
import { SelectInput } from "@/components/form/Field";
import { Card } from "@/components/ui/Card";
import type { Building, Room, RoomType } from "@/types/room";
import { EditRoomDialog } from "./EditRoomDialog";
import { ROOM_TYPE_LABEL, roomTitle } from "./room-labels";

export interface RoomManagerProps {
  buildings: Building[];
  rooms: Room[];
}

const FILTER_LABEL = "shrink-0 text-xs";
const FILTER_SELECT = "min-h-10 border-0 bg-primary-soft py-1 text-xs font-medium text-primary";

/** Kelola Ruangan: pick a building floor, select a room, edit it. */
export function RoomManager({ buildings, rooms: initialRooms }: RoomManagerProps) {
  const [rooms, setRooms] = useState(initialRooms);
  const [type, setType] = useState<RoomType | "semua">("semua");
  const [buildingId, setBuildingId] = useState(buildings[0]?.id ?? "");
  const [floor, setFloor] = useState(buildings[0]?.floors[0] ?? 0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState("");

  const building = buildings.find((item) => item.id === buildingId);
  const visible = rooms.filter(
    (room) => room.buildingId === buildingId && room.floor === floor && (type === "semua" || room.type === type),
  );
  const selected = visible.find((room) => room.id === selectedId) ?? visible[0] ?? null;

  if (buildings.length === 0) {
    return (
      <Card className="px-6 py-12 text-center text-sm text-muted">
        Fakultas ini belum punya gedung. Gedung ditambahkan oleh Admin Universitas.
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-wrap justify-end gap-2 p-3">
        <label className="flex min-w-0 flex-1 items-center gap-3 rounded-md border border-border px-3 py-1 sm:max-w-[233px]">
          <span className={FILTER_LABEL}>Tipe</span>
          <div className="flex-1">
            <SelectInput value={type} onChange={(event) => setType(event.target.value as RoomType | "semua")} className={FILTER_SELECT}>
              <option value="semua">Semua tipe</option>
              {Object.entries(ROOM_TYPE_LABEL).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </SelectInput>
          </div>
        </label>
        <label className="flex min-w-0 flex-1 items-center gap-3 rounded-md border border-border px-3 py-1 sm:max-w-[233px]">
          <span className={FILTER_LABEL}>Lokasi :</span>
          <div className="flex-1">
            <SelectInput
              value={buildingId}
              onChange={(event) => {
                const next = buildings.find((item) => item.id === event.target.value);
                setBuildingId(event.target.value);
                setFloor(next?.floors[0] ?? 0);
              }}
              className={FILTER_SELECT}
            >
              {buildings.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </SelectInput>
          </div>
        </label>
        <label className="flex min-w-0 flex-1 items-center gap-3 rounded-md border border-border px-3 py-1 sm:max-w-[233px]">
          <span className={FILTER_LABEL}>Lantai</span>
          <div className="flex-1">
            <SelectInput value={floor} onChange={(event) => setFloor(Number(event.target.value))} className={FILTER_SELECT}>
              {building?.floors.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </SelectInput>
          </div>
        </label>
      </Card>

      <p role="status" className={notice ? "-mt-3 text-sm text-success" : "sr-only"}>
        {notice}
      </p>

      <div className="grid gap-4 lg:grid-cols-[1fr_auto_363px]">
        <Card as="section" aria-label="Daftar ruangan" className="p-4">
          {visible.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted">
              Tidak ada ruangan {type === "semua" ? "" : ROOM_TYPE_LABEL[type].toLowerCase() + " "}di {building?.name} lantai {floor}.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
              {visible.map((room) => {
                const active = room.id === selected?.id;
                return (
                  <li key={room.id}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => setSelectedId(room.id)}
                      className={`flex min-h-[100px] w-full flex-col items-center justify-center gap-1 rounded-md border p-1.5 text-xs transition-colors ${
                        active
                          ? "border-primary bg-primary text-on-primary"
                          : "border-border bg-surface text-ink hover:border-primary/50 hover:bg-primary-soft"
                      }`}
                    >
                      {roomTitle(room)}
                      {!room.isActive && <span className={active ? "text-on-primary" : "text-muted"}>Tidak aktif</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <span aria-hidden="true" className="hidden border-l border-border lg:block" />

        <Card as="section" aria-label="Detail ruangan" className="flex flex-col gap-3 p-3">
          {selected ? (
            <>
              <div className="relative aspect-[339/189] overflow-hidden rounded-md border border-border bg-page">
                {selected.photoUrl ? (
                  <Image src={selected.photoUrl} alt={`Foto ${roomTitle(selected)}`} fill sizes="363px" className="object-cover" />
                ) : (
                  <p className="flex size-full items-center justify-center text-xs text-muted">Belum ada foto ruangan</p>
                )}
              </div>
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-xl font-semibold">{roomTitle(selected)}</h2>
                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  aria-label={`Edit ${roomTitle(selected)}`}
                  className="flex size-11 items-center justify-center rounded-md bg-warning-strong hover:bg-warning"
                >
                  <Image src="/icons/admin/edit-room.svg" alt="" width={18} height={18} />
                </button>
              </div>
              <dl className="flex flex-col gap-2 py-2 text-xs">
                <div className="flex gap-1">
                  <dt>Tipe :</dt>
                  <dd>{ROOM_TYPE_LABEL[selected.type]}</dd>
                </div>
                <div className="flex gap-1">
                  <dt className="sr-only">Lantai</dt>
                  <dd>Lantai {selected.floor}</dd>
                </div>
                <div className="flex gap-1">
                  <dt className="sr-only">Gedung</dt>
                  <dd>{building?.name}</dd>
                </div>
                <div className="flex items-center gap-2">
                  <dt>Status :</dt>
                  <dd
                    className={`rounded-full px-2 ${selected.isActive ? "bg-success-strong text-on-primary" : "bg-neutral-soft text-ink"}`}
                  >
                    {selected.isActive ? "Aktif" : "Tidak Aktif"}
                  </dd>
                </div>
              </dl>
            </>
          ) : (
            <p className="py-16 text-center text-sm text-muted">Pilih ruangan untuk melihat detailnya.</p>
          )}
        </Card>
      </div>

      {editing && selected && (
        <EditRoomDialog
          room={selected}
          buildings={buildings}
          takenCodes={rooms.filter((room) => room.id !== selected.id).map((room) => room.code)}
          onClose={() => setEditing(false)}
          onSave={(updated) => {
            setRooms((current) => current.map((room) => (room.id === updated.id ? updated : room)));
            setEditing(false);
            setNotice(`${roomTitle(updated)} disimpan.`);
          }}
        />
      )}
    </div>
  );
}
