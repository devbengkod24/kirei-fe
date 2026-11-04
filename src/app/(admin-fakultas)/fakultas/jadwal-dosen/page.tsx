import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { getLecturerSchedule } from "@/modules/admin-fakultas/lecturer-schedule/getLecturerSchedule";
import { LecturerScheduleUpload } from "@/modules/admin-fakultas/lecturer-schedule/LecturerScheduleUpload";

export const metadata: Metadata = { title: "Jadwal Dosen" };

export default async function Page() {
  const user = await requireRole(["admin_fakultas"]);
  const { schedule, roomCodes } = await getLecturerSchedule(user.fakultasId ?? "");

  return <LecturerScheduleUpload schedule={schedule} roomCodes={roomCodes} templateHref="/samples/jadwal-dosen.csv" />;
}
