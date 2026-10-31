import { z } from "zod";

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;

/* Client-side checks only. Laravel decides availability and its 422 errors are mapped back onto these fields. */
export const operatorReservationSchema = z
  .object({
    roomId: z.string().min(1, "Pilih ruangan."),
    bookerName: z.string().trim().min(3, "Tulis nama peminjam minimal 3 karakter.").max(255, "Nama peminjam maksimal 255 karakter."),
    purpose: z.string().trim().min(5, "Tulis keperluan minimal 5 karakter.").max(255, "Keperluan maksimal 255 karakter."),
    startTime: z.string().regex(TIME, "Pilih jam mulai."),
    endTime: z.string().regex(TIME, "Pilih jam selesai."),
  })
  .refine((values) => values.endTime > values.startTime, { path: ["endTime"], message: "Jam selesai harus setelah jam mulai." });

export type OperatorReservationValues = z.infer<typeof operatorReservationSchema>;

/** Laravel field names to form fields, for 422 errors. TODO: match the keys to the OpenAPI spec. */
export const OPERATOR_RESERVATION_FIELD_MAP = {
  room_id: "roomId",
  booker_name: "bookerName",
  purpose: "purpose",
  starts_at: "startTime",
  ends_at: "endTime",
} as const;
