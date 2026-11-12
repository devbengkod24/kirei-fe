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
  tutorial: "panduan",
  faq: "faq",
} as const;

export const NAV_ITEMS = [
  { id: SECTION_IDS.home, label: "Beranda" },
  { id: SECTION_IDS.facilities, label: "Fasilitas" },
  { id: SECTION_IDS.rules, label: "Peraturan" },
  { id: SECTION_IDS.tutorial, label: "Panduan" },
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
    iconSrc: "/icons/running.svg",
    title: "GOR",
    description: "Gedung olahraga kampus untuk latihan, pertandingan, dan acara. Maksimal 2 jam per pemesanan.",
  },
  {
    iconSrc: "/landing/vehicle.svg",
    title: "Kendaraan Operasional",
    description: "Ajukan tujuan, tanggal, dan jumlah rombongan tanpa perlu memilih unit atau jam.",
  },
  {
    iconSrc: "/icons/calendar-outline.svg",
    title: "Kalender Ketersediaan",
    description: "Lihat slot kosong, jadwal kuliah, dan slot yang sudah dipesan sebelum mengajukan.",
  },
];

export const RULE_ITEMS: IconItem[] = [
  {
    iconSrc: "/icons/clock.svg",
    title: "Jam Operasional",
    description: "Ruangan dapat dipesan pukul 07.00 sampai 20.00 WIB dengan slot kelipatan 10 menit.",
  },
  {
    iconSrc: "/icons/sticky-note.svg",
    title: "Surat Peminjaman",
    description: "Ormawa dan UKM wajib mengunggah surat PDF paling lambat 5 hari kerja. Reservasi dosen tidak memerlukan surat.",
  },
  {
    iconSrc: "/icons/calendar-clock.svg",
    title: "Batas Pemesanan",
    description: "Ormawa dan UKM tidak dapat memesan untuk besok (H-1) maupun hari ini (H-0).",
  },
  {
    iconSrc: "/icons/running.svg",
    title: "Durasi GOR",
    description: "GOR dapat dipesan maksimal 2 jam per pemesanan dan disetujui oleh admin universitas.",
  },
];

export interface TutorialStep {
  iconSrc: string;
  title: string;
  description: string;
}

const CREATE_RESERVATION: TutorialStep = {
  iconSrc: "/icons/nav/create-reservation.svg",
  title: "Buka Menu Buat Reservasi",
  description: "Pilih kategori fasilitas yang ingin dipesan: Ruangan, GOR, atau Kendaraan.",
};

const PICK_TIME: TutorialStep = {
  iconSrc: "/icons/clock-outline.svg",
  title: "Pilih Waktu Reservasi",
  description: "Pilih jam mulai dan selesai antara 07.00 dan 20.00 WIB, dalam kelipatan 10 menit.",
};

const PICK_ROOM: TutorialStep = {
  iconSrc: "/icons/classroom.svg",
  title: "Pilih Ruangan pada Denah",
  description: "Denah menandai ruangan yang masih tersedia. Klik ruangan yang ingin kamu pakai.",
};

const TRACK_STATUS: TutorialStep = {
  iconSrc: "/icons/nav/reservation-history.svg",
  title: "Pantau Status Reservasi",
  description: "Cek menu Reservasi & Riwayat. Setiap perubahan status juga dikirim ke email.",
};

export const TUTORIALS = [
  {
    id: "organisasi",
    label: "Ormawa & UKM",
    heading: "Panduan Reservasi Ormawa dan UKM",
    intro: "Ikuti langkah berikut untuk memesan ruangan atau GOR atas nama organisasi.",
    steps: [
      {
        iconSrc: "/icons/person-circle.svg",
        title: "Masuk ke Akun Organisasi",
        description: "Gunakan akun ormawa atau UKM yang dipegang ketua organisasi. Akun berasal dari FIK Apps, tidak perlu mendaftar.",
      },
      CREATE_RESERVATION,
      {
        iconSrc: "/icons/calendar-outline.svg",
        title: "Pilih Lokasi dan Tanggal",
        description: "Tentukan gedung dan tanggal kegiatan. Tanggal besok dan hari ini tidak dapat dipesan.",
      },
      PICK_TIME,
      PICK_ROOM,
      {
        iconSrc: "/icons/upload.svg",
        title: "Unggah Surat Peminjaman",
        description: "Unggah surat PDF lalu kirim. Kalau belum siap, simpan sebagai draft dan unggah paling lambat 5 hari kerja.",
      },
      {
        iconSrc: "/icons/slot-check.svg",
        title: "Tunggu Persetujuan Admin",
        description: "Setelah dikirim, slot terkunci untukmu. Admin menyetujui atau menolak permohonan disertai catatan.",
      },
      TRACK_STATUS,
    ],
  },
  {
    id: "dosen",
    label: "Dosen",
    heading: "Panduan Reservasi Dosen",
    intro: "Ikuti langkah berikut untuk memesan ruangan atau GOR sebagai dosen.",
    steps: [
      {
        iconSrc: "/icons/person-circle.svg",
        title: "Masuk ke Akun Dosen",
        description: "Akun dosen disinkronkan dari FIK Apps, jadi kamu tidak perlu mendaftar.",
      },
      CREATE_RESERVATION,
      {
        iconSrc: "/icons/calendar-outline.svg",
        title: "Pilih Lokasi dan Tanggal",
        description: "Tentukan gedung dan tanggal kegiatan yang kamu butuhkan.",
      },
      PICK_TIME,
      PICK_ROOM,
      {
        iconSrc: "/icons/sticky-note.svg",
        title: "Kirim Permohonan",
        description: "Reservasi ruangan dan GOR oleh dosen tidak memerlukan surat. Periksa detailnya, lalu kirim.",
      },
      {
        iconSrc: "/icons/slot-check.svg",
        title: "Tunggu Persetujuan Admin",
        description: "Permohonan masuk antrean admin fakultas pemilik ruangan, atau admin universitas untuk ruangan bersama dan GOR.",
      },
      TRACK_STATUS,
    ],
  },
] as const satisfies readonly { id: string; label: string; heading: string; intro: string; steps: TutorialStep[] }[];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Bagaimana cara mendapatkan akun?",
    answer:
      "Tidak ada pendaftaran mandiri. Akun dosen, ormawa, dan UKM disinkronkan dari FIK Apps. Akun ormawa dan UKM dipegang ketua organisasi. Akun operator dan admin dibuat oleh admin universitas.",
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
    question: "Apakah ada kode booking atau QR untuk check-in?",
    answer: "Tidak ada. Status reservasi dapat dilihat di akunmu dan setiap perubahan dikirim lewat email.",
  },
  {
    question: "Saya dosen dan kelas saya perlu pindah sementara. Bagaimana?",
    answer:
      "Dosen dapat memindahkan kelas sementara ke slot yang kosong tanpa persetujuan. Pindah ruang permanen tidak diajukan di sini, melainkan lewat BIUM.",
  },
];

export const CAMPUS_ADDRESS = ["Universitas Dian Nuswantoro", "Jl. Imam Bonjol No. 207", "Semarang Tengah 50131"];
