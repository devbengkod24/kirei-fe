// TODO: kirei-api: Ekspor Excel dan PDF laporan pengguna saat ini dijalankan di client karena
// endpoint ekspor backend belum tersedia di src/lib/api. Jika endpoint backend sudah ada, ganti
// dengan unduhan dari API dan hapus dependency exceljs, jspdf, serta jspdf-autotable.

import { formatDateShortWIB, formatTimeWIB, toWibDateKey } from "@/lib/date";
import {
  exportRowsToExcel,
  exportRowsToPdf,
  type ExportColumn,
  type ExportRow,
} from "@/shared/reservation-history/historyExport";
import type { UserReport } from "@/types/report";
import { REPORT_CATEGORY_LABEL } from "./report-labels";

export const REPORT_EXPORT_COLUMNS: readonly ExportColumn[] = [
  { key: "date", header: "Tanggal" },
  { key: "time", header: "Waktu (WIB)" },
  { key: "authorName", header: "Pelapor" },
  { key: "category", header: "Kategori" },
  { key: "roomCode", header: "Ruangan" },
  { key: "body", header: "Keterangan" },
  { key: "photo", header: "Foto" },
];

/** Maps a UserReport into WIB display strings for Excel and PDF export. */
export function mapReportToExportRow(report: UserReport): ExportRow {
  return {
    date: formatDateShortWIB(report.createdAt),
    time: `${formatTimeWIB(report.createdAt)} WIB`,
    authorName: report.authorName,
    category: REPORT_CATEGORY_LABEL[report.category],
    roomCode: report.roomCode ?? "-",
    body: report.body,
    photo: report.photoUrl ? "Ada foto" : "-",
  };
}

/** Builds a descriptive filename containing the active WIB date range of the exported reports. */
export function buildReportExportFilename(
  reports: readonly Pick<UserReport, "createdAt">[],
  ext: "xlsx" | "pdf",
  fallbackNow: Date = new Date(),
): string {
  if (reports.length === 0) {
    return `laporan-pengguna-${toWibDateKey(fallbackNow)}.${ext}`;
  }
  const keys = reports.map((item) => toWibDateKey(item.createdAt)).sort();
  const from = keys[0];
  const to = keys[keys.length - 1];
  const rangePart = from === to ? from : `${from}_sd_${to}`;
  return `laporan-pengguna-${rangePart}.${ext}`;
}

export async function exportReportsToExcel(reports: readonly UserReport[], filename: string): Promise<void> {
  await exportRowsToExcel({
    title: "Laporan Pengguna KIREI",
    sheetName: "Laporan Pengguna",
    filename,
    columns: REPORT_EXPORT_COLUMNS,
    rows: reports.map(mapReportToExportRow),
  });
}

export async function exportReportsToPdf(reports: readonly UserReport[], filename: string): Promise<void> {
  await exportRowsToPdf({
    title: "Laporan Pengguna KIREI",
    filename,
    columns: REPORT_EXPORT_COLUMNS,
    rows: reports.map(mapReportToExportRow),
  });
}
