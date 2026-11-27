"use client";

import { useState } from "react";
import { Field, INPUT_CLASS, SelectInput } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { Building, Room, RoomManagedBy, RoomType } from "@/types/room";
import { managedByLabel, ROOM_TYPE_LABEL, roomManagedBy } from "./room-labels";
import { RoomPhotoField, RoomStatusField } from "./RoomFormFields";
import type { RoomPhotoChange } from "./roomPhoto";

export interface EditRoomDialogProps {
  room: Room;
  buildings: Building[];
  /** Admin universitas only: shows "Dikelola oleh" and lets it be changed. Admin gedung does not see it. */
  canChangeManager: boolean;
  /** Codes of the other rooms, to reject duplicates before the API does. */
  takenCodes: string[];
  onClose: () => void;
  onSave: (room: Room, photo: RoomPhotoChange) => void;
}

/** Mounted only while open, so the form always starts from the selected room. */
export function EditRoomDialog({ room, buildings, canChangeManager, takenCodes, onClose, onSave }: EditRoomDialogProps) {
  const [draft, setDraft] = useState(room);
  const [error, setError] = useState<string>();
  const [photo, setPhoto] = useState<RoomPhotoChange>({ kind: "keep" });

  const draftBuilding = buildings.find((building) => building.id === draft.buildingId);
  const managedBy = roomManagedBy(draft, draftBuilding);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const code = draft.code.trim();
    if (!code) return setError("Nama ruangan wajib diisi.");
    if (takenCodes.includes(code)) return setError(`Ruangan ${code} sudah ada.`);
    // TODO: PATCH the room through the orval client (multipart when the photo changes) and map 422
    // errors with lib/api/form-errors.
    onSave({ ...draft, code }, photo);
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
        <RoomPhotoField savedUrl={room.photoUrl} photo={photo} onChange={setPhoto} alt={`Foto ${draft.code}`} />
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
          <SelectInput id="room-type" value={draft.type} onChange={(event) => setDraft({ ...draft, type: event.target.value as RoomType })}>
            {Object.entries(ROOM_TYPE_LABEL).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </SelectInput>
        </Field>
        <div className="flex flex-col gap-1">
          <dl className="grid grid-cols-2 gap-2 rounded-md bg-page px-3 py-2">
            <div className="flex min-w-0 flex-col">
              <dt className="text-xs text-primary">Gedung</dt>
              <dd className="text-sm break-words">{draftBuilding?.name ?? "-"}</dd>
            </div>
            <div className="flex min-w-0 flex-col">
              <dt className="text-xs text-primary">Lantai</dt>
              <dd className="text-sm">{draft.floor}</dd>
            </div>
          </dl>
          <p className="text-[11px] text-muted">Gedung dan lantai mengikuti data master ruangan, jadi tidak bisa diubah di sini.</p>
        </div>
        {canChangeManager && (
          <Field label="Dikelola oleh" htmlFor="room-manager">
            <SelectInput
              id="room-manager"
              value={managedBy}
              onChange={(event) => setDraft({ ...draft, managedBy: event.target.value as RoomManagedBy })}
            >
              <option value="gedung">{managedByLabel("gedung", draftBuilding?.name ?? "gedung")}</option>
              <option value="universitas">{managedByLabel("universitas", "")}</option>
            </SelectInput>
          </Field>
        )}
        <RoomStatusField isActive={draft.isActive} onChange={(isActive) => setDraft({ ...draft, isActive })} />
      </form>
    </Modal>
  );
}
