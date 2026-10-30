import { UserProfile, ReservationItem, AnnouncementItem } from "@/types/dashboard";

export const INITIAL_USER_PROFILE: UserProfile = {
  id: "usr-829102",
  name: "NURUDIN WAFIQ MUSTAQIM",
  role: "ormawa",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  isBlocked: true,
  blockedUntil: "28 April",
  totalReservations: 12,
  totalPenalties: 2,
  maxPenalties: 3,
};

export const INITIAL_TODAY_RESERVATION: ReservationItem = {
  id: "res-01827",
  ticketCode: "#828374",
  dateLabel: "Rabu, 18 Oct 2026",
  timeRangeLabel: "09.30 - 10.20 WIB",
  buildingName: "Gedung H",
  roomName: "H.3.7",
  status: "disetujui",
};

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "ann-01",
    title: "Ini judul pengumumannya",
    category: "informasi",
    categoryLabel: "Informasi",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales.",
    authorName: "Adhitya Nugraha S.Kom, M.CS",
    publishedAt: "25 Feb 13:45 WIB",
  },
  {
    id: "ann-02",
    title: "Ini judul pengumumannya",
    category: "pemberitahuan",
    categoryLabel: "Pemberitahuan",
    content: "Halo, reservasi kamu terpaksa kami batalkan karena alasan berikut:",
    cancellationReason:
      "Meja-K01 akan dipakai untuk keperluan prodi pada pukul 08.00 WIB - selesai. Untuk berjaga-jaga, ...",
    authorName: "Adhitya Nugraha S.Kom, M.CS",
    publishedAt: "25 Feb 13:45 WIB",
  },
  {
    id: "ann-03",
    title: "Ini judul pengumumannya",
    category: "informasi",
    categoryLabel: "Informasi",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sodales.",
    authorName: "Adhitya Nugraha S.Kom, M.CS",
    publishedAt: "25 Feb 13:45 WIB",
  },
];

