// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { ReservationRecord } from "@/types/reservation";
import { ActiveReservationCard } from "./ActiveReservationCard";

afterEach(cleanup);

const room: ReservationRecord = {
  id: "res-1",
  type: "ruangan",
  status: "disetujui",
  startsAt: "2026-11-12T01:00:00.000Z",
  endsAt: "2026-11-12T03:00:00.000Z",
  bookerName: "Dr. Maria Lestari, M.Pd.",
  bookerEmail: "maria.lestari@dsn.dinus.ac.id",
  unitName: "H.5.1",
  purpose: "Rapat",
  cancellationReason: null,
  rejectionReason: null,
};

describe("ActiveReservationCard", () => {
  it("shows the date and time for a room", () => {
    render(<ActiveReservationCard reservation={room} />);
    expect(screen.getByText(/Kamis, 12 November 2026/)).toBeTruthy();
    expect(screen.getByText(/08\.00 - 10\.00 WIB/)).toBeTruthy();
  });

  it("shows only the day for a one-day vehicle trip", () => {
    // 00.00 WIB on the 12th to 00.00 WIB on the 13th
    const trip = { ...room, type: "kendaraan" as const, startsAt: "2026-11-11T17:00:00.000Z", endsAt: "2026-11-12T17:00:00.000Z" };
    render(<ActiveReservationCard reservation={trip} />);
    expect(screen.getByText("Kamis, 12 November 2026")).toBeTruthy();
    expect(screen.queryByText(/WIB/)).toBeNull();
  });
});
