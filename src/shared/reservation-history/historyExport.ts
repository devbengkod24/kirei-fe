// TODO: kirei-api: Ekspor Excel dan PDF saat ini dijalankan di client karena endpoint ekspor backend
// belum tersedia di src/lib/api. Jika endpoint ekspor backend sudah tersedia, ganti modul ini dengan
// unduhan dari API dan hapus dependency exceljs, jspdf, serta jspdf-autotable dari package.json.

import {
  formatDateShortWIB,
  formatDayRangeShortWIB,
  formatTimeSpanWIB,
  toWibDateKey,
} from "@/lib/date";
import { reservationStatusLabel } from "@/shared/reservation/ReservationStatusBadge";
import { isWholeDayType, reservationDateShort } from "@/shared/reservation/reservationTime";
import { RESERVATION_UNIT_LABEL } from "@/shared/reservation/reservationTypes";
import { tripText } from "@/shared/reservation/vehicleTrip";
import type { ReservationRecord, ReservationRequest, ReservationType } from "@/types/reservation";

export interface ExportColumn {
  key: string;
  header: string;
}

export type ExportRow = Record<string, string>;

/** Export columns matching the reservation history table for each facility type. */
export function exportColumnsForType(tipe: ReservationType): readonly ExportColumn[] {
  const unitLabel = RESERVATION_UNIT_LABEL[tipe];
  return [
    { key: "date", header: "Tanggal" },
    { key: "bookerName", header: "Nama Pemesan" },
    ...(unitLabel ? [{ key: "unit", header: unitLabel }] : []),
    ...(!isWholeDayType(tipe) ? [{ key: "time", header: "Waktu (WIB)" }] : []),
    { key: "purpose", header: "Keperluan" },
    { key: "rejectionReason", header: "Alasan Ditolak" },
    { key: "status", header: "Status" },
  ];
}

function vehicleSummary(unitName: string, trip?: ReservationRecord["trip"]): string {
  if (!trip) return unitName || "-";
  const details = [trip.destination, tripText(trip)].filter(Boolean).join(" | ");
  return unitName ? `${unitName} (${details})` : details || "-";
}

/** Maps a borrower/shared ReservationRecord into display strings for Excel/PDF export. */
export function mapHistoryRecordToRow(record: ReservationRecord, tipe: ReservationType): ExportRow {
  const wholeDays = isWholeDayType(tipe);
  const date = wholeDays ? formatDayRangeShortWIB(record.startsAt, record.endsAt) : formatDateShortWIB(record.startsAt);
  const purpose = record.cancellationReason
    ? `${record.purpose} (Alasan dibatalkan: ${record.cancellationReason})`
    : record.purpose;
  return {
    date,
    bookerName: record.bookerName,
    ...(RESERVATION_UNIT_LABEL[tipe]
      ? { unit: tipe === "kendaraan" ? vehicleSummary(record.unitName, record.trip) : record.unitName || "-" }
      : {}),
    ...(!wholeDays ? { time: `${formatTimeSpanWIB(record.startsAt, record.endsAt)} WIB` } : {}),
    purpose,
    rejectionReason: record.status === "ditolak" ? (record.rejectionReason ?? "Alasan belum dicatat.") : "-",
    status: reservationStatusLabel(record.status),
  };
}

/** Maps an admin ReservationRequest (Kelola Reservasi -> Riwayat) into export columns. */
export function mapAdminRequestToRow(request: ReservationRequest, tipe: ReservationType): ExportRow {
  const wholeDays = isWholeDayType(tipe);
  const unit =
    tipe === "kendaraan"
      ? vehicleSummary(request.roomName, request.trip)
      : request.roomName || "-";
  return {
    date: reservationDateShort(request),
    bookerName: request.borrowerName,
    ...(RESERVATION_UNIT_LABEL[tipe] ? { unit } : {}),
    ...(!wholeDays ? { time: `${formatTimeSpanWIB(request.startsAt, request.endsAt)} WIB` } : {}),
    purpose: request.purpose,
    rejectionReason: request.status === "ditolak" ? (request.rejectionReason ?? "Alasan belum dicatat.") : "-",
    status: reservationStatusLabel(request.status),
  };
}

/** Builds a descriptive filename containing reservation type and active WIB date range. */
export function buildHistoryExportFilename(
  tipe: ReservationType,
  items: readonly { startsAt: string; endsAt: string }[],
  ext: "xlsx" | "pdf",
  fallbackNow: Date = new Date(),
): string {
  if (items.length === 0) {
    return `riwayat-reservasi-${tipe}-${toWibDateKey(fallbackNow)}.${ext}`;
  }
  const wholeDays = isWholeDayType(tipe);
  const keys = items.flatMap((item) => {
    const startKey = toWibDateKey(item.startsAt);
    const endKey = toWibDateKey(wholeDays ? Math.max(Date.parse(item.startsAt), Date.parse(item.endsAt) - 1) : item.endsAt);
    return [startKey, endKey];
  });
  keys.sort();
  const from = keys[0];
  const to = keys[keys.length - 1];
  const rangePart = from === to ? from : `${from}_sd_${to}`;
  return `riwayat-reservasi-${tipe}-${rangePart}.${ext}`;
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

/** Client-side Excel (.xlsx) generator using exceljs. */
export async function exportRowsToExcel(options: {
  title: string;
  filename: string;
  sheetName?: string;
  columns: readonly ExportColumn[];
  rows: readonly ExportRow[];
}): Promise<void> {
  const ExcelJS = (await import("exceljs")).default;
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet(options.sheetName ?? "Riwayat Reservasi");

  const titleRow = sheet.addRow([options.title]);
  titleRow.font = { bold: true, size: 13 };
  sheet.addRow([]);

  const headerRow = sheet.addRow(options.columns.map((column) => column.header));
  headerRow.font = { bold: true };

  for (const row of options.rows) {
    sheet.addRow(options.columns.map((column) => row[column.key] ?? "-"));
  }

  options.columns.forEach((column, index) => {
    const maxLen = Math.max(
      column.header.length,
      ...options.rows.map((row) => (row[column.key] ?? "").length),
    );
    sheet.getColumn(index + 1).width = Math.min(Math.max(maxLen + 4, 14), 45);
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  downloadBlob(blob, options.filename);
}

/** Client-side PDF generator using jspdf + jspdf-autotable. */
export async function exportRowsToPdf(options: {
  title: string;
  filename: string;
  columns: readonly ExportColumn[];
  rows: readonly ExportRow[];
}): Promise<void> {
  const { jsPDF } = await import("jspdf");
  const autoTable = (await import("jspdf-autotable")).default;

  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  doc.setFontSize(13);
  doc.text(options.title, 14, 15);

  autoTable(doc, {
    startY: 22,
    head: [options.columns.map((column) => column.header)],
    body: options.rows.map((row) => options.columns.map((column) => row[column.key] ?? "-")),
    styles: { fontSize: 8, cellPadding: 2.5 },
    headStyles: { fillColor: [30, 58, 138] },
  });

  doc.save(options.filename);
}
