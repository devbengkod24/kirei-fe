// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import type { Vehicle } from "@/types/facility";
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
  trip: { destination: "Salatiga", participants: 6 },
};

const VEHICLES: Vehicle[] = [
  { id: "vehicle-innova", name: "Toyota Innova", capacity: 7, unitCount: 4, isActive: true },
  { id: "vehicle-bus", name: "Bus Udinus", capacity: 40, unitCount: 2, isActive: true },
];

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
  it("shows the trip columns and an unassigned vehicle", () => {
    render(<ReservationTable tipe="kendaraan" tab="persetujuan" reservations={[TRIP]} vehicles={VEHICLES} />);
    const table = screen.getByRole("table");
    expect(within(table).getByRole("columnheader", { name: "Tujuan" })).toBeTruthy();
    expect(within(table).queryByRole("columnheader", { name: "Ruangan" })).toBeNull();
    expect(within(table).getByText("Belum ditentukan")).toBeTruthy();
    expect(within(table).getByText("6 orang")).toBeTruthy();
    expect(within(table).queryByRole("columnheader", { name: "Peserta" })).toBeNull();
  });

  it("asks for at least one vehicle, and allows several of the same kind", () => {
    render(<ReservationTable tipe="kendaraan" tab="persetujuan" reservations={[TRIP]} vehicles={VEHICLES} />);
    fireEvent.click(within(screen.getByRole("table")).getByRole("button", { name: `Setujui reservasi ${TRIP.borrowerName}` }));

    const dialog = screen.getByRole("dialog", { name: "Setujui Reservasi Kendaraan" });
    fireEvent.click(within(dialog).getByRole("button", { name: "Setujui" }));
    expect(within(dialog).getByText("Tambahkan minimal satu kendaraan untuk perjalanan ini.")).toBeTruthy();

    const addInnova = within(dialog).getByRole("button", { name: "Tambah Toyota Innova" });
    fireEvent.click(addInnova);
    fireEvent.click(addInnova);
    expect(within(dialog).getByText("14 kursi", { exact: false })).toBeTruthy();
    fireEvent.click(within(dialog).getByRole("button", { name: "Setujui" }));
    expect(screen.getByRole("status").textContent).toBe(`Reservasi ${TRIP.borrowerName} disetujui dengan 2 Toyota Innova.`);
  });

  it("approves a room right away", () => {
    const room: ReservationRequest = { ...TRIP, id: "res-001", type: "ruangan", roomName: "H.5.1", buildingName: "Gedung H", trip: undefined };
    render(<ReservationTable tipe="ruangan" tab="persetujuan" reservations={[room]} />);
    fireEvent.click(within(screen.getByRole("table")).getByRole("button", { name: `Setujui reservasi ${room.borrowerName}` }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(screen.getByRole("status").textContent).toBe(`Reservasi ${room.borrowerName} disetujui.`);
  });
});
