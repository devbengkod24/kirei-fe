# Role dan Halaman

Pemetaan halaman per role, URL, dan komponen `shared/` yang dipakai.

Alur reservasi dari pengajuan pemohon sampai persetujuan admin: [`docs/flow-reservasi.md`](flow-reservasi.md).

Sumber: Figma V3 (page `V3`), **disesuaikan dengan keputusan di AGENTS.md**. Figma belum diperbarui, jadi bila Figma dan dokumen ini berbeda, ikuti dokumen ini. Daftar perbedaannya ada di bagian akhir.

URL di bawah adalah rencana. Yang sudah ada di kode hanya halaman ormawa/dosen; sisanya dibangun mengikuti tabel ini.

## Ringkasan

| Role | Route group | Prefix URL | Navigasi |
|---|---|---|---|
| `organisasi`, `dosen` | `(ormawa)` | `/` | Sidebar |
| `admin_fakultas` | `(admin-gedung)` | `/gedung` | Sidebar |
| `admin_universitas` | `(admin-universitas)` | `/admin` | Sidebar + tab tipe (Ruangan, Kendaraan, GOR) di halaman yang sama untuk tiap tipe |
| `operator` | `(operator)` | `/operator` | Header saja, tanpa sidebar |
| Publik | `(auth)` | `/` | Tanpa shell |

## Publik dan autentikasi

| Halaman | URL | Catatan |
|---|---|---|
| Landing page | `/` | Halaman publik untuk tamu: fasilitas dengan carousel 5 ilustrasi (kelas, rapat, auditorium, GOR, kendaraan; berganti tiap 5 detik, berhenti saat disorot atau bila pengguna memilih kurangi gerakan), peraturan per fasilitas (tab Ruangan, GOR, Kendaraan), dan FAQ. Peraturan kendaraan mengikuti notulen 19/11/2026 (satu jenis kendaraan, tersedia menurut tanggal, tanya BIUM dulu), bukan vault §12; lihat `docs/flow-reservasi.md` bagian 4. Tata letaknya mengikuti landing page reservasi-fe, dengan animasi framer-motion. Isinya menyalin aturan dari vault (`shared/landing/content.ts`), jadi perbarui file itu bila vault berubah. Di mode `mock`, orang yang sudah masuk dialihkan ke dashboard role-nya. Di mode `api`, proxy tidak tahu role, jadi landing tetap tampil dan tombol Masuk mengarahkannya ke dashboard. Komponen: `shared/landing`. |
| Login | `/login` | Login Sanctum SPA. Satu login untuk semua role, lalu diarahkan ke dashboard role-nya. Mode dipilih lewat `AUTH_MODE` (lihat `.env.example`): `mock` (bawaan) memakai akun demo dan Quick Login tanpa backend; `api` login ke Laravel (`/sanctum/csrf-cookie`, `/login`, `/api/user`, `/logout`), error 422 tampil di bawah field, dan Quick Login disembunyikan. Orang yang sudah masuk langsung dialihkan ke dashboard role-nya. |
| Lupa sandi | `/lupa-sandi` | |
| Konfirmasi berhasil | `/konfirmasi/berhasil` | Tujuan tautan dari email. |
| Tautan tidak berlaku | `/konfirmasi/gagal` | |
| Halaman tidak ditemukan | `not-found.tsx` | |
| Masalah server | `error.tsx` / `global-error.tsx` | |
| Pemeliharaan | `/pemeliharaan` | |

## Ormawa dan dosen

Ormawa dan dosen memakai layar dan URL yang sama. Menu dan URL ada di `modules/ormawa/nav.ts` dan `modules/ormawa/routes.ts`.

