import { describe, expect, it } from "vitest";
import { paginate } from "./paginate";

describe("paginate", () => {
  const items = Array.from({ length: 23 }, (_, index) => index + 1);

  it("slices the requested page", () => {
    expect(paginate(items, 2, 10)).toEqual({ items: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], page: 2, pageCount: 3 });
    expect(paginate(items, 3, 10).items).toEqual([21, 22, 23]);
  });

  it("clamps pages that no longer exist, e.g. after filtering", () => {
    expect(paginate(items, 9, 10).page).toBe(3);
    expect(paginate(items, 0, 10).page).toBe(1);
  });

  it("keeps one empty page for an empty list", () => {
    expect(paginate([], 1, 10)).toEqual({ items: [], page: 1, pageCount: 1 });
  });
});
