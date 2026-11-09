import { requireRole } from "@/lib/auth/requireRole";
import { ORMAWA_ROUTES } from "../routes";
import { DraftList } from "./DraftList";

export async function DraftReservationsPage() {
  // Only ormawa have drafts; dosen book without a loan letter and are sent to their dashboard.
  const user = await requireRole(["organisasi"]);
  return (
    <DraftList
      booker={{ name: user.name, email: user.email }}
      links={{ history: ORMAWA_ROUTES.reservationHistory, create: ORMAWA_ROUTES.createReservation }}
    />
  );
}
