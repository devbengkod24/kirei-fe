# Role dan Halaman

Pemetaan halaman per role, URL, dan komponen `shared/` yang dipakai.

Sumber: Figma V3 (page `V3`), **disesuaikan dengan keputusan di AGENTS.md**. Figma belum diperbarui, jadi bila Figma dan dokumen ini berbeda, ikuti dokumen ini. Daftar perbedaannya ada di bagian akhir.

URL di bawah adalah rencana. Yang sudah ada di kode hanya halaman ormawa/dosen; sisanya dibangun mengikuti tabel ini.

## Ringkasan

| Role | Route group | Prefix URL | Navigasi |
|---|---|---|---|
| `organisasi`, `dosen` | `(ormawa)` | `/` | Sidebar |
| `admin_fakultas` | `(admin-fakultas)` | `/fakultas` | Sidebar |
| `admin_universitas` | `(admin-universitas)` | `/admin` | Sidebar + tab tipe (Ruangan, Kendaraan, GOR) di halaman yang sama untuk tiap tipe |
| `operator` | `(operator)` | `/operator` | Header saja, tanpa sidebar |
| Publik | `(auth)` | `/` | Tanpa shell |

## Publik dan autentikasi

| Halaman | URL | Catatan |
|---|---|---|
| Login | `/login` | Login Sanctum SPA. Satu login untuk semua role, lalu diarahkan ke dashboard role-nya. Mode dipilih lewat `AUTH_MODE` (lihat `.env.example`): `mock` (bawaan) memakai akun demo dan Quick Login tanpa backend; `api` login ke Laravel (`/sanctum/csrf-cookie`, `/login`, `/api/user`, `/logout`), error 422 tampil di bawah field, dan Quick Login disembunyikan. Orang yang sudah masuk langsung dialihkan ke dashboard role-nya. |
| Lupa sandi | `/lupa-sandi` | |
| Konfirmasi berhasil | `/konfirmasi/berhasil` | Tujuan tautan dari email. |
| Tautan tidak berlaku | `/konfirmasi/gagal` | |
| Halaman tidak ditemukan | `not-found.tsx` | |
| Masalah server | `error.tsx` / `global-error.tsx` | |
| Pemeliharaan | `/pemeliharaan` | |

## Ormawa dan dosen

Ormawa dan dosen memakai layar dan URL yang sama. Menu dan URL ada di `modules/ormawa/nav.ts` dan `modules/ormawa/routes.ts`.

**Perbedaan dosen.** Dosen tidak memakai surat peminjaman, jadi juga tidak punya draft. Form reservasi dosen memakai `mode="request_without_letter"` (tanpa langkah unggah surat, tanpa validasi surat, tanpa "Simpan Draft", tetap menunggu persetujuan admin). Menu dosen (`DOSEN_NAV`) tidak memuat Draft Reservasi, `/reservasi/draft` mengembalikan dosen ke dashboard, dan FAQ dosen (`DOSEN_FAQ_ITEMS`) tidak membahas surat dan draft. Pilihan per role ada di `modules/ormawa/borrowerBooking.ts`, bukan di `shared/`.

