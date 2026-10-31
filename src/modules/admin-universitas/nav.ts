import type { NavLinkConfig } from "@/shared/layout/RoleShell";
import { ADMIN_UNIVERSITAS_ROUTES } from "./routes";

// Pages with a [tipe] segment pick the type with tabs on the page (TypeTabs), not in the sidebar.
export const ADMIN_UNIVERSITAS_NAV: NavLinkConfig[][] = [
  [
    { label: "Dashboard", href: ADMIN_UNIVERSITAS_ROUTES.dashboard, iconSrc: "/icons/nav/dashboard.svg" },
    { label: "Kelola Fasilitas", href: ADMIN_UNIVERSITAS_ROUTES.facilities, iconSrc: "/icons/nav/manage-rooms.svg" },
    {
      label: "Reservasi Internal",
      href: ADMIN_UNIVERSITAS_ROUTES.internalReservation,
      iconSrc: "/icons/nav/internal-reservation.svg",
    },
    { label: "Kelola Reservasi", href: ADMIN_UNIVERSITAS_ROUTES.reservations, iconSrc: "/icons/nav/manage-reservations.svg" },
    { label: "Kelola Denah", href: ADMIN_UNIVERSITAS_ROUTES.floorPlans, iconSrc: "/icons/nav/floor-plan.svg" },
    { label: "Kelola Pengguna", href: ADMIN_UNIVERSITAS_ROUTES.users, iconSrc: "/icons/nav/manage-users.svg" },
    { label: "Laporan Pengguna", href: ADMIN_UNIVERSITAS_ROUTES.reports, iconSrc: "/icons/nav/user-reports.svg" },
    { label: "Pengumuman", href: ADMIN_UNIVERSITAS_ROUTES.announcements, iconSrc: "/icons/nav/announcements.svg", iconSize: 20 },
  ],
  [{ label: "Profil", href: ADMIN_UNIVERSITAS_ROUTES.profile, iconSrc: "/icons/nav/profile.svg" }],
];
