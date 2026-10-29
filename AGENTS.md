# KIREI FE

Frontend sistem reservasi kampus (ruangan, kendaraan, GOR).
Backend: Laravel API di repo terpisah (`kirei-be`). Repo ini hanya berisi frontend.

Baca file ini di awal setiap sesi. Untuk detail, lihat `docs/`.

## Stack

- Next.js (App Router) + TypeScript (strict)
- Tailwind CSS + shadcn/ui
- TanStack Query (data client), `fetch` di Server Component (data server)
- React Hook Form + Zod (form dan validasi)
- Client API dihasilkan **orval** dari OpenAPI Laravel
- react-konva (editor denah, hanya Admin Universitas), Recharts (grafik dashboard)
- Autentikasi: Laravel Sanctum mode SPA (cookie httpOnly), bukan token di localStorage

## Perintah

```bash
pnpm dev             # jalankan lokal (http://localhost:3000)
pnpm build           # build produksi
pnpm lint            # ESLint
pnpm typecheck       # tsc --noEmit
pnpm test            # Vitest
pnpm test:e2e        # Playwright
pnpm api:generate    # perbarui client dari OpenAPI (hasil: src/lib/api/generated)
```

Sebelum menyatakan pekerjaan selesai, jalankan `pnpm lint && pnpm typecheck && pnpm test`.

## Role

`ormawa`, `dosen`, `admin_fakultas`, `admin_universitas`, `superadmin`, `operator`.
Ormawa dan dosen memakai layar yang sama. Pemetaan halaman: `docs/roles-and-pages.md`.

## Struktur (ringkas)

```
src/
├─ app/          routing, satu route group per role. page.tsx harus tipis
├─ shared/       halaman dan komponen DOMAIN yang dipakai lebih dari satu role
├─ modules/      kode yang khas untuk satu role saja
├─ components/   UI generik, tidak boleh memuat istilah domain
├─ lib/          klien API, auth, tanggal, utilitas
├─ hooks/  providers/  config/  styles/  types/
└─ proxy.ts      pengalihan berdasarkan cookie sesi (middleware.ts di Next < 16)
```

Alur dependensi: `app → modules/<role> → shared → components, lib, hooks`.
Detail lengkap dan contoh: `docs/architecture.md`.

## Aturan wajib

### Struktur
1. `page.tsx` hanya merakit komponen. Tidak ada logika bisnis atau fetch rumit di dalamnya.
2. Halaman yang sama di lebih dari satu role (Persetujuan, Riwayat, Dashboard, Kelola Unit, Laporan, Pengumuman, Profil) ditulis **sekali** di `shared/`, bukan disalin ke tiap role.
3. `shared/` **tidak boleh** mengecek nama role. Perilaku diatur lewat props (`tipe`, `scope`, `canManage`).
4. `modules/<role>` **tidak boleh** mengimpor dari `modules/<role lain>`. Kalau perlu dipakai bersama, pindahkan ke `shared/`.
5. `components/` dan `lib/` tidak boleh mengimpor dari `shared/` atau `modules/`.
6. Kalau satu komponen di `shared/` punya lebih dari 3 prop boolean atau percabangan berdasarkan role, pecah: bagian yang sama tetap di `shared/`, halaman utuhnya pindah ke `modules/<role>/`.

### Keamanan dan data
7. Otorisasi dan pembatasan data (misalnya per fakultas) **ditegakkan di Laravel**. Guard di frontend hanya untuk pengalaman pengguna. Jangan menganggap menyembunyikan menu sebagai pengaman.
8. Jangan simpan token atau data sensitif di `localStorage`/`sessionStorage`.
9. Jangan edit `src/lib/api/generated/`. Jalankan `pnpm api:generate`.
10. Jangan commit secret atau isi `.env`. Gunakan `.env.example`.

### Kode
11. Variabel, fungsi, tipe, dan nama komponen memakai **bahasa Inggris**. URL dan teks UI memakai **bahasa Indonesia**.
12. Nilai status dan peran mengikuti API (`snake_case`, mis. `admin_fakultas`, `menunggu_konfirmasi`). Jangan menerjemahkan di tengah.
13. Waktu dari API berformat UTC/ISO 8601. Tampilkan dalam **WIB** lewat `lib/date.ts`.
14. Validasi form memakai Zod. Error 422 dari Laravel dipetakan ke form lewat `lib/api/form-errors.ts`.
15. Data reservasi sering berubah: gunakan `cache: "no-store"` untuk fetch di server dan `staleTime` pendek di TanStack Query.
16. Gunakan komponen dari `components/ui` (shadcn/ui) dan token di `styles/tokens.css`. Jangan menulis warna atau radius langsung di komponen.

### Penamaan
- Folder: `kebab-case`. Komponen: `PascalCase.tsx`. Hook: `useXxx.ts`.
- Satu komponen utama per file.

## Keputusan yang sudah diambil (jangan diusulkan ulang)

- FE dan BE di dua repo terpisah. Sinkronisasi kontrak lewat OpenAPI + orval.
- Admin Fakultas dan Admin Universitas memakai route terpisah, tetapi berbagi komponen di `shared/`.
- Admin Universitas memakai route dinamis `[tipe]` (`ruangan | gor | kendaraan`), bukan tiga folder kembar.
- Halaman ber-tab Persetujuan dan Riwayat memakai satu komponen dengan prop `tipe`.
- Aplikasi mobile berupa PWA dari Next.js, bukan aplikasi native.

## Aturan bisnis yang memengaruhi UI

- Reservasi hangus bila tidak hadir dalam 1 jam dari waktu reservasi, lalu pengguna terkena penalti.
- Akun diblokir sementara bila melanggar lebih dari 3 kali. Tampilkan pesan dan nonaktifkan pembuatan reservasi.
- Surat peminjaman (PDF) diunggah sebelum tenggat. Tampilkan timer hitung mundur.
- Setiap reservasi punya kode tiket (mis. `#828374`) dan QR.
- Detail aturan lengkap ada di repo `kirei-api` (`docs/business-rules.md`). Frontend hanya menampilkan, bukan menetapkan aturan.

## Saat menambah fitur

1. Cek apakah halaman serupa sudah ada di `shared/`. Gunakan ulang atau perluas.
2. Pastikan endpoint sudah ada di OpenAPI, lalu `pnpm api:generate`.
3. Tambahkan `page.tsx` tipis di route group role yang sesuai.
4. Tambahkan menu di `modules/<role>/nav.ts`.
5. Tulis tes untuk logika non-trivial dan alur utama (Vitest atau Playwright).
6. Perbarui `docs/` bila struktur atau aturan berubah.