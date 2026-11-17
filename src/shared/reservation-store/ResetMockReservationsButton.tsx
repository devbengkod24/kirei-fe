"use client";

import { useState } from "react";
import type { DataMode } from "@/lib/data-mode/dataMode";
import { clearLive } from "@/lib/data-mode/liveStorage";
import { resetMockReservations } from "./reservationStore";

const FAILED = "Browser ini tidak mengizinkan penyimpanan lokal, jadi tidak ada data yang perlu dihapus.";

const TEXT: Record<DataMode, { action: string; done: string }> = {
  sample: { action: "Reset data simulasi reservasi", done: "Data simulasi reservasi kembali ke data awal." },
  empty: { action: "Hapus semua data yang saya buat", done: "Semua data yang Anda buat sudah dihapus. Aplikasi kosong lagi." },
};

const LINK = "inline-flex min-h-11 items-center px-2 text-xs font-medium underline-offset-4 hover:underline";

export interface ResetMockReservationsButtonProps {
  /** Which data to clear; each data mode keeps its own. */
  mode?: DataMode;
}

/**
 * "sample": clears requests and approvals made in this browser, so a demo starts from the sample
 * data again; drafts stay. "empty": clears everything made in that mode, after a second click.
 */
export function ResetMockReservationsButton({ mode = "sample" }: ResetMockReservationsButtonProps) {
  const [result, setResult] = useState<"idle" | "confirming" | "done" | "failed">("idle");
  const text = TEXT[mode];

  const reset = () => setResult((mode === "empty" ? clearLive() : resetMockReservations()) ? "done" : "failed");

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      {result === "confirming" ? (
        <div className="flex flex-wrap items-center justify-center gap-x-2">
          <button type="button" onClick={reset} className={`${LINK} text-danger`}>
            Ya, hapus semuanya
          </button>
          <button type="button" onClick={() => setResult("idle")} className={`${LINK} text-primary`}>
            Batal
          </button>
        </div>
      ) : (
        <button type="button" onClick={mode === "empty" ? () => setResult("confirming") : reset} className={`${LINK} text-primary`}>
          {text.action}
        </button>
      )}
      <p role="status" className="text-[11px] text-muted">
        {result === "confirming" && "Reservasi, draft, pengumuman, laporan, denah, dan pengguna yang Anda buat akan hilang dan tidak bisa dikembalikan."}
        {result === "done" && text.done}
        {result === "failed" && FAILED}
      </p>
    </div>
  );
}
