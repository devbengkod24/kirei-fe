import type { z } from "zod";

/*
 * Browser storage for the "empty" data mode: one JSON value per name in localStorage, under one
 * prefix so the whole set can be cleared at once. Every call is wrapped, because localStorage can
 * be missing or throw (private mode, blocked site data, quota). Demo data only, never tokens.
 */

export const LIVE_PREFIX = "kirei:live:";

export const liveKey = (name: string) => `${LIVE_PREFIX}${name}`;

type LiveStorage = Pick<Storage, "getItem" | "setItem" | "removeItem" | "key" | "length">;

function browserStorage(): LiveStorage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** The stored JSON as is, or null when there is none. */
export function readLiveRaw(name: string, storage: LiveStorage | null = browserStorage()): string | null {
  try {
    return storage?.getItem(liveKey(name)) ?? null;
  } catch {
    return null;
  }
}

/** Broken or foreign data reads as nothing stored instead of crashing the page. */
export function parseLive<T>(raw: string | null, schema: z.ZodType<T>): T | null {
  if (raw === null) return null;
  try {
    const parsed = schema.safeParse(JSON.parse(raw));
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}

export function readLive<T>(name: string, schema: z.ZodType<T>, storage: LiveStorage | null = browserStorage()): T | null {
  return parseLive(readLiveRaw(name, storage), schema);
}

const listeners = new Map<string, Set<() => void>>();

function notify(name?: string) {
  for (const [key, set] of listeners) {
    if (name === undefined || key === name) set.forEach((listener) => listener());
  }
}

/** For hooks: fires on changes from this tab and from other tabs. */
export function subscribeLive(name: string, listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === liveKey(name) || event.key === null) listener();
  };
  const set = listeners.get(name) ?? new Set();
  listeners.set(name, set.add(listener));
  window.addEventListener("storage", onStorage);
  return () => {
    set.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Returns false when the browser would not store it. */
export function writeLive(name: string, value: unknown, storage: LiveStorage | null = browserStorage()): boolean {
  if (!storage) return false;
  try {
    storage.setItem(liveKey(name), JSON.stringify(value));
  } catch {
    return false;
  }
  notify(name);
  return true;
}

/** Forgets everything made in the "empty" mode. Returns false when storage is unavailable. */
export function clearLive(storage: LiveStorage | null = browserStorage()): boolean {
  if (!storage) return false;
  try {
    const keys = Array.from({ length: storage.length }, (_, index) => storage.key(index)).filter(
      (key): key is string => key !== null && key.startsWith(LIVE_PREFIX),
    );
    keys.forEach((key) => storage.removeItem(key));
  } catch {
    return false;
  }
  notify();
  return true;
}
