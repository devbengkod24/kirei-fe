"use client";

import { useState } from "react";
import { resetMockReservations } from "./reservationStore";

const RESULT_TEXT = {
  idle: "",
  done: "Data simulasi reservasi kembali ke data awal.",
  failed: "Browser ini tidak mengizinkan penyimpanan lokal, jadi tidak ada data yang perlu direset.",
} as const;

/** Clears requests and approvals made in this browser, so a demo starts from the sample data again. Drafts stay. */
export function ResetMockReservationsButton() {
  const [result, setResult] = useState<keyof typeof RESULT_TEXT>("idle");

  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <button
        type="button"
        onClick={() => setResult(resetMockReservations() ? "done" : "failed")}
        className="inline-flex min-h-11 items-center px-2 text-xs font-medium text-primary underline-offset-4 hover:underline"
      >
        Reset data simulasi reservasi
      </button>
      <p role="status" className="text-[11px] text-muted">
        {RESULT_TEXT[result]}
      </p>
    </div>
  );
}
