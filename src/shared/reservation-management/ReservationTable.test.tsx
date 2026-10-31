// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import type { ReservationRequest } from "@/types/reservation";
import { ReservationTable } from "./ReservationTable";

const TRIP: ReservationRequest = {
  id: "res-kendaraan-1",
  type: "kendaraan",
  ticketCode: "#829100",
  startsAt: "2026-11-02T01:00:00Z",
  endsAt: "2026-11-02T08:00:00Z",
  buildingName: "Kendaraan",
  roomName: "",
  status: "menunggu_konfirmasi",
  borrowerName: "Dr. Maria Lestari, M.Pd.",
  borrowerDetail: "Dosen",
  purpose: "Pendampingan lomba",
  letterFileName: null,
  letterUrl: null,
  trip: { destination: "Salatiga", participants: 6 },
};

beforeAll(() => {
  // jsdom has no modal dialog support.
  HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
    this.open = true;
  };
  HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
    this.open = false;
  };
});

afterEach(cleanup);

describe("ReservationTable for vehicles", () => {
  it("shows the trip without a vehicle column", () => {
    render(<ReservationTable tipe="kendaraan" tab="persetujuan" reservations={[TRIP]} />);
    const table = screen.getByRole("table");
    expect(within(table).getByRole("columnheader", { name: "Tujuan" })).toBeTruthy();
    expect(within(table).queryByRole("columnheader", { name: "Kendaraan" })).toBeNull();
    expect(within(table).queryByRole("columnheader", { name: "Ruangan" })).toBeNull();
    expect(within(table).getByText("6 orang")).toBeTruthy();
  });

  it("asks again before approving a trip", () => {
    render(<ReservationTable tipe="kendaraan" tab="persetujuan" reservations={[TRIP]} />);
    fireEvent.click(within(screen.getByRole("table")).getByRole("button", { name: `Setujui reservasi ${TRIP.borrowerName}` }));
    const dialog = screen.getByRole("dialog", { name: "Setujui Reservasi" });
    expect(screen.getByRole("table").textContent).toContain(TRIP.borrowerName);
    fireEvent.click(within(dialog).getByRole("button", { name: "Setujui reservasi" }));
    expect(screen.getByRole("status").textContent).toBe(`Reservasi ${TRIP.borrowerName} disetujui.`);
  });
});
