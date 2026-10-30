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
      "Tekan Simpan Draft di langkah terakhir. Draft muncul di menu Draft Reservasi lengkap dengan hitung mundur tenggat unggah surat. Unggah surat sebelum waktunya habis. Setelah tenggat lewat, draft tidak bisa dilanjutkan dan Anda perlu membuat reservasi baru.",
  },
  {
    question: "Bolehkah saya meminjam ruangan di fakultas lain?",
    answer:
      "Boleh. Reservasinya akan diperiksa oleh admin fakultas pemilik ruangan, tanpa surat tambahan. Ormawa tingkat universitas seperti BEM dan UKM selalu memakai jalur ini.",
  },
  {
    question: "Bagaimana cara mengetahui reservasi saya sudah disetujui?",
    answer:
      "Lihat menu Reservasi & Riwayat. Reservasi yang sedang berjalan ada di tab Reservasi dengan status Menunggu atau Disetujui. Reservasi yang selesai, ditolak, atau dibatalkan pindah ke tab Riwayat beserta alasannya.",
  },
  {
    question: "Mengapa jadwal reservasi saya dipindah atau dibatalkan oleh admin?",
    answer:
      "Admin boleh memakai slot yang sudah dipesan untuk keperluan kampus. Dalam kasus itu admin memilihkan jadwal pengganti untuk Anda dan Anda akan mendapat pemberitahuan. Bila tidak ada jadwal pengganti, reservasi dibatalkan dan alasannya dicantumkan.",
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
