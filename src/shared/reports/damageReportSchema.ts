import { z } from "zod";
import type { ReportCategory } from "@/types/report";
import { reportPhotoSchema } from "./reportPhoto";

const REPORT_CATEGORIES = [
  "kesalahan_sistem",
  "kerusakan_alat",
  "lainnya",
] as const satisfies readonly ReportCategory[];

/**
 * Public/QR complaint form schema (Formulir Pengaduan tanpa login).
 * TODO: kirei-api must validate all fields and file uploads on POST /api/public/reports.
 */
export const damageReportSchema = z.object({
  reporterName: z
    .string()
    .trim()
    .min(2, "Tulis nama pengadu minimal 2 karakter.")
    .max(120, "Nama pengadu maksimal 120 karakter."),
  roomCode: z
    .string()
    .trim()
    .min(2, "Tulis kelas atau ruangan minimal 2 karakter.")
    .max(60, "Kelas atau ruangan maksimal 60 karakter."),
  category: z.enum(REPORT_CATEGORIES, "Pilih kategori pengaduan."),
  body: z
    .string()
    .trim()
    .min(10, "Tulis keterangan pengaduan minimal 10 karakter.")
    .max(1000, "Keterangan maksimal 1000 karakter."),
  photo: reportPhotoSchema.nullable(),
});

export type DamageReportInput = z.input<typeof damageReportSchema>;
export type DamageReportValues = z.output<typeof damageReportSchema>;

/** Laravel field names to form fields, for 422 errors. TODO: match OpenAPI field names. */
export const DAMAGE_REPORT_FIELD_MAP = {
  reporter_name: "reporterName",
  room_code: "roomCode",
  category: "category",
  body: "body",
  photo: "photo",
} as const;
