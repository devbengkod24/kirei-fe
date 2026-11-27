"use client";

import { useState } from "react";
import { Field, INPUT_CLASS, SelectInput } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { Building, Room, RoomType } from "@/types/room";
import { ROOM_TYPE_LABEL } from "./room-labels";
import { RoomPhotoField, RoomStatusField } from "./RoomFormFields";
import type { RoomPhotoChange } from "./roomPhoto";

export interface AddRoomDialogProps {
  /** Buildings the admin may add rooms to. */
  buildings: Building[];
  /** Building and floor picked in the filters, used as the starting values. */
  initialBuildingId: string;
  initialFloor: number;
  /** Codes of every room, to reject duplicates before the API does. */
  takenCodes: string[];
  onClose: () => void;
  onSave: (room: Room, photo: RoomPhotoChange) => void;
}

interface Errors {
  code?: string;
  type?: string;
}

/** Tambah Ruangan for admin gedung. Mounted only while open, so the form starts empty each time. */
export function AddRoomDialog({ buildings, initialBuildingId, initialFloor, takenCodes, onClose, onSave }: AddRoomDialogProps) {
  const [code, setCode] = useState("");
  const [type, setType] = useState<RoomType | "">("");
  const [buildingId, setBuildingId] = useState(initialBuildingId);
  const [floor, setFloor] = useState(initialFloor);
  const [isActive, setIsActive] = useState(true);
  const [photo, setPhoto] = useState<RoomPhotoChange>({ kind: "keep" });
  const [errors, setErrors] = useState<Errors>({});

  const building = buildings.find((item) => item.id === buildingId);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = code.trim();
    const next: Errors = {};
    if (!trimmed) next.code = "Nama ruangan wajib diisi.";
    else if (takenCodes.includes(trimmed)) next.code = `Ruangan ${trimmed} sudah ada.`;
    if (!type) next.type = "Pilih tipe ruangan.";
    if (next.code || next.type || !type) return setErrors(next);
    // TODO: POST the room through the orval client (multipart with the photo); map 422 with lib/api/form-errors.
    // TODO: align RoomType with the API (kelas, lab, meeting, auditorium, gor).
    onSave({ id: crypto.randomUUID(), code: trimmed, type, buildingId, floor, isActive, photoUrl: null, plan: null }, photo);
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Tambah Ruangan"
      footer={
        <>
          <Button variant="danger-outline" onClick={onClose}>
            Kembali
          </Button>
          <Button type="submit" form="add-room-form" variant="primary-outline">
            Simpan
          </Button>
        </>
      }
    >
      <form id="add-room-form" onSubmit={submit} noValidate className="flex flex-col gap-3">
        <RoomPhotoField savedUrl={null} photo={photo} onChange={setPhoto} alt={`Foto ${code.trim() || "ruangan baru"}`} />
        <Field label="Nama Ruangan" htmlFor="new-room-code" error={errors.code}>
          <input
            id="new-room-code"
            value={code}
            placeholder="mis. H.5.13"
            onChange={(event) => {
              setCode(event.target.value);
              setErrors({ ...errors, code: undefined });
            }}
            aria-invalid={errors.code ? true : undefined}
            aria-describedby={errors.code ? "new-room-code-error" : undefined}
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="Tipe Ruangan" htmlFor="new-room-type" error={errors.type}>
          <SelectInput
            id="new-room-type"
            value={type}
            onChange={(event) => {
              setType(event.target.value as RoomType);
              setErrors({ ...errors, type: undefined });
            }}
            aria-invalid={errors.type ? true : undefined}
            aria-describedby={errors.type ? "new-room-type-error" : undefined}
          >
            <option value="" disabled>
              Pilih tipe ruangan
            </option>
            {Object.entries(ROOM_TYPE_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Gedung" htmlFor="new-room-building">
            <SelectInput
              id="new-room-building"
              value={buildingId}
              onChange={(event) => {
                const next = buildings.find((item) => item.id === event.target.value);
                setBuildingId(event.target.value);
                setFloor(next?.floors[0] ?? 0);
              }}
            >
              {buildings.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </SelectInput>
          </Field>
          <Field label="Lantai" htmlFor="new-room-floor">
            <SelectInput id="new-room-floor" value={floor} onChange={(event) => setFloor(Number(event.target.value))}>
              {building?.floors.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </SelectInput>
          </Field>
        </div>
        <RoomStatusField isActive={isActive} onChange={setIsActive} />
      </form>
    </Modal>
  );
}
