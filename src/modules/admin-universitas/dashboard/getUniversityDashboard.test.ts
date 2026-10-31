import { describe, expect, it, vi } from "vitest";

vi.mock("next/server", () => ({ connection: async () => {} }));

const { getUniversityDashboard } = await import("./getUniversityDashboard");

describe("getUniversityDashboard", () => {
  it("summarises rooms, vehicles, and GOR in the tab order", async () => {
    const data = await getUniversityDashboard({ fakultasId: null });
    expect(data.summaries.map((summary) => summary.type)).toEqual(["ruangan", "kendaraan", "gor"]);
    expect(new Set(data.todayReservations.map((reservation) => reservation.type))).toEqual(
      new Set(["ruangan", "gor", "kendaraan"]),
    );
  });

  it("lets the faculty filter narrow rooms only", async () => {
    const all = await getUniversityDashboard({ fakultasId: null });
    // The sample rooms all belong to FIK, so FEB has none.
    const feb = await getUniversityDashboard({ fakultasId: "feb" });
    const byType = (data: typeof all) => Object.fromEntries(data.summaries.map((summary) => [summary.type, summary]));

    expect(byType(feb).ruangan).toMatchObject({ today: 0, pending: 0, totalUnits: 0 });
    expect(byType(feb).gor).toEqual(byType(all).gor);
    expect(byType(feb).kendaraan).toEqual(byType(all).kendaraan);
    expect(feb.todayReservations.some((reservation) => reservation.type === "ruangan")).toBe(false);
    expect(feb.weeklyTrend.byType.gor).toEqual(all.weeklyTrend.byType.gor);
  });

  it("counts only approved or finished reservations as today's", async () => {
    const data = await getUniversityDashboard({ fakultasId: null });
    expect(data.todayReservations.every((reservation) => ["disetujui", "selesai"].includes(reservation.status))).toBe(true);
  });
});
