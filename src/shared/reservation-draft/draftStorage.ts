import { z } from "zod";
import { DRAFT_LETTER_HOURS } from "@/config/reservation";

/*
 * Drafts live only in this browser: nothing reaches Laravel until the borrower sends the draft
 * with its letter. Every storage call is wrapped, because localStorage can be missing or throw
 * (private mode, blocked site data, quota), and the booking form must keep working without it.
 */

const STORAGE_KEY = "kirei:reservation-drafts";

const storedDraftSchema = z.object({
  id: z.string(),
  type: z.enum(["ruangan", "gor", "kendaraan"]),
  /** ISO 8601 (UTC) */
  startsAt: z.string(),
  /** ISO 8601 (UTC) */
  endsAt: z.string(),
  /** Room code, GOR name, or "Kendaraan". */
  unitName: z.string(),
  /** Rooms only: the building, so the admin sees it once the draft is sent. */
  buildingName: z.string().optional(),
  purpose: z.string(),
  /** ISO 8601 (UTC) */
  savedAt: z.string(),
  /** The API request body without the letter, sent as is once the letter is added. */
  request: z.record(z.string(), z.unknown()),
});

export type StoredDraft = z.infer<typeof storedDraftSchema>;

export type DraftDetails = Omit<StoredDraft, "id" | "savedAt" | "request">;

/**
 * ISO 8601 (UTC). The letter is due 24 hours after saving, or when the reservation starts if
 * that comes first, since a draft cannot be sent for a slot that has begun.
 */
export function letterDeadline(draft: Pick<StoredDraft, "savedAt" | "startsAt">): string {
  const due = Date.parse(draft.savedAt) + DRAFT_LETTER_HOURS * 60 * 60 * 1000;
  return new Date(Math.min(due, Date.parse(draft.startsAt))).toISOString();
}

type DraftStorage = Pick<Storage, "getItem" | "setItem">;

function browserStorage(): DraftStorage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

/** Broken or foreign data reads as no drafts instead of crashing the page. */
export function parseDrafts(raw: string | null): StoredDraft[] {
  try {
    const parsed = z.array(storedDraftSchema).safeParse(JSON.parse(raw ?? "[]"));
    return parsed.success ? parsed.data : [];
  } catch {
    return [];
  }
}

/** The stored JSON as is. A string, so React can compare snapshots without re-parsing. */
export function draftsSnapshot(storage: DraftStorage | null = browserStorage()): string {
  try {
    return storage?.getItem(STORAGE_KEY) ?? "[]";
  } catch {
    return "[]";
  }
}

export function readDrafts(storage: DraftStorage | null = browserStorage()): StoredDraft[] {
  return parseDrafts(draftsSnapshot(storage));
}

const listeners = new Set<() => void>();

/** For useSyncExternalStore: fires on changes from this tab and from other tabs. */
export function subscribeDrafts(listener: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function writeDrafts(drafts: StoredDraft[], storage: DraftStorage | null): boolean {
  if (!storage) return false;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(drafts));
  } catch {
    return false;
  }
  listeners.forEach((listener) => listener());
  return true;
}

/** Returns false when the browser would not store it. */
export function saveDraft(
  details: DraftDetails,
  request: Record<string, unknown>,
  now: Date = new Date(),
  storage: DraftStorage | null = browserStorage(),
): boolean {
  const draft: StoredDraft = {
    ...details,
    id: `draft-${now.getTime().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    savedAt: now.toISOString(),
    request,
  };
  return writeDrafts([...readDrafts(storage), draft], storage);
}

export function removeDraft(id: string, storage: DraftStorage | null = browserStorage()): boolean {
  return writeDrafts(
    readDrafts(storage).filter((draft) => draft.id !== id),
    storage,
  );
}
