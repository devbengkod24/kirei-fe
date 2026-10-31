import { describe, expect, it } from "vitest";
import { MOCK_FAKULTAS } from "@/mocks/fakultas";
import { fakultasScopeFromSearchParams } from "./fakultasScope";

describe("fakultasScopeFromSearchParams", () => {
  it("reads a known faculty", () => {
    expect(fakultasScopeFromSearchParams({ fakultas: "feb" }, MOCK_FAKULTAS)).toEqual({ fakultasId: "feb" });
  });

  it("means all faculties when the parameter is missing, empty, or unknown", () => {
    expect(fakultasScopeFromSearchParams({}, MOCK_FAKULTAS)).toEqual({ fakultasId: null });
    expect(fakultasScopeFromSearchParams({ fakultas: "" }, MOCK_FAKULTAS)).toEqual({ fakultasId: null });
    expect(fakultasScopeFromSearchParams({ fakultas: "teknik-lama" }, MOCK_FAKULTAS)).toEqual({ fakultasId: null });
  });

  it("takes the first value when the parameter repeats", () => {
    expect(fakultasScopeFromSearchParams({ fakultas: ["fik", "feb"] }, MOCK_FAKULTAS)).toEqual({ fakultasId: "fik" });
  });
});
