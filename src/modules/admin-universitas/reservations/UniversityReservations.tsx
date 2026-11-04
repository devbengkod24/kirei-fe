import type { AdminScope } from "@/shared/admin-scope";
import { getReservationRequests, type ReservationTab } from "@/shared/reservation-management/getReservationRequests";
import { ReservationManagement } from "@/shared/reservation-management/ReservationManagement";
import type { Fakultas } from "@/types/fakultas";
import type { ReservationType } from "@/types/reservation";
import { ADMIN_UNIVERSITAS_ROUTES, reservationsRoute } from "../routes";
import { TypeTabs } from "../TypeTabs";

export interface UniversityReservationsProps {
  tipe: ReservationType;
  tab: ReservationTab;
  scope?: AdminScope;
  fakultasOptions?: Fakultas[];
}

/** Kelola Reservasi for one type. */
export async function UniversityReservations({ tipe, tab }: UniversityReservationsProps) {
  const reservations = await getReservationRequests({ fakultasId: null }, tab, tipe);

  return (
    <ReservationManagement
      tipe={tipe}
      tab={tab}
      links={{
        persetujuan: reservationsRoute(tipe, "persetujuan"),
        riwayat: reservationsRoute(tipe, "riwayat"),
      }}
      reservations={reservations}
      heading={null}
      leading={<TypeTabs basePath={ADMIN_UNIVERSITAS_ROUTES.reservations} />}
    />
  );
}
