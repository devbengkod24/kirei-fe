import { describe, expect, it } from "vitest";
import type { Vehicle } from "@/types/facility";
import { createVehicleSchema, searchVehicles, type VehicleInput } from "./vehicleSchema";

const VEHICLES: Vehicle[] = [
  { id: "vehicle-hiace", name: "Toyota Hiace", capacity: 15, unitCount: 3, isActive: true, minPassengers: 6 },
  { id: "vehicle-bus", name: "Bus Udinus", capacity: 40, unitCount: 2, isActive: true },
];

const valid: VehicleInput = {
  name: "Toyota Hiace Premio",
  isActive: true,
  minPassengers: 3,
  capacity: 7,
  unitCount: 1,
};

const issues = (input: VehicleInput, editingId: string | null = null) => {
  const result = createVehicleSchema(VEHICLES, editingId).safeParse(input);
  return result.success ? {} : Object.fromEntries(result.error.issues.map((issue) => [issue.path.join("."), issue.message]));
};

describe("vehicle schema", () => {
  it("accepts a vehicle type", () => {
    expect(issues(valid)).toEqual({});
  });

  it("needs a name not used by another type", () => {
    expect(issues({ ...valid, name: "Ab" })).toMatchObject({ name: "Tulis nama minimal 3 karakter." });
    expect(issues({ ...valid, name: "  toyota   HIACE " })).toMatchObject({ name: "Jenis kendaraan dengan nama ini sudah ada." });
    expect(issues({ ...valid, name: "Toyota Hiace" }, "vehicle-hiace")).toEqual({});
  });

  it("checks that numbers are filled in", () => {
    expect(issues({ ...valid, capacity: Number.NaN })).toMatchObject({ capacity: "Isi kapasitas kursi." });
    expect(issues({ ...valid, unitCount: 0 })).toMatchObject({ unitCount: "Total unit minimal 1." });
  });

  it("keeps the minimum within the seats", () => {
    expect(issues({ ...valid, minPassengers: 8 })).toMatchObject({
      minPassengers: "Minimal penumpang tidak boleh melebihi kapasitas kursi.",
    });
    expect(issues({ ...valid, minPassengers: 7 })).toEqual({});
  });

  it("keeps the units owned at or above the ones borrowed today", () => {
    const parse = (unitCount: number) => createVehicleSchema(VEHICLES, "vehicle-hiace", 2).safeParse({ ...valid, unitCount }).success;
    expect(parse(1)).toBe(false);
    expect(parse(2)).toBe(true);
  });
});

describe("vehicle search", () => {
  it("finds by name", () => {
    expect(searchVehicles(VEHICLES, "")).toHaveLength(2);
    expect(searchVehicles(VEHICLES, "hiace").map((vehicle) => vehicle.id)).toEqual(["vehicle-hiace"]);
    expect(searchVehicles(VEHICLES, "bus  UDINUS").map((vehicle) => vehicle.id)).toEqual(["vehicle-bus"]);
    expect(searchVehicles(VEHICLES, "innova")).toEqual([]);
  });
});
