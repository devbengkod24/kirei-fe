import { describe, expect, it } from "vitest";
import type { Vehicle } from "@/types/facility";
import { toMockReservation, toRoomReservationRequest, toSportsHallReservationRequest, toVehicleReservationRequest } from "./createReservation";

const BUS: Vehicle = { id: "vehicle-bus", name: "Bus Udinus", capacity: 40, unitCount: 2, isActive: true };

describe("reservation requests", () => {
  it("approves internal bookings immediately when approved=true", () => {
    const request = toRoomReservationRequest(
      {
        buildingId: "gedung-h",
        floorId: "gedung-h-5",
        date: "2026-10-20",
        startTime: "08:00",
        endTime: "10:00",
        roomId: "room-h-5-1",
        phone: "",
        purpose: "Rapat pimpinan universitas",
        letter: null,
        intent: "submit",
      },
      true,
    );
    expect(request.status).toBe("disetujui");

    const owner = { id: "usr-univ", name: "Sekretariat", email: "univ@example.test", detail: "Sekretariat Universitas" };
    const stored = toMockReservation(
      request,
      { owner, unitName: "H.5.1", buildingName: "Gedung H", purpose: "Rapat pimpinan universitas", approved: true },
      new Date(0),
    );
    expect(stored.status).toBe("disetujui");
  });
  it("sends a vehicle trip as whole WIB days, ending at midnight after the last day", () => {
    const request = toVehicleReservationRequest(
      {
        phone: "0857111211",
        tripKind: "menginap",
        vehicleId: "vehicle-bus",
        units: 2,
        destinations: [{ name: "Bali" }, { name: "Banyuwangi" }],
        participants: 60,
        activity: "Kunjungan studi",
        startDate: "2026-10-20",
        endDate: "2026-10-21",
        letter: null,
        intent: "draft",
      },
      [BUS],
    );
    expect(request).toMatchObject({
      type: "kendaraan",
      // 20 Oct 00:00 WIB and 22 Oct 00:00 WIB
      starts_at: "2026-10-19T17:00:00.000Z",
      ends_at: "2026-10-21T17:00:00.000Z",
      status: "draft",
      vehicle_id: "vehicle-bus",
      vehicle_name: "Bus Udinus",
      units: 2,
      trip_kind: "menginap",
      destinations: ["Bali", "Banyuwangi"],
      destination: "Bali, Banyuwangi",
    });
  });

  it("sends the GOR slot range in UTC with the hall id", () => {
    const request = toSportsHallReservationRequest(
      { date: "2026-10-20", startTime: "11:00", endTime: "13:00", activity: "Badminton", notes: "", letter: null, intent: "submit" },
      "gor-udinus",
    );
    expect(request).toMatchObject({
      type: "gor",
      hall_id: "gor-udinus",
      starts_at: "2026-10-20T04:00:00.000Z",
      ends_at: "2026-10-20T06:00:00.000Z",
      status: "menunggu_persetujuan",
    });
  });
});

describe("demo store listing", () => {
  const owner = { id: "usr-ormawa", name: "HMTI", email: "hmti@example.test", detail: "Organisasi" };

  it("lists a room request by room code and building, keeping only the letter's file name", () => {
    const letter = new File(["%PDF"], "surat.pdf", { type: "application/pdf" });
    const request = { ...toVehicleRequestBase(), type: "ruangan" as const, phone: "0812", purpose: "Rapat", letter };
    const reservation = toMockReservation(request, { owner, unitName: "H.5.2", buildingName: "Gedung H", purpose: "Rapat" }, new Date(0));
    expect(reservation).toMatchObject({
      type: "ruangan",
      status: "menunggu_persetujuan",
      roomName: "H.5.2",
      buildingName: "Gedung H",
      borrowerName: "HMTI",
      borrowerDetail: "Organisasi",
      phone: "0812",
      letterFileName: "surat.pdf",
      letterUrl: null,
      ownerId: "usr-ormawa",
    });
  });

  it("lists a vehicle trip with the type asked for but no assigned unit, like the sample requests", () => {
    const request = toVehicleReservationRequest(
      {
        phone: "0857111211",
        tripKind: "antar_jemput",
        vehicleId: "vehicle-bus",
        units: 2,
        destinations: [{ name: "Kudus" }, { name: "Pati" }],
        participants: 8,
        activity: "Kunjungan industri",
        startDate: "2026-11-20",
        endDate: "2026-11-20",
        letter: null,
        intent: "submit",
      },
      [BUS],
    );
    const reservation = toMockReservation(request, { owner, unitName: "Kendaraan ke Kudus, Pati", purpose: "Kunjungan industri" });
    expect(reservation).toMatchObject({
      roomName: "",
      buildingName: "Kendaraan",
      trip: {
        destination: "Kudus, Pati",
        destinations: ["Kudus", "Pati"],
        participants: 8,
        vehicle: { id: "vehicle-bus", name: "Bus Udinus", units: 2 },
        kind: "antar_jemput",
      },
    });
  });
});

function toVehicleRequestBase() {
  return {
    type: "kendaraan" as const,
    starts_at: "2026-11-20T02:00:00.000Z",
    ends_at: "2026-11-20T04:00:00.000Z",
    status: "menunggu_persetujuan",
    letter: null,
  };
}