**Perbedaan dosen.** Dosen tidak punya draft. Untuk ruangan dan GOR dosen tidak memakai surat peminjaman: form memakai `mode="request_without_letter"` (tanpa langkah unggah surat, tanpa validasi surat, tanpa "Simpan Draft", tetap menunggu persetujuan admin). Untuk kendaraan dosen tetap wajib mengunggah surat: form memakai `mode="request_without_draft"` (surat wajib, tanpa "Simpan Draft"). Menu dosen (`DOSEN_NAV`) tidak memuat Draft Reservasi, `/reservasi/draft` mengembalikan dosen ke dashboard, dan FAQ dosen (`DOSEN_FAQ_ITEMS`) tidak membahas draft dan menyebut surat hanya untuk kendaraan. Pilihan per role ada di `modules/ormawa/borrowerBooking.ts`, bukan di `shared/`.

| Menu | URL | Isi | Komponen |
|---|---|---|---|
| Dashboard | `/dashboard` | Sapaan, kalender log reservasi, kartu Total Reservasi, reservasi hari ini, pengumuman terbaru | `shared/dashboard` (`UserDashboard`) |
| Buat Reservasi | `/reservasi/baru` | Pilih jenis (Ruangan, Kendaraan, GOR). Di semua form Buat Reservasi, label field wajib diberi tanda * merah (`RequiredMark` di `shared/reservation-form/summaryParts.tsx`, dibacakan "wajib" untuk pembaca layar). Semua halaman Buat Reservasi memakai breadcrumb Dashboard › Buat Reservasi › tipe (`modules/ormawa/CreateReservationBreadcrumb`, dipasang di `reservasi/baru/layout.tsx`). | `shared/reservation-form` (`ReservationTypePicker`) |
| Buat Reservasi: Ruangan | `/reservasi/baru/ruangan` | Gedung dan lantai, tanggal, jam, lalu ruangan dari denah (dengan filter jenis ruangan). Detail pemesanan dibuka di dialog: No HP, keperluan, surat. "Pesan" butuh surat PDF; "Simpan Draft" tidak. Dosen: tanpa surat dan tanpa "Simpan Draft". | `shared/reservation-form` (`ReservationFormPage tipe="ruangan"`) |
| Buat Reservasi: GOR | `/reservasi/baru/gor` | Pilih hari (7 hari ke depan), lalu satu atau beberapa slot jam berurutan; jenis kegiatan, keterangan, surat. Tanpa catatan lintas fakultas. | `shared/reservation-form` (`ReservationFormPage tipe="gor"`) |
| Buat Reservasi: Kendaraan | `/reservasi/baru/kendaraan` | Satu card Data dan Tanggal Reservasi: No HP, Mulai, Selesai, Menginap atau Antar jemput, Jumlah Peserta, satu jenis Kendaraan beserta jumlah unitnya (1 sampai sisa unit pada tanggal itu; bawaan cukup untuk semua peserta), Tujuan (bisa lebih dari satu, maksimal 5), Keterangan Kegiatan; lalu surat. Unit yang berangkat tetap ditetapkan admin. Tanpa catatan lintas fakultas. Detail di `docs/flow-reservasi.md`. | `shared/reservation-form` (`ReservationFormPage tipe="kendaraan"`) |
| Draft Reservasi | `/reservasi/draft` | Hanya organisasi (ormawa dan UKM). Reservasi yang menunggu surat peminjaman. Tiap draft punya timer hitung mundur ke tenggat dari API (`hooks/useCountdown`) dan batasnya dalam WIB. Unggah PDF lalu "Pesan", atau "Batal". Setelah tenggat lewat, unggah dan "Pesan" dinonaktifkan. | `modules/ormawa/drafts` |
| Reservasi & Riwayat | `/reservasi/riwayat` | Tab Ruangan, Kendaraan, GOR, lalu tab Aktif (kartu "Hari ini" dan "Akan datang") dan Riwayat (tabel berhalaman). Untuk kendaraan, kartu dan tabel menampilkan jenis dan jumlah unit, semua tujuan, menginap atau antar jemput, dan jumlah peserta. Pilihan disimpan di URL: `?tipe=gor&tampilan=riwayat&halaman=2&per=25`. | `shared/reservation-history` (`ReservationHistoryPage`, `showTypeTabs`) |
| Pengumuman | `/pengumuman` | Daftar dan filter sama dengan admin, tanpa Tambah Pengumuman. | `shared/announcements` (tanpa `canManage`) |
| Profil | `/profil` | Hanya organisasi (ormawa dan UKM): data diri dan ubah kata sandi. Dosen tidak punya menu Profil, dan `/profil` mengembalikan dosen ke dashboard (keputusan notulen 19/11/2026). | `shared/profile` |
| Hubungi Kami | `/bantuan/kontak` | Formulir pengaduan ke admin dan kontak. | `modules/ormawa` |
| FAQ | `/bantuan/faq` | | `modules/ormawa` |

