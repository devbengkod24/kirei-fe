import { z } from "zod";
import { LETTER_MAX_SIZE_MB } from "@/config/reservation";

/** Loan letter upload: a PDF no larger than the configured limit. Laravel checks it again. */
export const letterFileSchema = z
  .instanceof(File, { message: "Pilih berkas surat peminjaman." })
  .refine((file) => file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf"), "Surat harus berformat PDF.")
  .refine((file) => file.size > 0, "Berkas surat kosong. Pilih berkas lain.")
  .refine((file) => file.size <= LETTER_MAX_SIZE_MB * 1024 * 1024, `Ukuran surat maksimal ${LETTER_MAX_SIZE_MB} MB.`);
