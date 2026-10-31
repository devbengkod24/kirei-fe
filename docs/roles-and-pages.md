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
| Buat Reservasi: Kendaraan | `/reservasi/baru/kendaraan` | Data peminjam (No HP, tujuan, jumlah peserta, keterangan kegiatan), tanggal mulai dan selesai, surat. Unit kendaraan diatur di luar aplikasi. Tanpa catatan lintas fakultas. | `shared/reservation-form` (`ReservationFormPage tipe="kendaraan"`) |
| Draft Reservasi | `/reservasi/draft` | Reservasi yang menunggu surat peminjaman. Tiap draft punya timer hitung mundur ke tenggat dari API (`hooks/useCountdown`) dan batasnya dalam WIB. Unggah PDF lalu "Pesan", atau "Batal". Setelah tenggat lewat, unggah dan "Pesan" dinonaktifkan. | `modules/ormawa/drafts` |
| Reservasi & Riwayat | `/reservasi/riwayat` | Tab Ruangan, Kendaraan, GOR, lalu tab Aktif (kartu "Hari ini" dan "Akan datang") dan Riwayat (tabel berhalaman). Pilihan disimpan di URL: `?tipe=gor&tampilan=riwayat&halaman=2&per=25`. | `shared/reservation-history` (`ReservationHistoryPage`, `showTypeTabs`) |
| Pengumuman | `/pengumuman` | Daftar dan filter sama dengan admin, tanpa Tambah Pengumuman. | `shared/announcements` (tanpa `canManage`) |
| Profil | `/profil` | Data diri dan ubah kata sandi. | `shared/profile` |
| Hubungi Kami | `/bantuan/kontak` | Formulir pengaduan ke admin dan kontak. | `modules/ormawa` |
| FAQ | `/bantuan/faq` | | `modules/ormawa` |

Catatan:
- Peminjam boleh memilih ruangan fakultas mana pun. Reservasi ruangan milik fakultas disetujui admin fakultas pemilik ruangan, dan tetap memakai surat peminjaman.
- Ormawa tidak terikat fakultas (`fakultasId: null`) dan semuanya setara, jadi reservasi ruangan fakultas oleh ormawa selalu lewat jalur di atas. Dosen punya fakultas asal.
- Bila reservasi dipindah karena slotnya dipakai admin, peminjam cukup menerima pemberitahuan dan melihat jadwal barunya di Riwayat.

## Admin Fakultas

Semua data terkunci ke fakultas admin (`scope={{ fakultasId: user.fakultasId }}`). Hanya mengelola **ruangan**, jadi tidak ada pilihan tipe.

| Menu | URL | Isi | Komponen |
|---|---|---|---|
| Dashboard | `/fakultas/dashboard` | Kartu Total Reservasi Hari Ini, Check-in Hari Ini, Ruangan Tersedia; grafik distribusi reservasi; tabel reservasi hari ini; laporan pengguna terbaru | `shared/dashboard` (`AdminDashboard`) |
| Kelola Ruangan | `/fakultas/ruangan` | Daftar ruangan di gedung milik fakultas, ubah detail dan status ruangan. Tidak termasuk edit denah. | `shared/unit-management` (`tipe="ruangan"`) |
| Reservasi Internal | `/fakultas/reservasi-internal` | Admin memesan ruangan di gedung fakultasnya. Komponen sama dengan Buat Reservasi: Ruangan milik peminjam, tetapi tanpa No HP, surat, dan draft. Memakai slot yang sudah dipesan belum dibangun. | `shared/reservation-form` (`RoomReservationForm` dengan `mode="internal"`) |
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
| Reservasi Internal | Ruangan, Kendaraan, GOR | `/admin/reservasi-internal/[tipe]` | Admin memesan atas nama kampus, tanpa No HP, surat, draft, dan persetujuan. Ruangan: semua gedung, dipilih lewat pilihan gedung di form, tanpa filter fakultas (memakai slot yang sudah dipesan belum dibangun). Kendaraan: tujuan, peserta, dan tanggal; unit diatur di luar aplikasi. GOR: jadwal slot seperti peminjam. | `shared/reservation-form` (form per tipe dengan `mode="internal"`), dirakit di `modules/admin-universitas/internal-reservation` |
| Kelola Reservasi | Ruangan, Kendaraan, GOR | `/admin/reservasi/[tipe]/persetujuan`, `/admin/reservasi/[tipe]/riwayat` | Tab Persetujuan dan Riwayat, masing-masing ber-URL. Kolom per tipe (`TYPE_COLUMNS`): Ruangan; Tujuan dan peserta untuk kendaraan; Kegiatan untuk GOR. Unit kendaraan diatur di luar aplikasi, jadi menyetujui kendaraan sama seperti tipe lain. Filter fakultas hanya di tab Ruangan dan ikut saat pindah tab. | `shared/reservation-management`, dirakit di `modules/admin-universitas/reservations` |
| Kelola Denah | | `/admin/denah` | Editor denah lantai dengan SVG: pilih gedung dan lantai, lalu tambah, geser, ubah ukuran, dan hapus ruangan. Bisa lewat mouse/sentuh, tombol panah, atau input angka. Disimpan dalam format `Floor`/`FloorPlanRoom` yang dibaca form reservasi. | `modules/admin-universitas/floor-plan` |
| Kelola Pengguna | | `/admin/pengguna` | Tab Ormawa, Dosen, Admin Fakultas, Operator di URL (`?tab=ormawa|dosen|admin_fakultas|operator`): tabel berhalaman dengan pencarian, dialog detail (status Aktif/Tidak Aktif dan kata sandi baru opsional), dan tambah akun dengan kata sandi. Ormawa tanpa fakultas; dosen wajib fakultas dan NPP; admin fakultas wajib fakultas (boleh lebih dari satu per fakultas, tanpa NPP); operator wajib gedung dan lantai. Field per tab diatur di `USER_TABS`. | `modules/admin-universitas/users` |
| Laporan Pengguna | | `/admin/laporan` | | `shared/reports` |
| Pengumuman | | `/admin/pengumuman` | Pengumuman universitas dan fakultas. | `shared/announcements` (`canManage`) |
| Profil | | `/admin/profil` | | `shared/profile` |

