import { describe, expect, it } from "vitest";
import { SKS_DURATION_MINUTES, SKS_SLOTS, SKS_START_TIME, formatSksSlotRange, sksRangeToTimes, sksSlotNumbersForEntry } from "./sks";

describe("SKS schedule configuration", () => {
  it("starts at 07:00 WIB with 50-minute slots and 30-minute session breaks ending at 21:00", () => {
    expect(SKS_START_TIME).toBe("07:00");
    expect(SKS_DURATION_MINUTES).toBe(50);
    expect(SKS_SLOTS[0]).toMatchObject({ slot: 1, start: "07:00", end: "07:50", session: "Pagi", afterBreak: false });
    expect(SKS_SLOTS[5]).toMatchObject({ slot: 6, start: "11:10", end: "12:00", session: "Pagi", afterBreak: false });
    expect(SKS_SLOTS[6]).toMatchObject({ slot: 7, start: "12:30", end: "13:20", session: "Siang", afterBreak: true });
    expect(SKS_SLOTS[9]).toMatchObject({ slot: 10, start: "15:30", end: "16:20", session: "Sore", afterBreak: true });
    expect(SKS_SLOTS[12]).toMatchObject({ slot: 13, start: "18:30", end: "19:20", session: "Malam", afterBreak: true });
    expect(SKS_SLOTS.at(-1)).toMatchObject({ slot: 15, start: "20:10", end: "21:00", session: "Malam" });
    expect(SKS_SLOTS).toHaveLength(15);
  });

  it("converts start slot and SKS count to startTime/endTime", () => {
    expect(sksRangeToTimes(1, 3)).toEqual({ startTime: "07:00", endTime: "09:30" });
    expect(sksRangeToTimes(7, 3)).toEqual({ startTime: "12:30", endTime: "15:00" });
    expect(sksRangeToTimes(14, 3)).toBeNull();
    expect(sksRangeToTimes(0, 2)).toBeNull();
  });

  it("formats slot ranges and expands occupied slot numbers", () => {
    expect(formatSksSlotRange(1, 1)).toBe("Slot 1 (1 SKS)");
    expect(formatSksSlotRange(2, 3)).toBe("Slot 2-4 (3 SKS)");
    expect(sksSlotNumbersForEntry(2, 3)).toEqual([2, 3, 4]);
  });
});
