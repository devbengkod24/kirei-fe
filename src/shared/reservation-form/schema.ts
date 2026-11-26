import { z } from "zod";
import {
  ROOM_CLOSE_TIME,
  ROOM_OPEN_TIME,
  SPORTS_HALL_BOOKING_DAYS,
  SPORTS_HALL_MAX_MINUTES,
} from "@/config/reservation";
import { addDaysToKey, toWibDateKey } from "@/lib/date";
import { letterFileSchema } from "@/shared/reservation/letter";
import { toIsoRange } from "./availability";
import { BOOKING_MODES, type BookingMode } from "./bookingMode";

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
// 08xx with 9-13 digits in total, written as 08..., 628... or +628...
const PHONE = /^(\+62|62|0)8\d{7,11}$/;

export type ReservationIntent = "draft" | "submit";

/*
 * Client-side checks only. Laravel decides availability, opening hours, and deadlines,
 * and its 422 errors are mapped back onto these fields.
 */

export const phoneSchema = z
  .string()
  .transform((value) => value.replace(/[\s-]/g, ""))
  .pipe(z.string().regex(PHONE, "Nomor HP tidak valid. Contoh: 081234567890."));

const describe = (what: string, min: number) =>
  z
    .string()
    .trim()
    .min(min, `Tulis ${what} minimal ${min} karakter.`)
    .max(
      255,
      `${what[0].toUpperCase()}${what.slice(1)} maksimal 255 karakter.`,
    );

/** Fields every reservation type shares: the optional letter and whether it is sent or saved as a draft. */
const submissionShape = {
  letter: letterFileSchema.nullable(),
  intent: z.enum(["draft", "submit"]),
};

type IssueSink = {
  addIssue: (issue: {
    code: "custom";
    path: string[];
    message: string;
  }) => void;
};

/** Sending needs the letter; a draft can be saved without it and completed before the deadline. */
function requireLetterToSubmit(
  values: { intent?: string; letter?: File | null },
  ctx: IssueSink,
  withDraft: boolean,
) {
  if (values.intent === "submit" && !values.letter) {
    ctx.addIssue({
      code: "custom",
      path: ["letter"],
      // Only borrowers with a draft list can put the letter off.
      message: withDraft
        ? "Unggah surat peminjaman untuk memesan, atau simpan sebagai draft dan unggah nanti."
        : "Unggah surat peminjaman untuk memesan.",
    });
  }
}

function requireFutureStart(
  dateKey: string,
  startTime: string,
  endTime: string,
  now: Date,
  path: string,
  ctx: IssueSink,
) {
  const range = toIsoRange(dateKey, startTime, endTime);
  if (range && Date.parse(range.startsAt) <= now.getTime()) {
    ctx.addIssue({
      code: "custom",
      path: [path],
      message: "Jam mulai sudah lewat. Pilih waktu yang akan datang.",
    });
  }
}

/** Ormawa and UKM book no earlier than H-2; other modes pass 0 and skip the check. */
function requireMinDaysAhead(dateKey: string, minDaysAhead: number, now: Date, ctx: IssueSink) {
  if (minDaysAhead === 0 || !DATE.test(dateKey)) return;
  // "YYYY-MM-DD" strings compare in calendar order
  if (dateKey < addDaysToKey(toWibDateKey(now), minDaysAhead)) {
    ctx.addIssue({
      code: "custom",
      path: ["date"],
      message: "Ormawa dan UKM tidak bisa memesan untuk hari ini dan besok. Pilih tanggal lusa atau setelahnya.",
    });
  }
}

// `when` on the refinements below lets cross-field checks run even while other fields are still
// invalid, so the schedule step can be validated before the rest of the form is filled in.
const ALWAYS = { when: () => true };

/* ---------- Ruangan ---------- */

/** Fields checked before the summary dialog opens. */
export const SCHEDULE_FIELDS = [
  "buildingId",
  "floorId",
  "date",
  "startTime",
  "endTime",
  "roomId",
] as const;