Berpindah tab di Kelola Reservasi mempertahankan tab Persetujuan atau Riwayat yang sedang dibuka.

**Filter fakultas.** Ditampilkan di halaman yang memuat data fakultas: Kelola Reservasi tipe `ruangan`, Dashboard (hanya memengaruhi angka ruangan), Laporan Pengguna, dan Pengumuman. Nilainya dibawa di URL (`?fakultas=<id>`), kosong berarti semua fakultas. Tidak ditampilkan untuk GOR dan kendaraan. Contoh kode ada di `docs/architecture.md` bagian "Scope fakultas".

## Operator

Satu lantai di satu gedung. Satu halaman, tanpa sidebar. Menu avatar di header berisi nama, peran, dan Logout.

| Halaman | URL | Isi | Komponen |
|---|---|---|---|
| Ketersediaan lantai | `/operator` | Tanggal hari ini (WIB); grid "Semua Ruangan" sebagai pemilih ruangan yang tampil di timeline; timeline ala editor video dengan filter jam; panel detail reservasi; form Buat Reservasi untuk hari ini; tombol hapus dengan dialog konfirmasi. | `modules/operator` (`OperatorFloorPage`, `FloorTimeline`) |

Tombol tambah dan hapus hanya ditampilkan bila API mengizinkan (`canCreate`, `canDelete` dari data lantai). Aturannya ditetapkan Laravel.

- **Grid Semua Ruangan.** Tiap tombol menyalakan atau mematikan track ruangan itu di timeline (bisa banyak sekaligus). Bawaan semua menyala; minimal satu ruangan tetap tampil.
- **Timeline.** Penggaris waktu horizontal di atas (penanda tiap 10 menit, label jam berbentuk chip tiap 30 menit, 07.00 sampai 21.00 WIB sesuai Filter Jam). Satu track per ruangan yang menyala, kode ruangan (chip) menempel di kolom kiri saat di-scroll ke samping. 10 menit selebar 44px. Di layar sempit timeline di-scroll ke samping di dalam kartu, halaman tidak.
- **Clip.** Jadwal Siadin (jadwal kuliah dari Siadin, oranye) hanya dibaca: tidak bisa diklik, diubah, atau dihapus di KIREI, tetapi tetap menutup ruangan. Reservasi (dibuat lewat KIREI, biru) membuka panel detail di bawah timeline. Area Kosong adalah tombol yang membuka form Buat Reservasi dengan ruangan dan jam gap itu. Tiap clip punya label teks, tidak hanya warna.
- **Penanda "Sekarang".** Garis biru dengan kepala di penggaris (playhead), hanya bila jam sekarang ada di rentang filter. Posisinya diperbarui tiap menit tanpa animasi, dan timeline di-scroll ke penanda ini saat rentang berubah.
- Form operator meminta ruangan, nama peminjam, keperluan, dan jam. Tanpa No HP dan surat, karena operator mencatat peminjaman di tempat. Form menolak jam yang bentrok dengan kuliah atau reservasi lain.

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
| Kelola Pengguna hanya Ormawa dan Dosen | Ditambah tab Admin Fakultas dan Operator dengan pola tab Dosen | Akun dibuat Admin Universitas; desain Figma belum ada |
| Merek "Bengkel Koding / Coworking Space" | Belum diputuskan; aset sementara dipakai | Perlu dikonfirmasi |
| Salah satu frame Profil di section Admin Fakultas memakai sidebar ormawa | Profil admin memakai sidebar admin | Salah salin di Figma |
| Status Ketersediaan berupa daftar slot 10 menit berlabel Tersedia atau Dipesan untuk satu ruangan | Timeline ala editor video: track per ruangan, clip Jadwal Siadin, Reservasi, dan Kosong, serta penanda "Sekarang" | Revisi dari pembimbing (daftar slot terlalu ramai, Siadin dan reservasi harus dibedakan), bentuk timeline mengikuti referensi editor video dari pengguna. Belum ada frame Figma untuk bentuk ini |
| Grid ruangan operator berjudul "Semua Kelas" dan memilih satu ruangan | Berjudul "Semua Ruangan" dan memilih banyak ruangan sekaligus (track yang tampil di timeline) | Satu lantai berisi kelas, meeting room, dan galeri; timeline menampilkan beberapa ruangan seperti referensi editor video |
| Tanggal hari ini tidak ada di halaman operator | Tanggal hari ini (WIB) di sebelah judul halaman | Revisi dari pembimbing |
| Menu avatar operator berisi NIM dan tautan "Profile" | Berisi peran, nama, dan Logout | Operator tidak punya halaman profil |
| Form Buat Reservasi operator: kartu jam berlabel "Keperluan", urutan "Selesai" lalu "Mulai" | Berlabel "Waktu (WIB)", urutan Mulai lalu Selesai | Salah label di Figma |