Catatan:
- Peminjam boleh memilih ruangan fakultas mana pun. Reservasi ruangan milik fakultas disetujui admin fakultas pemilik ruangan, dan tetap memakai surat peminjaman (kecuali dosen, yang tidak memakai surat).
- Ormawa tidak terikat fakultas (`fakultasId: null`) dan semuanya setara, jadi reservasi ruangan fakultas oleh ormawa selalu lewat jalur di atas. Dosen punya fakultas asal.
- Bila reservasi dipindah karena slotnya dipakai admin, peminjam cukup menerima pemberitahuan dan melihat jadwal barunya di Riwayat.

## Admin Gedung (role `admin_fakultas`)

Di UI role ini bernama **Admin Gedung** (revisi notulen 19/11/2026). Route group `(admin-gedung)`, folder `modules/admin-gedung`, dan URL `/gedung/...` sudah memakai nama baru. Kunci role tetap `admin_fakultas` karena mengikuti API, dan scope data di kode masih `fakultasId` sampai API memakai gedung. Halaman Profil hanya ada untuk ormawa.

Semua data terkunci ke fakultas admin (`scope={{ fakultasId: user.fakultasId }}`). Hanya mengelola **ruangan**, jadi tidak ada pilihan tipe.

| Menu | URL | Isi | Komponen |
|---|---|---|---|
| Dashboard | `/gedung/dashboard` | Kartu Total Reservasi Hari Ini, Check-in Hari Ini, Ruangan Tersedia; grafik distribusi reservasi; tabel reservasi hari ini; laporan pengguna terbaru | `shared/dashboard` (`AdminDashboard`) |
| Kelola Ruangan | `/gedung/ruangan` | Daftar ruangan di gedung milik fakultas, ubah detail dan status ruangan, serta unggah, ganti, dan hapus foto ruangan (JPG, PNG, atau WebP, maksimal `ROOM_PHOTO_MAX_SIZE_MB`). Ruangan tanpa foto menampilkan foto default. Tombol "Tambah Ruangan" (hanya admin gedung, `canAddRoom`) membuka form: foto (opsional), nama ruangan (wajib, tidak boleh sama dengan ruangan lain), tipe, lantai (dari lantai gedung itu), dan status (bawaan Aktif); gedungnya mengikuti filter Lokasi dan hanya ditampilkan, tidak bisa dipilih. Setelah disimpan, filter pindah ke lantai ruangan baru dan ruangan itu langsung terpilih. Ruangan baru disimpan di browser (`room-additions`) sampai API ada. Di form edit, gedung hanya ditampilkan; yang bisa diubah adalah foto, nama, tipe dan lantai (bisa diubah karena denah sudah tidak dipakai; setelah disimpan, filter ikut pindah ke lantai baru), status, dan (admin universitas) pengelola. Admin gedung tidak melihat "Dikelola oleh", baik di detail maupun di form edit, karena tidak bisa mengubahnya. Tombol "Pilih banyak" memilih beberapa ruangan, lalu "Ubah gambar" mengganti fotonya sekaligus. Tidak termasuk edit denah. | `shared/rooms` (`RoomManager`, `AddRoomDialog`, `EditRoomDialog`) |
| Kelola Denah | `/gedung/denah` | Editor denah lantai dengan SVG untuk gedung milik admin yang login (tanpa pilihan gedung): pilih lantai, lalu tambah, geser, ubah ukuran, dan hapus ruangan. Bisa lewat mouse/sentuh, tombol panah, atau input angka. Ukuran grid lantai tetap mengikuti data gedung dan tidak bisa diubah di sini. Disimpan dalam format `Floor`/`FloorPlanRoom` yang dibaca form reservasi. Dipindah dari Admin Universitas ke Admin Gedung (notulen 19/11/2026). | `modules/admin-gedung/floor-plan`, gedung dari `shared/facilities/getBuildings` |
| Kelola Jadwal | `/gedung/jadwal-dosen` | Tampilan mirip halaman operator: hanya timeline (`FloorTimeline`) untuk gedung admin, dengan filter Lantai dan Tanggal (bawaan hari ini), tanpa panel buat reservasi. Track per ruangan di lantai itu menampilkan jadwal kuliah hasil import dan reservasi yang disetujui; klik clip membuka kartu detail. Tombol "Import Jadwal (CSV)" di atas timeline membuka dialog: rentang semester (terisi dari jadwal yang berlaku) dan berkas CSV (`hari, jam_mulai, jam_selesai, ruangan, mata_kuliah, dosen`). Tiap baris dicek dengan Zod dan kesalahannya ditampilkan per baris; berkas hanya bisa disimpan bila semua baris valid. Import baru menggantikan jadwal sebelumnya dan langsung tampil di timeline. Ruangan pada jam kuliah tampil sebagai tidak tersedia di denah dan form reservasi setiap minggu selama semester. Menu bernama "Kelola Jadwal" sejak notulen 19/11/2026; URL tetap. | `modules/admin-gedung/lecturer-schedule` (`ScheduleManager`, `ImportScheduleDialog`), timeline dari `shared/floor-timeline`, booking dibentuk di `shared/reservation-form/lecturerScheduleBookings.ts` |
| Reservasi Internal | `/gedung/reservasi-internal` | Admin memesan ruangan di gedung fakultasnya. Komponen sama dengan Buat Reservasi: Ruangan milik peminjam, tetapi tanpa No HP, surat, dan draft. Memakai slot yang sudah dipesan belum dibangun. | `shared/reservation-form` (`RoomReservationForm` dengan `mode="internal"`) |
| Kelola Reservasi: Persetujuan | `/gedung/persetujuan` | Reservasi ruangan fakultas yang menunggu keputusan, termasuk dari peminjam luar fakultas. | `shared/reservation-approval` |
| Kelola Reservasi: Riwayat | `/gedung/riwayat` | | `shared/reservation-history` |
| Laporan Pengguna | `/gedung/laporan` | Pengaduan pengguna, dengan filter status, kategori, dan tanggal. Laporan Pengguna hanya ada di Admin Fakultas; laporan untuk GOR dan kendaraan belum dibuat. | `shared/reports` |
| Pengumuman | `/gedung/pengumuman` | Kelola pengumuman fakultas. Hanya Admin Fakultas dan Admin Universitas yang mendapat `canManage` (tombol Tambah Pengumuman). | `shared/announcements` (`canManage`) |

