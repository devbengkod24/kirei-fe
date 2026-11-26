import { describe, expect, it } from "vitest";
import type { ReservationRecord, ReservationRequest } from "@/types/reservation";
import {
  buildHistoryExportFilename,
  exportColumnsForType,
  mapAdminRequestToRow,
  mapHistoryRecordToRow,
} from "./historyExport";

const ROOM_RECORD: ReservationRecord = {
  id: "rec-1",
  type: "ruangan",
  status: "ditolak",
  // 1 Nov 2026 08.00 - 10.00 WIB
  startsAt: "2026-11-01T01:00:00.000Z",
  endsAt: "2026-11-01T03:00:00.000Z",
  bookerName: "DNCC",
  bookerEmail: "dncc@dinus.ac.id",
  unitName: "H.5.2",
  purpose: "Rapat kerja",
  cancellationReason: null,
  rejectionReason: "Ruangan sedang dipakai fakultas.",
};

const VEHICLE_RECORD: ReservationRecord = {
  ...ROOM_RECORD,
  id: "rec-2",
  type: "kendaraan",
  status: "selesai",
  // 12-14 Nov 2026 whole WIB days
  startsAt: "2026-11-11T17:00:00.000Z",
  endsAt: "2026-11-14T17:00:00.000Z",
  unitName: "Bus Udinus, 1 unit",
  rejectionReason: null,
  trip: {
    destination: "Bandung, Garut",
    participants: 35,
    destinations: ["Bandung", "Garut"],
    vehicle: { id: "vehicle-bus", name: "Bus Udinus", units: 1 },
    kind: "menginap",
  },
};

describe("exportColumnsForType", () => {
  it("matches table columns for rooms, vehicles, and GOR", () => {
    expect(exportColumnsForType("ruangan").map((col) => col.header)).toEqual([
      "Tanggal",
      "Nama Pemesan",
      "Ruangan",
      "Waktu (WIB)",
      "Keperluan",
      "Alasan Ditolak",
      "Status",
    ]);
    expect(exportColumnsForType("kendaraan").map((col) => col.header)).toEqual([
      "Tanggal",
      "Nama Pemesan",
      "Kendaraan",
      "Keperluan",
      "Alasan Ditolak",
      "Status",
    ]);
    expect(exportColumnsForType("gor").map((col) => col.header)).toEqual([
      "Tanggal",
      "Nama Pemesan",
      "Waktu (WIB)",
      "Keperluan",
      "Alasan Ditolak",
      "Status",
    ]);
  });
});

describe("row mappers", () => {
  it("maps ReservationRecord fields in WIB with status and rejection reason", () => {
    expect(mapHistoryRecordToRow(ROOM_RECORD, "ruangan")).toEqual({
      date: "1 Nov 2026",
      bookerName: "DNCC",
      unit: "H.5.2",
      time: "08.00 - 10.00 WIB",
      purpose: "Rapat kerja",
      rejectionReason: "Ruangan sedang dipakai fakultas.",
      status: "Ditolak",
    });

    expect(mapHistoryRecordToRow(VEHICLE_RECORD, "kendaraan")).toEqual({
      date: "12 – 14 Nov 2026",
      bookerName: "DNCC",
      unit: "Bus Udinus, 1 unit (Bandung, Garut | Menginap, 35 orang)",
      purpose: "Rapat kerja",
      rejectionReason: "-",
      status: "Selesai",
    });
  });

  it("maps admin ReservationRequest rows consistently", () => {
    const adminReq: ReservationRequest = {
      id: "req-1",
      type: "gor",
      startsAt: "2026-11-05T09:00:00.000Z",
      endsAt: "2026-11-05T11:00:00.000Z",
      buildingName: "GOR Udinus",
      roomName: "GOR Udinus",
      status: "disetujui",
      borrowerName: "UKM Basket",
      borrowerDetail: "Ormawa",
      phone: "081234567890",
      purpose: "Latihan rutin",
      letterFileName: "surat.pdf",
      letterUrl: "/sample.pdf",
      activity: "Basket",
      rejectionReason: null,
    };

    expect(mapAdminRequestToRow(adminReq, "gor")).toEqual({
      date: "5 Nov 2026",
      bookerName: "UKM Basket",
      time: "16.00 - 18.00 WIB",
      purpose: "Latihan rutin",
      rejectionReason: "-",
      status: "Disetujui",
    });
  });
});

describe("buildHistoryExportFilename", () => {
  it("includes reservation type and WIB date range", () => {
    expect(
      buildHistoryExportFilename("ruangan", [
        ROOM_RECORD,
        { startsAt: "2026-11-10T01:00:00.000Z", endsAt: "2026-11-10T03:00:00.000Z" },
      ], "xlsx"),
    ).toBe("riwayat-reservasi-ruangan-2026-11-01_sd_2026-11-10.xlsx");

    expect(buildHistoryExportFilename("gor", [ROOM_RECORD], "pdf")).toBe("riwayat-reservasi-gor-2026-11-01.pdf");

    expect(buildHistoryExportFilename("kendaraan", [VEHICLE_RECORD], "xlsx")).toBe(
      "riwayat-reservasi-kendaraan-2026-11-12_sd_2026-11-14.xlsx",
    );
  });
});
