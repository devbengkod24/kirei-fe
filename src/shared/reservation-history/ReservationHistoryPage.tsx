import { SegmentedNav } from "@/components/ui/SegmentedNav";
import { RESERVATION_TYPES, type ReservationScope, type ReservationType } from "@/types/reservation";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";
import { getHistoryRecords } from "./getReservationHistory";
import { historyHref, type HistoryQuery, type HistoryView } from "./query";
import { ReservationHistoryView } from "./ReservationHistoryView";

export interface ReservationHistoryPageProps {
  tipe: ReservationType;
  view: HistoryView;
  page: number;
  perPage: number;
  scope: ReservationScope;
  /** The signed-in borrower, for `{ mine: true }`: their requests from the demo store join the list. */
  ownerId?: string;
  /** Path of the page itself; tabs and pagination link back to it. */
  basePath: string;
  /** Show the Ruangan/Kendaraan/GOR switch. Off where the type is part of the route. */
  showTypeTabs?: boolean;
  /** Link in the empty state of the active tab. */
  createHref?: string;
}

const VIEW_LABEL: Record<HistoryView, string> = { aktif: "Aktif", riwayat: "Riwayat" };

/** Active reservations and history for one reservation type. Used by borrowers and admins. */
export async function ReservationHistoryPage({
  tipe,
  view,
  page,
  perPage,
  scope,
  ownerId,
  basePath,
  showTypeTabs = false,
  createHref,
}: ReservationHistoryPageProps) {
  const query: HistoryQuery = { tipe, view, page, perPage };
  const { records, now } = await getHistoryRecords(tipe, scope);
  const href = (next: Partial<HistoryQuery>) => historyHref(basePath, { ...query, ...next }, showTypeTabs);

  return (
    <div className="flex flex-1 flex-col gap-4">
      {/* type on the left, view on the right; stacked on narrow screens with the type first */}
      <div className="flex flex-col gap-3.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        {showTypeTabs && (
          <SegmentedNav
            label="Jenis reservasi"
            items={RESERVATION_TYPES.map((type) => ({
              label: RESERVATION_TYPE_LABEL[type],
              // switching type starts over on the same view, page 1
              href: href({ tipe: type, page: 1 }),
              active: type === tipe,
            }))}
          />
        )}
        <SegmentedNav
          label="Tampilan"
          items={(["aktif", "riwayat"] as const).map((option) => ({
            label: VIEW_LABEL[option],
            href: href({ view: option, page: 1 }),
            active: option === view,
          }))}
        />
      </div>

      <ReservationHistoryView
        query={query}
        records={records}
        now={now}
        ownerId={"mine" in scope ? ownerId : undefined}
        basePath={basePath}
        showTypeTabs={showTypeTabs}
        createHref={createHref}
      />
    </div>
  );
}
