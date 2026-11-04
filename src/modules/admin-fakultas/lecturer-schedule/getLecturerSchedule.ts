import { connection } from "next/server";
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
  return { schedule: getMockLecturerSchedule(fakultasId), roomCodes: facultyRoomCodes(fakultasId) };
}
