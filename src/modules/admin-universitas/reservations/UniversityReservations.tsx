import type { AdminScope } from "@/shared/admin-scope";
import { getReservationCandidates, type ReservationTab } from "@/shared/reservation-management/getReservationRequests";
import { ReservationManagement } from "@/shared/reservation-management/ReservationManagement";
import type { Fakultas } from "@/types/fakultas";
import type { ReservationType } from "@/types/reservation";
import { ADMIN_UNIVERSITAS_ROUTES, reservationsRoute } from "../routes";
import { TypeTabs } from "../TypeTabs";
import { getStaff } from "@/shared/staff/getStaff";

export interface UniversityReservationsProps {
  tipe: ReservationType;
  tab: ReservationTab;
  scope?: AdminScope;
  fakultasOptions?: Fakultas[];
}

/** Kelola Reservasi for one type. */
export async function UniversityReservations({ tipe, tab }: UniversityReservationsProps) {
  const candidates = await getReservationCandidates({ fakultasId: null }, tipe);
  const tabs = <TypeTabs basePath={ADMIN_UNIVERSITAS_ROUTES.reservations} />;

  if (tipe !== "kendaraan") {
    return (
      <ReservationManagement
        tipe={tipe}
        tab={tab}
        links={{ persetujuan: reservationsRoute(tipe, "persetujuan"), riwayat: reservationsRoute(tipe, "riwayat") }}
        {...candidates}
        heading={null}
        leading={tabs}
      />
    );
  }

  const staff = await getStaff();
  return (
    <ReservationManagement
      tipe={tipe}
      tab={tab}
      links={{ persetujuan: reservationsRoute(tipe, "persetujuan"), riwayat: reservationsRoute(tipe, "riwayat") }}
      {...candidates}
      heading={null}
      leading={tabs}
      staff={staff}
    />
  );
}
