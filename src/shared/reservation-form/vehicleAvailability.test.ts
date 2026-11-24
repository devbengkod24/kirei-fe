import { describe, expect, it } from "vitest";
import type { Vehicle } from "@/types/facility";
import type { ReservationRequest } from "@/types/reservation";
import { tripRange, unitsNeeded, vehicleBookings, vehicleOptions } from "./vehicleAvailability";

const HIACE: Vehicle = { id: "vehicle-hiace", name: "Toyota Hiace", capacity: 15, unitCount: 3, isActive: true };
const BUS: Vehicle = { id: "vehicle-bus", name: "Bus Udinus", capacity: 40, unitCount: 2, isActive: true };
const ELF: Vehicle = { id: "vehicle-elf", name: "Isuzu Elf", capacity: 19, unitCount: 1, isActive: false };
const VEHICLES = [HIACE, BUS, ELF];

// 20 Nov 2026 in WIB, as whole days
const DAY_20 = tripRange("2026-11-20", "2026-11-20")!;

const request = (overrides: Partial<ReservationRequest>): ReservationRequest => ({
  id: "res-1",
  type: "kendaraan",
  status: "menunggu_persetujuan",
  startsAt: DAY_20.startsAt,
  endsAt: DAY_20.endsAt,
  buildingName: "Kendaraan",
  roomName: "",
  borrowerName: "HMTI",
  borrowerDetail: "Ormawa",
  phone: null,
  purpose: "Kunjungan",
  letterFileName: null,
  letterUrl: null,
  rejectionReason: null,
  trip: { destination: "Kudus", participants: 10, vehicle: { id: "vehicle-bus", name: "Bus Udinus", units: 1 } },
  ...overrides,
});

describe("trip range", () => {
  it("covers whole WIB days and rejects reversed dates", () => {
    // 20 Nov 00:00 WIB to 22 Nov 00:00 WIB
    expect(tripRange("2026-11-20", "2026-11-21")).toEqual({
      startsAt: "2026-11-19T17:00:00.000Z",
      endsAt: "2026-11-21T17:00:00.000Z",
    });
    expect(tripRange("2026-11-21", "2026-11-20")).toBeNull();
    expect(tripRange("", "2026-11-20")).toBeNull();
  });
});

describe("units needed", () => {
  it("leaves one seat for the driver", () => {
    expect(unitsNeeded(HIACE, 14)).toBe(1);
    expect(unitsNeeded(HIACE, 15)).toBe(2);
    expect(unitsNeeded(BUS, 60)).toBe(2);
  });
});

describe("vehicle bookings", () => {
  it("counts waiting and approved requests, not rejected ones or other types", () => {
    const bookings = vehicleBookings(
      [
        request({ id: "waiting" }),
        request({ id: "approved", status: "disetujui", trip: { destination: "Pati", participants: 30, vehicle: { id: "vehicle-hiace", name: "Toyota Hiace", units: 2 } } }),
        request({ id: "rejected", status: "ditolak" }),
        request({ id: "gor", type: "gor" }),
      ],
      VEHICLES,
    );
    expect(bookings).toEqual([
      { vehicleId: "vehicle-bus", units: 1, startsAt: DAY_20.startsAt, endsAt: DAY_20.endsAt },
      { vehicleId: "vehicle-hiace", units: 2, startsAt: DAY_20.startsAt, endsAt: DAY_20.endsAt },
    ]);
  });

  it("treats an older request with an assigned unit as one unit of it, and one without as nothing", () => {
    const old = { destination: "Demak", participants: 12 };
    expect(vehicleBookings([request({ roomName: "Toyota Hiace", trip: old })], VEHICLES)).toEqual([
      { vehicleId: "vehicle-hiace", units: 1, startsAt: DAY_20.startsAt, endsAt: DAY_20.endsAt },
    ]);
    expect(vehicleBookings([request({ trip: old })], VEHICLES)).toEqual([]);
  });
});

describe("vehicle options", () => {
  const busBooked = [{ vehicleId: "vehicle-bus", units: 1, ...DAY_20 }];

  it("offers only active types", () => {
    expect(vehicleOptions(VEHICLES, [], DAY_20, 10).map((option) => option.vehicle.id)).toEqual(["vehicle-hiace", "vehicle-bus"]);
  });

  it("subtracts units held on overlapping days only", () => {
    const [, bus] = vehicleOptions(VEHICLES, busBooked, DAY_20, 30);
    expect(bus).toMatchObject({ suggested: 1, free: 1, reason: null });

    const nextDay = vehicleOptions(VEHICLES, busBooked, tripRange("2026-11-21", "2026-11-21"), 30)[1];
    expect(nextDay).toMatchObject({ free: 2, reason: null });
  });

  it("closes a type only when no unit is left", () => {
    const allTaken = vehicleOptions(VEHICLES, [...busBooked, { ...busBooked[0] }], DAY_20, 10)[1];
    expect(allTaken).toMatchObject({ free: 0, reason: "Semua unit sudah dipesan pada tanggal ini." });

    // 100 people would need 3 buses; the borrower can still take the 2 the campus has
    const tooBig = vehicleOptions(VEHICLES, [], DAY_20, 100)[1];
    expect(tooBig).toMatchObject({ suggested: 2, free: 2, reason: null });
  });

  it("puts the types that seat the whole group first, and the used-up ones last", () => {
    // 50 people: 2 buses seat 78, 3 Hiace seat 42
    const order = (participants: number | null, bookings = [] as typeof busBooked) =>
      vehicleOptions(VEHICLES, bookings, DAY_20, participants).map((option) => [option.vehicle.id, option.fits, option.maxPeople]);
    expect(order(50)).toEqual([
      ["vehicle-bus", true, 78],
      ["vehicle-hiace", false, 42],
    ]);
    expect(order(null)).toEqual([
      ["vehicle-hiace", true, 42],
      ["vehicle-bus", true, 78],
    ]);
    const busesGone = [...busBooked, { ...busBooked[0] }];
    expect(order(10, busesGone).map(([id]) => id)).toEqual(["vehicle-hiace", "vehicle-bus"]);
  });

  it("marks a group smaller than a type's minimum, and puts that type after the usable ones", () => {
    const withMin = [HIACE, { ...BUS, minPassengers: 25 }];
    const small = vehicleOptions(withMin, [], DAY_20, 10);
    expect(small.map((option) => [option.vehicle.id, option.belowMin])).toEqual([
      ["vehicle-hiace", false],
      ["vehicle-bus", true],
    ]);
    expect(vehicleOptions(withMin, [], DAY_20, 25).find((option) => option.vehicle.id === "vehicle-bus")?.belowMin).toBe(false);
    // no group yet: nothing is below the minimum
    expect(vehicleOptions(withMin, [], DAY_20, null).every((option) => !option.belowMin)).toBe(true);
  });

  it("suggests enough units for the group, capped at what is free", () => {
    const [, bus] = vehicleOptions(VEHICLES, busBooked, DAY_20, 60);
    expect(bus).toMatchObject({ suggested: 1, free: 1 });
    expect(vehicleOptions(VEHICLES, [], DAY_20, 60).find((option) => option.vehicle.id === "vehicle-bus")?.suggested).toBe(2);
    expect(vehicleOptions(VEHICLES, [], null, null)[0]).toMatchObject({ suggested: 1, free: 3, reason: null });
  });
});
