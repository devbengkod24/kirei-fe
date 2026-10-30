import { z } from "zod";
import { letterFileSchema } from "@/shared/reservation/letter";
import { toIsoRange } from "./availability";

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
// 08xx with 9-13 digits in total, written as 08..., 628... or +628...
const PHONE = /^(\+62|62|0)8\d{7,11}$/;

export type ReservationIntent = "draft" | "submit";

/** Fields checked before the summary dialog opens. */
export const SCHEDULE_FIELDS = ["buildingId", "floorId", "date", "startTime", "endTime", "roomId"] as const;

/**
 * Client-side checks only. Laravel decides availability, opening hours, and deadlines,
 * and its 422 errors are mapped back onto these fields.
 */
export function createRoomReservationSchema(now: () => Date = () => new Date()) {
  return z
    .object({
      buildingId: z.string().min(1, "Pilih gedung."),
      floorId: z.string().min(1, "Pilih lantai."),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pilih tanggal reservasi."),
      startTime: z.string().regex(TIME, "Pilih jam mulai."),
      endTime: z.string().regex(TIME, "Pilih jam selesai."),
      roomId: z.string().min(1, "Pilih ruangan pada denah."),
      phone: z
        .string()
        .transform((value) => value.replace(/[\s-]/g, ""))
        .pipe(z.string().regex(PHONE, "Nomor HP tidak valid. Contoh: 081234567890.")),
      purpose: z
        .string()
        .trim()
        .min(5, "Tulis keperluan minimal 5 karakter.")
        .max(255, "Keperluan maksimal 255 karakter."),
      letter: letterFileSchema.nullable(),
      intent: z.enum(["draft", "submit"]),
    })
    // `when` lets these cross-field checks run even while other fields are still invalid,
    // so the schedule step can be validated before phone and purpose are filled in.
    .superRefine((values, ctx) => {
      if (TIME.test(values.startTime) && TIME.test(values.endTime) && values.endTime <= values.startTime) {
        ctx.addIssue({ code: "custom", path: ["endTime"], message: "Jam selesai harus setelah jam mulai." });
      }

      const range = toIsoRange(values.date, values.startTime, values.endTime);
      if (range && Date.parse(range.startsAt) <= now().getTime()) {
        ctx.addIssue({ code: "custom", path: ["startTime"], message: "Jam mulai sudah lewat. Pilih waktu yang akan datang." });
      }

      if (values.intent === "submit" && !values.letter) {
        ctx.addIssue({
          code: "custom",
          path: ["letter"],
          message: "Unggah surat peminjaman untuk memesan, atau simpan sebagai draft dan unggah nanti.",
        });
      }
    }, { when: () => true });
}

export type RoomReservationInput = z.input<ReturnType<typeof createRoomReservationSchema>>;
export type RoomReservationValues = z.output<ReturnType<typeof createRoomReservationSchema>>;

/** Laravel field names to form fields. TODO: match the request keys in the OpenAPI spec. */
export const ROOM_RESERVATION_FIELD_MAP = {
  building_id: "buildingId",
  room_id: "roomId",
  date: "date",
  starts_at: "startTime",
  ends_at: "endTime",
  phone: "phone",
  purpose: "purpose",
  letter: "letter",
} as const;
