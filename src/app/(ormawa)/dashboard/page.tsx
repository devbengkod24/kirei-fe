import type { Metadata } from "next";
import { ORMAWA_ROUTES } from "@/modules/ormawa/routes";
import { UserDashboard } from "@/shared/dashboard/UserDashboard";
import { getUserDashboard } from "@/shared/dashboard/getUserDashboard";

export const metadata: Metadata = { title: "Dashboard" };

export default async function Page() {
  const data = await getUserDashboard();

  return (
    <UserDashboard
      data={data}
      links={{
        reservationDetail: ORMAWA_ROUTES.reservationHistory,
        createReservation: ORMAWA_ROUTES.createReservation,
        announcements: ORMAWA_ROUTES.announcements,
      }}
    />
  );
}
