# Arsitektur KIREI FE

Dokumen ini menjelaskan **fungsi tiap folder**, aturan dependensi, dan integrasi dengan backend Laravel.
Isi detail per fitur dan per role sengaja tidak dicantumkan. Struktur di dalam folder akan menyesuaikan seiring fitur dibangun.

## 1. Prinsip

1. **Routing tipis.** `app/` hanya menentukan URL, layout, dan guard. Isi halaman dirakit dari folder lain.
2. **Satu halaman, satu implementasi.** Halaman yang sama antar role ditulis sekali di `shared/` dan dibedakan lewat props.
3. **Role bukan if-else.** Perbedaan antar role ditentukan di `app/` dan `modules/<role>/`, bukan percabangan nama role di komponen bersama.
4. **Backend adalah sumber kebenaran** untuk otorisasi dan aturan bisnis.

## 2. Struktur dan fungsi folder

```
kirei-fe/
├─ public/
├─ mocks/
├─ tests/
└─ src/
   ├─ app/
   ├─ shared/
   ├─ modules/
   ├─ components/
   ├─ lib/
   ├─ hooks/
   ├─ providers/
   ├─ config/
   ├─ styles/
   ├─ types/
   └─ proxy.ts
```

### Di root repo

| Folder / file | Fungsi |
|---|---|
| `public/` | Aset statis: logo, ikon PWA, gambar, `manifest.webmanifest`. |
| `mocks/` | Handler MSW untuk bekerja tanpa backend (opsional). |
| `tests/` | Tes end-to-end (Playwright) dan setup tes. Tes unit diletakkan dekat kodenya. |
| `orval.config.ts` | Konfigurasi pembuat client API dari OpenAPI Laravel. |
| `next.config.ts` | Konfigurasi Next.js, termasuk proxy (`rewrites`) ke Laravel. |
| `.env.example` | Daftar variabel lingkungan tanpa nilai rahasia. |
| `docs/` | Dokumentasi proyek untuk tim dan AI. |

### Di dalam `src/`

| Folder | Fungsi | Boleh berisi | Tidak boleh berisi |
|---|---|---|---|
| `app/` | **Routing.** Satu route group per role dan satu untuk halaman publik dan login. Berisi `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`. Guard peran dipasang di `layout.tsx` tiap role. | Halaman tipis yang merakit komponen | Logika bisnis, fetch rumit, komponen besar |
| `shared/` | **Halaman dan komponen domain yang dipakai lebih dari satu role**, misalnya persetujuan reservasi, riwayat, dashboard, wizard reservasi, pengumuman, profil. Perbedaan perilaku diatur lewat props. | Komponen yang tahu istilah domain (reservasi, ruangan, dll.) | Pengecekan nama role, impor dari `modules/` |
| `modules/` | **Kode yang khas untuk satu role saja**, satu subfolder per role: komponen, pemanggil API, hook, skema form, dan menu navigasi role itu. | Hal yang tidak dipakai role lain | Impor dari `modules/` role lain |
| `components/` | **UI generik tanpa istilah domain**: tombol, tabel, form field, dialog, shell layout (navbar dan sidebar), empty state. Termasuk hasil shadcn/ui. | Komponen yang bisa dipakai di proyek lain | Kata "reservasi", "ruangan", "pengguna", dll. |
| `lib/` | **Infrastruktur non-UI**: klien API (client dan server), client hasil generate orval, helper autentikasi (sesi, peran, guard), format tanggal WIB, validasi env, utilitas. | Fungsi murni dan konfigurasi | Komponen React, impor dari `shared/` atau `modules/` |
| `hooks/` | **Hook React generik** yang tidak terikat domain, mis. debounce, hitung mundur, media query. | Hook lintas fitur | Hook yang khusus satu fitur (taruh di fiturnya) |
| `providers/` | **Provider tingkat aplikasi**: TanStack Query, tema, dan sejenisnya, digabung dalam satu `Providers`. | Context dan provider global | Logika fitur |
| `config/` | **Konstanta dan konfigurasi aplikasi**: info situs, kontak, batas aturan yang ditampilkan di UI. | Nilai tetap | Rahasia dan kunci API |
| `styles/` | **Token desain dari Figma** (warna, radius, font) sebagai variabel CSS. | Variabel dan gaya global | Gaya khusus satu komponen |
| `types/` | **Tipe TypeScript bersama** yang tidak berasal dari OpenAPI. | Deklarasi tipe global | Tipe hasil generate (ada di `lib/api/generated`) |
| `proxy.ts` | **Pagar kasar di level request**: mengalihkan ke `/login` bila tidak ada cookie sesi. Di Next.js sebelum v16 bernama `middleware.ts`. | Pengalihan sederhana | Pengecekan peran yang mendalam (itu di layout dan backend) |

