import { removeDraft, type StoredDraft } from "@/shared/reservation-draft/draftStorage";
import { createReservation } from "@/shared/reservation-form/createReservation";

export type DraftActionResult = { ok: true } | { ok: false; message: string };

/** Sends the stored request with the letter, then drops the local draft. */
export async function submitDraft(draft: StoredDraft, letter: File): Promise<DraftActionResult> {
  // Mock only: a file name containing "gagal" simulates a rejected upload, to exercise the failure dialog.
  if (letter.name.toLowerCase().includes("gagal")) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { ok: false, message: "Server menolak berkas. Periksa isi surat lalu unggah ulang." };
  }
  const response = await createReservation({
    ...draft.request,
    type: draft.type,
    starts_at: draft.startsAt,
    ends_at: draft.endsAt,
    status: "menunggu_persetujuan",
    letter,
  });
  if (!response.ok) {
    return { ok: false, message: "message" in response ? response.message : "Data reservasi tidak lengkap." };
  }
  // Already sent; a leftover local copy only means the borrower deletes it by hand.
  removeDraft(draft.id);
  return { ok: true };
}

/** Drafts never reached the server, so cancelling only removes the local copy. */
export function cancelDraft(draftId: string): DraftActionResult {
  return removeDraft(draftId)
    ? { ok: true }
    : { ok: false, message: "Browser ini tidak bisa mengubah draft yang tersimpan." };
}
