"use client";

import { useState } from "react";
import { Field, INPUT_CLASS, SelectInput } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { Building, Room, RoomType } from "@/types/room";
import { ROOM_TYPE_LABEL } from "./room-labels";

export interface EditRoomDialogProps {
  room: Room;
  buildings: Building[];
  /** Codes of the other rooms, to reject duplicates before the API does. */
  takenCodes: string[];
  onClose: () => void;
  onSave: (room: Room) => void;
}

const STATUS_OPTIONS = [
  { value: true, label: "Aktif", icon: "✓" },
  { value: false, label: "Tidak Aktif", icon: "×" },
];

/** Mounted only while open, so the form always starts from the selected room. */
export function EditRoomDialog({ room, buildings, takenCodes, onClose, onSave }: EditRoomDialogProps) {
  const [draft, setDraft] = useState(room);
  const [error, setError] = useState<string>();
  const floors = buildings.find((building) => building.id === draft.buildingId)?.floors ?? [];

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const code = draft.code.trim();
    if (!code) return setError("Nama ruangan wajib diisi.");
    if (takenCodes.includes(code)) return setError(`Ruangan ${code} sudah ada.`);
    // TODO: PATCH the room through the orval client and map 422 errors with lib/api/form-errors.
    onSave({ ...draft, code });
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Edit Ruangan"
      footer={
        <>
          <Button variant="danger-outline" onClick={onClose}>
            Kembali
          </Button>
          <Button type="submit" form="edit-room-form" variant="primary-outline">
            Simpan
          </Button>
        </>
      }
    >
      <form id="edit-room-form" onSubmit={submit} noValidate className="flex flex-col gap-3">
        <Field label="Nama Ruangan" htmlFor="room-code" error={error}>
          <input
            id="room-code"
            value={draft.code}
            onChange={(event) => {
              setDraft({ ...draft, code: event.target.value });
              setError(undefined);
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "room-code-error" : undefined}
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="Tipe Ruangan" htmlFor="room-type">
          <SelectInput
            id="room-type"
            value={draft.type}
            onChange={(event) => setDraft({ ...draft, type: event.target.value as RoomType })}
          >
            {Object.entries(ROOM_TYPE_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Gedung" htmlFor="room-building">
          <SelectInput
            id="room-building"
            value={draft.buildingId}
            onChange={(event) => {
              const building = buildings.find((item) => item.id === event.target.value);
              setDraft({ ...draft, buildingId: event.target.value, floor: building?.floors[0] ?? draft.floor });
            }}
          >
            {buildings.map((building) => (
              <option key={building.id} value={building.id}>
                {building.name}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Lantai" htmlFor="room-floor">
          <SelectInput
            id="room-floor"
            value={draft.floor}
            onChange={(event) => setDraft({ ...draft, floor: Number(event.target.value) })}
          >
            {floors.map((floor) => (
              <option key={floor} value={floor}>
                {floor}
              </option>
            ))}
          </SelectInput>
        </Field>
        <fieldset className="flex flex-col gap-1">
          <legend className="mb-1 text-xs text-primary">Status</legend>
          <div className="grid grid-cols-2 gap-1 rounded-md border border-border p-1">
            {STATUS_OPTIONS.map((option) => {
              const checked = draft.isActive === option.value;
              return (
                <label
                  key={option.label}
                  className={`flex min-h-11 items-center justify-center gap-2 rounded-md border text-sm font-medium has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-border-focus ${
                    checked
                      ? option.value
                        ? "border-success text-success"
                        : "border-danger text-danger"
                      : "border-transparent text-muted hover:bg-page"
                  }`}
                >
                  <input
                    type="radio"
                    name="room-status"
                    className="sr-only"
                    checked={checked}
                    onChange={() => setDraft({ ...draft, isActive: option.value })}
                  />
                  <span aria-hidden="true">{option.icon}</span>
                  {option.label}
                </label>
              );
            })}
          </div>
        </fieldset>
      </form>
    </Modal>
  );
}
