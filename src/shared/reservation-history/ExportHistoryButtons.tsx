"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { ReservationType } from "@/types/reservation";
import {
  buildHistoryExportFilename,
  exportRowsToExcel,
  exportRowsToPdf,
  type ExportColumn,
  type ExportRow,
} from "./historyExport";

export interface ExportHistoryButtonsProps {
  tipe: ReservationType;
  title: string;
  columns: readonly ExportColumn[];
  rows: readonly ExportRow[];
  dateItems: readonly { startsAt: string; endsAt: string }[];
}

/** "Unduh Excel" and "Unduh PDF" buttons for filtered reservation history lists. */
export function ExportHistoryButtons({ tipe, title, columns, rows, dateItems }: ExportHistoryButtonsProps) {
  const [busy, setBusy] = useState<"xlsx" | "pdf" | null>(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleExport = async (format: "xlsx" | "pdf") => {
    if (rows.length === 0 || busy !== null) return;
    setBusy(format);
    setError("");
    setStatus("");
    try {
      const filename = buildHistoryExportFilename(tipe, dateItems, format);
      if (format === "xlsx") {
        await exportRowsToExcel({ title, filename, columns, rows });
      } else {
        await exportRowsToPdf({ title, filename, columns, rows });
      }
      setStatus(`${rows.length} baris riwayat diunduh (${filename}).`);
    } catch {
      setError("Gagal mengekspor riwayat. Coba lagi.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex flex-wrap items-center gap-2">
        <Button
          variant="primary-outline"
          disabled={rows.length === 0 || busy !== null}
          onClick={() => void handleExport("xlsx")}
        >
          {busy === "xlsx" ? "Menyiapkan Excel..." : "Unduh Excel"}
        </Button>
        <Button
          variant="primary-outline"
          disabled={rows.length === 0 || busy !== null}
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
