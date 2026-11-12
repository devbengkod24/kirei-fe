/*
 * Landing page copy. Every rule shown here restates KONTEKS-DASAR (@vault:kirei); the page only
 * displays the rules, Laravel enforces them. Update this file when the vault changes.
 */

/** Same as LOGIN_PATH in lib/auth/session; repeated so client components do not bundle the mock accounts. */
export const LOGIN_HREF = "/login";

export const SECTION_IDS = {
  home: "beranda",
  facilities: "fasilitas",
  rules: "peraturan",
  faq: "faq",
} as const;

export const NAV_ITEMS = [
  { id: SECTION_IDS.home, label: "Beranda" },
  { id: SECTION_IDS.facilities, label: "Fasilitas" },
  { id: SECTION_IDS.rules, label: "Peraturan" },
  { id: SECTION_IDS.faq, label: "FAQ" },
] as const;

export interface IconItem {
  iconSrc: string;
  title: string;
  description: string;
}

export const FACILITY_ITEMS: IconItem[] = [
  {
    iconSrc: "/icons/classroom.svg",
    title: "Ruang Kelas dan Lab",
    description: "Ruang kuliah dan laboratorium di gedung fakultas maupun gedung universitas.",
  },
  {
    iconSrc: "/icons/building.svg",
    title: "Ruang Rapat dan Auditorium",
    description: "Untuk rapat, seminar, dan acara organisasi maupun dosen.",
  },
  {
    iconSrc: "/landing/stadium.svg",
    title: "GOR",
    description: "Gedung olahraga kampus untuk latihan, pertandingan, dan acara. Maksimal 2 jam per pemesanan.",
  },
  {
    iconSrc: "/landing/bus.png",
    title: "Kendaraan Operasional",
    description: "Ajukan tujuan, tanggal, dan jumlah rombongan tanpa perlu memilih unit atau jam.",
  },
  {
    iconSrc: "/icons/calendar-outline.svg",
    title: "Kalender Ketersediaan",
    description: "Lihat slot kosong, jadwal kuliah, dan slot yang sudah dipesan sebelum mengajukan.",
  },
];

export interface RuleTab {
  id: string;
  label: string;
  iconSrc: string;
  rules: IconItem[];
}

const LETTER_RULE: IconItem = {
  iconSrc: "/icons/sticky-note.svg",
  title: "Surat Peminjaman",
  description: "Ormawa dan UKM wajib mengunggah surat PDF paling lambat 1 hari kerja. Reservasi dosen tidak memerlukan surat.",
};

const BOOKING_WINDOW_RULE: IconItem = {
  iconSrc: "/icons/calendar-clock.svg",
  title: "Batas Pemesanan",
  description: "Ormawa dan UKM tidak dapat memesan untuk besok (H-1) maupun hari ini (H-0).",
};

/** Rules per facility type, shown as tabs in the Peraturan section. */
export const RULE_TABS: RuleTab[] = [
  {
    id: "ruangan",
    label: "Ruangan",
    iconSrc: "/icons/classroom.svg",
    rules: [
      {
        iconSrc: "/icons/clock.svg",
        title: "Jam Operasional",
        description: "Ruangan dapat dipesan pukul 07.00 sampai 20.00 WIB dengan slot kelipatan 10 menit.",
      },
      LETTER_RULE,
      BOOKING_WINDOW_RULE,
      {
        iconSrc: "/icons/slot-check.svg",
        title: "Persetujuan",
        description: "Disetujui admin fakultas pemilik ruangan, atau admin universitas untuk ruangan bersama.",
      },
    ],
  },
  {
    id: "gor",
    label: "GOR",
    iconSrc: "/landing/stadium.svg",
    rules: [
      {
        iconSrc: "/icons/clock.svg",
        title: "Durasi Pemakaian",
        description: "GOR dapat dipesan maksimal 2 jam per pemesanan, di antara pukul 07.00 dan 20.00 WIB.",
      },
      LETTER_RULE,
      BOOKING_WINDOW_RULE,
      {
        iconSrc: "/icons/slot-check.svg",
        title: "Persetujuan",
        description: "Semua pemesanan GOR dari dosen, ormawa, dan UKM disetujui oleh admin universitas.",
      },
    ],
  },
  {
    id: "kendaraan",
    label: "Kendaraan",
    iconSrc: "/landing/bus.png",
    rules: [
      {
        iconSrc: "/icons/sticky-note.svg",
        title: "Data Permohonan",
        description: "Isi tujuan, tanggal mulai dan selesai, jumlah rombongan, serta kontak penanggung jawab.",
      },
      {
        iconSrc: "/landing/bus.png",
        title: "Tanpa Pilih Unit",
        description: "Cukup ajukan kebutuhan perjalananmu. Kamu tidak memilih unit mobil maupun slot jam.",
      },
      {
        iconSrc: "/icons/slot-check.svg",
        title: "Persetujuan",
        description: "Semua permohonan kendaraan disetujui atau ditolak oleh admin universitas.",
      },
      {
        iconSrc: "/icons/contact-mail.svg",
        title: "Pemberitahuan",
        description: "Keputusan atas permohonanmu dikirim lewat email dan dapat dilihat di Reservasi & Riwayat.",
      },
    ],
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Siapa yang bisa memesan?",
    answer:
      "Hanya Ormawa, UKM, dan Dosen yang terdaftar yang bisa memesan fasilitas.",
  },
  {
    question: "Bisakah saya membatalkan reservasi?",
    answer:
      "Bisa, selama surat belum diunggah. Setelah reservasi disetujui, pembatalan hanya dapat dilakukan oleh admin universitas.",
  },
  {
    question: "Kenapa reservasi saya yang sudah disetujui bisa dicabut?",
    answer:
      "Admin universitas dapat mengambil alih slot untuk agenda universitas (override BIUM). Reservasi dicabut tanpa ruangan pengganti, dan kamu menerima notifikasi email.",
  },
  {
    question: "Saya dosen dan kelas saya perlu pindah sementara. Bagaimana?",
    answer:
      "Dosen dapat memindahkan kelas sementara ke slot yang kosong melalui Operator. Pindah ruang permanen tidak diajukan di sini, melainkan lewat BIUM.",
  },
];

export const CAMPUS_ADDRESS = ["Universitas Dian Nuswantoro", "Jl. Imam Bonjol No. 207", "Semarang Tengah 50131"];
