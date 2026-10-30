import { z } from "zod";
import type { ReportCategory } from "@/types/report";

const CATEGORIES = ["kesalahan_sistem", "kerusakan_alat", "lainnya"] as const satisfies readonly ReportCategory[];

export const complaintSchema = z.object({
  category: z.enum(CATEGORIES, "Pilih kategori pengaduan."),
  body: z
    .string()
    .trim()
    .min(10, "Tulis deskripsi masalah minimal 10 karakter.")
    .max(1000, "Deskripsi maksimal 1000 karakter."),
});

export type ComplaintInput = z.input<typeof complaintSchema>;
export type ComplaintValues = z.output<typeof complaintSchema>;

/** Laravel field names to form fields, for 422 errors. */
export const COMPLAINT_FIELD_MAP = { category: "category", body: "body" } as const;
