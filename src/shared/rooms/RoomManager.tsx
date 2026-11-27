"use client";

import Image from "next/image";
import { useState } from "react";
import { Field, SelectInput } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useLiveState } from "@/hooks/useLiveData";
import type { Building, Room, RoomManagedBy, RoomType } from "@/types/room";
import { AddRoomDialog } from "./AddRoomDialog";
import { EditRoomDialog } from "./EditRoomDialog";
import { managedByLabel, ROOM_TYPE_LABEL, roomManagedBy, roomTitle } from "./room-labels";
import {
  applyRoomEdits,
  editManyRooms,
  localPhotoUrl,
  ROOM_ADDITIONS_NAME,
  ROOM_EDITS_NAME,
  roomAdditionsSchema,
  roomEditsSchema,
} from "./roomEdits";
import { RoomPhotoImage } from "./RoomPhotoImage";
import { ROOM_PHOTO_ACCEPT, roomPhotoSchema, type RoomPhotoChange } from "./roomPhoto";

async function applyPhoto(room: Room, photo: RoomPhotoChange): Promise<Room> {
  if (photo.kind === "replace") return { ...room, photoUrl: await localPhotoUrl(photo.file) };
  if (photo.kind === "remove") return { ...room, photoUrl: null };
  return room;
}

const NO_EDITS: Record<string, Room> = {};
const NO_ADDITIONS: Room[] = [];

export interface RoomManagerProps {
  buildings: Building[];
  rooms: Room[];
  /** Admin universitas: choose between the building's admin and admin universitas, one room or many at once. */
  canChangeManager: boolean;
  /** Admin gedung only: Tambah Ruangan. Admin universitas does not add rooms. */
  canAddRoom: boolean;
}

const FILTER_LABEL = "shrink-0 text-xs";
const FILTER_SELECT = "min-h-10 border-0 bg-primary-soft py-1 text-xs font-medium text-primary";
const FILE_BUTTON =
  "inline-flex min-h-11 items-center justify-center rounded-md border px-4 text-sm font-medium has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-border-focus";

