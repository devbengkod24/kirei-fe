import { SegmentedNav } from "@/components/ui/SegmentedNav";
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
      <SegmentedNav
        label="Tab reservasi"
        items={[
          { href: links.persetujuan, label: "Persetujuan", active: tab === "persetujuan" },
          { href: links.riwayat, label: "Riwayat", active: tab === "riwayat" },
        ]}
      />
      <ReservationTable key={tab} tipe={tipe} tab={tab} reservations={reservations} />
    </div>
  );
}
