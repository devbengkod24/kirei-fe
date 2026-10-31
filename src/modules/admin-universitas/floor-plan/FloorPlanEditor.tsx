"use client";

import { useId, useRef, useState } from "react";
import { Field, INPUT_CLASS, SelectInput } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ROOM_CATEGORY_LABEL } from "@/shared/reservation-form/labels";
import { PanelHeading } from "@/shared/reservation-form/PanelHeading";
import type { Building, Floor, FloorPlanRoom, RoomCategory } from "@/types/facility";
import { FloorPlanCanvas } from "./FloorPlanCanvas";
import { FLOOR_CELLS, GRID, collidingRoom, fitRoom, gridSize, newRoom, resizeFloor, roomCodeErrors, type RoomRect } from "./floorPlanEdits";

export interface FloorPlanEditorProps {
  buildings: Building[];
}

const CATEGORIES = Object.keys(ROOM_CATEGORY_LABEL) as RoomCategory[];
/** Shown in grid cells; columns and rows count from 1 like a person would. */
const RECT_FIELDS: { key: keyof RoomRect; label: string; toCells: (units: number) => number; toUnits: (cells: number) => number }[] = [
  { key: "x", label: "Kolom", toCells: (units) => units / GRID + 1, toUnits: (cells) => (cells - 1) * GRID },
  { key: "y", label: "Baris", toCells: (units) => units / GRID + 1, toUnits: (cells) => (cells - 1) * GRID },
  { key: "width", label: "Lebar (kotak)", toCells: (units) => units / GRID, toUnits: (cells) => cells * GRID },
  { key: "height", label: "Tinggi (kotak)", toCells: (units) => units / GRID, toUnits: (cells) => cells * GRID },
];

/** Number input that applies on blur or Enter, so typing "12" is not clamped at "1". */
function RectInput({ id, label, value, onCommit }: { id: string; label: string; value: number; onCommit: (value: number) => void }) {
  const commit = (raw: string) => {
    const number = Number(raw);
    if (raw.trim() !== "" && Number.isFinite(number)) onCommit(number);
  };
  return (
    <Field label={label} htmlFor={id}>
      <input
        // Remount on a new value (drag, arrow keys, clamping) so the box shows it.
        key={value}
        id={id}
        type="number"
        inputMode="numeric"
        step={1}
        defaultValue={value}
        onBlur={(event) => commit(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") commit(event.currentTarget.value);
        }}
        className={INPUT_CLASS}
      />
    </Field>
  );
}

/**
 * Edits the floor plans of the buildings in scope. Changes stay in a draft until "Simpan denah";
 * the saved shape is the same Floor/FloorPlanRoom the booking form reads.
 */
