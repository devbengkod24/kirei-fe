import { describe, expect, it } from "vitest";
import type { ReservationRequest } from "@/types/reservation";
import type { Staff } from "@/types/staff";
import { vehicleHistoryCsv } from "./vehicleReport";

const STAFF: Staff[] = [
  { id: "staff-1", name: "Slamet Riyadi", phone: "081234500011", licenseNumber: "1", licenseExpiresOn: "2028-03-14", role: "sopir" },
  { id: "staff-4", name: "Dedi Kurniawan", phone: "081234500014", licenseNumber: "4", licenseExpiresOn: "2027-11-30", role: "co_sopir" },
];

// 12-14 Nov 2026 as whole WIB days
const trip: ReservationRequest = {
  id: "res-1",
  type: "kendaraan",
  status: "disetujui",
  startsAt: "2026-11-11T17:00:00.000Z",
  endsAt: "2026-11-14T17:00:00.000Z",
  buildingName: "Kendaraan",
  roomName: "",
  borrowerName: "HMTI",
  borrowerDetail: "Ormawa",
  phone: "081234567890",
  purpose: "Studi banding; hari pertama",
  letterFileName: null,
  letterUrl: null,
  rejectionReason: null,
  trip: {
    destination: "Kudus, Pati",
    participants: 50,
    destinations: ["Kudus", "Pati"],
    vehicle: { id: "vehicle-bus", name: "Bus Udinus", units: 2 },
    kind: "menginap",
  },
};

const lines = (csv: string) => csv.replace(/^﻿/, "").trimEnd().split("\r\n");

describe("vehicle history CSV", () => {
  it("writes a header and one row per request, with drivers and costs", () => {
    const csv = vehicleHistoryCsv(
      [trip],
      { "res-1": { driverId: "staff-1", coDriverId: "staff-4", travelAllowance: 300000, fuelAndToll: 750000, driverFee: 400000 } },
      STAFF,
    );
    expect(csv.startsWith("﻿")).toBe(true);
    const [header, row] = lines(csv);
    expect(header.split(";")).toHaveLength(19);
    expect(row).toBe(
      [
        "2026-11-12",
        "2026-11-14",
        "HMTI",
        "Ormawa",
        "081234567890",
        "Bus Udinus",
        "2",
        "Kudus, Pati",
        "Menginap",
        "50",
        '"Studi banding; hari pertama"',
        "Disetujui",
        "",
        "Slamet Riyadi",
        "Dedi Kurniawan",
        "300000",
        "750000",
        "400000",
        "1450000",
      ].join(";"),
    );
  });

  it("leaves unknown parts empty and shows the rejection reason only for rejected requests", () => {
    // a purpose without ";" so the row can be split on it below
    const older = { ...trip, purpose: "Bakti sosial", status: "ditolak" as const, rejectionReason: 'Surat "belum" ditandatangani', trip: { destination: "Demak", participants: 12 } };
    const [, row] = lines(vehicleHistoryCsv([older], {}, STAFF));
    const cells = row.split(";");
    expect(cells[5]).toBe("");
    expect(cells[11]).toBe("Ditolak");
    expect(cells[12]).toBe('"Surat ""belum"" ditandatangani"');
    expect(cells.slice(13)).toEqual(["", "", "", "", "", ""]);
  });
});
