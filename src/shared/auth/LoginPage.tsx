import Image from "next/image";
import { SITE } from "@/config/site";
import { getDemoAccounts } from "@/lib/auth/session";
import { LoginForm } from "./LoginForm";
import { QuickLogin } from "./QuickLogin";

export function LoginPage() {
  return (
    <main className="relative isolate flex min-h-dvh items-center overflow-hidden px-4 py-8 lg:px-8">
      <Image src="/auth/login-photo.jpg" alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-b from-hero-start to-hero-end" />
      <Image
        src="/auth/login-shape.svg"
        alt=""
        width={1018}
        height={743}
        className="pointer-events-none absolute top-4 left-[36%] -z-10 hidden max-w-none lg:block"
      />

      <div className="mx-auto flex w-full max-w-6xl items-center gap-16">
        <section
          aria-labelledby="login-title"
          className="mx-auto flex w-full max-w-[461px] shrink-0 flex-col items-center gap-6 rounded-4xl bg-surface p-6 sm:p-10 lg:mx-0"
        >
          <div className="flex flex-col items-center">
            <Image src={SITE.logoSrc} alt="" width={80} height={80} priority />
            <h1 id="login-title" className="text-3xl leading-[38px] font-bold">
              {SITE.name}
            </h1>
            <p className="font-brand font-semibold text-muted">{SITE.tagline}</p>
          </div>
          <LoginForm />
          <QuickLogin accounts={getDemoAccounts()} />
        </section>

        <div className="hidden flex-col gap-6 text-on-primary lg:flex">
          <p className="text-5xl leading-16 font-semibold">Pinjam Ruangan, GOR, dan Kendaraan Kampus dari Satu Tempat</p>
          <p className="text-xl leading-8 font-medium">
            Pilih jadwal yang masih kosong, unggah surat peminjaman, lalu pantau statusnya sampai disetujui admin.
          </p>
        </div>
      </div>
    </main>
  );
}