export function FloorPlanEditor({ buildings: initial }: FloorPlanEditorProps) {
  const [saved, setSaved] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [buildingId, setBuildingId] = useState(initial[0]?.id ?? "");
  const [floorId, setFloorId] = useState(initial[0]?.floors[0]?.id ?? "");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ tone: "success" | "danger"; text: string } | null>(null);
  const newRoomCount = useRef(0);
  const helpId = useId();

  const building = draft.find((item) => item.id === buildingId);
  const floor = building?.floors.find((item) => item.id === floorId);
  const room = floor?.rooms.find((item) => item.id === selectedId) ?? null;
  const codeErrors = floor ? roomCodeErrors(floor) : new Map<string, string>();
  const dirty = draft !== saved;

  const updateFloor = (change: (floor: Floor) => Floor) => {
    setDraft((current) =>
      current.map((item) =>
        item.id !== buildingId ? item : { ...item, floors: item.floors.map((level) => (level.id === floorId ? change(level) : level)) },
      ),
    );
    setNotice(null);
  };

  const updateRoom = (roomId: string, change: Partial<FloorPlanRoom>) =>
    updateFloor((level) => ({ ...level, rooms: level.rooms.map((item) => (item.id === roomId ? { ...item, ...change } : item)) }));

  // A move or resize that would cover another room is dropped, so a dragged room stops at its neighbour.
  const placeRoom = (roomId: string, rect: RoomRect) => {
    if (!floor || collidingRoom(floor, roomId, rect)) return;
    updateRoom(roomId, rect);
  };

  const chooseBuilding =(id: string) => {
    setBuildingId(id);
    setFloorId(draft.find((item) => item.id === id)?.floors[0]?.id ?? "");
    setSelectedId(null);
  };

  const addRoom = () => {
    if (!floor) return;
    newRoomCount.current += 1;
    const added = newRoom(floor, `room-new-${newRoomCount.current}`);
    if (collidingRoom(floor, added.id, added)) {
      setNotice({ tone: "danger", text: "Tidak ada tempat kosong 2 × 2 kotak. Perbesar lantai atau kecilkan ruangan lain." });
      return;
    }
    updateFloor((level) => ({ ...level, rooms: [...level.rooms, added] }));
    setSelectedId(added.id);
  };

  const resize = (columns: number, rows: number) => {
    if (!floor) return;
    const result = resizeFloor(floor, columns, rows);
    if ("error" in result) {
      setNotice({ tone: "danger", text: result.error });
      return;
    }
    updateFloor(() => result.floor);
  };

  const deleteRoom = () => {
    if (!room) return;
    updateFloor((level) => ({ ...level, rooms: level.rooms.filter((item) => item.id !== room.id) }));
    setSelectedId(null);
    setNotice({ tone: "success", text: `Ruangan ${room.code || "tanpa kode"} dihapus dari denah. Simpan untuk menerapkan.` });
  };

  const save = () => {
    // Check every floor, not just the one on screen, since the draft covers them all.
    for (const item of draft) {
      for (const level of item.floors) {
        const [roomId, message] = roomCodeErrors(level).entries().next().value ?? [];
        if (roomId) {
          setBuildingId(item.id);
          setFloorId(level.id);
          setSelectedId(roomId);
          setNotice({ tone: "danger", text: `${item.name} lantai ${level.number}: ${message}` });
          return;
        }
      }
    }
    // TODO: PUT the changed floors through the orval client, then refetch; this keeps them locally.
    setSaved(draft);
    setNotice({ tone: "success", text: "Denah disimpan." });
  };

  const discard = () => {
    setDraft(saved);
    setSelectedId(null);
    setNotice(null);
  };

  if (initial.length === 0) {
    return (
      <Card className="px-6 py-12 text-center">
        <p className="text-sm font-medium">Belum ada gedung.</p>
        <p className="mt-1 text-xs text-muted">Data gedung dan denah belum tersedia. Coba lagi nanti.</p>
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-2 lg:grid lg:h-[calc(100dvh-9rem)] lg:grid-cols-[minmax(0,1fr)_18rem]">
      <Card className="flex flex-col gap-3 p-3 lg:min-h-0">
        <p id={helpId} className="text-xs text-muted">
          Ruangan selalu menempel pada grid. Seret ruangan untuk memindahkan, tarik kotak di pojok kanan bawah untuk mengubah ukuran.
          Dengan keyboard, panah menggeser 1 kotak dan Shift + panah mengubah ukuran 1 kotak.
        </p>

        {floor ? (
          <FloorPlanCanvas
            floor={floor}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onChange={placeRoom}
            helpId={helpId}
          />
        ) : (
          <p className="py-12 text-center text-sm text-muted">Gedung ini belum punya lantai.</p>
        )}
        {floor && floor.rooms.length === 0 && (
          <p className="text-center text-xs text-muted">Lantai ini masih kosong. Tambahkan ruangan pertama.</p>
        )}
      </Card>

      {/* The side panel scrolls on its own on large screens, so the page itself does not. */}
      <div className="flex flex-col gap-2 lg:min-h-0 lg:overflow-y-auto">
        <Card as="section" aria-labelledby="plan-location" className="flex flex-col gap-3 p-3">
          <PanelHeading id="plan-location" iconSrc="/icons/building-solid.svg" iconWidth={13} iconHeight={15}>
            Gedung &amp; Lantai
          </PanelHeading>
          <Field label="Lokasi" htmlFor="plan-building">
            <SelectInput id="plan-building" value={buildingId} onChange={(event) => chooseBuilding(event.target.value)}>
              {draft.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                  {item.fakultasName ? ` (${item.fakultasName})` : " (Universitas)"}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Lantai" htmlFor="plan-floor">
            <SelectInput
              id="plan-floor"
              value={floorId}
              onChange={(event) => {
                setFloorId(event.target.value);
                setSelectedId(null);
              }}
              disabled={!building?.floors.length}
            >
              {building?.floors.map((level) => (
                <option key={level.id} value={level.id}>
                  Lantai {level.number}
                </option>
              ))}
            </SelectInput>
          </Field>
          {floor && (
            <>
              <div className="grid grid-cols-2 gap-2">
                <RectInput
                  id="plan-floor-columns"
                  label="Kolom lantai"
                  value={gridSize(floor).columns}
                  onCommit={(columns) => resize(columns, gridSize(floor).rows)}
                />
                <RectInput
                  id="plan-floor-rows"
                  label="Baris lantai"
                  value={gridSize(floor).rows}
                  onCommit={(rows) => resize(gridSize(floor).columns, rows)}
                />
              </div>
              <p className="text-[11px] text-muted">
                Ukuran lantai {FLOOR_CELLS.min}–{FLOOR_CELLS.max} kotak. Lantai tidak bisa dikecilkan selama ada ruangan di
                luar ukuran baru.
              </p>
            </>
          )}
        </Card>

        <Card as="section" aria-labelledby="plan-room" className="flex flex-col gap-3 p-3">
          <PanelHeading id="plan-room" iconSrc="/icons/notes.svg" iconWidth={11} iconHeight={12}>
            Keterangan Ruangan
          </PanelHeading>
          {room && floor ? (
            <>
              <Field label="Kode ruangan" htmlFor="plan-room-code" error={codeErrors.get(room.id)}>
                <input
                  id="plan-room-code"
                  value={room.code}
                  onChange={(event) => updateRoom(room.id, { code: event.target.value })}
                  placeholder="Contoh: H.5.15"
                  aria-invalid={codeErrors.has(room.id) || undefined}
                  aria-describedby={codeErrors.has(room.id) ? "plan-room-code-error" : undefined}
                  className={INPUT_CLASS}
                />
              </Field>
              <Field label="Tipe" htmlFor="plan-room-category">
                <SelectInput
                  id="plan-room-category"
                  value={room.category}
                  onChange={(event) => updateRoom(room.id, { category: event.target.value as RoomCategory })}
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {ROOM_CATEGORY_LABEL[category]}
                    </option>
                  ))}
                </SelectInput>
              </Field>
              <div className="grid grid-cols-2 gap-2">
                {RECT_FIELDS.map((field) => (
                  <RectInput
                    key={field.key}
                    id={`plan-room-${field.key}`}
                    label={field.label}
                    value={field.toCells(room[field.key])}
                    onCommit={(cells) => placeRoom(room.id, fitRoom({ ...room, [field.key]: field.toUnits(cells) }, floor))}
                  />
                ))}
              </div>
              <Button variant="danger-outline" onClick={deleteRoom}>
                Hapus ruangan
              </Button>
            </>
          ) : (
            <p className="text-xs text-muted">Pilih ruangan pada denah, dengan klik atau Tab lalu Enter.</p>
          )}
          <Button variant="primary-outline" onClick={addRoom} disabled={!floor}>
            Tambah ruangan
          </Button>
        </Card>

        <p role="status" className={notice ? `text-xs ${notice.tone === "danger" ? "text-danger" : "text-success"}` : "sr-only"}>
          {notice?.text}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={discard} disabled={!dirty} className="flex-1">
            Batalkan
          </Button>
          <Button onClick={save} disabled={!dirty} className="flex-1">
            Simpan denah
          </Button>
        </div>
        {dirty && <p className="text-[11px] text-muted">Ada perubahan yang belum disimpan.</p>}
      </div>
    </div>
  );
}
