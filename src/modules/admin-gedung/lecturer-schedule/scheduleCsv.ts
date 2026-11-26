import { z } from "zod";
import { SKS_SLOTS, sksRangeToTimes } from "@/config/sks";
import { parseCsv } from "@/lib/csv";
import type { LecturerScheduleEntry, Weekday } from "@/types/schedule";

/*
 * Client-side checks so the admin gedung can fix the file before saving. Laravel validates the upload
 * again. TODO: kirei-api must apply the same SKS slot rules and own the semester dates.
 */

export const SCHEDULE_COLUMNS = ["hari", "slot_sks", "jumlah_sks", "ruangan", "mata_kuliah", "dosen", "kelompok"] as const;

/** Upper bound so a wrong file cannot freeze the page. */
export const SCHEDULE_MAX_ROWS = 2000;
export const MAX_SKS_PER_ENTRY = 6;

const DAYS: Record<string, Weekday> = {
  senin: 1,
  selasa: 2,
  rabu: 3,
  kamis: 4,
  jumat: 5,
  "jum'at": 5,
  sabtu: 6,
  minggu: 7,
};

export const DAY_LABEL: Record<Weekday, string> = {
  1: "Senin",
  2: "Selasa",
  3: "Rabu",
  4: "Kamis",
  5: "Jumat",
  6: "Sabtu",
  7: "Minggu",
};

const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

const text = (label: string, maxLength = 255) =>
  z.string().trim().min(1, `${label} wajib diisi.`).max(maxLength, `${label} maksimal ${maxLength} karakter.`);

