import type { NavLinkConfig } from "@/shared/layout/RoleShell";
import { ADMIN_GEDUNG_ROUTES } from "./routes";

export const ADMIN_GEDUNG_NAV: NavLinkConfig[][] = [
  [
    { label: "Dashboard", href: ADMIN_GEDUNG_ROUTES.dashboard, iconSrc: "/icons/nav/dashboard.svg" },
    { label: "Kelola Ruangan", href: ADMIN_GEDUNG_ROUTES.rooms, iconSrc: "/icons/nav/manage-rooms.svg" },
    { label: "Kelola Denah", href: ADMIN_GEDUNG_ROUTES.floorPlan, iconSrc: "/icons/nav/floor-plan.svg" },
    { label: "Kelola Jadwal", href: ADMIN_GEDUNG_ROUTES.lecturerSchedule, iconSrc: "/icons/nav/reservation-history.svg" },
    {
      label: "Reservasi Internal",
      href: ADMIN_GEDUNG_ROUTES.internalReservation,
      iconSrc: "/icons/nav/internal-reservation.svg",
    },
    { label: "Kelola Reservasi", href: ADMIN_GEDUNG_ROUTES.reservations, iconSrc: "/icons/nav/manage-reservations.svg" },
    { label: "Laporan Pengguna", href: ADMIN_GEDUNG_ROUTES.reports, iconSrc: "/icons/nav/user-reports.svg" },
    { label: "Pengumuman", href: ADMIN_GEDUNG_ROUTES.announcements, iconSrc: "/icons/nav/announcements.svg", iconSize: 20 },
  ],
];
