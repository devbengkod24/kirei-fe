import { describe, expect, it } from "vitest";
import type { Building, FloorPlanRoom, UnitBooking } from "@/types/facility";
import { crossFacultyApprover, defaultSchedule, rangesOverlap, roomStatus, toIsoRange } from "./availability";

const room = (id: string, category: FloorPlanRoom["category"] = "kelas"): FloorPlanRoom => ({
  id,
  code: id,
  category,
  photoUrl: null,
  capacity: null,
  x: 0,
  y: 0,
  width: 10,
  height: 10,
});

// H.5.2 is taken 09:00-11:00 WIB on 30 Oct 2026
const bookings: UnitBooking[] = [{ unitId: "H.5.2", startsAt: "2026-10-30T02:00:00Z", endsAt: "2026-10-30T04:00:00Z" }];

const base = {
  bookings,
  startsAt: "2026-10-30T03:00:00Z", // 10:00 WIB
  endsAt: "2026-10-30T05:00:00Z", // 12:00 WIB
  category: null,
  selectedRoomId: "",
  canUseBookedSlot: false,
};

describe("rangesOverlap", () => {
  it("treats ranges as half-open", () => {
    expect(rangesOverlap("2026-10-30T02:00:00Z", "2026-10-30T04:00:00Z", "2026-10-30T04:00:00Z", "2026-10-30T05:00:00Z")).toBe(false);
    expect(rangesOverlap("2026-10-30T02:00:00Z", "2026-10-30T04:00:00Z", "2026-10-30T03:59:00Z", "2026-10-30T05:00:00Z")).toBe(true);
    expect(rangesOverlap("2026-10-30T02:00:00Z", "2026-10-30T06:00:00Z", "2026-10-30T03:00:00Z", "2026-10-30T04:00:00Z")).toBe(true);
  });
});

describe("roomStatus", () => {
  it("marks a room booked when its booking overlaps the chosen time", () => {
    expect(roomStatus(room("H.5.2"), base)).toEqual({ status: "booked", selectable: false });
    expect(roomStatus(room("H.5.1"), base)).toEqual({ status: "available", selectable: true });
  });

  it("frees the room once the chosen time no longer overlaps", () => {
    const afternoon = { ...base, startsAt: "2026-10-30T04:00:00Z", endsAt: "2026-10-30T06:00:00Z" };
    expect(roomStatus(room("H.5.2"), afternoon).status).toBe("available");
  });

  it("does not mark anything booked while the time range is incomplete", () => {
    expect(roomStatus(room("H.5.2"), { ...base, startsAt: null, endsAt: null }).status).toBe("available");
  });

  it("shows the selected room only while it can still be picked", () => {
    expect(roomStatus(room("H.5.1"), { ...base, selectedRoomId: "H.5.1" }).status).toBe("selected");
    expect(roomStatus(room("H.5.2"), { ...base, selectedRoomId: "H.5.2" }).status).toBe("booked");
  });

  it("lets admins pick a booked room", () => {
    expect(roomStatus(room("H.5.2"), { ...base, canUseBookedSlot: true })).toEqual({ status: "booked", selectable: true });
    expect(roomStatus(room("H.5.2"), { ...base, canUseBookedSlot: true, selectedRoomId: "H.5.2" }).status).toBe("selected");
  });

  it("puts rooms of another category outside the filter, even when booked", () => {
    expect(roomStatus(room("H.5.2", "kelas"), { ...base, category: "meeting" })).toEqual({ status: "filtered", selectable: false });
  });
});

describe("toIsoRange", () => {
  it("converts WIB inputs and rejects incomplete or reversed ranges", () => {
    expect(toIsoRange("2026-10-30", "10:00", "12:00")).toEqual({
      startsAt: "2026-10-30T03:00:00.000Z",
      endsAt: "2026-10-30T05:00:00.000Z",
    });
    expect(toIsoRange("2026-10-30", "12:00", "10:00")).toBeNull();
    expect(toIsoRange("2026-10-30", "10:00", "10:00")).toBeNull();
    expect(toIsoRange("", "10:00", "12:00")).toBeNull();
  });
});

describe("defaultSchedule", () => {
  it("starts at the next full hour in WIB", () => {
    // 12:23 WIB
    expect(defaultSchedule(new Date("2026-10-30T05:23:00Z"))).toEqual({ date: "2026-10-30", startTime: "13:00", endTime: "15:00" });
  });

  it("moves to the next morning late in the evening", () => {
    // 21:10 WIB
    expect(defaultSchedule(new Date("2026-10-30T14:10:00Z"))).toEqual({ date: "2026-10-31", startTime: "08:00", endTime: "10:00" });
  });
});

describe("crossFacultyApprover", () => {
  const building = (fakultasId: string | null): Building => ({
    id: "b",
    name: "Gedung E",
    fakultasId,
    fakultasName: fakultasId ? "Fakultas Ekonomi dan Bisnis" : null,
    floors: [],
  });

  it("names the owning faculty when it is not the borrower's", () => {
    expect(crossFacultyApprover("fik", building("feb"))).toBe("Fakultas Ekonomi dan Bisnis");
    // university-level ormawa (BEM, UKM) have no faculty
    expect(crossFacultyApprover(null, building("feb"))).toBe("Fakultas Ekonomi dan Bisnis");
  });

  it("stays quiet for the borrower's own faculty and for university buildings", () => {
    expect(crossFacultyApprover("feb", building("feb"))).toBeNull();
    expect(crossFacultyApprover("fik", building(null))).toBeNull();
  });
});
