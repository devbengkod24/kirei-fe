import { describe, expect, it } from "vitest";
import type { Vehicle } from "@/types/facility";
import { describeAssignment, setAssignedUnits, summarizeAssignment } from "./vehicleAssignment";

const HIACE: Vehicle = { id: "vehicle-hiace", name: "Toyota Hiace", capacity: 15, unitCount: 3, isActive: true };
const BUS: Vehicle = { id: "vehicle-bus", name: "Bus Udinus", capacity: 40, unitCount: 2, isActive: true };

describe("vehicle assignment", () => {
  it("keeps the units between zero and what the campus owns", () => {
    expect(setAssignedUnits({}, HIACE, 5)).toEqual({ "vehicle-hiace": 3 });
    expect(setAssignedUnits({ "vehicle-hiace": 1 }, HIACE, 0)).toEqual({});
    expect(setAssignedUnits({ "vehicle-hiace": 1 }, HIACE, -1)).toEqual({});
  });

  it("adds up units and seats across kinds, in the list order", () => {
    const summary = summarizeAssignment({ "vehicle-bus": 1, "vehicle-hiace": 2 }, [HIACE, BUS]);
    expect(summary.units).toBe(3);
    expect(summary.seats).toBe(2 * 15 + 40);
    expect(describeAssignment(summary.items)).toBe("2 Toyota Hiace dan 1 Bus Udinus");
  });

  it("describes a single kind without a conjunction", () => {
    expect(describeAssignment(summarizeAssignment({ "vehicle-hiace": 2 }, [HIACE, BUS]).items)).toBe("2 Toyota Hiace");
  });
});
