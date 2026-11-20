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
    description: "Pilih satu jenis kendaraan yang masih tersedia pada tanggal perjalananmu, lalu isi tujuan dan jumlah rombongan.",
  },
  {
    iconSrc: "/icons/calendar-outline.svg",
    title: "Kalender Ketersediaan",
    description: "Lihat slot kosong, jadwal kuliah, dan slot yang sudah dipesan sebelum mengajukan.",
  },
];

export interface FacilitySlide {
  src: string;
  label: string;
  alt: string;
}

/** Illustrations cycled by the carousel beside the facility list. */
export const FACILITY_SLIDES: FacilitySlide[] = [
  { src: "/landing/facility-classroom.svg", label: "ruang kelas", alt: "Ilustrasi ruang kelas dengan papan tulis dan meja mahasiswa" },
  { src: "/landing/facility-meeting.svg", label: "ruang rapat", alt: "Ilustrasi ruang rapat dengan meja panjang dan layar presentasi" },
  { src: "/landing/facility-auditorium.svg", label: "auditorium", alt: "Ilustrasi auditorium dengan panggung, layar, dan deretan kursi penonton" },
  { src: "/landing/facility-sports-hall.svg", label: "GOR", alt: "Ilustrasi lapangan basket di dalam gedung olahraga" },
  { src: "/landing/facility-vehicle.svg", label: "kendaraan operasional", alt: "Ilustrasi bus operasional di depan gedung kampus" },
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
  description: "Ormawa dan UKM wajib melampirkan surat PDF. Belum punya surat? Simpan sebagai draft dan unggah dalam 24 jam. Dosen tidak memerlukan surat.",
};

const BOOKING_WINDOW_RULE: IconItem = {
  iconSrc: "/icons/calendar-clock.svg",
  title: "Batas Pemesanan",
  description: "Ormawa dan UKM paling cepat memesan untuk lusa. Hari ini (H-0) dan besok (H-1) tidak bisa dipesan.",
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
        description: "Pukul 07.00 sampai 20.00 WIB. Jam mulai dan selesai dipilih per 10 menit.",
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
        description: "Maksimal 2 jam per pemesanan, dalam slot 1 jam antara pukul 07.00 dan 22.00 WIB.",
      },
      LETTER_RULE,
      BOOKING_WINDOW_RULE,
      {
        iconSrc: "/icons/slot-check.svg",
        title: "Persetujuan",
        description: "Semua pemesanan GOR diperiksa admin universitas.",
      },
    ],
  },
  {
    id: "kendaraan",
    label: "Kendaraan",
    iconSrc: "/landing/bus.png",
    rules: [
      {
        iconSrc: "/icons/notes.svg",
        title: "Data Permohonan",
        description: "Isi No HP, tanggal mulai dan selesai, jumlah rombongan, dan tujuan. Tujuan boleh lebih dari satu. Pilih juga menginap atau antar jemput.",
      },
      {
        iconSrc: "/landing/bus.png",
        title: "Satu Jenis Kendaraan",
        description: "Satu permohonan untuk satu jenis kendaraan. Pilihan yang muncul hanya jenis yang masih tersedia pada tanggalmu.",
      },
      {
        iconSrc: "/icons/contact-mail.svg",
        title: "Tanya BIUM Dulu",
        description: "Ormawa dan UKM sebaiknya menanyakan ke BIUM kendaraan mana yang tersedia sebelum mengajukan.",
      },
      {
        iconSrc: "/icons/slot-check.svg",
        title: "Surat dan Persetujuan",
        description: "Wajib melampirkan surat PDF, termasuk dosen. Admin universitas memutuskan, dan hasilnya tampil di Reservasi & Riwayat.",
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
      "Admin universitas dapat mengambil alih slot untuk agenda universitas. Reservasi dicabut tanpa ruangan pengganti, dan kamu menerima notifikasi email.",
  },
  {
    question: "Saya dosen dan kelas saya perlu pindah sementara. Bagaimana?",
    answer:
      "Dosen dapat memindahkan kelas sementara ke slot yang kosong melalui Operator. Pindah ruang permanen tidak diajukan di sini, melainkan lewat BIUM.",
  },
];

export const CAMPUS_ADDRESS = ["Universitas Dian Nuswantoro", "Jl. Imam Bonjol No. 207", "Semarang Tengah 50131"];
