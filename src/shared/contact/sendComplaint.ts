import type { LaravelValidationError } from "@/lib/api/form-errors";
import { addLiveReport } from "@/shared/reports/liveReports";
import type { ReporterType } from "@/types/report";
import type { ComplaintValues } from "./complaintSchema";

export type SendComplaintResult =
  | { ok: true }
  | { ok: false; validation: LaravelValidationError }
  | { ok: false; message: string };

/** Sends the complaint to the admin; it shows up immediately in Laporan Pengguna. */
export async function sendComplaint(
  values: ComplaintValues,
  authorName: string,
  reporterType?: ReporterType,
): Promise<SendComplaintResult> {
  // TODO: kirei-api POST `values` with the orval client. Map 422 bodies to { validation } and other
  // failures to { message }. Until then the request is simulated as accepted.
  await new Promise((resolve) => setTimeout(resolve, 400));
  if (!addLiveReport({ ...values, roomCode: null, authorName, reporterType, photoUrl: null })) {
    return { ok: false, message: "Browser ini tidak bisa menyimpan laporan." };
  }
  return { ok: true };
}
