"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ROOM_PHOTO_MAX_SIZE_MB } from "@/config/reservation";
import { RoomPhotoImage } from "./RoomPhotoImage";
import { ROOM_PHOTO_ACCEPT, roomPhotoSchema, type RoomPhotoChange } from "./roomPhoto";

export interface RoomPhotoFieldProps {
  /** The room's saved photo, shown while `photo` is "keep". */
  savedUrl: string | null;
  photo: RoomPhotoChange;
  onChange: (photo: RoomPhotoChange) => void;
  alt: string;
}

/** Upload, replace, or remove the room photo, with a preview and the size and format check. */
export function RoomPhotoField({ savedUrl, photo, onChange, alt }: RoomPhotoFieldProps) {
  const [error, setError] = useState<string>();
  const newPhotoUrl = useMemo(() => (photo.kind === "replace" ? URL.createObjectURL(photo.file) : null), [photo]);
  useEffect(() => () => {
    if (newPhotoUrl) URL.revokeObjectURL(newPhotoUrl);
  }, [newPhotoUrl]);
  const previewUrl = photo.kind === "keep" ? savedUrl : newPhotoUrl;

  const pick = (file: File | undefined) => {
    if (!file) return;
    const parsed = roomPhotoSchema.safeParse(file);
    if (!parsed.success) return setError(parsed.error.issues[0]?.message);
    setError(undefined);
    onChange({ kind: "replace", file: parsed.data });
  };

  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1 text-xs text-primary">Foto Ruangan</legend>
      <div className="relative aspect-[339/189] overflow-hidden rounded-md border border-border bg-page">
        <RoomPhotoImage url={previewUrl} alt={alt} sizes="(min-width: 640px) 400px, 100vw" />
      </div>
      <div className="flex flex-wrap gap-2">
        <label className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-md border border-primary bg-surface px-4 text-sm font-medium text-primary hover:bg-primary-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-border-focus">
          <input
            type="file"
            accept={ROOM_PHOTO_ACCEPT}
            className="sr-only"
            aria-describedby={error ? "room-photo-error room-photo-hint" : "room-photo-hint"}
            onChange={(event) => {
              pick(event.target.files?.[0]);
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
              onChange({ kind: "remove" });
              setError(undefined);
            }}
          >
            Hapus Foto
          </Button>
        )}
      </div>
      <p id="room-photo-hint" className="text-[11px] text-muted">
        JPG, PNG, atau WebP, maksimal {ROOM_PHOTO_MAX_SIZE_MB} MB.
      </p>
      {error && (
        <p id="room-photo-error" role="alert" className="text-[11px] text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}

const STATUS_OPTIONS = [
  { value: true, label: "Aktif", icon: "✓" },
  { value: false, label: "Tidak Aktif", icon: "×" },
];

export interface RoomStatusFieldProps {
  isActive: boolean;
  onChange: (isActive: boolean) => void;
}

/** Aktif / Tidak Aktif toggle for a room. */
export function RoomStatusField({ isActive, onChange }: RoomStatusFieldProps) {
  return (
    <fieldset className="flex flex-col gap-1">
      <legend className="mb-1 text-xs text-primary">Status</legend>
      <div className="grid grid-cols-2 gap-1 rounded-md border border-border p-1">
        {STATUS_OPTIONS.map((option) => {
          const checked = isActive === option.value;
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
              <input type="radio" name="room-status" className="sr-only" checked={checked} onChange={() => onChange(option.value)} />
              <span aria-hidden="true">{option.icon}</span>
              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
