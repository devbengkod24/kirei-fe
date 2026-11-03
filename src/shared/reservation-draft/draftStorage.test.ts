import { describe, expect, it } from "vitest";
import { letterDeadline, parseDrafts, readDrafts, removeDraft, saveDraft, type DraftDetails } from "./draftStorage";

function memoryStorage() {
  const items = new Map<string, string>();
  return {
    getItem: (key: string) => items.get(key) ?? null,
    setItem: (key: string, value: string) => void items.set(key, value),
  };
}

const details: DraftDetails = {
  type: "ruangan",
  startsAt: "2026-11-05T01:00:00.000Z",
  endsAt: "2026-11-05T03:00:00.000Z",
  unitName: "H.5.1",
  purpose: "Rapat pengurus",
};

describe("draft storage", () => {
  it("saves a draft with its request and reads it back", () => {
    const storage = memoryStorage();
    expect(saveDraft(details, { room_id: "h-5-1" }, new Date("2026-11-03T00:00:00Z"), storage)).toBe(true);

    const [draft] = readDrafts(storage);
    expect(draft).toMatchObject({ ...details, savedAt: "2026-11-03T00:00:00.000Z", request: { room_id: "h-5-1" } });
  });

  it("removes only the chosen draft", () => {
    const storage = memoryStorage();
    saveDraft(details, {}, new Date(), storage);
    saveDraft({ ...details, unitName: "H.5.2" }, {}, new Date(), storage);
    const [first] = readDrafts(storage);

    expect(removeDraft(first.id, storage)).toBe(true);
    expect(readDrafts(storage).map((draft) => draft.unitName)).toEqual(["H.5.2"]);
  });

  it("reports failure when there is no storage or writing throws", () => {
    expect(saveDraft(details, {}, new Date(), null)).toBe(false);
    const full = {
      getItem: () => null,
      setItem: () => {
        throw new Error("QuotaExceededError");
      },
    };
    expect(saveDraft(details, {}, new Date(), full)).toBe(false);
  });

  it("gives the letter 24 hours after saving, but never past the reservation start", () => {
    expect(letterDeadline({ savedAt: "2026-11-03T00:00:00.000Z", startsAt: "2026-11-10T01:00:00.000Z" })).toBe(
      "2026-11-04T00:00:00.000Z",
    );
    expect(letterDeadline({ savedAt: "2026-11-03T00:00:00.000Z", startsAt: "2026-11-03T10:00:00.000Z" })).toBe(
      "2026-11-03T10:00:00.000Z",
    );
  });

  it("reads broken or foreign data as no drafts", () => {
    expect(parseDrafts("{not json")).toEqual([]);
    expect(parseDrafts(JSON.stringify([{ id: 1 }]))).toEqual([]);
    expect(parseDrafts(null)).toEqual([]);
    const throwing = {
      getItem: () => {
        throw new Error("SecurityError");
      },
      setItem: () => {},
    };
    expect(readDrafts(throwing)).toEqual([]);
  });
});
