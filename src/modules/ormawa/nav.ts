import type { NavLinkConfig } from "@/shared/layout/RoleShell";
import { ORMAWA_ROUTES } from "./routes";

export const ORMAWA_NAV: NavLinkConfig[][] = [
  [
    { label: "Dashboard", href: ORMAWA_ROUTES.dashboard, iconSrc: "/icons/nav/dashboard.svg" },
    { label: "Buat Reservasi", href: ORMAWA_ROUTES.createReservation, iconSrc: "/icons/nav/create-reservation.svg" },
    { label: "Draft Reservasi", href: ORMAWA_ROUTES.draftReservation, iconSrc: "/icons/nav/draft-reservation.svg" },
    { label: "Reservasi & Riwayat", href: ORMAWA_ROUTES.reservationHistory, iconSrc: "/icons/nav/reservation-history.svg" },
    { label: "Pengumuman", href: ORMAWA_ROUTES.announcements, iconSrc: "/icons/nav/announcements.svg", iconSize: 20 },
  ],
  [
    { label: "Profil", href: ORMAWA_ROUTES.profile, iconSrc: "/icons/nav/profile.svg" },
    { label: "Hubungi Kami", href: ORMAWA_ROUTES.contact, iconSrc: "/icons/nav/contact.svg" },
    { label: "FAQ", href: ORMAWA_ROUTES.faq, iconSrc: "/icons/nav/faq.svg" },
  ],
];
