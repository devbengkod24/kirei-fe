import { z } from "zod";
import { letterFileSchema } from "@/shared/reservation/letter";
import { toIsoRange } from "./availability";

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
// 08xx with 9-13 digits in total, written as 08..., 628... or +628...
const PHONE = /^(\+62|62|0)8\d{7,11}$/;

export type ReservationIntent = "draft" | "submit";

/*
 * Client-side checks only. Laravel decides availability, opening hours, and deadlines,
 * and its 422 errors are mapped back onto these fields.
 */

const phoneSchema = z
  .string()
  .transform((value) => value.replace(/[\s-]/g, ""))
  .pipe(z.string().regex(PHONE, "Nomor HP tidak valid. Contoh: 081234567890."));

const describe = (what: string, min: number) =>
  z.string().trim().min(min, `Tulis ${what} minimal ${min} karakter.`).max(255, `${what[0].toUpperCase()}${what.slice(1)} maksimal 255 karakter.`);

/** Fields every reservation type shares: the optional letter and whether it is sent or saved as a draft. */
const submissionShape = {
  letter: letterFileSchema.nullable(),
  intent: z.enum(["draft", "submit"]),
};

type IssueSink = { addIssue: (issue: { code: "custom"; path: string[]; message: string }) => void };

/** Sending needs the letter; a draft can be saved without it and completed before the deadline. */
function requireLetterToSubmit(values: { intent?: string; letter?: File | null }, ctx: IssueSink) {
  if (values.intent === "submit" && !values.letter) {
    ctx.addIssue({
      code: "custom",
      path: ["letter"],
      message: "Unggah surat peminjaman untuk memesan, atau simpan sebagai draft dan unggah nanti.",
    });
  }
}

function requireFutureStart(dateKey: string, startTime: string, endTime: string, now: Date, path: string, ctx: IssueSink) {
  const range = toIsoRange(dateKey, startTime, endTime);
  if (range && Date.parse(range.startsAt) <= now.getTime()) {
    ctx.addIssue({ code: "custom", path: [path], message: "Jam mulai sudah lewat. Pilih waktu yang akan datang." });
  }
}

// `when` on the refinements below lets cross-field checks run even while other fields are still
// invalid, so the schedule step can be validated before the rest of the form is filled in.
const ALWAYS = { when: () => true };

/* ---------- Ruangan ---------- */

/** Fields checked before the summary dialog opens. */
export const SCHEDULE_FIELDS = ["buildingId", "floorId", "date", "startTime", "endTime", "roomId"] as const;

export interface RoomReservationSchemaOptions {
  /** Borrowers give a phone number; admins booking for themselves do not. */
  askPhone?: boolean;
  /** Borrowers need a letter to send (or save a draft); admins book without one. */
  withLetter?: boolean;
}

export function createRoomReservationSchema(
  now: () => Date = () => new Date(),
  { askPhone = true, withLetter = true }: RoomReservationSchemaOptions = {},
) {
  return z
    .object({
      buildingId: z.string().min(1, "Pilih gedung."),
      floorId: z.string().min(1, "Pilih lantai."),
      date: z.string().regex(DATE, "Pilih tanggal reservasi."),
      startTime: z.string().regex(TIME, "Pilih jam mulai."),
      endTime: z.string().regex(TIME, "Pilih jam selesai."),
      roomId: z.string().min(1, "Pilih ruangan pada denah."),
      phone: askPhone ? phoneSchema : z.string(),
      purpose: describe("keperluan", 5),
      ...submissionShape,
    })
    .superRefine((values, ctx) => {
      if (TIME.test(values.startTime) && TIME.test(values.endTime) && values.endTime <= values.startTime) {
        ctx.addIssue({ code: "custom", path: ["endTime"], message: "Jam selesai harus setelah jam mulai." });
      }
      requireFutureStart(values.date, values.startTime, values.endTime, now(), "startTime", ctx);
      if (withLetter) requireLetterToSubmit(values, ctx);
    }, ALWAYS);
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

/* ---------- GOR ---------- */

export const SPORTS_HALL_SCHEDULE_FIELDS = ["date", "startTime", "endTime", "activity", "notes"] as const;

export function createSportsHallReservationSchema(now: () => Date = () => new Date()) {
  return z
    .object({
      date: z.string().regex(DATE, "Pilih tanggal reservasi."),
      // set together from the slot grid, so one message covers both
      startTime: z.string().regex(TIME, "Pilih jam pada jadwal."),
      endTime: z.string().regex(TIME, "Pilih jam pada jadwal."),
      activity: z.string().min(1, "Pilih jenis kegiatan."),
      notes: z.string().trim().max(255, "Keterangan maksimal 255 karakter."),
      ...submissionShape,
    })
    .superRefine((values, ctx) => {
      requireFutureStart(values.date, values.startTime, values.endTime, now(), "startTime", ctx);
      requireLetterToSubmit(values, ctx);
    }, ALWAYS);
}

export type SportsHallReservationInput = z.input<ReturnType<typeof createSportsHallReservationSchema>>;
export type SportsHallReservationValues = z.output<ReturnType<typeof createSportsHallReservationSchema>>;

export const SPORTS_HALL_RESERVATION_FIELD_MAP = {
  starts_at: "startTime",
  ends_at: "endTime",
  activity: "activity",
  notes: "notes",
  letter: "letter",
} as const;

/* ---------- Kendaraan ---------- */

export function createVehicleReservationSchema(today: () => string) {
  return z
    .object({
      phone: phoneSchema,
      destination: describe("tujuan", 3),
      participants: z.coerce
        .number({ message: "Isi jumlah peserta dengan angka." })
        .int("Jumlah peserta harus bilangan bulat.")
        .min(1, "Jumlah peserta minimal 1."),
      activity: describe("keterangan kegiatan", 5),
      startDate: z.string().regex(DATE, "Pilih tanggal mulai."),
      endDate: z.string().regex(DATE, "Pilih tanggal selesai."),
      ...submissionShape,
    })
    .superRefine((values, ctx) => {
      // "YYYY-MM-DD" strings compare in calendar order
      if (DATE.test(values.startDate) && values.startDate < today()) {
        ctx.addIssue({ code: "custom", path: ["startDate"], message: "Tanggal mulai sudah lewat." });
      }
      if (DATE.test(values.startDate) && DATE.test(values.endDate) && values.endDate < values.startDate) {
        ctx.addIssue({ code: "custom", path: ["endDate"], message: "Tanggal selesai tidak boleh sebelum tanggal mulai." });
      }
      requireLetterToSubmit(values, ctx);
    }, ALWAYS);
}

export type VehicleReservationInput = z.input<ReturnType<typeof createVehicleReservationSchema>>;
export type VehicleReservationValues = z.output<ReturnType<typeof createVehicleReservationSchema>>;

export const VEHICLE_RESERVATION_FIELD_MAP = {
  phone: "phone",
  destination: "destination",
  participants: "participants",
  activity: "activity",
  start_date: "startDate",
  end_date: "endDate",
  letter: "letter",
} as const;
