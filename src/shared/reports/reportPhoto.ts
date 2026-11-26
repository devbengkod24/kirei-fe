import { z } from "zod";
import { REPORT_PHOTO_MAX_SIZE_MB } from "@/config/reservation";

const PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Accept attribute for the file input, matching the schema below. */
export const REPORT_PHOTO_ACCEPT = PHOTO_TYPES.join(",");

/** Damage report photo upload: JPG, PNG, or WebP within the configured size limit. TODO: kirei-api must validate the same rules on upload. */
export const reportPhotoSchema = z
  .instanceof(File, { message: "Pilih foto kerusakan." })
  .refine((file) => PHOTO_TYPES.includes(file.type), "Foto harus berformat JPG, PNG, atau WebP.")
  .refine((file) => file.size > 0, "Berkas foto kosong. Pilih berkas lain.")
  .refine((file) => file.size <= REPORT_PHOTO_MAX_SIZE_MB * 1024 * 1024, `Ukuran foto maksimal ${REPORT_PHOTO_MAX_SIZE_MB} MB.`);

const STORED_PHOTO_MAX_PX = 1280;

/** Scales a photo down into a JPEG data URL so browser demo reports survive reloads; falls back to a blob URL. */
export async function toReportPhotoUrl(file: File): Promise<string> {
  // TODO: kirei-api unggah foto kerusakan via multipart/form-data dan simpan URL dari server.
  try {
    if (typeof createImageBitmap === "function") {
      const bitmap = await createImageBitmap(file);
      const scale = Math.min(1, STORED_PHOTO_MAX_PX / Math.max(bitmap.width, bitmap.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(bitmap.width * scale);
      canvas.height = Math.round(bitmap.height * scale);
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
        bitmap.close();
        return canvas.toDataURL("image/jpeg", 0.8);
      }
      bitmap.close();
    }
  } catch {
    // Fall through to FileReader / object URL
  }
  return URL.createObjectURL(file);
}
