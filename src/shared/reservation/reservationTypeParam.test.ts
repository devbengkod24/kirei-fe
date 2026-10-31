import { describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  notFound: () => {
    throw new Error("notFound");
  },
}));

const { isReservationType, parseReservationTypeParam, reservationTypeParams } = await import("./reservationTypeParam");

describe("[tipe] route segment", () => {
  it("accepts the three reservation types", () => {
    expect(parseReservationTypeParam("ruangan")).toBe("ruangan");
    expect(parseReservationTypeParam("gor")).toBe("gor");
    expect(parseReservationTypeParam("kendaraan")).toBe("kendaraan");
  });

  it("answers anything else with a 404", () => {
    expect(isReservationType("Ruangan")).toBe(false);
    expect(() => parseReservationTypeParam("parkir")).toThrow("notFound");
  });

  it("prerenders one page per type", () => {
    expect(reservationTypeParams().map((params) => params.tipe).sort()).toEqual(["gor", "kendaraan", "ruangan"]);
  });
});
