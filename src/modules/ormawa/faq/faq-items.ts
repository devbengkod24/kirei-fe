import { LETTER_MAX_SIZE_MB } from "@/config/reservation";

export interface FaqItem {
  question: string;
  answer: string;
}

// Kept in line with the business rules in AGENTS.md; Laravel stays the source of truth.
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Apa saja yang bisa saya pinjam lewat KIREI?",
    answer:
      "Ruangan di gedung fakultas dan universitas, GOR, serta kendaraan kampus. Pilih jenisnya di menu Buat Reservasi.",
  },
  {
    question: "Bagaimana cara membuat reservasi?",
    answer:
      "Buka Buat Reservasi, pilih ruangan, GOR, atau kendaraan, lalu isi tanggal, waktu, dan keperluan. Unggah surat peminjaman, periksa ringkasannya, lalu tekan Pesan. Reservasi akan berstatus Menunggu sampai admin memeriksanya.",
  },
  {
    question: "Surat peminjaman seperti apa yang harus diunggah?",
    answer: `Surat peminjaman berformat PDF dengan ukuran maksimal ${LETTER_MAX_SIZE_MB} MB. Reservasi tidak bisa dikirim tanpa surat.`,
  },
  {
    question: "Saya belum punya suratnya. Apa yang harus saya lakukan?",
    answer:
      "Tekan Simpan Draft di langkah terakhir. Draft muncul di menu Draft Reservasi, tetapi hanya tersimpan di browser yang Anda pakai dan slotnya belum dipesan. Unggah surat lalu tekan Pesan dalam 24 jam setelah draft disimpan, atau sebelum jadwal reservasi dimulai bila lebih dulu. Setelah tenggat lewat, draft tidak bisa dikirim dan Anda perlu membuat reservasi baru.",
  },
  {
    question: "Bolehkah saya meminjam ruangan di fakultas lain?",
    answer:
      "Boleh. Ruangan di fakultas mana pun bisa dipesan. Reservasinya diperiksa admin fakultas pemilik ruangan, dan tetap memakai surat peminjaman seperti biasa. Ormawa tidak terikat fakultas, jadi semua ormawa memakai jalur ini.",
  },
  {
    question: "Bagaimana cara mengetahui reservasi saya sudah disetujui?",
    answer:
      "Lihat menu Reservasi & Riwayat. Reservasi yang sedang berjalan ada di tab Reservasi dengan status Menunggu atau Disetujui. Reservasi yang selesai, ditolak, atau dibatalkan pindah ke tab Riwayat beserta alasannya.",
  },
  {
    question: "Mengapa reservasi saya yang sudah disetujui dicabut?",
    answer:
      "Admin universitas dapat mencabut reservasi yang sudah disetujui bila slot dibutuhkan untuk agenda universitas. Tidak ada ruangan pengganti, dan Anda mendapat pemberitahuan lewat email. Statusnya tampil sebagai Dicabut.",
  },
  {
    question: "Apakah akun saya bisa diblokir jika tidak hadir atau terlambat?",
    answer:
      "Tidak. KIREI tidak memberi penalti atau memblokir akun. Meski begitu, batalkan draft yang tidak jadi dipakai dan beri tahu admin bila rencana berubah, agar slotnya bisa dipakai peminjam lain.",
  },
  {
    question: "Ke mana saya melapor jika ada fasilitas yang rusak atau sistem bermasalah?",
    answer:
      "Buka menu Hubungi Kami, pilih kategori pengaduan, lalu tulis masalahnya. Laporan akan diterima admin. Untuk hal yang mendesak, gunakan WhatsApp atau email yang tercantum di halaman yang sama.",
  },
];

const DOSEN_ANSWERS: Record<string, string> = {
  "Bagaimana cara membuat reservasi?":
    "Buka Buat Reservasi, pilih ruangan, GOR, atau kendaraan, lalu isi tanggal, waktu, dan keperluan. Periksa ringkasannya, lalu tekan Pesan. Dosen tidak perlu mengunggah surat peminjaman. Reservasi akan berstatus Menunggu sampai admin memeriksanya.",
  "Bolehkah saya meminjam ruangan di fakultas lain?":
    "Boleh. Ruangan di fakultas mana pun bisa dipesan. Reservasinya diperiksa admin fakultas pemilik ruangan.",
  "Apakah akun saya bisa diblokir jika tidak hadir atau terlambat?":
    "Tidak. KIREI tidak memberi penalti atau memblokir akun. Meski begitu, beri tahu admin bila rencana berubah, agar slotnya bisa dipakai peminjam lain.",
};

/** Dosen book without a loan letter, so the letter and draft questions are left out and the rest reworded. */
export const DOSEN_FAQ_ITEMS: FaqItem[] = FAQ_ITEMS.filter(
  (item) => !/surat/i.test(item.question),
).map((item) => ({ ...item, answer: DOSEN_ANSWERS[item.question] ?? item.answer }));
