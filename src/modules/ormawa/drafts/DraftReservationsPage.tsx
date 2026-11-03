import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { ORMAWA_ROUTES } from "../routes";
import { DraftList } from "./DraftList";

export async function DraftReservationsPage() {
  const user = await getCurrentUser();
  return (
    <DraftList
      booker={{ name: user.name, email: user.email }}
      links={{ history: ORMAWA_ROUTES.reservationHistory, create: ORMAWA_ROUTES.createReservation }}
    />
  );
}
