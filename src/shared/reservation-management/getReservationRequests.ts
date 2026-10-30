import { connection } from "next/server";
import { buildReservationsMock } from "@/mocks/reservations";
import { mockRoomsInScope } from "@/mocks/rooms";
import type { AdminScope } from "@/shared/admin-scope";
import type { ReservationRequest } from "@/types/reservation";

export type ReservationTab = "persetujuan" | "riwayat";

/** What is being reserved; admin universitas routes use it as the [tipe] segment. */
export type ReservationKind = "ruangan" | "gor" | "kendaraan";

const HISTORY_STATUSES = new Set(["selesai", "ditolak", "dibatalkan"]);

/** Pending requests for "persetujuan", closed ones for "riwayat"; newest first in history. */
export async function getReservationRequests(scope: AdminScope, tab: ReservationTab): Promise<ReservationRequest[]> {
  await connection();
  // TODO: replace with the orval client (no-store, filtered by scope and tab).
  const roomCodes = new Set(mockRoomsInScope(scope.fakultasId).map((room) => room.code));
  const inScope = buildReservationsMock(new Date()).filter((reservation) => roomCodes.has(reservation.roomName));

  if (tab === "persetujuan") {
    return inScope
      .filter((reservation) => reservation.status === "menunggu_konfirmasi")
      .sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt));
  }
  return inScope
    .filter((reservation) => HISTORY_STATUSES.has(reservation.status))
    .sort((a, b) => Date.parse(b.startsAt) - Date.parse(a.startsAt));
}