Persetujuan dan Riwayat tampil sebagai dua tab rata kanan di satu halaman "Kelola Reservasi", tetapi masing-masing punya URL sendiri. Urutan kolom Riwayat sama dengan Admin Universitas: Alasan Ditolak, Status, Aksi.

## Admin Universitas

Mengambil alih semua menu SuperAdmin lama. Satu sidebar untuk semua tipe. Menu yang fiturnya sama untuk ruangan, kendaraan, dan GOR membuka halaman dengan **tab tipe** di atasnya (Ruangan · Kendaraan · GOR, `TypeTabs`). Tipe dibawa di segmen dinamis `[tipe]` (`ruangan | kendaraan | gor`); link menu membuka Ruangan. `/admin` mengarah ke `/admin/dashboard`.

| Menu | Tab tipe | URL | Isi | Komponen |
|---|---|---|---|---|
| Dashboard | | `/admin/dashboard` | Satu dashboard gabungan semua tipe: ringkasan per tipe (hari ini, menunggu, unit tersedia), grafik mingguan dengan pilihan tipe, reservasi hari ini (dengan kolom tipe), aktivitas pengguna | `modules/admin-universitas/dashboard`, memakai potongan `shared/admin-dashboard` |
| Reservasi Internal | Tanpa tab; pilih lewat kartu | `/admin/reservasi-internal`, `/admin/reservasi-internal/[tipe]` | Menu membuka pilihan 3 kartu (Ruangan, Kendaraan, GOR) yang sama dengan Buat Reservasi peminjam (`ReservationTypePicker`); setelah memilih, form tipe itu tampil. Seperti ormawa, semua halaman Reservasi Internal memakai breadcrumb Dashboard › Reservasi Internal › tipe (`modules/admin-universitas/internal-reservation/InternalReservationBreadcrumb`, dipasang di `reservasi-internal/layout.tsx`), bukan tab tipe. Admin memesan atas nama kampus, tanpa No HP, surat, draft, dan persetujuan. Ruangan: semua gedung, dipilih lewat pilihan gedung di form, tanpa filter fakultas (memakai slot yang sudah dipesan belum dibangun). Kendaraan: form yang sama dengan peminjam (tanggal, menginap atau antar jemput, peserta, jenis dan jumlah unit kendaraan, tujuan). GOR: jadwal slot seperti peminjam. | `shared/reservation-form` (form per tipe dengan `mode="internal"`), dirakit di `modules/admin-universitas/internal-reservation` |
| Kelola Reservasi | Ruangan, Kendaraan, GOR | `/admin/reservasi/[tipe]/persetujuan`, `/admin/reservasi/[tipe]/riwayat` | Tab Persetujuan dan Riwayat, masing-masing ber-URL. Tab tipe ada di kiri; di kanan, filter Fakultas (hanya Ruangan) bertumpuk di atas tab Persetujuan dan Riwayat, dan di layar sempit semuanya bertumpuk satu kolom. Tab Riwayat punya kolom Alasan Ditolak lalu Status tepat sebelum Aksi (alasan dari admin untuk reservasi ditolak, "-" untuk yang lain); di layar sempit alasan tampil di bawah status. Kolom per tipe (`TYPE_COLUMNS`): Ruangan; Tujuan, peserta, dan jenis kendaraan yang diminta untuk kendaraan; Kegiatan untuk GOR. Dialog detail kendaraan menampilkan jenis kendaraan dan jumlah unit, menginap atau antar jemput, serta tanggal Mulai dan Selesai; di sampingnya card Sopir dan card Uang yang diisi admin (kecuali reservasi ditolak). Menyetujui kendaraan sama seperti tipe lain. Kolom Aksi di Riwayat berisi satu ikon sesuai keputusan: centang membuka detail, silang membuka detail beserta alasan penolakan (berlaku untuk semua tipe dan juga Admin Fakultas, karena tabelnya dipakai bersama). Riwayat kendaraan punya tombol Ekspor Laporan (CSV, semua baris). Ikon (i) di samping tab tipe saat tab Kendaraan aktif menampilkan jenis kendaraan kampus, jumlah unit, kursi per unit, dan unit yang dipakai hari ini (`VehicleFleetInfo`). Filter fakultas hanya di tab Ruangan dan ikut saat pindah tab. | `shared/reservation-management`, dirakit di `modules/admin-universitas/reservations` |
| Kelola Ruangan | | `/admin/ruangan` | Sama dengan Kelola Ruangan admin gedung, untuk semua gedung, tetapi tanpa "Tambah Ruangan" (admin universitas tidak menambah ruangan), ditambah `canChangeManager`: "Dikelola oleh" bisa diubah di form, dan mode "Pilih banyak" punya aksi "Ganti pengelola" selain "Ubah gambar". Pilihan pengelola hanya dua: admin gedung tempat ruangan berada (mis. "Admin Gedung H") atau "Admin Universitas" (`Room.managedBy`: `gedung` atau `universitas`). Bawaannya admin gedung untuk gedung fakultas, dan Admin Universitas untuk gedung universitas. | `shared/rooms` (`RoomManager`) |
| Kelola Pengguna | | `/admin/pengguna` | Tab Ormawa, Dosen, Admin Gedung, Operator di URL (`?tab=ormawa|dosen|admin_fakultas|operator`): tabel berhalaman dengan pencarian, dialog detail (status Aktif/Tidak Aktif dan kata sandi baru opsional), dan tambah akun dengan kata sandi. Ormawa tanpa fakultas; dosen wajib nama, fakultas, dan NPP; admin gedung wajib gedung (boleh lebih dari satu per gedung) tanpa nama, dan namanya dibentuk dari gedung, mis. "Admin Gedung H"; operator wajib gedung dan lantai tanpa nama, mis. "Operator Gedung H Lantai 5". Field per tab diatur di `USER_TABS`. Tab terakhir **Staf** (`?tab=staf`) berisi sopir dan kenek kendaraan kampus: tabel berhalaman dengan pencarian (nama, no telp, nomor SIM), dialog Tambah Staf dan Detail Staf (ikon mata). Field: nama, no telp, nomor SIM (12-16 angka, tidak boleh dipakai staf lain), masa berlaku SIM, tipe (sopir atau kenek), dan status Aktif/Tidak aktif (hanya di Detail Staf). Staf tidak dihapus; staf tidak aktif tidak lagi ditawarkan di card Sopir, tetapi namanya tetap terbaca di reservasi yang sudah memakainya. SIM kedaluwarsa ditandai, dan staf aktif wajib punya SIM yang masih berlaku. Daftar staf disimpan di browser (`shared/staff/staffStore.ts`, terpisah per mode data) sampai API ada, sehingga card Sopir di Kelola Reservasi kendaraan langsung memakai daftar terbaru. | `modules/admin-universitas/users`, tab Staf di `modules/admin-universitas/staff` |
| Pengumuman | | `/admin/pengumuman` | Pengumuman universitas dan fakultas. | `shared/announcements` (`canManage`) |

