import { z } from "zod";
import { parseCsv } from "@/lib/csv";
import type { LecturerScheduleEntry, Weekday } from "@/types/schedule";

/*
 * Client-side checks so the admin can fix the file before saving. Laravel validates the upload
 * again. TODO: kirei-api must apply the same rules and own the semester dates.
 */

export const SCHEDULE_COLUMNS = ["hari", "jam_mulai", "jam_selesai", "ruangan", "mata_kuliah", "dosen"] as const;

/** Upper bound so a wrong file cannot freeze the page. */
export const SCHEDULE_MAX_ROWS = 2000;

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

/** "7.30", "07.30", and "7:30" all become "07:30". */
function normalizeTime(value: string) {
  const match = value.trim().match(/^(\d{1,2})[.:](\d{2})$/);
  return match ? `${match[1].padStart(2, "0")}:${match[2]}` : value.trim();
}

const time = (label: string) =>
  z
    .string()
    .transform(normalizeTime)
    .pipe(z.string().regex(TIME, `${label} harus berformat JJ:MM, misalnya 07:30.`));

const text = (label: string) =>
  z.string().trim().min(1, `${label} wajib diisi.`).max(255, `${label} maksimal 255 karakter.`);

/** One CSV row, with the faculty's room codes to check against. */
function rowSchema(roomCodes: Map<string, string>) {
  return z
    .object({
      hari: z
        .string()
        .trim()
        .toLowerCase()
        .refine((value) => value in DAYS, "Hari harus Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, atau Minggu.")
        .transform((value) => DAYS[value]),
      jam_mulai: time("Jam mulai"),
      jam_selesai: time("Jam selesai"),
      ruangan: z
        .string()
        .trim()
        .min(1, "Ruangan wajib diisi.")
        .refine((code) => roomCodes.has(code.toUpperCase()), "Ruangan tidak ada di gedung fakultas ini.")
        .transform((code) => roomCodes.get(code.toUpperCase()) ?? code),
      mata_kuliah: text("Mata kuliah"),
      dosen: text("Nama dosen"),
    })
    // Zod runs this even when a time is malformed, so compare only two well-formed times.
    .refine((row) => !TIME.test(row.jam_mulai) || !TIME.test(row.jam_selesai) || row.jam_selesai > row.jam_mulai, {
      message: "Jam selesai harus setelah jam mulai.",
      path: ["jam_selesai"],
    })
    .transform(
      (row): LecturerScheduleEntry => ({
        day: row.hari,
        startTime: row.jam_mulai,
        endTime: row.jam_selesai,
        roomCode: row.ruangan,
        courseName: row.mata_kuliah,
        lecturerName: row.dosen,
      }),
    );
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
  a.day === b.day && a.roomCode === b.roomCode && a.startTime < b.endTime && b.startTime < a.endTime;

/**
 * Reads the schedule CSV. Every problem is reported with its row, so the admin can fix all of them
 * in one pass; nothing is saved while any row has an error.
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
      errors.push({ row: rowNumber, messages: [`Bentrok dengan baris ${entryRows[clash]}: ruangan dan jam yang sama.`] });
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
        startTime: z.string().regex(TIME),
        endTime: z.string().regex(TIME),
        roomCode: z.string().min(1),
        courseName: z.string().min(1).max(255),
        lecturerName: z.string().min(1).max(255),
      }),
    )
    .min(1)
    .max(SCHEDULE_MAX_ROWS),
});
