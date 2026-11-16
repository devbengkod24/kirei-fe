import { connection } from "next/server";
import { getDataMode } from "@/lib/data-mode/getDataMode";
import { MOCK_BUILDINGS } from "@/mocks/facilities";
import { getMockLecturerSchedule } from "@/mocks/lecturerSchedules";
import type { LecturerSchedule } from "@/types/schedule";

export interface LecturerScheduleData {
  schedule: LecturerSchedule | null;
  /** Rooms on the faculty's floor plans, to check the CSV against. */
  roomCodes: string[];
}

export function facultyRoomCodes(fakultasId: string) {
  return MOCK_BUILDINGS.filter((building) => building.fakultasId === fakultasId).flatMap((building) =>
    building.floors.flatMap((floor) => floor.rooms.map((room) => room.code)),
  );
}

export async function getLecturerSchedule(fakultasId: string): Promise<LecturerScheduleData> {
  await connection();
  // TODO: replace with the orval clients for the faculty's schedule and rooms (no-store).
  // The "empty" data mode starts without a schedule; an upload is kept in the browser instead.
  const seeded = (await getDataMode()) === "sample";
  return { schedule: seeded ? getMockLecturerSchedule(fakultasId) : null, roomCodes: facultyRoomCodes(fakultasId) };
}
