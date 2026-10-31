import { connection } from "next/server";
import { MOCK_BUILDINGS } from "@/mocks/facilities";
import type { Building } from "@/types/facility";

/** Every building with its floor plans; the building picker in the editor narrows it down. */
export async function getFloorPlanBuildings(): Promise<Building[]> {
  await connection();
  // TODO: replace with the orval client for buildings and floor plans (no-store).
  return MOCK_BUILDINGS;
}
