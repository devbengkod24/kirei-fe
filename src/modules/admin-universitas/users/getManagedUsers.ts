import { connection } from "next/server";
import { getDataMode } from "@/lib/data-mode/getDataMode";
import { MOCK_BUILDINGS } from "@/mocks/facilities";
import { MOCK_OPERATOR_FLOOR } from "@/mocks/operator";
import { MOCK_ACCOUNTS } from "@/mocks/user";
import { MOCK_MANAGED_USERS } from "@/mocks/users";
import type { ManagedRole, ManagedUser } from "@/types/managedUser";
import { placeAccountName } from "./userTabs";

const MANAGED_ROLES: readonly string[] = ["organisasi", "dosen", "admin_fakultas", "operator"] satisfies ManagedRole[];
const isManagedRole = (role: string): role is ManagedRole => MANAGED_ROLES.includes(role);

/** The demo login accounts as Kelola Pengguna lists them: all that exists in the "empty" data mode. */
export function demoAccountUsers(): ManagedUser[] {
  return MOCK_ACCOUNTS.flatMap((account): ManagedUser[] => {
    if (!isManagedRole(account.role)) return [];
    const { buildingId, floorNumber } = MOCK_OPERATOR_FLOOR;
    const floorId = `${buildingId}-${floorNumber}`;
    // The demo admin gedung and operator share the sample operator's building.
    const building = MOCK_BUILDINGS.find((item) => item.id === buildingId);
    const isPlaceAccount = account.role === "admin_fakultas" || account.role === "operator";
    return [
      {
        id: account.id,
        role: account.role,
        name: isPlaceAccount && building ? placeAccountName(account.role, building, floorId) : account.name,
        email: account.email,
        fakultasId: account.role === "dosen" ? account.fakultasId : null,
        // Sample staff number; the demo account carries none.
        npp: account.role === "dosen" ? "19800521" : undefined,
        buildingId: account.role === "admin_fakultas" ? buildingId : undefined,
        floor: account.role === "operator" ? { buildingId, floorId } : undefined,
        isActive: true,
      },
    ];
  });
}

export async function getManagedUsers(role: ManagedRole): Promise<ManagedUser[]> {
  await connection();
  // TODO: replace with the orval client for users (no-store, filtered by role).
  const users = (await getDataMode()) === "sample" ? MOCK_MANAGED_USERS : demoAccountUsers();
  return users.filter((user) => user.role === role);
}
