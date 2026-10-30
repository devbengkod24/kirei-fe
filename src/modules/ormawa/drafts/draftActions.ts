export type DraftActionResult = { ok: true } | { ok: false; message: string };

const simulate = () => new Promise((resolve) => setTimeout(resolve, 500));

/** Uploads the loan letter and sends the draft for approval in one request. */
export async function submitDraft(draftId: string, letter: File): Promise<DraftActionResult> {
  // TODO: send with the orval client (POST, multipart: draft id + letter); map 422 with lib/api/form-errors.
  await simulate();
  // Mock only: a file name containing "gagal" simulates a rejected upload, to exercise the failure dialog.
  if (letter.name.toLowerCase().includes("gagal")) {
    return { ok: false, message: "Server menolak berkas. Periksa isi surat lalu unggah ulang." };
  }
  void draftId;
  return { ok: true };
}

export async function cancelDraft(draftId: string): Promise<DraftActionResult> {
  // TODO: send with the orval client (DELETE or a cancel endpoint).
  await simulate();
  void draftId;
  return { ok: true };
}
