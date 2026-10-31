# Role dan Halaman

Pemetaan halaman per role, URL, dan komponen `shared/` yang dipakai.

Sumber: Figma V3 (page `V3`), **disesuaikan dengan keputusan di AGENTS.md**. Figma belum diperbarui, jadi bila Figma dan dokumen ini berbeda, ikuti dokumen ini. Daftar perbedaannya ada di bagian akhir.

URL di bawah adalah rencana. Yang sudah ada di kode hanya halaman ormawa/dosen; sisanya dibangun mengikuti tabel ini.

## Ringkasan

| Role | Route group | Prefix URL | Navigasi |
|---|---|---|---|
| `ormawa`, `dosen` | `(ormawa)` | `/` | Sidebar |
| `admin_fakultas` | `(admin-fakultas)` | `/fakultas` | Sidebar |
| `admin_universitas` | `(admin-universitas)` | `/admin` | Sidebar + tab tipe (Ruangan, Kendaraan, GOR) di halaman yang sama untuk tiap tipe |
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
| Buat Reservasi | `/reservasi/baru` | Pilih jenis (Ruangan, Kendaraan, GOR). | `shared/reservation-form` (`ReservationTypePicker`) |
| Buat Reservasi: Ruangan | `/reservasi/baru/ruangan` | Gedung dan lantai, tanggal, jam, lalu ruangan dari denah (dengan filter jenis ruangan). Detail pemesanan dibuka di dialog: No HP, keperluan, surat. "Pesan" butuh surat PDF; "Simpan Draft" tidak. | `shared/reservation-form` (`ReservationFormPage tipe="ruangan"`) |
| Buat Reservasi: GOR | `/reservasi/baru/gor` | Pilih hari (7 hari ke depan), lalu satu atau beberapa slot jam berurutan; jenis kegiatan, keterangan, surat. Tanpa catatan lintas fakultas. | `shared/reservation-form` (`ReservationFormPage tipe="gor"`) |
| Buat Reservasi: Kendaraan | `/reservasi/baru/kendaraan` | Data peminjam (No HP, tujuan, jumlah peserta, keterangan kegiatan), tanggal mulai dan selesai, surat. Kendaraan ditentukan admin. Tanpa catatan lintas fakultas. | `shared/reservation-form` (`ReservationFormPage tipe="kendaraan"`) |
| Draft Reservasi | `/reservasi/draft` | Reservasi yang menunggu surat peminjaman. Tiap draft punya timer hitung mundur ke tenggat dari API (`hooks/useCountdown`) dan batasnya dalam WIB. Unggah PDF lalu "Pesan", atau "Batal". Setelah tenggat lewat, unggah dan "Pesan" dinonaktifkan. | `modules/ormawa/drafts` |
| Reservasi & Riwayat | `/reservasi/riwayat` | Tab Ruangan, Kendaraan, GOR, lalu tab Aktif (kartu "Hari ini" dan "Akan datang") dan Riwayat (tabel berhalaman). Pilihan disimpan di URL: `?tipe=gor&tampilan=riwayat&halaman=2&per=25`. | `shared/reservation-history` (`ReservationHistoryPage`, `showTypeTabs`) |
| Pengumuman | `/pengumuman` | Daftar dan filter sama dengan admin, tanpa Tambah Pengumuman. | `shared/announcements` (tanpa `canManage`) |
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
| Reservasi Internal | `/fakultas/reservasi-internal` | Admin memesan ruangan di gedung fakultasnya. Komponen sama dengan Buat Reservasi: Ruangan milik peminjam, tetapi tanpa No HP, surat, dan draft. Memakai slot yang sudah dipesan belum dibangun. | `shared/reservation-form` (`RoomReservationForm` dengan `askPhone={false}`, `withLetter={false}`) |
| Kelola Reservasi: Persetujuan | `/fakultas/persetujuan` | Reservasi ruangan fakultas yang menunggu keputusan, termasuk dari peminjam luar fakultas. | `shared/reservation-approval` |
| Kelola Reservasi: Riwayat | `/fakultas/riwayat` | | `shared/reservation-history` |
| Laporan Pengguna | `/fakultas/laporan` | Pengaduan pengguna, dengan filter status, kategori, dan tanggal. | `shared/user-reports` |
| Pengumuman | `/fakultas/pengumuman` | Kelola pengumuman fakultas. | `shared/announcements` (`canManage`) |
| Profil | `/fakultas/profil` | | `shared/profile` |

Persetujuan dan Riwayat tampil sebagai dua tab di satu halaman "Kelola Reservasi", tetapi masing-masing punya URL sendiri.

## Admin Universitas

Mengambil alih semua menu SuperAdmin lama. Satu sidebar untuk semua tipe. Menu yang fiturnya sama untuk ruangan, kendaraan, dan GOR membuka halaman dengan **tab tipe** di atasnya (Ruangan · Kendaraan · GOR, `TypeTabs`). Tipe dibawa di segmen dinamis `[tipe]` (`ruangan | kendaraan | gor`); link menu membuka Ruangan. `/admin` mengarah ke `/admin/dashboard`.