export function createRoomReservationSchema(
  now: () => Date = () => new Date(),
  mode: BookingMode = "request",
) {
  const { askPhone, withLetter, withDraft, minDaysAhead } = BOOKING_MODES[mode];
  return z
    .object({
      buildingId: z.string().min(1, "Pilih gedung."),
      floorId: z.string().min(1, "Pilih lantai."),
      date: z.string().regex(DATE, "Pilih tanggal reservasi."),
      startTime: z.string().regex(TIME, "Pilih jam mulai."),
      endTime: z.string().regex(TIME, "Pilih jam selesai."),
      roomId: z.string().min(1, "Pilih ruangan pada kalender."),
      phone: askPhone ? phoneSchema : z.string(),
      purpose: describe("keperluan", 5),
      ...submissionShape,
    })
    .superRefine((values, ctx) => {
      if (
        TIME.test(values.startTime) &&
        TIME.test(values.endTime) &&
        values.endTime <= values.startTime
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["endTime"],
          message: "Jam selesai harus setelah jam mulai.",
        });
      }
      const hoursMessage = `Ruangan hanya bisa dipesan pukul ${ROOM_OPEN_TIME.replace(":", ".")} sampai ${ROOM_CLOSE_TIME.replace(":", ".")} WIB.`;
      // "HH:mm" strings compare in clock order
      if (TIME.test(values.startTime) && values.startTime < ROOM_OPEN_TIME) {
        ctx.addIssue({ code: "custom", path: ["startTime"], message: hoursMessage });
      } else if (TIME.test(values.endTime) && values.endTime > ROOM_CLOSE_TIME) {
        ctx.addIssue({ code: "custom", path: ["endTime"], message: hoursMessage });
      }
      requireFutureStart(
        values.date,
        values.startTime,
        values.endTime,
        now(),
        "startTime",
        ctx,
      );
      requireMinDaysAhead(values.date, minDaysAhead, now(), ctx);
      if (withLetter) requireLetterToSubmit(values, ctx, withDraft);
    }, ALWAYS);
}

export type RoomReservationInput = z.input<
  ReturnType<typeof createRoomReservationSchema>
>;
export type RoomReservationValues = z.output<
  ReturnType<typeof createRoomReservationSchema>
>;

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

export const SPORTS_HALL_SCHEDULE_FIELDS = [
  "date",
  "startTime",
  "endTime",
  "activity",
  "notes",
] as const;

export function createSportsHallReservationSchema(
  now: () => Date = () => new Date(),
  mode: BookingMode = "request",
) {
  const { withLetter, withDraft, minDaysAhead } = BOOKING_MODES[mode];
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
      const current = now();
      requireFutureStart(
        values.date,
        values.startTime,
        values.endTime,
        current,
        "startTime",
        ctx,
      );
      // "YYYY-MM-DD" strings compare in calendar order
      if (DATE.test(values.date) && values.date > lastBookableDay(current)) {
        ctx.addIssue({
          code: "custom",
          path: ["date"],
          message: `GOR hanya bisa dipesan sampai ${SPORTS_HALL_BOOKING_DAYS} hari ke depan.`,
        });
      }
      if (
        TIME.test(values.startTime) &&
        TIME.test(values.endTime) &&
        minutesBetween(values.startTime, values.endTime) >
          SPORTS_HALL_MAX_MINUTES
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["endTime"],
          message: `Satu reservasi GOR maksimal ${SPORTS_HALL_MAX_MINUTES / 60} jam.`,
        });
      }
      requireMinDaysAhead(values.date, minDaysAhead, current, ctx);
      if (withLetter) requireLetterToSubmit(values, ctx, withDraft);
    }, ALWAYS);
}

const minutesBetween = (start: string, end: string) =>
  Number(end.slice(0, 2)) * 60 +
  Number(end.slice(3, 5)) -
  (Number(start.slice(0, 2)) * 60 + Number(start.slice(3, 5)));

function lastBookableDay(now: Date) {
  return toWibDateKey(
    now.getTime() + (SPORTS_HALL_BOOKING_DAYS - 1) * 24 * 60 * 60 * 1000,
  );
}

export type SportsHallReservationInput = z.input<
  ReturnType<typeof createSportsHallReservationSchema>
>;
export type SportsHallReservationValues = z.output<
  ReturnType<typeof createSportsHallReservationSchema>
>;

