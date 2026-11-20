import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { FloorPlanEditor } from "@/modules/admin-gedung/floor-plan/FloorPlanEditor";
import { getBuildings } from "@/shared/facilities/getBuildings";

export const metadata: Metadata = { title: "Kelola Denah" };

export default async function Page() {
  const user = await requireRole(["admin_fakultas"]);
  // An admin manages one building (notulen 19/11/2026), so there is no building picker.
  // Without a faculty there is no building to edit, rather than every building.
  const [building] = user.fakultasId ? await getBuildings({ fakultasId: user.fakultasId }) : [];

  return <FloorPlanEditor building={building ?? null} />;
}