Berpindah tab di Kelola Reservasi mempertahankan tab Persetujuan atau Riwayat yang sedang dibuka.

**Filter fakultas.** Ditampilkan di halaman yang memuat data fakultas: Kelola Reservasi tipe `ruangan`, Dashboard (hanya memengaruhi angka ruangan), dan Pengumuman. Nilainya dibawa di URL (`?fakultas=<id>`), kosong berarti semua fakultas. Tidak ditampilkan untuk GOR dan kendaraan. Contoh kode ada di `docs/architecture.md` bagian "Scope fakultas".

## Operator

Satu lantai di satu gedung. Satu halaman, tanpa sidebar. Header berisi avatar, peran dan nama (disembunyikan di layar sempit), serta tombol Logout yang selalu terlihat, tanpa menu avatar.

| Halaman | URL | Isi | Komponen |
|---|---|---|---|
| Ketersediaan lantai | `/operator` | Tanggal hari ini (WIB); grid "Semua Ruangan" sebagai pemilih ruangan yang tampil di timeline; timeline ala editor video dengan filter jam; kartu detail mengambang untuk clip yang diklik; form Buat Reservasi untuk hari ini. | `modules/operator` (`OperatorFloorPage`), timeline dari `shared/floor-timeline` (`FloorTimeline`, `TimelineDetailPopover`) |