const positiveInt = (label: string, max: number, hint: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} wajib diisi.`)
    .refine((value) => /^\d+$/.test(value), `${label} harus berupa angka bulat (${hint}).`)
    .transform(Number)
    .refine((value) => value >= 1 && value <= max, `${label} harus antara 1 sampai ${max}.`);

/** One CSV row, with the building's room codes to check against. */
function rowSchema(roomCodes: Map<string, string>) {
  return z
    .object({
      hari: z
        .string()
        .trim()
        .toLowerCase()
        .refine((value) => value in DAYS, "Hari harus Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, atau Minggu.")
        .transform((value) => DAYS[value]),
      slot_sks: positiveInt("Slot SKS", SKS_SLOTS.length, `1-${SKS_SLOTS.length}`),
      jumlah_sks: positiveInt("Jumlah SKS", MAX_SKS_PER_ENTRY, `1-${MAX_SKS_PER_ENTRY}`),
      ruangan: z
        .string()
        .trim()
        .min(1, "Ruangan wajib diisi.")
        .refine((code) => roomCodes.has(code.toUpperCase()), "Ruangan tidak ada di gedung ini.")
        .transform((code) => roomCodes.get(code.toUpperCase()) ?? code),
      mata_kuliah: text("Mata kuliah"),
      dosen: text("Nama dosen"),
      kelompok: text("Kelompok", 100),
    })
    .superRefine((row, ctx) => {
      if (
        Number.isInteger(row.slot_sks) &&
        Number.isInteger(row.jumlah_sks) &&
        row.slot_sks >= 1 &&
        row.jumlah_sks >= 1 &&
        !sksRangeToTimes(row.slot_sks, row.jumlah_sks)
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["jumlah_sks"],
          message: `Slot SKS melebihi batas jam operasional (maksimal slot ${SKS_SLOTS.length}).`,
        });
      }
    })
    .transform((row): LecturerScheduleEntry => {
      const range = sksRangeToTimes(row.slot_sks, row.jumlah_sks) ?? { startTime: "07:00", endTime: "07:50" };
      return {
        day: row.hari,
        sksSlot: row.slot_sks,
        sksCount: row.jumlah_sks,
        startTime: range.startTime,
        endTime: range.endTime,
        roomCode: row.ruangan,
        courseName: row.mata_kuliah,
        lecturerName: row.dosen,
        classGroup: row.kelompok,
      };
    });
}

export interface ScheduleRowError {
  /** Row in the file, the header being row 1. */
  row: number;
  messages: string[];
}

export interface ParsedSchedule {
  entries: LecturerScheduleEntry[];
  errors: ScheduleRowError[];
}

const overlaps = (a: LecturerScheduleEntry, b: LecturerScheduleEntry) =>
  a.day === b.day &&
  a.roomCode === b.roomCode &&
  a.sksSlot < b.sksSlot + b.sksCount &&
  b.sksSlot < a.sksSlot + a.sksCount;

/**
 * Reads the SKS-based schedule CSV. Every problem is reported with its row, so the admin can fix
 * all of them in one pass; nothing is saved while any row has an error.
 */
export function parseScheduleCsv(csv: string, roomCodes: string[]): ParsedSchedule {
  const [header, ...rows] = parseCsv(csv);
  if (!header) return { entries: [], errors: [{ row: 1, messages: ["Berkas CSV kosong."] }] };

  const columns = header.map((name) => name.trim().toLowerCase());
  const missing = SCHEDULE_COLUMNS.filter((name) => !columns.includes(name));
  if (missing.length > 0) {
    return { entries: [], errors: [{ row: 1, messages: [`Kolom ${missing.join(", ")} tidak ada di baris judul.`] }] };
  }
  if (rows.length === 0) return { entries: [], errors: [{ row: 2, messages: ["Belum ada jadwal di bawah baris judul."] }] };
  if (rows.length > SCHEDULE_MAX_ROWS) {
    return { entries: [], errors: [{ row: 1, messages: [`Maksimal ${SCHEDULE_MAX_ROWS} baris jadwal dalam satu berkas.`] }] };
  }

  const schema = rowSchema(new Map(roomCodes.map((code) => [code.toUpperCase(), code])));
  const entries: LecturerScheduleEntry[] = [];
  const entryRows: number[] = [];
  const errors: ScheduleRowError[] = [];

  rows.forEach((cells, index) => {
    const rowNumber = index + 2;
    const record = Object.fromEntries(SCHEDULE_COLUMNS.map((name) => [name, cells[columns.indexOf(name)] ?? ""]));
    const parsed = schema.safeParse(record);
    if (!parsed.success) {
      errors.push({ row: rowNumber, messages: [...new Set(parsed.error.issues.map((issue) => issue.message))] });
      return;
    }
    const clash = entries.findIndex((entry) => overlaps(entry, parsed.data));
    if (clash !== -1) {
      errors.push({ row: rowNumber, messages: [`Bentrok dengan baris ${entryRows[clash]}: ruangan dan slot SKS yang sama.`] });
      return;
    }
    entries.push(parsed.data);
    entryRows.push(rowNumber);
  });

  return { entries, errors };
}

/** Semester range chosen next to the upload. Both days are included. */
export const semesterSchema = z
  .object({
    startDate: z.string().regex(DATE, "Pilih tanggal mulai semester."),
    endDate: z.string().regex(DATE, "Pilih tanggal selesai semester."),
  })
  // "YYYY-MM-DD" strings compare in calendar order
  .refine((value) => value.endDate > value.startDate, {
    message: "Tanggal selesai harus setelah tanggal mulai.",
    path: ["endDate"],
  });

/** What the save action receives; the server checks it again before storing. */
export const lecturerScheduleInputSchema = z.object({
  semester: semesterSchema,
  entries: z
    .array(
      z.object({
        day: z.number().int().min(1).max(7),
        sksSlot: z.number().int().min(1).max(SKS_SLOTS.length),
        sksCount: z.number().int().min(1).max(MAX_SKS_PER_ENTRY),
        startTime: z.string().regex(TIME),
        endTime: z.string().regex(TIME),
        roomCode: z.string().min(1),
        courseName: z.string().min(1).max(255),
        lecturerName: z.string().min(1).max(255),
        classGroup: z.string().min(1).max(100),
      }),
    )
    .min(1)
    .max(SCHEDULE_MAX_ROWS),
});
