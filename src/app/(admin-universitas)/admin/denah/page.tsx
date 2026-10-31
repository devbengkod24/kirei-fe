import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { FloorPlanEditor } from "@/modules/admin-universitas/floor-plan/FloorPlanEditor";
import { getFloorPlanBuildings } from "@/modules/admin-universitas/floor-plan/getFloorPlanBuildings";

export const metadata: Metadata = { title: "Kelola Denah" };

export default async function Page() {
  await requireRole(["admin_universitas"]);
  const buildings = await getFloorPlanBuildings();

  return <FloorPlanEditor buildings={buildings} />;
}
