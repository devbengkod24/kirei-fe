import { SegmentedNav } from "@/components/ui/SegmentedNav";
import type { ReservationRequest, ReservationType } from "@/types/reservation";
import type { ReservationTab } from "./getReservationRequests";
import { ReservationTable } from "./ReservationTable";

export interface ReservationManagementProps {
  tipe: ReservationType;
  tab: ReservationTab;
  links: Record<ReservationTab, string>;
  reservations: ReservationRequest[];
  /** Controls next to the tabs, e.g. the faculty filter. */
  toolbar?: React.ReactNode;
  /** Page heading; null when the page already shows it above, e.g. over the type tabs. */
  heading?: string | null;
}

/** "Kelola Reservasi" with its Persetujuan / Riwayat tabs; each tab is its own URL. */
export function ReservationManagement({ tipe, tab, links, reservations, toolbar, heading = "Kelola Reservasi" }: ReservationManagementProps) {
  return (
    <div className="flex flex-col gap-4">
      {heading && <h2 className="text-base font-semibold">{heading}</h2>}
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
      <ReservationTable key={tab} tipe={tipe} tab={tab} reservations={reservations} />
    </div>
  );
}
