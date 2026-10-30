import type { NavLinkConfig } from "@/shared/layout/RoleShell";
import { ADMIN_FAKULTAS_ROUTES } from "./routes";

export const ADMIN_FAKULTAS_NAV: NavLinkConfig[][] = [
  [
    { label: "Dashboard", href: ADMIN_FAKULTAS_ROUTES.dashboard, iconSrc: "/icons/nav/dashboard.svg" },
    { label: "Kelola Ruangan", href: ADMIN_FAKULTAS_ROUTES.rooms, iconSrc: "/icons/nav/manage-rooms.svg" },
    {
      label: "Reservasi Internal",
      href: ADMIN_FAKULTAS_ROUTES.internalReservation,
      iconSrc: "/icons/nav/internal-reservation.svg",
    },
    { label: "Kelola Reservasi", href: ADMIN_FAKULTAS_ROUTES.reservations, iconSrc: "/icons/nav/manage-reservations.svg" },
    { label: "Laporan Pengguna", href: ADMIN_FAKULTAS_ROUTES.reports, iconSrc: "/icons/nav/user-reports.svg" },
    { label: "Pengumuman", href: ADMIN_FAKULTAS_ROUTES.announcements, iconSrc: "/icons/nav/announcements.svg", iconSize: 20 },
  ],
  [{ label: "Profil", href: ADMIN_FAKULTAS_ROUTES.profile, iconSrc: "/icons/nav/profile.svg" }],
];