export const SPORTS_HALL_RESERVATION_FIELD_MAP = {
  starts_at: "startTime",
  ends_at: "endTime",
  activity: "activity",
  notes: "notes",
  letter: "letter",
} as const;

/* ---------- Kendaraan ---------- */

/** A longer route is planned with the admin; five covers the trips in the sample data with room to spare. */
export const MAX_DESTINATIONS = 5;

export { TRIP_KIND_LABEL } from "@/shared/reservation/vehicleTrip";

/** What the vehicle check needs to know; returns which field is wrong and why, or null. */
export type VehicleIssue = (values: {
  vehicleId: string;
  units: number;
  participants: number;
  startDate: string;
  endDate: string;
}) => { field: "vehicleId" | "units"; message: string } | null;

/**
 * A trip with one vehicle type and how many units of it. Which units go is still the admin's call.
 * "internal" skips phone and letter. `vehicleIssue` checks the free units against the bookings the form knows.
 */
export function createVehicleReservationSchema(
  today: () => string,
  mode: BookingMode = "request",
  vehicleIssue: VehicleIssue = () => null,
) {
  const { askPhone, withLetter, withDraft } = BOOKING_MODES[mode];
  return z
    .object({
      phone: askPhone ? phoneSchema : z.string(),
      startDate: z.string().regex(DATE, "Pilih tanggal mulai."),
      endDate: z.string().regex(DATE, "Pilih tanggal selesai."),
      tripKind: z
        .string()
        .pipe(z.enum(["menginap", "antar_jemput"], { message: "Pilih menginap atau antar jemput." })),
      participants: z.coerce
        .number({ message: "Isi jumlah peserta dengan angka." })
        .int("Jumlah peserta harus bilangan bulat.")
        .min(1, "Jumlah peserta minimal 1."),
      vehicleId: z.string().min(1, "Pilih kendaraan."),
      units: z.coerce
        .number({ message: "Isi jumlah unit dengan angka." })
        .int("Jumlah unit harus bilangan bulat.")
        .min(1, "Jumlah unit minimal 1."),
      destinations: z
        .array(z.object({ name: describe("tujuan", 3) }))
        .min(1, "Tambah minimal satu tujuan.")
        .max(MAX_DESTINATIONS, `Tujuan maksimal ${MAX_DESTINATIONS}.`),
      activity: describe("keterangan kegiatan", 5),
      ...submissionShape,
    })
    .superRefine((values, ctx) => {
      // "YYYY-MM-DD" strings compare in calendar order
      if (DATE.test(values.startDate) && values.startDate < today()) {
        ctx.addIssue({
          code: "custom",
          path: ["startDate"],
          message: "Tanggal mulai sudah lewat.",
        });
      }
      const datesValid = DATE.test(values.startDate) && DATE.test(values.endDate);
      if (datesValid && values.endDate < values.startDate) {
        ctx.addIssue({
          code: "custom",
          path: ["endDate"],
          message: "Tanggal selesai tidak boleh sebelum tanggal mulai.",
        });
      }
      if (datesValid && values.tripKind === "menginap" && values.endDate <= values.startDate) {
        ctx.addIssue({
          code: "custom",
          path: ["tripKind"],
          message: "Menginap butuh tanggal selesai setelah tanggal mulai.",
        });
      }
      const units = Number(values.units);
      if (values.vehicleId && Number.isInteger(units) && units > 0) {
        const issue = vehicleIssue({ ...values, units, participants: Number(values.participants) });
        if (issue) ctx.addIssue({ code: "custom", path: [issue.field], message: issue.message });
      }
      if (withLetter) requireLetterToSubmit(values, ctx, withDraft);
    }, ALWAYS);
}

export type VehicleReservationInput = z.input<
  ReturnType<typeof createVehicleReservationSchema>
>;
export type VehicleReservationValues = z.output<
  ReturnType<typeof createVehicleReservationSchema>
>;

export const VEHICLE_RESERVATION_FIELD_MAP = {
  phone: "phone",
  start_date: "startDate",
  end_date: "endDate",
  trip_kind: "tripKind",
  participants: "participants",
  vehicle_id: "vehicleId",
  units: "units",
  destinations: "destinations",
  activity: "activity",
  letter: "letter",
} as const;