/** Kelola Ruangan: pick a building floor, then edit one room, or switch to Pilih banyak to change several at once. */
export function RoomManager({ buildings, rooms: initialRooms, canChangeManager, canAddRoom }: RoomManagerProps) {
  // Saved changes sit on top of the server's rooms; the "empty" data mode keeps them in this browser.
  const [edits, setEdits] = useLiveState(ROOM_EDITS_NAME, roomEditsSchema, NO_EDITS);
  const [additions, setAdditions] = useLiveState(ROOM_ADDITIONS_NAME, roomAdditionsSchema, NO_ADDITIONS);
  const allRooms = [...initialRooms, ...additions];
  const rooms = applyRoomEdits(allRooms, edits);
  const [type, setType] = useState<RoomType | "semua">("semua");
  const [buildingId, setBuildingId] = useState(buildings[0]?.id ?? "");
  const [floor, setFloor] = useState(buildings[0]?.floors[0] ?? 0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [notice, setNotice] = useState("");
  // Pilih banyak: the chosen rooms stay chosen while the filters change.
  const [picking, setPicking] = useState(false);
  const [pickedIds, setPickedIds] = useState<ReadonlySet<string>>(new Set());
  const [bulkPhotoError, setBulkPhotoError] = useState<string>();
  const [bulkManagedBy, setBulkManagedBy] = useState<RoomManagedBy | "">("");

  const building = buildings.find((item) => item.id === buildingId);
  const buildingName = (id: string) => buildings.find((item) => item.id === id)?.name ?? "";
  const visible = rooms.filter(
    (room) => room.buildingId === buildingId && room.floor === floor && (type === "semua" || room.type === type),
  );
  const selected = visible.find((room) => room.id === selectedId) ?? visible[0] ?? null;
  const picked = rooms.filter((room) => pickedIds.has(room.id));
  // Rooms picked from several buildings each go to their own building's admin.
  const pickedBuildingIds = new Set(picked.map((room) => room.buildingId));
  const pickedBuildingAdmin =
    pickedBuildingIds.size === 1 ? managedByLabel("gedung", buildingName([...pickedBuildingIds][0])) : "Admin gedung masing-masing ruangan";

  const togglePicked = (id: string) =>
    setPickedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const stopPicking = () => {
    setPicking(false);
    setPickedIds(new Set());
    setBulkPhotoError(undefined);
    setBulkManagedBy("");
  };

  const changePickedPhotos = async (file: File | undefined) => {
    if (!file || picked.length === 0) return;
    const parsed = roomPhotoSchema.safeParse(file);
    if (!parsed.success) return setBulkPhotoError(parsed.error.issues[0]?.message);
    setBulkPhotoError(undefined);
    // TODO: send the photo once with the room ids through the orval client.
    const photoUrl = await localPhotoUrl(parsed.data);
    setEdits(editManyRooms(allRooms, edits, pickedIds, { photoUrl }));
    setNotice(`Foto ${picked.length} ruangan diganti.`);
  };

  const changePickedManager = () => {
    if (!bulkManagedBy || picked.length === 0) return;
    // TODO: PATCH the rooms' manager through the orval client.
    setEdits(editManyRooms(allRooms, edits, pickedIds, { managedBy: bulkManagedBy }));
    const label = bulkManagedBy === "gedung" ? pickedBuildingAdmin : managedByLabel("universitas", "");
    setNotice(`${picked.length} ruangan sekarang dikelola ${label}.`);
  };

  if (buildings.length === 0) {
    return (
      <Card className="px-6 py-12 text-center text-sm text-muted">
        Belum ada gedung yang bisa dikelola. Gedung ditambahkan oleh Admin Universitas.
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Card className="flex flex-wrap items-center justify-end gap-2 p-3">
        <div className="flex w-full flex-wrap gap-2 sm:mr-auto sm:w-auto">
          {canAddRoom && !picking && (
            <Button variant="primary" onClick={() => setAdding(true)} className="flex-1 sm:flex-none">
              Tambah Ruangan
            </Button>
          )}
          <Button
            variant={picking ? "primary" : "primary-outline"}
            aria-pressed={picking}
            onClick={() => (picking ? stopPicking() : setPicking(true))}
            className="flex-1 sm:flex-none"
          >
            {picking ? "Selesai memilih" : "Pilih banyak"}
          </Button>
        </div>
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
        <Card as="section" aria-label="Daftar ruangan" className="flex flex-col gap-3 p-4">
          {picking && <p className="text-xs text-muted">Klik ruangan untuk memilih atau membatalkannya.</p>}
          {visible.length === 0 ? (
            <p className="py-16 text-center text-sm text-muted">
              Tidak ada ruangan {type === "semua" ? "" : ROOM_TYPE_LABEL[type].toLowerCase() + " "}di {building?.name} lantai {floor}.
            </p>
          ) : (
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-4">
              {visible.map((room) => {
                const active = picking ? pickedIds.has(room.id) : room.id === selected?.id;
                return (
                  <li key={room.id}>
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={() => (picking ? togglePicked(room.id) : setSelectedId(room.id))}
                      className={`flex min-h-[100px] w-full flex-col items-center justify-center gap-1 rounded-md border p-1.5 text-xs transition-colors ${
                        active
                          ? "border-primary bg-primary text-on-primary"
                          : "border-border bg-surface text-ink hover:border-primary/50 hover:bg-primary-soft"
                      }`}
                    >
                      {picking && (
                        <span aria-hidden="true" className={`flex size-5 items-center justify-center rounded border ${active ? "border-on-primary" : "border-border"}`}>
                          {active ? "✓" : ""}
                        </span>
                      )}
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

        {picking ? (
          <Card as="section" aria-labelledby="picked-title" className="flex flex-col gap-3 p-3">
            <h2 id="picked-title" className="text-base font-semibold">
              {picked.length} ruangan dipilih
            </h2>
            {picked.length === 0 ? (
              <p className="py-10 text-center text-sm text-muted">Belum ada ruangan yang dipilih.</p>
            ) : (
              <ul className="flex max-h-64 flex-col gap-1 overflow-y-auto">
                {picked.map((room) => (
                  <li key={room.id} className="flex items-center justify-between gap-2 rounded-md bg-page px-3 py-2 text-xs">
                    <span className="min-w-0">
                      <span className="font-medium">{roomTitle(room)}</span>
                      <span className="text-muted">
                        {" "}
                        · {buildingName(room.buildingId)} lantai {room.floor}
                      </span>
                    </span>
                    <button
                      type="button"
                      onClick={() => togglePicked(room.id)}
                      aria-label={`Batalkan pilihan ${roomTitle(room)}`}
                      className="flex size-11 shrink-0 items-center justify-center rounded-md text-muted hover:bg-surface hover:text-danger"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col gap-1 border-t border-border pt-3">
              <label
                className={`${FILE_BUTTON} ${
                  picked.length === 0
                    ? "cursor-not-allowed border-border text-muted"
                    : "cursor-pointer border-primary bg-surface text-primary hover:bg-primary-soft"
                }`}
              >
                <input
                  type="file"
                  accept={ROOM_PHOTO_ACCEPT}
                  disabled={picked.length === 0}
                  className="sr-only"
                  aria-describedby={bulkPhotoError ? "bulk-photo-error" : undefined}
                  onChange={(event) => {
                    void changePickedPhotos(event.target.files?.[0]);
                    event.target.value = "";
                  }}
                />
                Ubah gambar
              </label>
              {bulkPhotoError && (
                <p id="bulk-photo-error" role="alert" className="text-[11px] text-danger">
                  {bulkPhotoError}
                </p>
              )}
            </div>

            {canChangeManager && (
              <div className="flex flex-col gap-2 border-t border-border pt-3">
                <Field label="Pengelola baru" htmlFor="bulk-manager">
                  <SelectInput
                    id="bulk-manager"
                    value={bulkManagedBy}
                    onChange={(event) => setBulkManagedBy(event.target.value as RoomManagedBy)}
                  >
                    <option value="" disabled>
                      Pilih pengelola
                    </option>
                    <option value="gedung">{pickedBuildingIds.size === 0 ? "Admin gedung" : pickedBuildingAdmin}</option>
                    <option value="universitas">{managedByLabel("universitas", "")}</option>
                  </SelectInput>
                </Field>
                <Button variant="primary-outline" disabled={picked.length === 0 || !bulkManagedBy} onClick={changePickedManager}>
                  Ganti pengelola
                </Button>
              </div>
            )}
          </Card>
        ) : (
          <Card as="section" aria-label="Detail ruangan" className="flex flex-col gap-3 p-3">
            {selected ? (
              <>
                <div className="relative aspect-[339/189] overflow-hidden rounded-md border border-border bg-page">
                  <RoomPhotoImage url={selected.photoUrl} alt={`Foto ${roomTitle(selected)}`} sizes="363px" />
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
                  {canChangeManager && (
                    <div className="flex gap-1">
                      <dt className="shrink-0">Dikelola oleh :</dt>
                      <dd className="min-w-0 break-words">{managedByLabel(roomManagedBy(selected, building), building?.name ?? "gedung")}</dd>
                    </div>
                  )}
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
        )}
      </div>

      {adding && (
        <AddRoomDialog
          buildings={buildings}
          initialBuildingId={buildingId}
          initialFloor={floor}
          takenCodes={rooms.map((room) => room.code)}
          onClose={() => setAdding(false)}
          onSave={async (room, photo) => {
            const saved = await applyPhoto(room, photo);
            setAdditions([...additions, saved]);
            setAdding(false);
            setType("semua");
            setBuildingId(saved.buildingId);
            setFloor(saved.floor);
            setSelectedId(saved.id);
            setNotice(`${roomTitle(saved)} ditambahkan.`);
          }}
        />
      )}

      {editing && selected && (
        <EditRoomDialog
          room={selected}
          buildings={buildings}
          canChangeManager={canChangeManager}
          takenCodes={rooms.filter((room) => room.id !== selected.id).map((room) => room.code)}
          onClose={() => setEditing(false)}
          onSave={async (updated, photo) => {
            const saved = await applyPhoto(updated, photo);
            setEdits({ ...edits, [saved.id]: saved });
            // a new type would hide the room behind the type filter
            if (type !== "semua" && saved.type !== type) setType("semua");
            setEditing(false);
            setNotice(`${roomTitle(saved)} disimpan.`);
          }}
        />
      )}
    </div>
  );
}
