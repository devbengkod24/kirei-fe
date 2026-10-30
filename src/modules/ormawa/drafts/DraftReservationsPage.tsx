import { ORMAWA_ROUTES } from "../routes";
import { DraftList } from "./DraftList";
import { getDraftReservations } from "./getDraftReservations";

export async function DraftReservationsPage() {
  const drafts = await getDraftReservations();
  return (
    <DraftList
      drafts={drafts}
      links={{ history: ORMAWA_ROUTES.reservationHistory, create: ORMAWA_ROUTES.createReservation }}
    />
  );
}
