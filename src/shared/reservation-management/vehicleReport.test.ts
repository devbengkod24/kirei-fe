import { describe, expect, it } from "vitest";
import type { ReservationRequest } from "@/types/reservation";
import type { Staff } from "@/types/staff";
import { facilityHistoryCsv, vehicleHistoryCsv } from "./vehicleReport";

const STAFF: Staff[] = [
  { id: "staff-1", name: "Slamet Riyadi", phone: "081234500011", licenseClass: "B1 Umum", role: "sopir", isActive: true },
  { id: "staff-4", name: "Dedi Kurniawan", phone: "081234500014", licenseClass: "B1 Umum", role: "co_sopir", isActive: true },
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

describe("room and GOR history CSV", () => {
  // 09.00-11.00 WIB on 12 Nov 2026
  const room: ReservationRequest = {
    ...trip,
    id: "res-2",
    type: "ruangan",
    status: "ditolak",
    startsAt: "2026-11-12T02:00:00.000Z",
    endsAt: "2026-11-12T04:00:00.000Z",
    buildingName: "Gedung H",
    roomName: "H.5.1",
    purpose: "Rapat",
    rejectionReason: "Dipakai ujian",
    trip: undefined,
  };

  it("writes the room columns, times, and the rejection reason", () => {
    const [header, row] = lines(facilityHistoryCsv("ruangan", [room]));
    expect(header.split(";")).toEqual([
      "Tanggal", "Jam Mulai", "Jam Selesai", "Nama Pemesan", "Keterangan Pemesan", "No HP",
      "Gedung", "Ruangan", "Keperluan", "Status", "Alasan Ditolak",
    ]);
    expect(row).toBe("2026-11-12;09.00;11.00;HMTI;Ormawa;081234567890;Gedung H;H.5.1;Rapat;Ditolak;Dipakai ujian");
  });

  it("puts the activity in the GOR report", () => {
    const gor = { ...room, type: "gor" as const, buildingName: "GOR Udinus", roomName: "", activity: "Badminton", status: "disetujui" as const };
    const [header, row] = lines(facilityHistoryCsv("gor", [gor]));
    expect(header).toContain("GOR;Kegiatan");
    expect(row).toContain("GOR Udinus;Badminton;Rapat;Disetujui;");
  });
});
