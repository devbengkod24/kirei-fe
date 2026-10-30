# Role dan Halaman

Pemetaan halaman per role, URL, dan komponen `shared/` yang dipakai.

Sumber: Figma V3 (page `V3`), **disesuaikan dengan keputusan di AGENTS.md**. Figma belum diperbarui, jadi bila Figma dan dokumen ini berbeda, ikuti dokumen ini. Daftar perbedaannya ada di bagian akhir.

URL di bawah adalah rencana. Yang sudah ada di kode hanya halaman ormawa/dosen; sisanya dibangun mengikuti tabel ini.

## Ringkasan

| Role | Route group | Prefix URL | Navigasi |
|---|---|---|---|
| `ormawa`, `dosen` | `(ormawa)` | `/` | Sidebar |
| `admin_fakultas` | `(admin-fakultas)` | `/fakultas` | Sidebar |
| `admin_universitas` | `(admin-universitas)` | `/admin` | Sidebar + pilihan tipe (Ruangan, GOR, Kendaraan) |
| `operator` | `(operator)` | `/operator` | Header saja, tanpa sidebar |
| Publik | `(auth)` | `/` | Tanpa shell |

## Publik dan autentikasi

| Halaman | URL | Catatan |
|---|---|---|
| Login | `/login` | Login Sanctum SPA. Satu login untuk semua role, lalu diarahkan ke dashboard role-nya. |
| Lupa sandi | `/lupa-sandi` | |
| Konfirmasi berhasil | `/konfirmasi/berhasil` | Tujuan tautan dari email. |
| Tautan tidak berlaku | `/konfirmasi/gagal` | |
| Halaman tidak ditemukan | `not-found.tsx` | |
| Masalah server | `error.tsx` / `global-error.tsx` | |
| Pemeliharaan | `/pemeliharaan` | |

## Ormawa dan dosen

Ormawa dan dosen memakai layar dan URL yang sama. Menu dan URL ada di `modules/ormawa/nav.ts` dan `modules/ormawa/routes.ts`.

| Menu | URL | Isi | Komponen |
|---|---|---|---|
| Dashboard | `/dashboard` | Sapaan, kalender log reservasi, kartu Total Reservasi, reservasi hari ini, pengumuman terbaru | `shared/dashboard` (`UserDashboard`) |
| Buat Reservasi | `/reservasi/baru` | Pilih jenis (ruangan, GOR, kendaraan), lalu jadwal dan unit. Ruangan dipilih dari denah lantai. Detail pemesanan ditampilkan sebelum dikirim. | `shared/reservation-form` |
| Draft Reservasi | `/reservasi/draft` | Reservasi yang menunggu surat peminjaman. Timer hitung mundur sampai tenggat unggah PDF. | `modules/ormawa` |
| Reservasi & Riwayat | `/reservasi/riwayat` | Tab Ruangan, GOR, Kendaraan. Kode tiket dan QR per reservasi. | `shared/reservation-history` |
| Pengumuman | `/pengumuman` | Tab Informasi dan Pengingat. Hanya baca. | `shared/announcements` (`canManage={false}`) |
| Profil | `/profil` | Data diri dan ubah kata sandi. | `shared/profile` |
| Hubungi Kami | `/bantuan/kontak` | Formulir pengaduan ke admin dan kontak. | `modules/ormawa` |
| FAQ | `/bantuan/faq` | | `modules/ormawa` |

Catatan:
- Peminjam boleh memilih ruangan fakultas mana pun. Bila ruangan milik fakultas lain, reservasi disetujui admin fakultas pemilik ruangan, tanpa surat tambahan.
- Ormawa tingkat universitas (BEM, UKM) punya `fakultasId: null`, jadi reservasi ruangannya selalu lewat jalur di atas.
- Bila reservasi dipindah karena slotnya dipakai admin, peminjam cukup menerima pemberitahuan dan melihat jadwal barunya di Riwayat.

## Admin Fakultas

Semua data terkunci ke fakultas admin (`scope={{ fakultasId: user.fakultasId }}`). Hanya mengelola **ruangan**, jadi tidak ada pilihan tipe.

