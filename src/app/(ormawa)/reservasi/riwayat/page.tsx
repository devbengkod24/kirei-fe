import type { Metadata } from "next";
import { ORMAWA_ROUTES } from "@/modules/ormawa/routes";
import { parseHistoryQuery } from "@/shared/reservation-history/query";
import { ReservationHistoryPage } from "@/shared/reservation-history/ReservationHistoryPage";

export const metadata: Metadata = { title: "Reservasi & Riwayat" };

export default async function Page({ searchParams }: PageProps<"/reservasi/riwayat">) {
  const query = parseHistoryQuery(await searchParams);

  return (
    <ReservationHistoryPage
      {...query}
      scope={{ mine: true }}
      basePath={ORMAWA_ROUTES.reservationHistory}
      showTypeTabs
      createHref={ORMAWA_ROUTES.createReservation}
    />
  );
}
