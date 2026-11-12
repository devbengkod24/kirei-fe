import { describe, expect, it } from "vitest";
import { carouselPages } from "./carouselPages";

describe("carouselPages", () => {
  it("counts one page per visible width and finds the current one", () => {
    expect(carouselPages(2400, 800, 0)).toEqual({ count: 3, current: 0 });
    expect(carouselPages(2400, 800, 1600)).toEqual({ count: 3, current: 2 });
    expect(carouselPages(2472, 309, 600)).toEqual({ count: 8, current: 2 });
  });

  it("treats a track without width as one page, as when the window is minimized", () => {
    expect(carouselPages(0, 0, 0)).toEqual({ count: 1, current: 0 });
    expect(carouselPages(2400, 0, 0)).toEqual({ count: 1, current: 0 });
  });

  it("keeps the current page inside the range", () => {
    expect(carouselPages(2400, 800, 99999)).toEqual({ count: 3, current: 2 });
    expect(carouselPages(2400, 800, -50)).toEqual({ count: 3, current: 0 });
  });
});
