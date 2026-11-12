// @vitest-environment jsdom
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TutorialCarousel } from "./TutorialCarousel";
import { AUTOPLAY_DELAY_MS } from "./useAutoplay";

const STEPS = Array.from({ length: 6 }, (_, index) => ({
  iconSrc: "/icons/clock.svg",
  title: `Langkah ${index + 1}`,
  description: "Deskripsi",
}));

let reduceMotion = false;
const scrollTo = vi.fn();

beforeEach(() => {
  vi.useFakeTimers();
  reduceMotion = false;
  scrollTo.mockClear();
  vi.stubGlobal("ResizeObserver", class {
    observe() {}
    disconnect() {}
  });
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query.includes("reduced-motion") && reduceMotion,
    addEventListener() {},
    removeEventListener() {},
  }));
  // A track 300px wide holding 6 cards of 300px: 6 pages.
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(300);
  vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(1800);
  HTMLElement.prototype.scrollTo = scrollTo;
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

const renderCarousel = () => render(<TutorialCarousel label="Panduan" steps={STEPS} />);
const tick = () => act(() => vi.advanceTimersByTime(AUTOPLAY_DELAY_MS));

describe("TutorialCarousel autoplay", () => {
  it("moves to the next page after the delay", () => {
    renderCarousel();
    expect(scrollTo).not.toHaveBeenCalled();
    tick();
    expect(scrollTo).toHaveBeenCalledWith({ left: 300, behavior: "smooth" });
  });

  it("stops while the pointer is over it and after the pause button", () => {
    renderCarousel();
    const region = screen.getByRole("region", { name: "Panduan" });

    fireEvent.mouseEnter(region);
    tick();
    expect(scrollTo).not.toHaveBeenCalled();
    fireEvent.mouseLeave(region);

    fireEvent.click(screen.getByRole("button", { name: "Jeda putar otomatis" }));
    tick();
    expect(scrollTo).not.toHaveBeenCalled();

    fireEvent.click(screen.getByRole("button", { name: "Putar otomatis" }));
    tick();
    expect(scrollTo).toHaveBeenCalledTimes(1);
  });

  it("does not play by itself when the visitor prefers reduced motion", () => {
    reduceMotion = true;
    renderCarousel();
    tick();
    expect(scrollTo).not.toHaveBeenCalled();
    expect(screen.queryByRole("button", { name: "Jeda putar otomatis" })).toBeNull();
  });
});
