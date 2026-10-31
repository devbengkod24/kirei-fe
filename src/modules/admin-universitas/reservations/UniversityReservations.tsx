import type { AdminScope } from "@/shared/admin-scope";
import { FakultasFilter } from "@/shared/fakultas-filter/FakultasFilter";
import { FAKULTAS_PARAM } from "@/shared/fakultas-filter/fakultasScope";
import { getReservationRequests, type ReservationTab } from "@/shared/reservation-management/getReservationRequests";
import { ReservationManagement } from "@/shared/reservation-management/ReservationManagement";
import type { Fakultas } from "@/types/fakultas";
import type { ReservationType } from "@/types/reservation";
import { reservationsRoute } from "../routes";

export interface UniversityReservationsProps {
  tipe: ReservationType;
  tab: ReservationTab;
  /** Applies to rooms only; GOR and vehicles belong to the university. */
  scope: AdminScope;
  fakultasOptions: Fakultas[];
}

/** Kelola Reservasi for one type. Rooms get the faculty filter, kept when switching tabs. */
export async function UniversityReservations({ tipe, tab, scope, fakultasOptions }: UniversityReservationsProps) {
  const isRoom = tipe === "ruangan";
  const reservations = await getReservationRequests(isRoom ? scope : { fakultasId: null }, tab, tipe);
  const query = isRoom && scope.fakultasId ? `?${FAKULTAS_PARAM}=${scope.fakultasId}` : "";

  return (
    <ReservationManagement
      tipe={tipe}
      tab={tab}
      links={{
        persetujuan: `${reservationsRoute(tipe, "persetujuan")}${query}`,
        riwayat: `${reservationsRoute(tipe, "riwayat")}${query}`,
      }}
      reservations={reservations}
      // The layout shows the heading above the type tabs.
      heading={null}
      toolbar={isRoom ? <FakultasFilter options={fakultasOptions} value={scope.fakultasId} /> : undefined}
    />
  );
}
