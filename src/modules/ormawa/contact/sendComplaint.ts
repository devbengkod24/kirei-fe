import type { LaravelValidationError } from "@/lib/api/form-errors";
import type { ComplaintValues } from "./complaintSchema";

export type SendComplaintResult =
  | { ok: true }
  | { ok: false; validation: LaravelValidationError }
  | { ok: false; message: string };

/** Sends the complaint to the admin; it shows up in their Laporan Pengguna. */
export async function sendComplaint(values: ComplaintValues): Promise<SendComplaintResult> {
  // TODO: POST `values` with the orval client. Map 422 bodies to { validation } and other
  // failures to { message }. Until then the request is simulated as accepted.
  void values;
  await new Promise((resolve) => setTimeout(resolve, 500));
  return { ok: true };
}
