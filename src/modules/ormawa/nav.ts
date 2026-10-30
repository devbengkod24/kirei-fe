export interface NavLinkConfig {
  id: string;
  label: string;
  href: string;
  iconName:
    | "dashboard"
    | "create_reservation"
    | "draft_reservation"
    | "reservation_history"
    | "announcements"
    | "profile"
    | "contact"
    | "faq";
}

export const ORMAWA_PRIMARY_NAV: NavLinkConfig[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    iconName: "dashboard",
  },
  {
    id: "buat-reservasi",
    label: "Buat Reservasi",
    href: "/reservasi/baru",
    iconName: "create_reservation",
  },
  {
    id: "draft-reservasi",
    label: "Draft Reservasi",
    href: "/reservasi/draft",
    iconName: "draft_reservation",
  },
  {
    id: "reservasi-riwayat",
    label: "Reservasi & Riwayat",
    href: "/reservasi/riwayat",
    iconName: "reservation_history",
  },
  {
    id: "pengumuman",
    label: "Pengumuman",
    href: "/pengumuman",
    iconName: "announcements",
  },
];

export const ORMAWA_SECONDARY_NAV: NavLinkConfig[] = [
  {
    id: "profil",
    label: "Profil",
    href: "/profil",
    iconName: "profile",
  },
  {
    id: "hubungi-kami",
    label: "Hubungi Kami",
    href: "/bantuan/kontak",
    iconName: "contact",
  },
  {
    id: "faq",
    label: "FAQ",
    href: "/bantuan/faq",
    iconName: "faq",
  },
];

