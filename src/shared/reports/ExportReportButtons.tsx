"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { UserReport } from "@/types/report";
import { buildReportExportFilename, exportReportsToExcel, exportReportsToPdf } from "./reportExport";

export interface ExportReportButtonsProps {
  reports: readonly UserReport[];
}

/** "Unduh Excel" and "Unduh PDF" buttons for filtered user reports. */
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
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="primary-outline"
          disabled={reports.length === 0 || busy !== null}
          onClick={() => void handleExport("xlsx")}
        >
          {busy === "xlsx" ? "Menyiapkan Excel..." : "Unduh Excel"}
        </Button>
        <Button
          variant="primary-outline"
          disabled={reports.length === 0 || busy !== null}
          onClick={() => void handleExport("pdf")}
        >
          {busy === "pdf" ? "Menyiapkan PDF..." : "Unduh PDF"}
        </Button>
      </div>
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
