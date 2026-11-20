import type { Metadata } from "next";
import { requireRole } from "@/lib/auth/requireRole";
import { getStaff } from "@/modules/admin-universitas/staff/getStaff";
import { StaffManagement } from "@/modules/admin-universitas/staff/StaffManagement";
import { getManagedUsers } from "@/modules/admin-universitas/users/getManagedUsers";
import { UserManagement } from "@/modules/admin-universitas/users/UserManagement";
import { STAFF_TAB, USER_TAB_PARAM, parseUserTab } from "@/modules/admin-universitas/users/userTabs";
import { getBuildings } from "@/shared/facilities/getBuildings";
import { getFakultasOptions } from "@/shared/fakultas-filter/getFakultasOptions";

export const metadata: Metadata = { title: "Kelola Pengguna" };

export default async function Page({ searchParams }: PageProps<"/admin/pengguna">) {
  await requireRole(["admin_universitas"]);
  const role = parseUserTab((await searchParams)[USER_TAB_PARAM]);
  if (role === STAFF_TAB) return <StaffManagement staff={await getStaff()} now={new Date().toISOString()} />;
  const [users, fakultasOptions, buildings] = await Promise.all([getManagedUsers(role), getFakultasOptions(), getBuildings({ fakultasId: null })]);

  // Remount per tab, so search and paging start over.
  return <UserManagement key={role} role={role} users={users} fakultasOptions={fakultasOptions} buildings={buildings} />;
}
