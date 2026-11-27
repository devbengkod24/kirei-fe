"use client";

import { useState } from "react";
import { MenuButton } from "@/components/ui/MenuButton";
import type { UserReport } from "@/types/report";
import { buildReportExportFilename, exportReportsToExcel, exportReportsToPdf } from "./reportExport";

export interface ExportReportButtonsProps {
  reports: readonly UserReport[];
}

/** "Unduh Laporan" menu: the filtered user reports as PDF or Excel. */
export function ExportReportButtons({ reports }: ExportReportButtonsProps) {
  const [busy, setBusy] = useState<"xlsx" | "pdf" | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleExport = async (format: "xlsx" | "pdf") => {
    if (reports.length === 0 || busy !== null) return;
    setBusy(format);
    setError("");
    setStatus("");
    try {
      const filename = buildReportExportFilename(reports, format);
      if (format === "xlsx") {
        await exportReportsToExcel(reports, filename);
      } else {
        await exportReportsToPdf(reports, filename);
      }
      setStatus(`${reports.length} laporan diunduh (${filename}).`);
    } catch {
      setError("Gagal mengekspor laporan. Coba lagi.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <MenuButton
        label={busy === "pdf" ? "Menyiapkan PDF..." : busy === "xlsx" ? "Menyiapkan Excel..." : "Unduh Laporan"}
        menuLabel="Pilih format unduhan laporan"
        disabled={reports.length === 0 || busy !== null}
        options={[
          { key: "pdf", label: "Unduh PDF", hint: "Tabel laporan siap cetak", onSelect: () => void handleExport("pdf") },
          { key: "xlsx", label: "Unduh Excel", hint: "Berkas .xlsx untuk diolah lagi", onSelect: () => void handleExport("xlsx") },
        ]}
      />
      {status && (
        <p role="status" className="sr-only">
          {status}
        </p>
      )}
      {error && (
        <p role="alert" className="text-xs text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
