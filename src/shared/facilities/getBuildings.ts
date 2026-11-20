import { connection } from "next/server";
import { MOCK_BUILDINGS } from "@/mocks/facilities";
import type { AdminScope } from "@/shared/admin-scope";
import type { Building } from "@/types/facility";

/** Buildings in the scope with their floor plans; `fakultasId: null` means every building. */
export async function getBuildings(scope: AdminScope): Promise<Building[]> {
  await connection();
  // TODO: replace with the orval client for buildings and floor plans (no-store, filtered by scope).
  return MOCK_BUILDINGS.filter((building) => scope.fakultasId === null || building.fakultasId === scope.fakultasId);
}
