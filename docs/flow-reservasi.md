# Mapping Antarmuka dan Alur Kerja Reservasi (Pemohon hingga Persetujuan Admin)

Dokumen untuk issue #13. Isinya memetakan halaman dan komponen yang dipakai saat pemohon mengajukan reservasi sampai admin menyetujui atau menolaknya, mengikuti format `devbengkod24/fakultas-prototype#34`.

- Kondisi yang dipetakan: branch `feat/revisi-alur-reservasi` (dari `main` setelah PR #11 dan PR #12), termasuk revisi atas keputusan project leader pada 2026-11-11 (bagian 4).
- Aturan bisnis bersumber dari vault (`KONTEKS-DASAR.md` v1.4 dan `FLOW-kirei.excalidraw`). Bila kode berbeda dari vault, perbedaannya dicatat di bagian 4, bukan diputuskan di sini.
- Role yang dicakup: pemohon `organisasi` (ormawa dan UKM, dibedakan `organization_type`) dan `dosen`; pengelola `admin_fakultas` dan `admin_universitas`. Role `operator` (booking darurat H-0) di luar cakupan dokumen ini.
- Status reservasi di kode: `draft`, `menunggu_persetujuan`, `disetujui`, `ditolak`, `selesai`, `batal`, `override_bium` (`src/types/reservation.ts`). Label di UI: Draft, Menunggu, Disetujui, Ditolak, Selesai, Dibatalkan, Dicabut.

## 1. Tabel Pemetaan Halaman dan Komponen Utama

### A. Pemohon (`organisasi` dan `dosen`)

| Halaman / File | Section / Komponen | Deskripsi dan Pemetaan Isi |
|---|---|---|
| Buat Reservasi (`src/app/(ormawa)/reservasi/baru/page.tsx`) | `ReservationTypePicker` | Pilihan jenis fasilitas: Ruangan, Kendaraan, GOR. Setiap kartu menuju form jenisnya. |
| | `CreateReservationBreadcrumb` (`src/app/(ormawa)/reservasi/baru/layout.tsx`) | Breadcrumb Dashboard -> Buat Reservasi -> jenis, tampil di semua halaman Buat Reservasi. |
| Form Ruangan (`src/app/(ormawa)/reservasi/baru/ruangan/page.tsx`) | `ReservationFormPage` (`src/shared/reservation-form/ReservationFormPage.tsx`) | Memuat data gedung, denah, booking, dan peraturan, lalu merender `RoomReservationForm`. Mode diambil dari `borrowerBooking(role)`: `organisasi` memakai mode `request` (surat dan draft), `dosen` memakai `request_without_letter` (tanpa surat, tanpa draft). |
| | `ReservationSteps` | Panduan tahapan: Pilih lokasi & tanggal -> Pilih waktu reservasi -> Pilih ruangan yang tersedia pada denah -> Upload berkas. Untuk dosen tahap Upload berkas tidak ditampilkan. |
| | Panel Gedung & Lantai (`RoomReservationForm`) | Pilihan Lokasi (gedung) dan Lantai. Di bawahnya tampil pemilik gedung, mis. "Milik Fakultas Ilmu Komputer". |
| | Panel Tanggal Reservasi | Input tanggal. Dosen paling awal hari ini; `organisasi` paling cepat lusa karena dilarang memesan H-0 dan H-1 (`ORGANISATION_MIN_DAYS_AHEAD`). |
| | Panel Pemilihan Jam Reservasi (`TimeWheel`) | Jam Mulai dan Selesai. Jam bergeser per 1 jam (00-23), menit per 10 menit. Jam reservasi ruangan dibatasi 07.00-20.00 WIB (`ROOM_OPEN_TIME`, `ROOM_CLOSE_TIME`). Jam selesai harus setelah jam mulai dan jam mulai belum lewat (`schema.ts`). |
| | Denah (`FloorPlan`) | Denah lantai. Status ruangan: Dipilih, Tidak tersedia, Tersedia, Di luar filter. Ruangan yang tidak tersedia bisa diklik untuk melihat alasannya: bentrok jam, jadwal terpakai hari itu (termasuk jadwal kuliah dosen), atau di luar filter. Di layar sempit ada daftar tombol ruangan yang bisa dipesan. |
| | Filter jenis ruangan | Ruang Kelas, Laboratorium, Meeting Room, Aula / Auditorium, Gallery (`labels.ts`). Ruangan di luar filter dipudarkan. |
| | `RoomPreview` | Foto, kategori, dan kapasitas ruangan terpilih, serta catatan bila penyetujunya admin fakultas lain. |
| | Peraturan Reservasi | Daftar aturan dari data peraturan (`getRoomReservationOptions`). |
| | `LetterPanel` | Khusus `organisasi`: Upload Surat Peminjaman (PDF, maks 5 MB) dan tombol "Reservasi sekarang". Untuk dosen hanya tombol "Reservasi sekarang" (`ReviewButton`). |
| | `ReservationSubmitDialog` | Dialog "Detail Pemesanan": nama pemohon, No HP, waktu dan tempat, Keperluan, Surat Peminjaman (khusus `organisasi`), catatan penyetuju. Tombol: Kembali, Simpan Draft (khusus `organisasi`), Pesan. No HP dan keperluan diisi di dialog ini. |
| | Hasil pengiriman | Dialog "Reservasi terkirim" (tombol Buat reservasi lain dan Lihat Reservasi & Riwayat) atau "Draft tersimpan" (tombol Buka Draft Reservasi). Tidak ada pengalihan otomatis. |
| Form GOR (`src/app/(ormawa)/reservasi/baru/gor/page.tsx`) | `SportsHallReservationForm` | Tahapan: Pilih tanggal -> Pilih jam yang tersedia -> Isi jenis kegiatan -> Upload berkas. Tanggal hari ini sampai 13 hari ke depan (untuk `organisasi` mulai lusa); slot per jam 07.00-22.00; maksimal 2 jam; satu lapangan penuh. |
| Form Kendaraan (`src/app/(ormawa)/reservasi/baru/kendaraan/page.tsx`) | `VehicleReservationForm` | Data peminjam (No HP, Tujuan, Jumlah Peserta, Keterangan Kegiatan), tanggal mulai dan selesai, surat (khusus `organisasi`). Tanpa pilihan unit atau jam. |
| Draft Reservasi (`src/app/(ormawa)/reservasi/draft/page.tsx`) | `DraftReservationsPage`, `DraftList`, `DraftCard` (`src/modules/ormawa/drafts/`) | Khusus `organisasi` (dosen dikembalikan ke dashboard). Draft dibaca dari localStorage browser (`src/shared/reservation-draft/draftStorage.ts`). Setiap kartu: Email, Nama Pemesan, Waktu Reservasi, Tipe Reservasi, Dipinjam, unggah surat, tombol Batal dan Pesan. |
| | `DeadlineTimer` | Hitung mundur batas unggah surat: 24 jam sejak draft disimpan, atau jam mulai reservasi bila lebih dulu (`DRAFT_LETTER_HOURS`). Setelah lewat, unggah dan Pesan dinonaktifkan. |
| Reservasi & Riwayat (`src/app/(ormawa)/reservasi/riwayat/page.tsx`) | `ReservationHistoryPage` (`src/shared/reservation-history/`) | Tab jenis (Ruangan, Kendaraan, GOR) dan tab Aktif / Riwayat, disimpan di URL (`?tipe=`, `?tampilan=riwayat`). |
| | `ActiveReservationList` | Tab Aktif: reservasi `menunggu_persetujuan` dan `disetujui`, dikelompokkan "Hari ini" dan "Akan datang". |
| | `ReservationHistoryTable` | Tab Riwayat: kolom Tanggal, Nama Pemesan, unit, Waktu (WIB), Keperluan, Alasan Ditolak, Status. Alasan ditolak hanya tampil di kolomnya; di bawah Keperluan hanya alasan pembatalan. |

### B. Pengelola (`admin_fakultas` dan `admin_universitas`)

| Halaman / File | Section / Komponen | Deskripsi dan Pemetaan Isi |
|---|---|---|
| Persetujuan Admin Fakultas (`src/app/(admin-fakultas)/fakultas/reservasi/persetujuan/page.tsx`) | Page | Mengambil reservasi ruangan berstatus `menunggu_persetujuan` di ruangan milik fakultas admin (`scope: { fakultasId }`). Hanya ruangan; tidak ada tab tipe dan filter fakultas. |
| Riwayat Admin Fakultas (`src/app/(admin-fakultas)/fakultas/reservasi/riwayat/page.tsx`) | Page | Reservasi ruangan fakultas yang sudah diputuskan atau selesai. |
| Kelola Reservasi Admin Universitas (`src/app/(admin-universitas)/admin/reservasi/[tipe]/persetujuan/page.tsx`, `.../riwayat/page.tsx`) | `UniversityReservations` (`src/modules/admin-universitas/reservations/`) | Satu halaman per tipe (`ruangan`, `gor`, `kendaraan`). Tab tipe di kiri, tab Persetujuan / Riwayat di kanan. Menampilkan reservasi semua fakultas tanpa filter fakultas. |
| | `ReservationManagement` (`src/shared/reservation-management/`) | Rangka halaman: tab Persetujuan dan Riwayat (masing-masing ber-URL) dan slot `leading` untuk tab tipe. |
| | `ReservationTable` | Kolom: Tanggal, Nama Pemesan, kolom per tipe (Ruangan; Tujuan dan jumlah peserta untuk kendaraan; Kegiatan untuk GOR), Waktu, Keperluan, lalu Alasan Ditolak dan Status (hanya Riwayat), dan Aksi. Aksi di Persetujuan: ikon centang (Setujui), ikon silang (Tolak), ikon mata (Lihat detail). Di Riwayat hanya ikon mata. Baris tidak bisa diklik. Di layar sempit tabel menjadi daftar kartu. |
| | `ReservationDetailDialog` (`src/shared/reservation/`) | Dialog "Detail Reservasi": nama pemesan dan keterangannya, No HP pemohon (tautan `tel:` untuk dihubungi, mis. lewat WhatsApp), waktu peminjaman, detail unit, Keperluan, dan tautan Surat peminjaman (bila ada). |
| | `ApproveReservationDialog` | Dialog "Setujui Reservasi" berisi detail yang sama dan tombol Batal dan "Setujui reservasi". |
| | `RejectReservationDialog` | Dialog "Tolak Reservasi" dengan isian wajib "Alasan penolakan"; contoh alasan berbeda per tipe. |

## 2. Alur Tindakan Pengguna (User Flow)

### A. Alur Pengajuan Reservasi Ruangan (pemohon)

Buka menu Buat Reservasi -> pilih Ruangan -> pilih Lokasi dan Lantai -> pilih Tanggal -> pilih jam Mulai dan Selesai -> sistem menandai ruangan di denah (Tersedia, Tidak tersedia, Di luar filter) -> (opsional) pilih filter jenis ruangan -> pilih ruangan di denah -> (khusus `organisasi`) unggah Surat Peminjaman PDF -> klik "Reservasi sekarang" -> sistem memvalidasi gedung, lantai, tanggal, jam, dan ruangan -> dialog "Detail Pemesanan" terbuka -> isi No HP dan Keperluan -> klik Pesan -> sistem memvalidasi semua isian -> dialog "Reservasi terkirim" -> klik "Lihat Reservasi & Riwayat" -> reservasi tampil di tab Aktif dengan status Menunggu.

- Jika jam selesai tidak setelah jam mulai, jam mulai sudah lewat, atau jam di luar 07.00-20.00 WIB -> pesan kesalahan di panel jam -> pemohon memperbaiki jam.
- Jika `organisasi` memilih hari ini atau besok -> pesan "Ormawa dan UKM tidak bisa memesan untuk hari ini dan besok..." -> pemohon memilih tanggal lusa atau setelahnya.
- Jika ruangan yang dipilih tidak tersedia -> klik ruangan itu -> panel alasan menampilkan jam yang bentrok dan jadwal terpakai hari itu -> pemohon memilih jam atau ruangan lain.
- Jika `organisasi` menekan Pesan tanpa surat -> pesan "Unggah surat peminjaman untuk memesan, atau simpan sebagai draft dan unggah nanti." -> pemohon mengunggah surat atau memilih Simpan Draft.
- Jika ruangan milik fakultas lain -> catatan bahwa reservasi akan disetujui admin fakultas pemilik ruangan.
- Jika `dosen` -> tanpa tahap surat, tanpa Simpan Draft; setelah Pesan langsung menunggu persetujuan.

Alur GOR sama polanya: pilih tanggal (sampai 13 hari ke depan) -> pilih slot jam berurutan (maksimal 2 jam) -> isi jenis kegiatan -> surat (khusus `organisasi`) -> "Reservasi sekarang" -> Pesan. Alur Kendaraan: isi No HP, Tujuan, Jumlah Peserta, Keterangan Kegiatan -> tanggal mulai dan selesai -> surat (khusus `organisasi`) -> Pesan.

### B. Alur Draft (khusus `organisasi`)

Dialog "Detail Pemesanan" -> klik Simpan Draft -> draft disimpan di localStorage browser, slot belum dipesan -> dialog "Draft tersimpan" -> klik "Buka Draft Reservasi" -> kartu draft dengan hitung mundur batas unggah surat -> unggah surat PDF -> klik Pesan -> reservasi dikirim dan draft dihapus dari browser -> dialog "Reservasi berhasil dibuat!".

- Jika browser tidak bisa menyimpan (mis. mode privat) -> pesan "Browser ini tidak bisa menyimpan draft..." -> pemohon mengunggah surat lalu menekan Pesan.
- Jika batas waktu lewat -> unggah dan Pesan dinonaktifkan -> pemohon menekan Batal lalu membuat reservasi baru.
- Jika pemohon menekan Batal -> konfirmasi "Batalkan draft?" -> draft dihapus dari browser.
- Draft hanya ada di browser yang dipakai; perangkat lain tidak melihatnya.

### C. Alur Persetujuan (admin)

Admin membuka Kelola Reservasi -> tab Persetujuan -> (Admin Universitas) pilih tab tipe Ruangan, Kendaraan, atau GOR -> klik ikon mata untuk membaca detail dan membuka surat -> klik ikon centang -> dialog "Setujui Reservasi" menampilkan detail -> klik "Setujui reservasi" -> baris hilang dari antrean Persetujuan.

- Admin Fakultas hanya melihat reservasi ruangan di ruangan milik fakultasnya.
- Admin Universitas menyetujui GOR, kendaraan, dan ruangan universitas atau bersama. Di tab Ruangan ia melihat reservasi semua fakultas sekaligus.

### D. Alur Penolakan (admin)

Tab Persetujuan -> klik ikon silang -> dialog "Tolak Reservasi" -> isi "Alasan penolakan" -> klik "Tolak reservasi" -> baris hilang dari antrean -> pemohon melihat status Ditolak beserta alasannya di Reservasi & Riwayat.

- Jika alasan kosong -> pesan "Tulis alasan penolakan. Alasan ini dikirim ke pemesan." -> admin mengisi alasan.

## 3. Titik Integrasi Mock untuk Prototipe

Yang sudah ada:

- Draft disimpan dan dibaca dari localStorage (`src/shared/reservation-draft/draftStorage.ts`), lalu dikirim lewat `submitDraft` (`src/modules/ormawa/drafts/draftActions.ts`).
- Pengiriman reservasi (`createReservation` di `src/shared/reservation-form/createReservation.ts`) masih simulasi: menunggu sebentar lalu selalu dianggap diterima, dan reservasinya disimpan ke store simulasi di bawah.
- Tabel admin membaca data contoh tetap dari `src/mocks/reservations.ts` lewat `getReservationRequests` (`src/shared/reservation-management/getReservationRequests.ts`).
- Denah memakai booking contoh (`buildRoomBookingsMock`) dan jadwal kuliah dosen (`src/mocks/lecturerSchedules.ts`).
- Store simulasi di localStorage browser (`src/shared/reservation-store/reservationStore.ts`) dipakai bersama oleh form pemohon, Reservasi Internal admin, tabel admin, Riwayat pemohon, dan timeline operator. Reservasi yang dikirim pemohon masuk antrean admin; Reservasi Internal langsung tersimpan `disetujui` dan tampil di Riwayat Kelola Reservasi.
- Setujui dan Tolak menyimpan keputusan dan alasan penolakan ke store (`decideMockReservation`).
- Denah ruangan dan slot GOR menggabungkan reservasi dari store (`heldBookings`), sehingga slot `menunggu_persetujuan` dan `disetujui` terkunci; `ditolak` dan draft tidak mengunci. Store hanya berlaku di satu browser; data kembali seperti semula lewat "Reset data simulasi reservasi" di halaman login.

## 4. Perbedaan dengan Vault dan Keputusan

Keputusan project leader pada 2026-11-11 atas perbedaan vault dan kode:

| Hal | Di vault | Keputusan | Status di kode |
|---|---|---|---|
| Batas unggah surat draft | 5 hari kerja; lewat batas menjadi `batal` | Tetap 24 jam seperti kode | Sesuai keputusan (`DRAFT_LETTER_HOURS = 24`); vault perlu diperbarui leader |
| Jam operasional ruangan | 07.00-20.00 WIB, slot kelipatan 10 menit | Ikuti vault untuk ruangan; GOR tetap 07.00-22.00 per 60 menit | Sudah: form ruangan menolak jam di luar 07.00-20.00 |
| Tipe ruangan | kelas, lab, meeting, auditorium, gor | Tambah `lab`; `galeri` tetap ada karena berbeda | Sudah: kategori Laboratorium (`lab`) di denah, filter, dan Kelola Ruangan |
| Larangan H-1 dan H-0 untuk `organisasi` | Ormawa/UKM dilarang memesan H-1 dan H-0 | Diimplementasikan | Sudah untuk ruangan dan GOR; dosen dan admin tidak terkena |
| Surat dosen untuk kendaraan | Booking dosen tanpa surat; kendaraan tidak menyebut surat | Dosen wajib surat untuk kendaraan | Di branch `ormawa` (`59b62a0`), di-merge sendiri oleh pengembang |
| Alasan ditolak di Riwayat pemohon | Penolakan wajib alasan | Tampil sekali saja | Sudah: hanya di kolom Alasan Ditolak (perubahan sama dengan `59b62a0`) |
| Kontak pemohon di detail admin | Admin menghubungi WhatsApp penanggung jawab | Tampilkan No HP | Sudah: No HP tampil di dialog detail admin |

Catatan lain:

- Batas jam ruangan, larangan H-0/H-1, dan wajib surat tetap harus ditegakkan juga oleh kirei-api; frontend hanya membantu pemohon.
- Form Buat Reservasi milik operator (`src/modules/operator/`) memakai jam timeline sendiri dan tidak ikut diubah, karena operator di luar cakupan dokumen ini.
