import { describe, expect, it } from "vitest";
import type { ReservationRecord } from "@/types/reservation";
import type { ClassSchedule } from "@/types/schedule";
import { buildTimeline, defaultHourFilter, nowOffset, rulerTicks, segmentSpan, toggleRoom } from "./slots";

// WIB is UTC+7, so 07:00 WIB on 2026-10-31 is 00:00Z.
const at = (time: string) => `2026-10-31T${String(Number(time.slice(0, 2)) - 7).padStart(2, "0")}:${time.slice(3)}:00.000Z`;
const reservation = (unitName: string, start: string, end: string) =>
  ({ id: `${unitName}-${start}`, unitName, startsAt: at(start), endsAt: at(end) }) as ReservationRecord;
const schedule = (unitName: string, start: string, end: string) =>
  ({ id: `${unitName}-${start}`, unitName, startsAt: at(start), endsAt: at(end) }) as ClassSchedule;

const shape = (segments: ReturnType<typeof buildTimeline>) => segments.map((s) => `${s.kind} ${s.start}-${s.end}`);

describe("buildTimeline", () => {
  it("fills the gaps around classes and reservations with free segments", () => {
    const segments = buildTimeline(
      "2026-10-31",
      "H.5.1",
      "07:00",
      "11:00",
      [reservation("H.5.1", "09:00", "09:30")],
      [schedule("H.5.1", "07:30", "08:30")],
    );
    expect(shape(segments)).toEqual([
      "free 07:00-07:30",
      "siadin 07:30-08:30",
      "free 08:30-09:00",
      "reservasi 09:00-09:30",
      "free 09:30-11:00",
    ]);
  });

  it("clips what runs past the filtered hours and drops what is outside them", () => {
    const segments = buildTimeline(
      "2026-10-31",
      "H.5.1",
      "08:00",
      "10:00",
      [reservation("H.5.1", "09:30", "11:00"), reservation("H.5.1", "13:00", "14:00")],
      [schedule("H.5.1", "07:00", "08:30")],
    );
    expect(shape(segments)).toEqual(["siadin 08:00-08:30", "free 08:30-09:30", "reservasi 09:30-10:00"]);
  });

  it("ignores other rooms and other days", () => {
    const otherDay = { ...reservation("H.5.1", "09:00", "10:00"), startsAt: "2026-11-01T02:00:00.000Z", endsAt: "2026-11-01T03:00:00.000Z" };
    const segments = buildTimeline("2026-10-31", "H.5.1", "07:00", "09:00", [reservation("H.5.2", "07:00", "08:00"), otherDay], []);
    expect(shape(segments)).toEqual(["free 07:00-09:00"]);
  });

  it("does not draw an overlap twice", () => {
    const segments = buildTimeline(
      "2026-10-31",
      "H.5.1",
      "07:00",
      "10:00",
      [reservation("H.5.1", "08:30", "09:30")],
      [schedule("H.5.1", "08:00", "09:00")],
    );
    expect(shape(segments)).toEqual(["free 07:00-08:00", "siadin 08:00-09:00", "reservasi 09:00-09:30", "free 09:30-10:00"]);
  });
});

describe("defaultHourFilter", () => {
  it("starts at the current WIB hour", () => {
    expect(defaultHourFilter(new Date("2026-10-31T02:25:00Z"))).toEqual({ from: "09:00", to: "11:00" });
  });

  it("stays inside opening hours early and late in the day", () => {
    expect(defaultHourFilter(new Date("2026-10-30T22:00:00Z"))).toEqual({ from: "07:00", to: "09:00" });
    expect(defaultHourFilter(new Date("2026-10-31T14:30:00Z"))).toEqual({ from: "19:00", to: "21:00" });
  });
});

describe("segmentSpan", () => {
  it("measures a segment in minutes from the start of the range", () => {
    expect(segmentSpan({ start: "08:40", end: "10:20" }, "08:00")).toEqual({ offset: 40, length: 100 });
  });
});

describe("rulerTicks", () => {
  it("marks every 10 minutes and labels every half hour", () => {
    const ticks = rulerTicks("07:00", "08:00");
    expect(ticks.map((tick) => tick.offset)).toEqual([0, 10, 20, 30, 40, 50, 60]);
    expect(ticks.filter((tick) => tick.label).map((tick) => tick.label)).toEqual(["07.00", "07.30", "08.00"]);
  });
});

describe("nowOffset", () => {
  // 2026-10-31 09:20 WIB
  const now = new Date("2026-10-31T02:20:00Z");

  it("places the current time inside the range", () => {
    expect(nowOffset(now, "2026-10-31", "09:00", "11:00")).toBe(20);
  });

  it("hides the marker outside the range or on another day", () => {
    expect(nowOffset(now, "2026-10-31", "10:00", "12:00")).toBeNull();
    expect(nowOffset(now, "2026-11-01", "09:00", "11:00")).toBeNull();
  });
});

describe("toggleRoom", () => {
  it("shows a hidden room and hides a visible one", () => {
    expect(toggleRoom(["a", "b"], "c")).toEqual(["a", "b", "c"]);
    expect(toggleRoom(["a", "b"], "a")).toEqual(["b"]);
  });

  it("keeps the last visible room", () => {
    expect(toggleRoom(["a"], "a")).toEqual(["a"]);
  });
});
