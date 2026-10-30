import Image from "next/image";

export interface DashboardHeroProps {
  userName: string;
}

export function DashboardHero({ userName }: DashboardHeroProps) {
  return (
    <section aria-label="Sambutan" className="relative flex min-h-[152px] items-center overflow-hidden rounded-lg bg-primary">
      <Image
        src="/images/dashboard-hero.png"
        alt=""
        fill
        priority
        sizes="(min-width: 768px) calc(100vw - 298px), 100vw"
        className="object-cover object-left"
      />
      <div className="relative flex flex-col gap-1.5 px-6 py-6 text-white md:px-12">
        <p className="text-base leading-6 font-semibold tracking-[0.05em] uppercase md:text-xl">Halo, {userName}!</p>
        <p className="text-sm leading-6 tracking-[0.05em] md:text-lg">Ayo, atur reservasimu dan mulai belajar tanpa gangguan.</p>
      </div>
    </section>
  );
}
