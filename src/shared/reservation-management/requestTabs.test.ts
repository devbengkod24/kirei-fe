import { describe, expect, it } from "vitest";
import type { ReservationRequest, ReservationStatus } from "@/types/reservation";
import { requestsForTab } from "./requestTabs";

const request = (id: string, status: ReservationStatus, startsAt: string) => ({ id, status, startsAt }) as ReservationRequest;

describe("requestsForTab", () => {
  const all = [
    request("pending-late", "menunggu_persetujuan", "2026-11-22T02:00:00Z"),
    request("pending-soon", "menunggu_persetujuan", "2026-11-21T02:00:00Z"),
    request("approved", "disetujui", "2026-11-19T02:00:00Z"),
    request("rejected", "ditolak", "2026-11-20T02:00:00Z"),
    request("draft", "draft", "2026-11-23T02:00:00Z"),
  ];

  it("queues pending requests, soonest first", () => {
    expect(requestsForTab(all, "persetujuan").map((r) => r.id)).toEqual(["pending-soon", "pending-late"]);
  });

  it("moves approved and rejected requests to history, newest first", () => {
    expect(requestsForTab(all, "riwayat").map((r) => r.id)).toEqual(["rejected", "approved"]);
  });
});