| Menu | URL | Isi | Komponen |
|---|---|---|---|
| Dashboard | `/fakultas/dashboard` | Kartu Total Reservasi Hari Ini, Check-in Hari Ini, Ruangan Tersedia; grafik distribusi reservasi; tabel reservasi hari ini; laporan pengguna terbaru | `shared/dashboard` (`AdminDashboard`) |
| Kelola Ruangan | `/fakultas/ruangan` | Daftar ruangan di gedung milik fakultas, ubah detail dan status ruangan. Tidak termasuk edit denah. | `shared/unit-management` (`tipe="ruangan"`) |
| Reservasi Internal | `/fakultas/reservasi-internal` | Admin memesan ruangan, termasuk memakai slot yang sudah dipesan (lihat "Memakai slot yang sudah dipesan"). | `shared/reservation-form` |
| Kelola Reservasi: Persetujuan | `/fakultas/persetujuan` | Reservasi ruangan fakultas yang menunggu keputusan, termasuk dari peminjam luar fakultas. | `shared/reservation-approval` |
| Kelola Reservasi: Riwayat | `/fakultas/riwayat` | | `shared/reservation-history` |
| Laporan Pengguna | `/fakultas/laporan` | Pengaduan pengguna, dengan filter status, kategori, dan tanggal. | `shared/user-reports` |
| Pengumuman | `/fakultas/pengumuman` | Kelola pengumuman fakultas. | `shared/announcements` (`canManage`) |
| Profil | `/fakultas/profil` | | `shared/profile` |

Persetujuan dan Riwayat tampil sebagai dua tab di satu halaman "Kelola Reservasi", tetapi masing-masing punya URL sendiri.

## Admin Universitas

Mengambil alih semua menu SuperAdmin lama. Di atas sidebar ada pilihan tipe (Ruangan, GOR, Kendaraan) yang menentukan segmen `[tipe]` di URL. `/admin` mengarah ke `/admin/ruangan/dashboard`.

**Menu per tipe** (`[tipe]` = `ruangan | gor | kendaraan`)

| Menu | URL | Isi | Komponen |
|---|---|---|---|
| Dashboard | `/admin/[tipe]/dashboard` | Sama dengan dashboard Admin Fakultas, untuk tipe terpilih | `shared/dashboard` (`AdminDashboard`) |
| Kelola Reservasi: Persetujuan | `/admin/[tipe]/persetujuan` | | `shared/reservation-approval` |
| Kelola Reservasi: Riwayat | `/admin/[tipe]/riwayat` | | `shared/reservation-history` |
| Reservasi Internal | `/admin/[tipe]/reservasi-internal` | Boleh memakai slot yang sudah dipesan di semua ruangan. | `shared/reservation-form` |
| Kelola Ruangan / GOR / Kendaraan | `/admin/[tipe]/unit` | Label menu mengikuti tipe. | `shared/unit-management` |

**Menu umum** (tidak bergantung tipe)

| Menu | URL | Isi | Komponen |
|---|---|---|---|
| Kelola Denah | `/admin/denah` | Editor denah lantai (react-konva). Hanya Admin Universitas. | `modules/admin-universitas` |
| Kelola Pengguna | `/admin/pengguna` | Tab Ormawa dan Dosen: daftar, detail, tambah, status akun. | `modules/admin-universitas` |
| Laporan Pengguna | `/admin/laporan` | | `shared/user-reports` |
| Pengumuman | `/admin/pengumuman` | Pengumuman universitas dan fakultas. | `shared/announcements` (`canManage`) |
| Profil | `/admin/profil` | | `shared/profile` |

**Filter fakultas.** Ditampilkan di halaman yang memuat data fakultas: semua halaman `/admin/ruangan/*`, Kelola Denah, Laporan Pengguna, dan Pengumuman. Nilainya dibawa di URL (`?fakultas=<id>`), kosong berarti semua fakultas. Tidak ditampilkan untuk GOR dan kendaraan. Contoh kode ada di `docs/architecture.md` bagian "Scope fakultas".