Tombol tambah hanya ditampilkan bila API mengizinkan (`canCreate` dari data lantai). Operator tidak bisa menghapus reservasi; Laravel juga harus menolak penghapusan oleh operator. Aturannya ditetapkan Laravel.

- **Grid Semua Ruangan.** Tiap tombol menyalakan atau mematikan track ruangan itu di timeline (bisa banyak sekaligus). Bawaan semua menyala; minimal satu ruangan tetap tampil.
- **Timeline.** Penggaris waktu horizontal di atas (garis samar tiap 10 menit, label jam kecil berwarna muted tiap 30 menit). Filter Jam hanya mengatur jam mulai (07.00 sampai 19.00, bawaan jam sekarang); jam selesai selalu 20.00 WIB (`ROOM_CLOSE_TIME`), sesuai notulen 19/11/2026. Satu track per ruangan yang menyala dengan latar tenang dan garis vertikal tipis tiap 30 menit; kode ruangan (chip) menempel di kolom kiri saat di-scroll ke samping. 10 menit minimal selebar 44px; bila kartu lebih lebar, sumbu waktu melebar sampai tepi kanan sehingga tidak ada ruang kosong. Di layar sempit timeline di-scroll ke samping di dalam kartu, halaman tidak. `FloorTimeline` menerima ruangan, rentang jam, data, dan aksi lewat props (tanpa `onCreate`, area Kosong hanya label) dan dipakai ulang di Kelola Jadwal admin gedung, jadi letaknya di `shared/floor-timeline`. Gaya kartunya mengikuti kalender mingguan (kartu putih, sudut membulat, bayangan halus), susunannya tetap timeline horizontal.
- **Clip.** Kartu putih berisi ikon, judul tebal, jam, dan label tipe ("Siadin" atau "Reservasi") dengan satu keterangan pendek; di clip sempit ikon dan keterangan disembunyikan. Jadwal Siadin (garis tepi kiri oranye) hanya dibaca: bisa diklik untuk melihat detail, tetapi tidak bisa diubah atau dihapus di KIREI, dan tetap menutup ruangan. Reservasi (garis tepi kiri biru) membuka detail dengan tombol Hapus bila `canDelete`. Clip yang sedang berlangsung berlatar biru lembut dengan label "Berlangsung". Area Kosong adalah kartu putus-putus yang membuka form Buat Reservasi dengan ruangan dan jam gap itu. Tiap clip punya label teks, tidak hanya warna.
- **Kartu detail.** Klik clip Siadin atau Reservasi membuka kartu detail (judul, subtitle ruangan dan tanggal, baris label dan nilai, lalu tombol Tutup; semuanya hanya-baca) di samping clip: kanan, atau kiri bila tidak muat (`placePopover`). Kartu ikut bergeser saat timeline di-scroll, tersembunyi saat clip keluar dari area terlihat, dan dirender lewat portal agar tidak terpotong. Clip yang dibuka diberi ring biru; hanya satu kartu terbuka. Tutup lewat tombol, Esc, atau klik di luar, lalu fokus kembali ke clip. Di bawah 768px kartu tampil sebagai panel di bawah layar (bottom sheet).
- **Penanda "Sekarang".** Garis biru tipis melintasi semua track dengan chip bulat berisi jam sekarang (mis. "10.47") di penggaris, hanya bila jam sekarang ada di rentang filter. Posisinya diperbarui tiap menit tanpa animasi, dan timeline di-scroll ke penanda ini saat rentang berubah. Halaman tidak memakai label atau polling "real time"; data dimuat saat halaman dibuka.
- Form operator meminta ruangan, nama peminjam, keperluan, dan jam. Dibuka lewat tombol "+", ruangan masih "Pilih ruangan" dan wajib dipilih sebelum menyimpan, dengan jam bawaan satu jam dari jam mulai filter; dibuka dari area Kosong, ruangan dan jam gap itu langsung terisi. Tanpa No HP dan surat, karena operator mencatat peminjaman di tempat. Form menolak jam yang bentrok dengan kuliah atau reservasi lain.

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
| `shared/profile` | Ormawa (halaman Profil); `PasswordField` dan `changePassword` juga dipakai login dan Kelola Pengguna | |
| `shared/fakultas-filter` | Admin Universitas | `options`, `value` (`?fakultas=` di URL) |
| `shared/layout` | Semua | |

