import { describe, expect, it } from "vitest";
import { z } from "zod";
import { parseDataMode } from "./dataMode";
import { clearLive, liveKey, parseLive, readLive, writeLive } from "./liveStorage";

function memoryStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
    removeItem: (key: string) => void data.delete(key),
    key: (index: number) => [...data.keys()][index] ?? null,
    get length() {
      return data.size;
    },
  };
}

const names = z.array(z.string());

describe("parseDataMode", () => {
  it("falls back to the sample data for anything but 'empty'", () => {
    expect(parseDataMode("empty")).toBe("empty");
    expect(parseDataMode("sample")).toBe("sample");
    expect(parseDataMode(undefined)).toBe("sample");
    expect(parseDataMode("kosong")).toBe("sample");
  });
});

describe("live storage", () => {
  it("reads back what was written", () => {
    const storage = memoryStorage();
    expect(readLive("names", names, storage)).toBeNull();
    expect(writeLive("names", ["a", "b"], storage)).toBe(true);
    expect(readLive("names", names, storage)).toEqual(["a", "b"]);
  });

  it("reads broken or foreign data as nothing stored", () => {
    expect(parseLive("not json", names)).toBeNull();
    expect(parseLive(JSON.stringify({ a: 1 }), names)).toBeNull();
  });

  it("reports a failed write", () => {
    expect(writeLive("names", [], null)).toBe(false);
  });

  it("clears only its own keys", () => {
    const storage = memoryStorage({ "kirei:mock-reservations": "{}", [liveKey("names")]: "[]", [liveKey("reports")]: "[]" });
    expect(clearLive(storage)).toBe(true);
    expect(storage.length).toBe(1);
    expect(storage.getItem("kirei:mock-reservations")).toBe("{}");
  });
});
