import { describe, expect, it } from "vitest";
import type { UserReport } from "@/types/report";
import { buildReportExportFilename, mapReportToExportRow, REPORT_EXPORT_COLUMNS } from "./reportExport";

const SAMPLE: UserReport[] = [
  {
    id: "rep-1",
    createdAt: "2026-11-26T00:20:00.000Z", // 07.20 WIB
    authorName: "Erdin Purwa Putra",
    category: "kerusakan_alat",
    roomCode: "H.5.6",
    body: "Proyektor buram dan kabel HDMI longgar.",
    photoUrl: "data:image/png;base64,abc",
  },
  {
    id: "rep-2",
    createdAt: "2026-11-24T02:10:00.000Z", // 09.10 WIB
    authorName: "Mochamad Farhan",
    category: "kesalahan_sistem",
    roomCode: null,
    body: "Halaman gagal memuat jadwal.",
    photoUrl: null,
  },
];

describe("reportExport", () => {
  it("maps reports into WIB date/time rows matching export columns", () => {
    const row = mapReportToExportRow(SAMPLE[0]);
    expect(REPORT_EXPORT_COLUMNS.map((column) => column.key)).toEqual([
      "date",
      "time",
      "authorName",
      "category",
      "roomCode",
      "body",
      "photo",
    ]);
    expect(row).toEqual({
      date: "26 Nov 2026",
      time: "07.20 WIB",
      authorName: "Erdin Purwa Putra",
      category: "Kerusakan Alat",
      roomCode: "H.5.6",
      body: "Proyektor buram dan kabel HDMI longgar.",
      photo: "Ada foto",
    });
    expect(mapReportToExportRow(SAMPLE[1])).toMatchObject({
      roomCode: "-",
      photo: "-",
    });
  });

  it("builds filenames with the WIB date range of exported reports", () => {
    expect(buildReportExportFilename(SAMPLE, "xlsx")).toBe("laporan-pengguna-2026-11-24_sd_2026-11-26.xlsx");
    expect(buildReportExportFilename([SAMPLE[0]], "pdf")).toBe("laporan-pengguna-2026-11-26.pdf");
    expect(buildReportExportFilename([], "pdf", new Date("2026-11-26T03:00:00.000Z"))).toBe(
      "laporan-pengguna-2026-11-26.pdf",
    );
  });
});
