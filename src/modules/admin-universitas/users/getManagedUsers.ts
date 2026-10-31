import { connection } from "next/server";
import { MOCK_MANAGED_USERS } from "@/mocks/users";
import type { ManagedRole, ManagedUser } from "@/types/managedUser";

export async function getManagedUsers(role: ManagedRole): Promise<ManagedUser[]> {
  await connection();
  // TODO: replace with the orval client for users (no-store, filtered by role).
  return MOCK_MANAGED_USERS.filter((user) => user.role === role);
}