| Menu | URL | Isi | Komponen |
|---|---|---|---|
| Dashboard | `/dashboard` | Sapaan, kalender log reservasi, kartu Total Reservasi, reservasi hari ini, pengumuman terbaru | `shared/dashboard` (`UserDashboard`) |
| Buat Reservasi | `/reservasi/baru` | Pilih jenis (Ruangan, Kendaraan, GOR). Semua halaman Buat Reservasi memakai breadcrumb Dashboard › Buat Reservasi › tipe (`modules/ormawa/CreateReservationBreadcrumb`, dipasang di `reservasi/baru/layout.tsx`). | `shared/reservation-form` (`ReservationTypePicker`) |
| Buat Reservasi: Ruangan | `/reservasi/baru/ruangan` | Gedung dan lantai, tanggal, jam, lalu ruangan dari denah (dengan filter jenis ruangan). Detail pemesanan dibuka di dialog: No HP, keperluan, surat. "Pesan" butuh surat PDF; "Simpan Draft" tidak. Dosen: tanpa surat dan tanpa "Simpan Draft". | `shared/reservation-form` (`ReservationFormPage tipe="ruangan"`) |
| Buat Reservasi: GOR | `/reservasi/baru/gor` | Pilih hari (7 hari ke depan), lalu satu atau beberapa slot jam berurutan; jenis kegiatan, keterangan, surat. Tanpa catatan lintas fakultas. | `shared/reservation-form` (`ReservationFormPage tipe="gor"`) |
| Buat Reservasi: Kendaraan | `/reservasi/baru/kendaraan` | Data peminjam (No HP, tujuan, jumlah peserta, keterangan kegiatan), tanggal mulai dan selesai, surat. Unit kendaraan diatur di luar aplikasi. Tanpa catatan lintas fakultas. | `shared/reservation-form` (`ReservationFormPage tipe="kendaraan"`) |
| Draft Reservasi | `/reservasi/draft` | Hanya organisasi (ormawa dan UKM). Reservasi yang menunggu surat peminjaman. Tiap draft punya timer hitung mundur ke tenggat dari API (`hooks/useCountdown`) dan batasnya dalam WIB. Unggah PDF lalu "Pesan", atau "Batal". Setelah tenggat lewat, unggah dan "Pesan" dinonaktifkan. | `modules/ormawa/drafts` |
| Reservasi & Riwayat | `/reservasi/riwayat` | Tab Ruangan, Kendaraan, GOR, lalu tab Aktif (kartu "Hari ini" dan "Akan datang") dan Riwayat (tabel berhalaman). Pilihan disimpan di URL: `?tipe=gor&tampilan=riwayat&halaman=2&per=25`. | `shared/reservation-history` (`ReservationHistoryPage`, `showTypeTabs`) |
| Pengumuman | `/pengumuman` | Daftar dan filter sama dengan admin, tanpa Tambah Pengumuman. | `shared/announcements` (tanpa `canManage`) |
| Profil | `/profil` | Data diri dan ubah kata sandi. | `shared/profile` |
| Hubungi Kami | `/bantuan/kontak` | Formulir pengaduan ke admin dan kontak. | `modules/ormawa` |
| FAQ | `/bantuan/faq` | | `modules/ormawa` |

Catatan:
- Peminjam boleh memilih ruangan fakultas mana pun. Reservasi ruangan milik fakultas disetujui admin fakultas pemilik ruangan, dan tetap memakai surat peminjaman (kecuali dosen, yang tidak memakai surat).
- Ormawa tidak terikat fakultas (`fakultasId: null`) dan semuanya setara, jadi reservasi ruangan fakultas oleh ormawa selalu lewat jalur di atas. Dosen punya fakultas asal.
- Bila reservasi dipindah karena slotnya dipakai admin, peminjam cukup menerima pemberitahuan dan melihat jadwal barunya di Riwayat.

## Admin Fakultas

Semua data terkunci ke fakultas admin (`scope={{ fakultasId: user.fakultasId }}`). Hanya mengelola **ruangan**, jadi tidak ada pilihan tipe.

| Menu | URL | Isi | Komponen |
|---|---|---|---|
| Dashboard | `/fakultas/dashboard` | Kartu Total Reservasi Hari Ini, Check-in Hari Ini, Ruangan Tersedia; grafik distribusi reservasi; tabel reservasi hari ini; laporan pengguna terbaru | `shared/dashboard` (`AdminDashboard`) |
| Kelola Ruangan | `/fakultas/ruangan` | Daftar ruangan di gedung milik fakultas, ubah detail dan status ruangan, serta unggah, ganti, dan hapus foto ruangan (JPG, PNG, atau WebP, maksimal `ROOM_PHOTO_MAX_SIZE_MB`). Tidak termasuk edit denah. | `shared/rooms` (`RoomManager`, `EditRoomDialog`) |
| Jadwal Dosen | `/fakultas/jadwal-dosen` | Unggah CSV jadwal kuliah (`hari, jam_mulai, jam_selesai, ruangan, mata_kuliah, dosen`) dan rentang semester. Tiap baris dicek dengan Zod dan kesalahannya ditampilkan per baris; berkas hanya bisa disimpan bila semua baris valid. Unggahan baru menggantikan jadwal sebelumnya. Ruangan pada jam kuliah tampil sebagai tidak tersedia di denah dan form reservasi setiap minggu selama semester. | `modules/admin-fakultas/lecturer-schedule`, booking dibentuk di `shared/reservation-form/lecturerScheduleBookings.ts` |
| Reservasi Internal | `/fakultas/reservasi-internal` | Admin memesan ruangan di gedung fakultasnya. Komponen sama dengan Buat Reservasi: Ruangan milik peminjam, tetapi tanpa No HP, surat, dan draft. Memakai slot yang sudah dipesan belum dibangun. | `shared/reservation-form` (`RoomReservationForm` dengan `mode="internal"`) |
| Kelola Reservasi: Persetujuan | `/fakultas/persetujuan` | Reservasi ruangan fakultas yang menunggu keputusan, termasuk dari peminjam luar fakultas. | `shared/reservation-approval` |
| Kelola Reservasi: Riwayat | `/fakultas/riwayat` | | `shared/reservation-history` |
| Laporan Pengguna | `/fakultas/laporan` | Pengaduan pengguna, dengan filter status, kategori, dan tanggal. Laporan Pengguna hanya ada di Admin Fakultas; laporan untuk GOR dan kendaraan belum dibuat. | `shared/reports` |
| Pengumuman | `/fakultas/pengumuman` | Kelola pengumuman fakultas. Hanya Admin Fakultas dan Admin Universitas yang mendapat `canManage` (tombol Tambah Pengumuman). | `shared/announcements` (`canManage`) |
| Profil | `/fakultas/profil` | | `shared/profile` |

