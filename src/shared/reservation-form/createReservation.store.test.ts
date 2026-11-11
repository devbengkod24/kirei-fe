// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { MOCK_RESERVATIONS_KEY, parseState } from "@/shared/reservation-store/reservationStore";
import { createReservation } from "./createReservation";

const owner = { id: "usr-ormawa", name: "HMTI", email: "hmti@example.test", detail: "Organisasi" };
const listing = { owner, unitName: "H.5.2", buildingName: "Gedung H", purpose: "Rapat" };
const request = (status: string) => ({
  type: "ruangan" as const,
  starts_at: "2026-11-20T02:00:00.000Z",
  ends_at: "2026-11-20T04:00:00.000Z",
  status,
  letter: null,
});

afterEach(() => window.localStorage.clear());

describe("createReservation with the demo store", () => {
  it("keeps a sent request for the admin queue", async () => {
    await expect(createReservation(request("menunggu_persetujuan"), listing)).resolves.toEqual({ ok: true, intent: "submit" });
    const { created } = parseState(window.localStorage.getItem(MOCK_RESERVATIONS_KEY));
    expect(created).toHaveLength(1);
    expect(created[0]).toMatchObject({ roomName: "H.5.2", status: "menunggu_persetujuan", ownerId: "usr-ormawa" });
  });

  it("stores nothing for a draft or without a listing", async () => {
    await createReservation(request("draft"), listing);
    await createReservation(request("menunggu_persetujuan"));
    expect(window.localStorage.getItem(MOCK_RESERVATIONS_KEY)).toBeNull();
  });
});
