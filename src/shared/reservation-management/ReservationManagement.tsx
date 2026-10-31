import { SegmentedNav } from "@/components/ui/SegmentedNav";
import type { Vehicle } from "@/types/facility";
import type { ReservationRequest, ReservationType } from "@/types/reservation";
import type { ReservationTab } from "./getReservationRequests";
import { ReservationTable } from "./ReservationTable";

export interface ReservationManagementProps {
  tipe: ReservationType;
  tab: ReservationTab;
  links: Record<ReservationTab, string>;
  reservations: ReservationRequest[];
  /** Vehicles to assign when approving a vehicle request. */
  vehicles?: Vehicle[];
  /** Controls next to the tabs, e.g. the faculty filter. */
  toolbar?: React.ReactNode;
}

/** "Kelola Reservasi" with its Persetujuan / Riwayat tabs; each tab is its own URL. */
export function ReservationManagement({ tipe, tab, links, reservations, vehicles, toolbar }: ReservationManagementProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-semibold">Kelola Reservasi</h2>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <SegmentedNav
          label="Tab reservasi"
          items={[
            { href: links.persetujuan, label: "Persetujuan", active: tab === "persetujuan" },
            { href: links.riwayat, label: "Riwayat", active: tab === "riwayat" },
          ]}
        />
        {toolbar}
      </div>
      <ReservationTable key={tab} tipe={tipe} tab={tab} reservations={reservations} vehicles={vehicles} />
    </div>
  );
}
