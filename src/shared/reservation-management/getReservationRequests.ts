import { connection } from "next/server";
import { buildFacilityRequestsMock, buildReservationsMock } from "@/mocks/reservations";
import { mockRoomsInScope } from "@/mocks/rooms";
import type { AdminScope } from "@/shared/admin-scope";
import type { ReservationRequest, ReservationType } from "@/types/reservation";
import { requestsForTab, type ReservationTab } from "./requestTabs";

export type { ReservationTab } from "./requestTabs";

export interface ReservationCandidates {
  /** Every request of this type in the admin's scope, whatever its status. */
  reservations: ReservationRequest[];
  /** Room codes in the scope, for requests created later in the browser; null for GOR and vehicles. */
  roomCodes: string[] | null;
}

/**
 * Requests an admin may see, before splitting into tabs. Rooms are narrowed by the faculty scope;
 * GOR and vehicles belong to the university. The table splits them, so an approval in the demo
 * store can move a request from "persetujuan" to "riwayat".
 */
export async function getReservationCandidates(
  scope: AdminScope,
  tipe: ReservationType = "ruangan",
): Promise<ReservationCandidates> {
  await connection();
  // TODO: replace with the orval client (no-store, filtered by scope, type, and tab).
  const now = new Date();
  if (tipe !== "ruangan") {
    return { reservations: buildFacilityRequestsMock(now).filter((reservation) => reservation.type === tipe), roomCodes: null };
  }
  const roomCodes = mockRoomsInScope(scope.fakultasId).map((room) => room.code);
  const inScope = new Set(roomCodes);
  return { reservations: buildReservationsMock(now).filter((reservation) => inScope.has(reservation.roomName)), roomCodes };
}

/** Pending requests for "persetujuan", decided ones for "riwayat"; newest first in history. */
export async function getReservationRequests(
  scope: AdminScope,
  tab: ReservationTab,
  tipe: ReservationType = "ruangan",
): Promise<ReservationRequest[]> {
  const { reservations } = await getReservationCandidates(scope, tipe);
  return requestsForTab(reservations, tab);
}
