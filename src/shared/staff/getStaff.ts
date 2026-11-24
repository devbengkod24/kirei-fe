import { connection } from "next/server";
import { getDataMode } from "@/lib/data-mode/getDataMode";
import { MOCK_STAFF } from "@/mocks/staff";
import type { Staff } from "@/types/staff";

/** Drivers for Kelola Staf and the Sopir card. The browser's saved list, if any, replaces this on the client. */
export async function getStaff(): Promise<Staff[]> {
  await connection();
  // TODO: replace with the orval client for staff (no-store).
  // The "empty" data mode starts with no drivers; they are added in Kelola Staf.
  return (await getDataMode()) === "sample" ? MOCK_STAFF : [];
}
