import { SegmentedLinks } from "@/components/navigation/SegmentedLinks";
import type { ReservationRequest } from "@/types/reservation";
import type { ReservationKind, ReservationTab } from "./getReservationRequests";
import { ReservationTable } from "./ReservationTable";

export interface ReservationManagementProps {
  tipe: ReservationKind;
  tab: ReservationTab;
  links: Record<ReservationTab, string>;
  reservations: ReservationRequest[];
}

/** "Kelola Reservasi" with its Persetujuan / Riwayat tabs; each tab is its own URL. */
export function ReservationManagement({ tipe, tab, links, reservations }: ReservationManagementProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-semibold">Kelola Reservasi</h2>
      <SegmentedLinks
        label="Tab reservasi"
        activeHref={links[tab]}
        links={[
          { href: links.persetujuan, label: "Persetujuan" },
          { href: links.riwayat, label: "Riwayat" },
        ]}
      />
      <ReservationTable key={tab} tipe={tipe} tab={tab} reservations={reservations} />
    </div>
  );
}
