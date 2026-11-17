import { describe, expect, it } from "vitest";
import { clampTime, joinTime, parseTypedPart, splitTime, stepPart } from "./timeParts";

describe("time wheel", () => {
  it("steps hours by 1 and minutes by 10, wrapping around", () => {
    expect(stepPart("hour", 10, 1)).toBe(11);
    expect(stepPart("hour", 23, 1)).toBe(0);
    expect(stepPart("hour", 0, -1)).toBe(23);
    expect(stepPart("minute", 40, 1)).toBe(50);
    expect(stepPart("minute", 50, 1)).toBe(0);
    expect(stepPart("minute", 0, -2)).toBe(40);
  });

  it("rounds typed minutes to 10 and clamps out-of-range values", () => {
    expect(parseTypedPart("minute", "15")).toBe(20);
    expect(parseTypedPart("minute", "14")).toBe(10);
    expect(parseTypedPart("minute", "58")).toBe(50);
    expect(parseTypedPart("hour", "27")).toBe(23);
    expect(parseTypedPart("hour", "7")).toBe(7);
    expect(parseTypedPart("hour", "ab")).toBeNull();
    expect(parseTypedPart("hour", "")).toBeNull();
  });

  it("keeps hours inside an opening-hours range", () => {
    const hours = { min: 7, max: 20 };
    expect(stepPart("hour", 20, 1, hours)).toBe(7);
    expect(stepPart("hour", 7, -1, hours)).toBe(20);
    expect(stepPart("hour", 12, 1, hours)).toBe(13);
    expect(stepPart("hour", 0, 1, hours)).toBe(8);
    expect(parseTypedPart("hour", "3", hours)).toBe(7);
    expect(parseTypedPart("hour", "23", hours)).toBe(20);
    expect(clampTime("20:30", "07:00", "20:00")).toBe("20:00");
    expect(clampTime("06:50", "07:00", "20:00")).toBe("07:00");
    expect(clampTime("13:40", "07:00", "20:00")).toBe("13:40");
  });

  it("splits and joins HH:MM", () => {
    expect(splitTime("08:30")).toEqual({ hour: 8, minute: 30 });
    expect(splitTime("")).toEqual({ hour: 0, minute: 0 });
    expect(joinTime(8, 0)).toBe("08:00");
  });
});