### Cara memilih lokasi sebuah file

1. Apakah hanya dipakai satu role? Taruh di `modules/<role>/`.
2. Apakah dipakai lebih dari satu role dan tahu istilah domain? Taruh di `shared/`.
3. Apakah generik dan tidak tahu istilah domain? Taruh di `components/`.
4. Apakah bukan UI (API, auth, tanggal, env)? Taruh di `lib/`.
5. Apakah hanya penentu URL, layout, atau guard? Taruh di `app/`.

## 3. Aturan dependensi

```
app → modules/<role> → shared → components, lib, hooks
```

- `shared/` tidak boleh mengimpor dari `modules/`.
- `modules/<role>` tidak boleh mengimpor dari `modules/<role lain>`. Bila perlu dipakai bersama, pindahkan ke `shared/`.
- `components/` dan `lib/` tidak boleh mengimpor dari `shared/` atau `modules/`.
- Aturan ini ditegakkan dengan `eslint-plugin-boundaries` atau `no-restricted-imports`.

Tanda perlu dipecah: komponen di `shared/` punya lebih dari 3 prop boolean, atau ada percabangan berdasarkan nama role. Bagian yang sama tetap di `shared/`, halaman utuhnya pindah ke `modules/<role>/`.

## 4. Pola utama

**Guard per role di layout.** Tiap route group role memanggil `requireRole([...])` di `layout.tsx`, lalu merender shell dengan menu dari `modules/<role>/nav`.

**Page tipis.** `page.tsx` memanggil komponen dari `shared/` atau `modules/`, dan meneruskan props yang menentukan perilaku:

```tsx
// contoh: page di salah satu role
export default async function Page() {
  const user = await requireRole(["admin_fakultas"]);
  return <PersetujuanPage tipe="ruangan" scope={{ fakultasId: user.fakultasId }} />;
}
```

`scope` hanya mengirim filter yang sah ke API. Pembatasan data sebenarnya dilakukan Laravel.


## 5. Penamaan

| Hal | Aturan |
|---|---|
| Folder | `kebab-case` |
| Komponen | `PascalCase.tsx` |
| Hook | `useXxx.ts` |
| URL dan teks UI | Bahasa Indonesia |
| Variabel, fungsi, tipe | Bahasa Inggris |
| Kunci peran dan status | `snake_case` sesuai API |

## 6. Urutan pembangunan yang disarankan

1. Konfigurasi dasar: Tailwind, shadcn/ui, token desain, `lib/api`, `providers`.
2. Halaman login, `proxy.ts`, dan `getCurrentUser`.
3. Shell dan dashboard untuk satu role pertama.
4. Alur reservasi inti (satu jenis dulu).
5. Halaman admin yang berbagi komponen di `shared/`.
6. Role dan jenis reservasi lainnya.
7. Fitur khusus yang kompleks (mis. editor denah) paling akhir.

## 7. Kapan struktur ini ditinjau ulang

- Komponen di `shared/` makin banyak prop boolean atau cek nama role.
- Perubahan untuk satu role sering merusak role lain.
- `modules/<role>` mulai berisi salinan komponen role lain.
