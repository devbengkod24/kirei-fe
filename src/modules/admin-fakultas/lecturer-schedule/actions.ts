"use server";

import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { setMockLecturerSchedule } from "@/mocks/lecturerSchedules";
import type { LecturerSchedule, Weekday } from "@/types/schedule";
import { facultyRoomCodes } from "./getLecturerSchedule";
import { lecturerScheduleInputSchema } from "./scheduleCsv";

export type SaveScheduleResult = { ok: true; schedule: LecturerSchedule } | { ok: false; message: string };

/** Replaces the faculty's lecture schedule. The rows were checked in the browser and are checked again here. */
export async function saveLecturerSchedule(input: unknown): Promise<SaveScheduleResult> {
  const user = await getCurrentUser();
  // UX guard only. TODO: POST to kirei-api, which checks the role, the faculty, and every row itself.
  if (user.role !== "admin_fakultas" || !user.fakultasId) {
    return { ok: false, message: "Hanya admin fakultas yang bisa mengunggah jadwal dosen." };
  }

  const parsed = lecturerScheduleInputSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: "Data jadwal tidak valid. Unggah ulang berkas CSV." };

  const rooms = new Set(facultyRoomCodes(user.fakultasId));
  if (parsed.data.entries.some((entry) => !rooms.has(entry.roomCode))) {
    return { ok: false, message: "Ada ruangan yang bukan milik fakultas Anda. Unggah ulang berkas CSV." };
  }

  const schedule: LecturerSchedule = {
    fakultasId: user.fakultasId,
    semester: parsed.data.semester,
    entries: parsed.data.entries.map((entry) => ({ ...entry, day: entry.day as Weekday })),
    uploadedAt: new Date().toISOString(),
  };
  setMockLecturerSchedule(schedule);
  return { ok: true, schedule };
}
