import type { Metadata } from "next";
import { DraftReservationsPage } from "@/modules/ormawa/drafts/DraftReservationsPage";

export const metadata: Metadata = { title: "Draft Reservasi" };

export default function Page() {
  return <DraftReservationsPage />;
}
