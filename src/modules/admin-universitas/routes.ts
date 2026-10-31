import type { ReservationTab } from "@/shared/reservation-management/getReservationRequests";
import type { ReservationType } from "@/types/reservation";

export const ADMIN_UNIVERSITAS_ROUTES = {
  dashboard: "/admin/dashboard",
  /** Base paths of the pages with a [tipe] segment; each opens Ruangan. */
  facilities: "/admin/fasilitas",
  internalReservation: "/admin/reservasi-internal",
  reservations: "/admin/reservasi",
  floorPlans: "/admin/denah",
  users: "/admin/pengguna",
  reports: "/admin/laporan",
  announcements: "/admin/pengumuman",
  profile: "/admin/profil",
} as const;

export function facilitiesRoute(tipe: ReservationType) {
  return `${ADMIN_UNIVERSITAS_ROUTES.facilities}/${tipe}`;
}

export function internalReservationRoute(tipe: ReservationType) {
  return `${ADMIN_UNIVERSITAS_ROUTES.internalReservation}/${tipe}`;
}

/** Without a tab it opens Persetujuan. */
export function reservationsRoute(tipe: ReservationType, tab?: ReservationTab) {
  return tab ? `${ADMIN_UNIVERSITAS_ROUTES.reservations}/${tipe}/${tab}` : `${ADMIN_UNIVERSITAS_ROUTES.reservations}/${tipe}`;
}
