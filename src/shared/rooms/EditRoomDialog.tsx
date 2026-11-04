"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Field, INPUT_CLASS, SelectInput } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ROOM_PHOTO_MAX_SIZE_MB } from "@/config/reservation";
import type { Building, Room, RoomType } from "@/types/room";
import { ROOM_TYPE_LABEL } from "./room-labels";
import { ROOM_PHOTO_ACCEPT, roomPhotoSchema, type RoomPhotoChange } from "./roomPhoto";

export interface EditRoomDialogProps {
  room: Room;
  buildings: Building[];
  /** Codes of the other rooms, to reject duplicates before the API does. */
  takenCodes: string[];
  onClose: () => void;
  onSave: (room: Room, photo: RoomPhotoChange) => void;
}

const STATUS_OPTIONS = [
  { value: true, label: "Aktif", icon: "✓" },
  { value: false, label: "Tidak Aktif", icon: "×" },
];

/** Mounted only while open, so the form always starts from the selected room. */
export function EditRoomDialog({ room, buildings, takenCodes, onClose, onSave }: EditRoomDialogProps) {
  const [draft, setDraft] = useState(room);
  const [error, setError] = useState<string>();
  const [photo, setPhoto] = useState<RoomPhotoChange>({ kind: "keep" });
  const [photoError, setPhotoError] = useState<string>();
  const newPhotoUrl = useMemo(() => (photo.kind === "replace" ? URL.createObjectURL(photo.file) : null), [photo]);
  useEffect(() => () => {
    if (newPhotoUrl) URL.revokeObjectURL(newPhotoUrl);
  }, [newPhotoUrl]);
  const previewUrl = photo.kind === "keep" ? room.photoUrl : newPhotoUrl;

  const pickPhoto = (file: File | undefined) => {
    if (!file) return;
    const parsed = roomPhotoSchema.safeParse(file);
    if (!parsed.success) return setPhotoError(parsed.error.issues[0]?.message);
    setPhotoError(undefined);
    setPhoto({ kind: "replace", file: parsed.data });
  };

  const floors = buildings.find((building) => building.id === draft.buildingId)?.floors ?? [];

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
        <fieldset className="flex flex-col gap-2">
          <legend className="mb-1 text-xs text-primary">Foto Ruangan</legend>
          <div className="relative aspect-[339/189] overflow-hidden rounded-md border border-border bg-page">
            {previewUrl ? (
              // a new photo is a local blob URL, which the image optimizer cannot fetch
              <Image src={previewUrl} alt={`Foto ${draft.code}`} fill sizes="(min-width: 640px) 400px, 100vw" unoptimized={previewUrl.startsWith("blob:")} className="object-cover" />
            ) : (
              <p className="flex size-full items-center justify-center text-xs text-muted">Belum ada foto ruangan</p>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md border border-primary bg-surface px-4 text-sm font-medium text-primary hover:bg-primary-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-border-focus">
              <input
                type="file"
                accept={ROOM_PHOTO_ACCEPT}
                className="sr-only"
                aria-describedby={photoError ? "room-photo-error room-photo-hint" : "room-photo-hint"}
                onChange={(event) => {
                  pickPhoto(event.target.files?.[0]);
                  // lets the same file be picked again after removing it
                  event.target.value = "";
                }}
              />
              {previewUrl ? "Ganti Foto" : "Unggah Foto"}
            </label>
            {previewUrl && (
              <Button
                variant="danger-outline"
                onClick={() => {
                  setPhoto({ kind: "remove" });
                  setPhotoError(undefined);
                }}
              >
                Hapus Foto
              </Button>
            )}
          </div>
          <p id="room-photo-hint" className="text-[11px] text-muted">
            JPG, PNG, atau WebP, maksimal {ROOM_PHOTO_MAX_SIZE_MB} MB.
          </p>
          {photoError && (
            <p id="room-photo-error" role="alert" className="text-[11px] text-danger">
              {photoError}
            </p>
          )}
        </fieldset>
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
