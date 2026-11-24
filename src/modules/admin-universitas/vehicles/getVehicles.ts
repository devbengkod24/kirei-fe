import { connection } from "next/server";
import { getDataMode } from "@/lib/data-mode/getDataMode";
import { MOCK_VEHICLES } from "@/mocks/facilities";
import type { Vehicle } from "@/types/facility";

/** Vehicle types for Kelola Kendaraan. */
export async function getVehicles(): Promise<Vehicle[]> {
  await connection();
  // TODO: replace with the orval client for vehicles (no-store).
  // The "empty" data mode starts with no vehicle types; they are added in Kelola Kendaraan.
  return (await getDataMode()) === "sample" ? MOCK_VEHICLES : [];
}