## Perbedaan dengan Figma V3

Bagian ini juga menjadi daftar yang perlu diperbarui di Figma.

| Di Figma V3 | Yang berlaku | Alasan |
|---|---|---|
| Section **SuperAdmin** terpisah | Menunya masuk ke Admin Universitas (Kelola Pengguna) dan Admin Gedung (Kelola Denah, sejak notulen 19/11/2026) | `superadmin` digabung ke `admin_universitas` |
| Kartu penalti dan peringatan akun diblokir di dashboard ormawa | Dihapus; hanya kartu Total Reservasi | Tidak ada penalti dan blokir akun |
| Angka "Pengguna terblokir" di Distribusi Pengguna (semua dashboard admin) | Dihapus | Sama |
| Seri "Reservasi Pelanggaran" di grafik dashboard admin | Dihapus; grafik memuat reservasi berhasil dan dibatalkan | Sama |
| Admin Universitas memakai pilihan tipe di atas sidebar dan dashboard per tipe | Satu sidebar, tab tipe di halaman per tipe, satu dashboard gabungan, dan filter fakultas di halaman yang memuat data fakultas | Keputusan tim; fakultas adalah batas data |
| Reservasi Internal belum punya layar jadwal pengganti | Ditambah alur override oleh Admin Universitas (status `override_bium`, tanpa ruangan pengganti) | Aturan bisnis di vault (`KONTEKS-DASAR.md`) |
| Kelola Pengguna hanya Ormawa dan Dosen | Ditambah tab Admin Fakultas dan Operator dengan pola tab Dosen | Akun dibuat Admin Universitas; desain Figma belum ada |
| Merek "Bengkel Koding / Coworking Space" | Belum diputuskan; aset sementara dipakai | Perlu dikonfirmasi |
| Frame Profil untuk dosen, Admin Gedung, dan Admin Universitas | Tidak ada; Profil hanya untuk ormawa | Keputusan notulen 19/11/2026. Kata sandi akun admin dan dosen diatur Admin Universitas di Kelola Pengguna |
| Status Ketersediaan berupa daftar slot 10 menit berlabel Tersedia atau Dipesan untuk satu ruangan | Timeline ala editor video: track per ruangan, clip Jadwal Siadin, Reservasi, dan Kosong bergaya kartu kalender mingguan, serta penanda "Sekarang" | Revisi dari pembimbing (daftar slot terlalu ramai, Siadin dan reservasi harus dibedakan), bentuk timeline mengikuti referensi editor video dari pengguna. Belum ada frame Figma untuk bentuk ini |
| Grid ruangan operator berjudul "Semua Kelas" dan memilih satu ruangan | Berjudul "Semua Ruangan" dan memilih banyak ruangan sekaligus (track yang tampil di timeline) | Satu lantai berisi kelas, meeting room, dan galeri; timeline menampilkan beberapa ruangan seperti referensi editor video |
| Tanggal hari ini tidak ada di halaman operator | Tanggal hari ini (WIB) di sebelah judul halaman | Revisi dari pembimbing |
| Menu avatar operator berisi NIM dan tautan "Profile" | Tanpa menu: header menampilkan peran, nama, dan tombol Logout langsung | Operator tidak punya halaman profil; Logout harus selalu terlihat |
| Form Buat Reservasi operator: kartu jam berlabel "Keperluan", urutan "Selesai" lalu "Mulai" | Berlabel "Waktu (WIB)", urutan Mulai lalu Selesai | Salah label di Figma |
