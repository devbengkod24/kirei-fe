"use client";

import { useState } from "react";
import { MenuButton } from "@/components/ui/MenuButton";
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

/** "Unduh Laporan" menu (PDF or Excel) for filtered reservation history lists, like Laporan Pengguna. */
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
      <MenuButton
        label={busy === "pdf" ? "Menyiapkan PDF..." : busy === "xlsx" ? "Menyiapkan Excel..." : "Unduh Laporan"}
        menuLabel="Pilih format unduhan laporan"
        disabled={rows.length === 0 || busy !== null}
        options={[
          { key: "pdf", label: "Unduh PDF", hint: "Tabel riwayat siap cetak", onSelect: () => void handleExport("pdf") },
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
