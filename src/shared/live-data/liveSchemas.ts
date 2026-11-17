import { z } from "zod";
import type { Announcement } from "@/types/announcement";
import type { Building } from "@/types/facility";
import type { UserReport } from "@/types/report";
import type { LecturerSchedule } from "@/types/schedule";

/*
 * Shapes of what the "empty" data mode keeps in the browser (see lib/data-mode). Stored data is
 * parsed with these before use, so an old or hand-edited value reads as nothing stored.
 */

export const LIVE_NAMES = {
  /** Every building with its floor plans, as saved in Kelola Denah. */
  buildings: "buildings",
  announcements: "announcements",
  reports: "reports",
  /** One lecture schedule per faculty id. */
  lecturerSchedules: "lecturer-schedules",
} as const;

const floorPlanRoomSchema = z.object({
  id: z.string(),
  code: z.string(),
  category: z.enum(["kelas", "lab", "meeting", "auditorium", "galeri"]),
  photoUrl: z.string().nullable(),
  capacity: z.number().nullable(),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
});

export const buildingsSchema: z.ZodType<Building[]> = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    fakultasId: z.string().nullable(),
    fakultasName: z.string().nullable(),
    floors: z.array(
      z.object({ id: z.string(), number: z.number(), planWidth: z.number(), planHeight: z.number(), rooms: z.array(floorPlanRoomSchema) }),
    ),
  }),
);

export const announcementsSchema: z.ZodType<Announcement[]> = z.array(
  z.object({
    id: z.string(),
    title: z.string(),
    category: z.enum(["informasi", "pemberitahuan", "pemeliharaan"]),
    body: z.string(),
    quote: z.string().optional(),
    authorName: z.string(),
    publishedAt: z.string(),
  }),
);

export const reportsSchema: z.ZodType<UserReport[]> = z.array(
  z.object({
    id: z.string(),
    category: z.enum(["kesalahan_sistem", "kerusakan_alat", "lainnya"]),
    body: z.string(),
    roomCode: z.string().nullable(),
    authorName: z.string(),
    createdAt: z.string(),
  }),
);

const weekdaySchema = z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4), z.literal(5), z.literal(6), z.literal(7)]);

export const lecturerSchedulesSchema: z.ZodType<Record<string, LecturerSchedule>> = z.record(
  z.string(),
  z.object({
    fakultasId: z.string(),
    semester: z.object({ startDate: z.string(), endDate: z.string() }),
    entries: z.array(
      z.object({
        day: weekdaySchema,
        startTime: z.string(),
        endTime: z.string(),
        roomCode: z.string(),
        courseName: z.string(),
        lecturerName: z.string(),
      }),
    ),
    uploadedAt: z.string(),
  }),
);
