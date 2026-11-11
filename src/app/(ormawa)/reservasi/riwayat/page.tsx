import type { Metadata } from "next";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { ORMAWA_ROUTES } from "@/modules/ormawa/routes";
import { parseHistoryQuery } from "@/shared/reservation-history/query";
import { ReservationHistoryPage } from "@/shared/reservation-history/ReservationHistoryPage";

export const metadata: Metadata = { title: "Reservasi & Riwayat" };

export default async function Page({ searchParams }: PageProps<"/reservasi/riwayat">) {
  const query = parseHistoryQuery(await searchParams);
  const user = await getCurrentUser();

  return (
    <ReservationHistoryPage
      {...query}
      scope={{ mine: true }}
      ownerId={user.id}
      basePath={ORMAWA_ROUTES.reservationHistory}
      showTypeTabs
      createHref={ORMAWA_ROUTES.createReservation}
    />
  );
}