Persetujuan dan Riwayat tampil sebagai dua tab rata kanan di satu halaman "Kelola Reservasi", tetapi masing-masing punya URL sendiri. Urutan kolom Riwayat sama dengan Admin Universitas: Alasan Ditolak, Status, Aksi.

## Admin Universitas

Mengambil alih semua menu SuperAdmin lama. Satu sidebar untuk semua tipe. Menu yang fiturnya sama untuk ruangan, kendaraan, dan GOR membuka halaman dengan **tab tipe** di atasnya (Ruangan · Kendaraan · GOR, `TypeTabs`). Tipe dibawa di segmen dinamis `[tipe]` (`ruangan | kendaraan | gor`); link menu membuka Ruangan. `/admin` mengarah ke `/admin/dashboard`.

| Menu | Tab tipe | URL | Isi | Komponen |
|---|---|---|---|---|
| Dashboard | | `/admin/dashboard` | Satu dashboard gabungan semua tipe: ringkasan per tipe (hari ini, menunggu, unit tersedia), grafik mingguan dengan pilihan tipe, reservasi hari ini (dengan kolom tipe), aktivitas pengguna | `modules/admin-universitas/dashboard`, memakai potongan `shared/admin-dashboard` |
| Reservasi Internal | Ruangan, Kendaraan, GOR | `/admin/reservasi-internal/[tipe]` | Admin memesan atas nama kampus, tanpa No HP, surat, draft, dan persetujuan. Ruangan: semua gedung, dipilih lewat pilihan gedung di form, tanpa filter fakultas (memakai slot yang sudah dipesan belum dibangun). Kendaraan: tujuan, peserta, dan tanggal; unit diatur di luar aplikasi. GOR: jadwal slot seperti peminjam. | `shared/reservation-form` (form per tipe dengan `mode="internal"`), dirakit di `modules/admin-universitas/internal-reservation` |
| Kelola Reservasi | Ruangan, Kendaraan, GOR | `/admin/reservasi/[tipe]/persetujuan`, `/admin/reservasi/[tipe]/riwayat` | Tab Persetujuan dan Riwayat, masing-masing ber-URL. Tab tipe ada di kiri; di kanan, filter Fakultas (hanya Ruangan) bertumpuk di atas tab Persetujuan dan Riwayat, dan di layar sempit semuanya bertumpuk satu kolom. Tab Riwayat punya kolom Alasan Ditolak lalu Status tepat sebelum Aksi (alasan dari admin untuk reservasi ditolak, "-" untuk yang lain); di layar sempit alasan tampil di bawah status. Kolom per tipe (`TYPE_COLUMNS`): Ruangan; Tujuan dan peserta untuk kendaraan; Kegiatan untuk GOR. Unit kendaraan diatur di luar aplikasi, jadi menyetujui kendaraan sama seperti tipe lain. Filter fakultas hanya di tab Ruangan dan ikut saat pindah tab. | `shared/reservation-management`, dirakit di `modules/admin-universitas/reservations` |
| Kelola Denah | | `/admin/denah` | Editor denah lantai dengan SVG: pilih gedung dan lantai, lalu tambah, geser, ubah ukuran, dan hapus ruangan. Bisa lewat mouse/sentuh, tombol panah, atau input angka. Disimpan dalam format `Floor`/`FloorPlanRoom` yang dibaca form reservasi. | `modules/admin-universitas/floor-plan` |
| Kelola Pengguna | | `/admin/pengguna` | Tab Ormawa, Dosen, Admin Fakultas, Operator di URL (`?tab=ormawa|dosen|admin_fakultas|operator`): tabel berhalaman dengan pencarian, dialog detail (status Aktif/Tidak Aktif dan kata sandi baru opsional), dan tambah akun dengan kata sandi. Ormawa tanpa fakultas; dosen wajib fakultas dan NPP; admin fakultas wajib fakultas (boleh lebih dari satu per fakultas, tanpa NPP); operator wajib gedung dan lantai. Field per tab diatur di `USER_TABS`. | `modules/admin-universitas/users` |
| Pengumuman | | `/admin/pengumuman` | Pengumuman universitas dan fakultas. | `shared/announcements` (`canManage`) |
| Profil | | `/admin/profil` | | `shared/profile` |

