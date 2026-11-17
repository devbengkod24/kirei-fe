import type { Metadata } from "next";
import { ORMAWA_ROUTES } from "@/modules/ormawa/routes";
import { LiveUserDashboard } from "@/shared/dashboard/LiveUserDashboard";
import { getUserDashboard } from "@/shared/dashboard/getUserDashboard";

export const metadata: Metadata = { title: "Dashboard" };

export default async function Page() {
  const data = await getUserDashboard();

  return (
    <LiveUserDashboard
      data={data}
      links={{
        reservationDetail: ORMAWA_ROUTES.reservationHistory,
        createReservation: ORMAWA_ROUTES.createReservation,
        announcements: ORMAWA_ROUTES.announcements,
      }}
    />
  );
}
