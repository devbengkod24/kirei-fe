"use client";

import { useEffect, useRef, useState } from "react";
import { MaskIcon } from "@/components/ui/MaskIcon";
import { carouselPages } from "./carouselPages";
import type { TutorialStep } from "./content";
import { ChevronIcon } from "./LandingIcons";

const ARROW =
  "absolute top-1/2 z-20 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-primary shadow-xl transition-all duration-300 hover:bg-primary-soft active:bg-primary-tint disabled:opacity-40 disabled:hover:bg-surface";

export interface TutorialCarouselProps {
  label: string;
  steps: readonly TutorialStep[];
}

/* 3 cards per view on desktop, 2 on tablet, 1 on phones, like the reservasi-fe tutorial carousel. */
export function TutorialCarousel({ label, steps }: TutorialCarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const pages = carouselPages(track.scrollWidth, track.clientWidth, track.scrollLeft);
      setPageCount(pages.count);
      setPage(pages.current);
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    // Cards per view follow the track width, so recount pages whenever it changes size.
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      resizeObserver.disconnect();
    };
  }, [steps]);

  const goTo = (target: number) => {
    const track = trackRef.current;
    if (!track) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: target * track.clientWidth, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="relative">
      <button
        type="button"
        onClick={() => goTo(page - 1)}
        disabled={page === 0}
        aria-label="Langkah sebelumnya"
        className={`${ARROW} -left-2 sm:left-0`}
      >
        <ChevronIcon direction="left" className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => goTo(page + 1)}
        disabled={page >= pageCount - 1}
        aria-label="Langkah berikutnya"
        className={`${ARROW} -right-2 sm:right-0`}
      >
        <ChevronIcon direction="right" className="size-5" />
      </button>

      <ul
        ref={trackRef}
        className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {steps.map((step, index) => (
          <li key={step.title} className="w-full shrink-0 snap-start px-3 pb-4 sm:w-1/2 lg:w-1/3">
            <article className="flex h-full min-h-[260px] flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
              <header className="flex items-center gap-3 border-b border-border pb-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary shadow-lg">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <h4 className="text-sm leading-tight font-bold text-primary">{step.title}</h4>
                  <p className="mt-1 text-xs text-muted">
                    Langkah {index + 1} dari {steps.length}
                  </p>
                </div>
              </header>
              <div className="flex flex-1 items-center justify-center rounded-xl bg-primary-soft py-6 text-primary">
                <MaskIcon src={step.iconSrc} size={48} />
              </div>
              <p className="text-center text-sm leading-relaxed text-muted">{step.description}</p>
              <span aria-hidden="true" className="mx-auto h-0.5 w-12 rounded-full bg-primary" />
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-6 flex justify-center gap-2">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Ke halaman langkah ${index + 1}`}
            aria-current={index === page ? "step" : undefined}
            className="flex min-h-11 min-w-6 items-center justify-center"
          >
            <span
              className={`block h-3 rounded-full transition-all duration-300 ${
                index === page ? "w-10 bg-primary shadow-lg" : "w-3 bg-border hover:bg-muted"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
