import { SegmentedNav } from "@/components/ui/SegmentedNav";
import type { ReservationRequest, ReservationType } from "@/types/reservation";
import type { ReservationTab } from "./requestTabs";
import { ReservationTable } from "./ReservationTable";

export interface ReservationManagementProps {
  tipe: ReservationType;
  tab: ReservationTab;
  links: Record<ReservationTab, string>;
  /** Every request in scope for this type; the table shows the tab's rows. See getReservationCandidates. */
  reservations: ReservationRequest[];
  roomCodes: string[] | null;
  /** Controls on the left of the header row, e.g. the Ruangan / Kendaraan / GOR tabs. */
  leading?: React.ReactNode;
  /** Controls placed under the tabs on the right, e.g. the faculty filter. */
  toolbar?: React.ReactNode;
  /** Page heading; null when the page already shows it above, e.g. over the type tabs. */
  heading?: string | null;
}

/** "Kelola Reservasi" with its Persetujuan / Riwayat tabs; each tab is its own URL. */
export function ReservationManagement({
  tipe,
  tab,
  links,
  reservations,
  roomCodes,
  leading,
  toolbar,
  heading = "Kelola Reservasi",
}: ReservationManagementProps) {
  return (
    <div className="flex flex-col gap-4">
      {heading && <h2 className="text-base font-semibold">{heading}</h2>}
      {/* One column until there is room for the type tabs and the right-hand stack side by side. */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        {leading}
        <div className="flex flex-col gap-3 sm:items-end lg:ml-auto">
          <SegmentedNav
            label="Tab reservasi"
            items={[
              { href: links.persetujuan, label: "Persetujuan", active: tab === "persetujuan" },
              { href: links.riwayat, label: "Riwayat", active: tab === "riwayat" },
            ]}
          />
          {toolbar}
        </div>
      </div>
      <ReservationTable key={tab} tipe={tipe} tab={tab} reservations={reservations} roomCodes={roomCodes} />
    </div>
  );
}
