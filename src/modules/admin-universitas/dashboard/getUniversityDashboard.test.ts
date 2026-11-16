import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("next/server", () => ({ connection: async () => {} }));
vi.mock("@/lib/data-mode/getDataMode", () => ({ getDataMode: async () => dataMode }));

let dataMode: "sample" | "empty" = "sample";

const { getUniversityDashboard } = await import("./getUniversityDashboard");

afterEach(() => {
  dataMode = "sample";
});

describe("getUniversityDashboard", () => {
  it("starts from zero in the empty data mode and says which rooms to count", async () => {
    dataMode = "empty";
    const data = await getUniversityDashboard({ fakultasId: "fik" });
    expect(data.summaries.every((summary) => summary.today === 0 && summary.pending === 0)).toBe(true);
    expect(data.todayReservations).toEqual([]);
    expect(data.weeklyTrend.byType.gor.succeeded).toEqual([0, 0, 0, 0]);
    expect(data.userActivity.activeUsers).toBe(0);
    expect(data.live?.rooms.buildingNames).toEqual(["Gedung H"]);
  });

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