| Menu | Tab tipe | URL | Isi | Komponen |
|---|---|---|---|---|
| Dashboard | | `/admin/dashboard` | Satu dashboard gabungan semua tipe: ringkasan per tipe (hari ini, menunggu, unit tersedia), grafik mingguan dengan pilihan tipe, reservasi hari ini (dengan kolom tipe), laporan terbaru | `modules/admin-universitas/dashboard`, memakai potongan `shared/admin-dashboard` |
| Kelola Fasilitas | Ruangan, Kendaraan, GOR | `/admin/fasilitas/[tipe]` | Daftar dan ubah unit per tipe | `shared/rooms` (ruangan), komponen setara untuk GOR dan kendaraan |
| Reservasi Internal | Ruangan, Kendaraan, GOR | `/admin/reservasi-internal/[tipe]` | Admin memesan atas nama kampus. Ruangan boleh memakai slot yang sudah dipesan di semua gedung. | `shared/reservation-form` |
| Kelola Reservasi | Ruangan, Kendaraan, GOR | `/admin/reservasi/[tipe]/persetujuan`, `/admin/reservasi/[tipe]/riwayat` | Tab Persetujuan dan Riwayat, masing-masing ber-URL | `shared/reservation-management` |
| Kelola Denah | | `/admin/denah` | Editor denah lantai (react-konva). Hanya Admin Universitas. | `modules/admin-universitas` |
| Kelola Pengguna | | `/admin/pengguna` | Tab Ormawa dan Dosen: daftar, detail, tambah, status akun. | `modules/admin-universitas` |
| Laporan Pengguna | | `/admin/laporan` | | `shared/reports` |
| Pengumuman | | `/admin/pengumuman` | Pengumuman universitas dan fakultas. | `shared/announcements` (`canManage`) |
| Profil | | `/admin/profil` | | `shared/profile` |

Berpindah tab di Kelola Reservasi mempertahankan tab Persetujuan atau Riwayat yang sedang dibuka.

**Filter fakultas.** Ditampilkan di halaman yang memuat data fakultas: halaman ber-`[tipe]` dengan tipe `ruangan`, Dashboard (hanya memengaruhi angka ruangan), Kelola Denah, Laporan Pengguna, dan Pengumuman. Nilainya dibawa di URL (`?fakultas=<id>`), kosong berarti semua fakultas. Tidak ditampilkan untuk GOR dan kendaraan. Contoh kode ada di `docs/architecture.md` bagian "Scope fakultas".

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
| `shared/reservation-form` | Ormawa/dosen, kedua admin | `tipe` memilih form per jenis (`RoomReservationForm`, `SportsHallReservationForm`, `VehicleReservationForm`); semuanya berbagi `ReservationSubmitDialog`, `LetterPanel`, `useReservationSubmit`, dan potongan skema. `canUseBookedSlot` hanya untuk ruangan. |
| `shared/reservation-approval` | Kedua admin | `tipe`, `scope`, `showFakultasFilter` |
| `shared/reservation-history` | Ormawa/dosen, kedua admin | `tipe`, `scope` (`{ mine: true }` untuk peminjam, `{ fakultasId }` untuk admin), `showTypeTabs` (hanya peminjam; admin membawa tipe di URL), `showFakultasFilter` |
| `shared/reservation` | Semua yang menampilkan reservasi | Badge status dan label tipe |
| `shared/unit-management` | Kedua admin | `tipe`, `scope` |
| `shared/user-reports` | Kedua admin | `scope`, `showFakultasFilter` |
| `shared/announcements` | Ormawa/dosen, kedua admin | `canManage`, `scope` |
| `shared/profile` | Ormawa/dosen, kedua admin | |
| `shared/fakultas-filter` | Admin Universitas | `options`, `value` (`?fakultas=` di URL) |
| `shared/layout` | Semua | |

## Perbedaan dengan Figma V3

Bagian ini juga menjadi daftar yang perlu diperbarui di Figma.

| Di Figma V3 | Yang berlaku | Alasan |
|---|---|---|
| Section **SuperAdmin** terpisah | Menunya (Kelola Denah, Kelola Pengguna) masuk ke Admin Universitas | `superadmin` digabung ke `admin_universitas` |
| Kartu penalti dan peringatan akun diblokir di dashboard ormawa | Dihapus; hanya kartu Total Reservasi | Tidak ada penalti dan blokir akun |
| Angka "Pengguna terblokir" di Distribusi Pengguna (semua dashboard admin) | Dihapus | Sama |
| Seri "Reservasi Pelanggaran" di grafik dashboard admin | Dihapus; grafik memuat reservasi berhasil dan dibatalkan | Sama |
| Admin Universitas memakai pilihan tipe di atas sidebar dan dashboard per tipe | Satu sidebar, tab tipe di halaman per tipe, satu dashboard gabungan, dan filter fakultas di halaman yang memuat data fakultas | Keputusan tim; fakultas adalah batas data |
| Reservasi Internal belum punya layar jadwal pengganti | Ditambah alur "Memakai slot yang sudah dipesan" | Aturan bisnis di AGENTS.md |
| Kelola Pengguna hanya Ormawa dan Dosen | Belum ada desain untuk akun admin fakultas dan operator | Perlu dikonfirmasi ke desainer |
| Merek "Bengkel Koding / Coworking Space" | Belum diputuskan; aset sementara dipakai | Perlu dikonfirmasi |
| Salah satu frame Profil di section Admin Fakultas memakai sidebar ormawa | Profil admin memakai sidebar admin | Salah salin di Figma |
