import { connection } from "next/server";
import { buildDraftsMock } from "@/mocks/drafts";
import type { ReservationDraft } from "@/types/reservation";

export async function getDraftReservations(): Promise<ReservationDraft[]> {
  await connection();
  // TODO: replace with the orval client for the borrower's drafts (no-store).
  return buildDraftsMock(new Date());
}
