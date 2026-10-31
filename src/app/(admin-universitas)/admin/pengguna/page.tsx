import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { getFloorPlanBuildings } from "@/modules/admin-universitas/floor-plan/getFloorPlanBuildings";
import { getManagedUsers } from "@/modules/admin-universitas/users/getManagedUsers";
import { UserManagement } from "@/modules/admin-universitas/users/UserManagement";
import { USER_TAB_PARAM, parseUserTab } from "@/modules/admin-universitas/users/userTabs";
import { getFakultasOptions } from "@/shared/fakultas-filter/getFakultasOptions";

export const metadata: Metadata = { title: "Kelola Pengguna" };

export default async function Page({ searchParams }: PageProps<"/admin/pengguna">) {
  await requireRole(["admin_universitas"]);
  const role = parseUserTab((await searchParams)[USER_TAB_PARAM]);
  const [users, fakultasOptions, buildings] = await Promise.all([getManagedUsers(role), getFakultasOptions(), getFloorPlanBuildings()]);

  // Remount per tab, so search and paging start over.
  return <UserManagement key={role} role={role} users={users} fakultasOptions={fakultasOptions} buildings={buildings} />;
}
