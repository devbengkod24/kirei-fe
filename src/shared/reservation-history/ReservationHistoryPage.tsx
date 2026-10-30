import { SegmentedNav } from "@/components/ui/SegmentedNav";
import { RESERVATION_TYPES, type ReservationScope, type ReservationType } from "@/types/reservation";
import { RESERVATION_TYPE_LABEL } from "@/shared/reservation/reservationTypes";
import { ActiveReservationList } from "./ActiveReservationList";
import { getReservationHistory } from "./getReservationHistory";
import { DEFAULT_HISTORY_QUERY, historyHref, historySearchParams, type HistoryQuery, type HistoryView } from "./query";
import { ReservationHistoryTable } from "./ReservationHistoryTable";

export interface ReservationHistoryPageProps {
  tipe: ReservationType;
  view: HistoryView;
  page: number;
  perPage: number;
  scope: ReservationScope;
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
  basePath,
  showTypeTabs = false,
  createHref,
}: ReservationHistoryPageProps) {
  const query: HistoryQuery = { tipe, view, page, perPage };
  const result = await getReservationHistory(query, scope);
  const href = (next: Partial<HistoryQuery>) => historyHref(basePath, { ...query, ...next }, showTypeTabs);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3.5">
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

      {result.view === "aktif" ? (
        <ActiveReservationList tipe={tipe} today={result.today} upcoming={result.upcoming} createHref={createHref} />
      ) : (
        <ReservationHistoryTable
          tipe={tipe}
          items={result.items}
          page={result.page}
          perPage={perPage}
          totalPages={result.totalPages}
          prevHref={result.page > 1 ? href({ page: result.page - 1 }) : null}
          nextHref={result.page < result.totalPages ? href({ page: result.page + 1 }) : null}
          baseParams={historySearchParams({ ...query, page: 1, perPage: DEFAULT_HISTORY_QUERY.perPage }, showTypeTabs)}
        />
      )}
    </div>
  );
}
