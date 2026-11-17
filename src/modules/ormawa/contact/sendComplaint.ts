import type { LaravelValidationError } from "@/lib/api/form-errors";
import { readBrowserDataMode } from "@/lib/data-mode/dataMode";
import { addLiveReport } from "@/shared/reports/liveReports";
import type { ComplaintValues } from "./complaintSchema";

export type SendComplaintResult =
  | { ok: true }
  | { ok: false; validation: LaravelValidationError }
  | { ok: false; message: string };

/** Sends the complaint to the admin; it shows up in their Laporan Pengguna. */
export async function sendComplaint(values: ComplaintValues, authorName: string): Promise<SendComplaintResult> {
  // TODO: POST `values` with the orval client. Map 422 bodies to { validation } and other
  // failures to { message }. Until then the request is simulated as accepted.
  await new Promise((resolve) => setTimeout(resolve, 500));
  // "Empty" data mode: the report is kept in this browser, where the admin's Laporan Pengguna reads it.
  if (readBrowserDataMode() === "empty" && !addLiveReport({ ...values, roomCode: null, authorName })) {
    return { ok: false, message: "Browser ini tidak bisa menyimpan laporan." };
  }
  return { ok: true };
}
