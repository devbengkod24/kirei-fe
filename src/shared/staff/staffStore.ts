import { z } from "zod";
import { readBrowserDataMode } from "@/lib/data-mode/dataMode";
import { liveKey } from "@/lib/data-mode/liveStorage";
import type { Staff } from "@/types/staff";

/*
 * Demo-only list of drivers kept in this browser, so drivers added in Kelola Staf show up in the
 * Sopir card of a vehicle request. Each data mode keeps its own list. Remove together with the mock
 * data once kirei-api serves staff.
 */

export const MOCK_STAFF_KEY = "kirei:mock-staff";

export function staffKey(): string {
  return readBrowserDataMode() === "empty" ? liveKey("staff") : MOCK_STAFF_KEY;
}

export const staffListSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    phone: z.string(),
    // lists saved before the licence class existed keep their drivers, with no class yet
    licenseClass: z.string().default(""),
    role: z.enum(["sopir", "co_sopir"]),
    isActive: z.boolean(),
  }),
);

type Storage = Pick<globalThis.Storage, "getItem" | "setItem">;

function browserStorage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** The stored list, or null when nothing (or nothing readable) is stored. */
export function readStoredStaff(storage: Storage | null = browserStorage()): Staff[] | null {
  try {
    const raw = storage?.getItem(staffKey());
    if (!raw) return null;
    const parsed = staffListSchema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

const listeners = new Set<() => void>();

/** Fires on changes from this tab and from other tabs. */
export function subscribeStaff(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === staffKey() || event.key === null) listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Replaces the stored list; returns false when the browser would not store it. */
export function saveStaff(list: Staff[], storage: Storage | null = browserStorage()): boolean {
  if (!storage) return false;
  try {
    storage.setItem(staffKey(), JSON.stringify(list));
  } catch {
    return false;
  }
  listeners.forEach((listener) => listener());
  return true;
}
