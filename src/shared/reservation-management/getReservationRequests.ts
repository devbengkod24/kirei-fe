import { connection } from "next/server";
import { buildFacilityRequestsMock, buildReservationsMock } from "@/mocks/reservations";
import { mockRoomsInScope } from "@/mocks/rooms";
import type { AdminScope } from "@/shared/admin-scope";
import type { ReservationRequest, ReservationType } from "@/types/reservation";

export type ReservationTab = "persetujuan" | "riwayat";

const HISTORY_STATUSES = new Set(["selesai", "ditolak", "dibatalkan"]);

/** Rooms are narrowed by the faculty scope; GOR and vehicles belong to the university. */
function requestsOfType(scope: AdminScope, tipe: ReservationType, now: Date) {
  if (tipe !== "ruangan") return buildFacilityRequestsMock(now).filter((reservation) => reservation.type === tipe);
  const roomCodes = new Set(mockRoomsInScope(scope.fakultasId).map((room) => room.code));
  return buildReservationsMock(now).filter((reservation) => roomCodes.has(reservation.roomName));
}

/** Pending requests for "persetujuan", closed ones for "riwayat"; newest first in history. */
export async function getReservationRequests(
  scope: AdminScope,
  tab: ReservationTab,
  tipe: ReservationType = "ruangan",
): Promise<ReservationRequest[]> {
  await connection();
  // TODO: replace with the orval client (no-store, filtered by scope, type, and tab).
  const inScope = requestsOfType(scope, tipe, new Date());

  if (tab === "persetujuan") {
    return inScope
      .filter((reservation) => reservation.status === "menunggu_konfirmasi")
      .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  }
  return inScope
    .filter((reservation) => HISTORY_STATUSES.has(reservation.status))
    .sort((a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt));
}
