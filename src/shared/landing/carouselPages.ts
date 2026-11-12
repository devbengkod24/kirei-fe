export interface CarouselPages {
  count: number;
  current: number;
}

/**
 * Pages of a horizontally scrolling track, one page per visible width. A track with no width
 * (hidden, or the window minimized) counts as a single page instead of dividing by zero.
 */
export function carouselPages(scrollWidth: number, clientWidth: number, scrollLeft: number): CarouselPages {
  if (!(clientWidth > 0) || !Number.isFinite(scrollWidth)) return { count: 1, current: 0 };
  const count = Math.max(1, Math.round(scrollWidth / clientWidth));
  const current = Math.min(count - 1, Math.max(0, Math.round(scrollLeft / clientWidth)));
  return { count, current };
}
