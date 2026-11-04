import { z } from "zod";
import { ROOM_PHOTO_MAX_SIZE_MB } from "@/config/reservation";

const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Accept attribute for the file input, matching the schema below. */
export const ROOM_PHOTO_ACCEPT = PHOTO_TYPES.join(",");

/** Room photo upload: JPG, PNG, or WebP no larger than the configured limit. Laravel checks it again. */
export const roomPhotoSchema = z
  .instanceof(File, { message: "Pilih foto ruangan." })
  .refine((file) => PHOTO_TYPES.includes(file.type), "Foto harus berformat JPG, PNG, atau WebP.")
  .refine((file) => file.size > 0, "Berkas foto kosong. Pilih berkas lain.")
  .refine((file) => file.size <= ROOM_PHOTO_MAX_SIZE_MB * 1024 * 1024, `Ukuran foto maksimal ${ROOM_PHOTO_MAX_SIZE_MB} MB.`);

/** What happens to the room photo when the dialog is saved. */
export type RoomPhotoChange = { kind: "keep" } | { kind: "replace"; file: File } | { kind: "remove" };
