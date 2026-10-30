import React from "react";

export interface HeroBannerProps {
  userName: string;
  tagline?: string;
}

export function HeroBanner({
  userName,
  tagline = "Ayo, atur reservasimu dan mulai belajar tanpa gangguan.",
}: HeroBannerProps) {
  return (
    <section
      aria-label="Sambutan Pengguna"
      className="relative overflow-hidden rounded-[var(--radius-xl)] shadow-[var(--shadow-card)] min-h-[140px] md:min-h-[160px] flex items-center bg-[#0F172A]"
    >
      {/* Background Coworking Space Graphic Elements */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at top right, rgba(59, 130, 246, 0.4), transparent 70%), linear-gradient(135deg, #1E3A8A 0%, #172554 100%)",
        }}
        aria-hidden="true"
      />

      {/* Decorative architectural grid lines representing coworking desks */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 opacity-25 pointer-events-none hidden sm:block"
        aria-hidden="true"
      >
        <svg
          className="w-full h-full text-blue-300"
          viewBox="0 0 400 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M50 20 H380 V140 H50 Z M120 20 V140 M190 20 V140 M260 20 V140 M330 20 V140 M50 60 H380 M50 100 H380"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <rect x="70" y="35" width="35" height="15" rx="3" fill="currentColor" fillOpacity="0.4" />
          <rect x="140" y="35" width="35" height="15" rx="3" fill="currentColor" fillOpacity="0.4" />
          <rect x="210" y="35" width="35" height="15" rx="3" fill="currentColor" fillOpacity="0.4" />
          <rect x="280" y="35" width="35" height="15" rx="3" fill="currentColor" fillOpacity="0.4" />
        </svg>
      </div>

      {/* High-contrast content layer */}
      <div className="relative z-10 p-6 md:p-8 max-w-2xl">
        <h2 className="text-lg md:text-xl lg:text-2xl font-black text-white tracking-wide uppercase leading-snug">
          HALO, {userName}!
        </h2>
        <p className="mt-2 text-sm md:text-base text-blue-100 font-normal leading-relaxed">
          {tagline}
        </p>
      </div>
    </section>
  );
}