## Operator

Satu lantai di satu gedung. Satu halaman, tanpa sidebar. Menu avatar di header berisi nama, peran, dan Logout.

| Halaman | URL | Isi | Komponen |
|---|---|---|---|
| Ketersediaan lantai | `/operator` | Grid semua ruangan di lantainya; status ketersediaan per slot waktu dengan filter jam; panel detail reservasi; tombol tambah reservasi; tombol hapus. | `modules/operator` |

Tombol tambah dan hapus hanya ditampilkan bila API mengizinkan. Aturannya ditetapkan Laravel.

## Memakai slot yang sudah dipesan

Berlaku untuk Admin Universitas (semua ruangan) dan Admin Fakultas (ruangan fakultasnya), lewat Reservasi Internal.

1. Admin memilih slot. Slot yang sudah dipesan tetap bisa dipilih dan ditandai.
2. Untuk tiap reservasi yang terdampak, admin memilihkan jadwal pengganti dari slot kosong.
3. Bila tidak ada slot pengganti, admin membatalkan reservasi itu dan wajib mengisi alasan.
4. Admin mengonfirmasi, lalu slot dipesan atas nama admin.
5. Peminjam lama menerima pemberitahuan. Tidak ada persetujuan dari peminjam.

Kemampuan ini dikirim ke `shared/reservation-form` lewat prop (mis. `canUseBookedSlot`), bukan dengan mengecek nama role.

## Komponen `shared/` dan pemakainya

| Folder | Dipakai oleh | Props pembeda |
|---|---|---|
| `shared/dashboard` | Semua kecuali operator | `UserDashboard` untuk peminjam, `AdminDashboard` untuk admin; `tipe`, `scope` |
| `shared/reservation-form` | Ormawa/dosen, kedua admin | `tipe`, `canUseBookedSlot` |
| `shared/reservation-approval` | Kedua admin | `tipe`, `scope`, `showFakultasFilter` |
| `shared/reservation-history` | Ormawa/dosen, kedua admin | `tipe`, `scope`, `showFakultasFilter` |
| `shared/unit-management` | Kedua admin | `tipe`, `scope` |
| `shared/user-reports` | Kedua admin | `scope`, `showFakultasFilter` |
| `shared/announcements` | Ormawa/dosen, kedua admin | `canManage`, `scope` |
| `shared/profile` | Ormawa/dosen, kedua admin | |
| `shared/layout` | Semua | |

## Perbedaan dengan Figma V3

Bagian ini juga menjadi daftar yang perlu diperbarui di Figma.

| Di Figma V3 | Yang berlaku | Alasan |
|---|---|---|
| Section **SuperAdmin** terpisah | Menunya (Kelola Denah, Kelola Pengguna) masuk ke Admin Universitas | `superadmin` digabung ke `admin_universitas` |
| Kartu penalti dan peringatan akun diblokir di dashboard ormawa | Dihapus; hanya kartu Total Reservasi | Tidak ada penalti dan blokir akun |
| Angka "Pengguna terblokir" di Distribusi Pengguna (semua dashboard admin) | Dihapus | Sama |
| Seri "Reservasi Pelanggaran" di grafik dashboard admin | Dihapus; grafik memuat reservasi berhasil dan dibatalkan | Sama |
| Admin Universitas hanya punya pilihan tipe | Ditambah filter fakultas di halaman yang memuat data fakultas | Fakultas adalah batas data |
| Reservasi Internal belum punya layar jadwal pengganti | Ditambah alur "Memakai slot yang sudah dipesan" | Aturan bisnis di AGENTS.md |
| Kelola Pengguna hanya Ormawa dan Dosen | Belum ada desain untuk akun admin fakultas dan operator | Perlu dikonfirmasi ke desainer |
| Merek "Bengkel Koding / Coworking Space" | Belum diputuskan; aset sementara dipakai | Perlu dikonfirmasi |
| Salah satu frame Profil di section Admin Fakultas memakai sidebar ormawa | Profil admin memakai sidebar admin | Salah salin di Figma |