Berpindah tab di Kelola Reservasi mempertahankan tab Persetujuan atau Riwayat yang sedang dibuka.

**Filter fakultas.** Ditampilkan di halaman yang memuat data fakultas: Kelola Reservasi tipe `ruangan`, Dashboard (hanya memengaruhi angka ruangan), dan Pengumuman. Nilainya dibawa di URL (`?fakultas=<id>`), kosong berarti semua fakultas. Tidak ditampilkan untuk GOR dan kendaraan. Contoh kode ada di `docs/architecture.md` bagian "Scope fakultas".

## Operator

Satu lantai di satu gedung. Satu halaman, tanpa sidebar. Header berisi avatar, peran dan nama (disembunyikan di layar sempit), serta tombol Logout yang selalu terlihat, tanpa menu avatar.

| Halaman | URL | Isi | Komponen |
|---|---|---|---|
| Ketersediaan lantai | `/operator` | Tanggal hari ini (WIB); grid "Semua Ruangan" sebagai pemilih ruangan yang tampil di timeline; timeline ala editor video dengan filter jam; kartu detail mengambang untuk clip yang diklik; form Buat Reservasi untuk hari ini. | `modules/operator` (`OperatorFloorPage`, `FloorTimeline`, `TimelineDetailPopover`) |

Tombol tambah hanya ditampilkan bila API mengizinkan (`canCreate` dari data lantai). Operator tidak bisa menghapus reservasi; Laravel juga harus menolak penghapusan oleh operator. Aturannya ditetapkan Laravel.

- **Grid Semua Ruangan.** Tiap tombol menyalakan atau mematikan track ruangan itu di timeline (bisa banyak sekaligus). Bawaan semua menyala; minimal satu ruangan tetap tampil.
- **Timeline.** Penggaris waktu horizontal di atas (garis samar tiap 10 menit, label jam kecil berwarna muted tiap 30 menit, 07.00 sampai 21.00 WIB sesuai Filter Jam). Satu track per ruangan yang menyala dengan latar tenang dan garis vertikal tipis tiap 30 menit; kode ruangan (chip) menempel di kolom kiri saat di-scroll ke samping. 10 menit selebar 44px. Di layar sempit timeline di-scroll ke samping di dalam kartu, halaman tidak. Gaya kartunya mengikuti kalender mingguan (kartu putih, sudut membulat, bayangan halus), susunannya tetap timeline horizontal.
- **Clip.** Kartu putih berisi ikon, judul tebal, jam, dan label tipe ("Siadin" atau "Reservasi") dengan satu keterangan pendek; di clip sempit ikon dan keterangan disembunyikan. Jadwal Siadin (garis tepi kiri oranye) hanya dibaca: bisa diklik untuk melihat detail, tetapi tidak bisa diubah atau dihapus di KIREI, dan tetap menutup ruangan. Reservasi (garis tepi kiri biru) membuka detail dengan tombol Hapus bila `canDelete`. Clip yang sedang berlangsung berlatar biru lembut dengan label "Berlangsung". Area Kosong adalah kartu putus-putus yang membuka form Buat Reservasi dengan ruangan dan jam gap itu. Tiap clip punya label teks, tidak hanya warna.
- **Kartu detail.** Klik clip Siadin atau Reservasi membuka kartu detail (judul, subtitle ruangan dan tanggal, baris label dan nilai, lalu tombol Tutup; semuanya hanya-baca) di samping clip: kanan, atau kiri bila tidak muat (`placePopover`). Kartu ikut bergeser saat timeline di-scroll, tersembunyi saat clip keluar dari area terlihat, dan dirender lewat portal agar tidak terpotong. Clip yang dibuka diberi ring biru; hanya satu kartu terbuka. Tutup lewat tombol, Esc, atau klik di luar, lalu fokus kembali ke clip. Di bawah 768px kartu tampil sebagai panel di bawah layar (bottom sheet).
- **Penanda "Sekarang".** Garis biru tipis melintasi semua track dengan chip bulat berisi jam sekarang (mis. "10.47") di penggaris, hanya bila jam sekarang ada di rentang filter. Posisinya diperbarui tiap menit tanpa animasi, dan timeline di-scroll ke penanda ini saat rentang berubah. Halaman tidak memakai label atau polling "real time"; data dimuat saat halaman dibuka.
- Form operator meminta ruangan, nama peminjam, keperluan, dan jam. Tanpa No HP dan surat, karena operator mencatat peminjaman di tempat. Form menolak jam yang bentrok dengan kuliah atau reservasi lain.

