import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { getLecturerSchedule } from "@/modules/admin-gedung/lecturer-schedule/getLecturerSchedule";
import { ScheduleManager } from "@/modules/admin-gedung/lecturer-schedule/ScheduleManager";
import { getBuildings } from "@/shared/facilities/getBuildings";

export const metadata: Metadata = { title: "Kelola Jadwal" };

export default async function Page() {
  const user = await requireRole(["admin_fakultas"]);
  const fakultasId = user.fakultasId ?? "";
  // An admin manages one building (notulen 19/11/2026), like Kelola Denah.
  const [[building], { schedule }] = await Promise.all([
    fakultasId ? getBuildings({ fakultasId }) : Promise.resolve([]),
    getLecturerSchedule(fakultasId),
  ]);

  return (
    <ScheduleManager
      fakultasId={fakultasId}
      building={building ?? null}
      schedule={schedule}
      now={new Date().toISOString()}
      templateHref="/samples/jadwal-dosen.csv"
    />
  );
}
