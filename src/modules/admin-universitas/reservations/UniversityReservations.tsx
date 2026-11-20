import { MOCK_STAFF } from "@/mocks/staff";
import type { AdminScope } from "@/shared/admin-scope";
import { getVehicleReservationOptions } from "@/shared/reservation-form/getReservationOptions";
import { getReservationCandidates, type ReservationTab } from "@/shared/reservation-management/getReservationRequests";
import { ReservationManagement } from "@/shared/reservation-management/ReservationManagement";
import type { Fakultas } from "@/types/fakultas";
import type { ReservationType } from "@/types/reservation";
import { ADMIN_UNIVERSITAS_ROUTES, reservationsRoute } from "../routes";
import { TypeTabs } from "../TypeTabs";
import { VehicleFleetInfo } from "./VehicleFleetInfo";

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

  const fleet = await getVehicleReservationOptions();
  return (
    <ReservationManagement
      tipe={tipe}
      tab={tab}
      links={{ persetujuan: reservationsRoute(tipe, "persetujuan"), riwayat: reservationsRoute(tipe, "riwayat") }}
      {...candidates}
      heading={null}
      leading={
        <div className="flex items-center gap-2">
          {tabs}
          <VehicleFleetInfo vehicles={fleet.vehicles} bookings={fleet.bookings} now={fleet.now} />
        </div>
      }
      // TODO: load drivers from Kelola Staf (orval) once it exists; sample drivers until then.
      staff={MOCK_STAFF}
    />
  );
}