## Override slot oleh Admin Universitas

Sumber aturan: `KONTEKS-DASAR.md` di vault (§6, §8, §10). Alur ini belum dibangun di FE.

1. Hanya Admin Universitas yang dapat override, untuk agenda universitas.
2. Reservasi yang sudah `disetujui` dicabut dan berstatus `override_bium`. Tidak ada ruangan pengganti dan tidak ada persetujuan dari peminjam.
3. Peminjam menerima pemberitahuan lewat email.
4. Admin Fakultas tidak dapat override reservasi. Pembatalan setelah `disetujui` juga hanya oleh Admin Universitas.

## Komponen `shared/` dan pemakainya

| Folder | Dipakai oleh | Props pembeda |
|---|---|---|
| `shared/dashboard` | Semua kecuali operator | `UserDashboard` untuk peminjam, `AdminDashboard` untuk admin; `tipe`, `scope` |
| `shared/reservation-form` | Ormawa/dosen, kedua admin | `tipe` memilih form per jenis (`RoomReservationForm`, `SportsHallReservationForm`, `VehicleReservationForm`); semuanya berbagi `ReservationSubmitDialog`, `LetterPanel`, `useReservationSubmit`, dan potongan skema. `canUseBookedSlot` hanya untuk ruangan. |
| `shared/reservation-approval` | Kedua admin | `tipe`, `scope`, `showFakultasFilter` |
| `shared/reservation-history` | Ormawa/dosen, kedua admin | `tipe`, `scope` (`{ mine: true }` untuk peminjam, `{ fakultasId }` untuk admin), `showTypeTabs` (hanya peminjam; admin membawa tipe di URL), `showFakultasFilter` |
| `shared/reservation` | Semua yang menampilkan reservasi | Badge status dan label tipe |
| `shared/unit-management` | Kedua admin | `tipe`, `scope` |
| `shared/reports` | Admin Fakultas | `scope` |
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
| Reservasi Internal belum punya layar jadwal pengganti | Ditambah alur override oleh Admin Universitas (status `override_bium`, tanpa ruangan pengganti) | Aturan bisnis di vault (`KONTEKS-DASAR.md`) |
| Kelola Pengguna hanya Ormawa dan Dosen | Ditambah tab Admin Fakultas dan Operator dengan pola tab Dosen | Akun dibuat Admin Universitas; desain Figma belum ada |
| Merek "Bengkel Koding / Coworking Space" | Belum diputuskan; aset sementara dipakai | Perlu dikonfirmasi |
| Salah satu frame Profil di section Admin Fakultas memakai sidebar ormawa | Profil admin memakai sidebar admin | Salah salin di Figma |
| Status Ketersediaan berupa daftar slot 10 menit berlabel Tersedia atau Dipesan untuk satu ruangan | Timeline ala editor video: track per ruangan, clip Jadwal Siadin, Reservasi, dan Kosong bergaya kartu kalender mingguan, serta penanda "Sekarang" | Revisi dari pembimbing (daftar slot terlalu ramai, Siadin dan reservasi harus dibedakan), bentuk timeline mengikuti referensi editor video dari pengguna. Belum ada frame Figma untuk bentuk ini |
| Grid ruangan operator berjudul "Semua Kelas" dan memilih satu ruangan | Berjudul "Semua Ruangan" dan memilih banyak ruangan sekaligus (track yang tampil di timeline) | Satu lantai berisi kelas, meeting room, dan galeri; timeline menampilkan beberapa ruangan seperti referensi editor video |
| Tanggal hari ini tidak ada di halaman operator | Tanggal hari ini (WIB) di sebelah judul halaman | Revisi dari pembimbing |
| Menu avatar operator berisi NIM dan tautan "Profile" | Tanpa menu: header menampilkan peran, nama, dan tombol Logout langsung | Operator tidak punya halaman profil; Logout harus selalu terlihat |
| Form Buat Reservasi operator: kartu jam berlabel "Keperluan", urutan "Selesai" lalu "Mulai" | Berlabel "Waktu (WIB)", urutan Mulai lalu Selesai | Salah label di Figma |
