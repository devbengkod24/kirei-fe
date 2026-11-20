"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FACILITY_SLIDES } from "./content";

const SLIDE_INTERVAL_MS = 5000;

export function FacilityCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActiveIndex((index) => (index + 1) % FACILITY_SLIDES.length),
      SLIDE_INTERVAL_MS,
    );
    return () => window.clearInterval(timer);
  }, [paused, activeIndex]);

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Ilustrasi fasilitas kampus"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="overflow-hidden rounded-3xl bg-linear-to-br from-surface to-primary-tint p-2 shadow-xl"
    >
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl">
        {FACILITY_SLIDES.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            fill
            unoptimized
            priority={index === 0}
            aria-hidden={index !== activeIndex}
            className={`object-cover transition-opacity duration-700 ${index === activeIndex ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2 pt-3 pb-1">
        {FACILITY_SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Tampilkan ${slide.label}`}
            aria-current={index === activeIndex}
            onClick={() => setActiveIndex(index)}
            className="flex h-6 items-center"
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                index === activeIndex ? "w-6 bg-primary" : "w-2 bg-primary-tint-border"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
