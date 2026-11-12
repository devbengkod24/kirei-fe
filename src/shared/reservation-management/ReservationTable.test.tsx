// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import type { ReservationRequest } from "@/types/reservation";
import { ReservationTable } from "./ReservationTable";

const TRIP: ReservationRequest = {
  id: "res-kendaraan-1",
  type: "kendaraan",
  startsAt: "2026-11-02T01:00:00Z",
  endsAt: "2026-11-02T08:00:00Z",
  buildingName: "Kendaraan",
  roomName: "",
  status: "menunggu_persetujuan",
  borrowerName: "Dr. Maria Lestari, M.Pd.",
  borrowerDetail: "Dosen",
  purpose: "Pendampingan lomba",
  phone: "081234567890",
  letterFileName: null,
  letterUrl: null,
  trip: { destination: "Salatiga", participants: 6 },
  rejectionReason: null,
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

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

describe("ReservationTable for vehicles", () => {
  it("shows the trip without a vehicle column", () => {
    render(<ReservationTable tipe="kendaraan" tab="persetujuan" reservations={[TRIP]} roomCodes={null} />);
    const table = screen.getByRole("table");
    expect(within(table).getByRole("columnheader", { name: "Tujuan" })).toBeTruthy();
    expect(within(table).queryByRole("columnheader", { name: "Kendaraan" })).toBeNull();
    expect(within(table).queryByRole("columnheader", { name: "Ruangan" })).toBeNull();
    expect(within(table).getByText("6 orang")).toBeTruthy();
  });

  it("asks again before approving a trip", () => {
    render(<ReservationTable tipe="kendaraan" tab="persetujuan" reservations={[TRIP]} roomCodes={null} />);
    fireEvent.click(within(screen.getByRole("table")).getByRole("button", { name: `Setujui reservasi ${TRIP.borrowerName}` }));
    const dialog = screen.getByRole("dialog", { name: "Setujui Reservasi" });
    expect(screen.getByRole("table").textContent).toContain(TRIP.borrowerName);
    fireEvent.click(within(dialog).getByRole("button", { name: "Setujui reservasi" }));
    expect(screen.getByRole("status").textContent).toBe(`Reservasi ${TRIP.borrowerName} disetujui.`);
  });
});

describe("ReservationTable history", () => {
  const rejected: ReservationRequest = {
    ...TRIP,
    id: "res-kendaraan-2",
    status: "ditolak",
    rejectionReason: "Jadwal bentrok dengan kegiatan fakultas.",
  };
  const done: ReservationRequest = { ...TRIP, id: "res-kendaraan-3", status: "selesai" };

  it("shows the rejection reason in its own column, with Status right before Aksi", () => {
    render(<ReservationTable tipe="kendaraan" tab="riwayat" reservations={[rejected, done]} roomCodes={null} />);
    const table = screen.getByRole("table");
    const headers = within(table).getAllByRole("columnheader").map((header) => header.textContent);
    expect(headers.slice(-3)).toEqual(["Alasan Ditolak", "Status", "Aksi"]);

    const [, rejectedRow, doneRow] = within(table).getAllByRole("row");
    expect(within(rejectedRow).getByText("Jadwal bentrok dengan kegiatan fakultas.")).toBeTruthy();
    expect(within(doneRow).getByText("-")).toBeTruthy();
    expect(within(table).queryByRole("columnheader", { name: "Keperluan" })?.textContent).toBe("Keperluan");
  });

  it("has no reason column while approving", () => {
    render(<ReservationTable tipe="kendaraan" tab="persetujuan" reservations={[TRIP]} roomCodes={null} />);
    expect(within(screen.getByRole("table")).queryByRole("columnheader", { name: "Alasan Ditolak" })).toBeNull();
  });
});

describe("ReservationTable with the demo store", () => {
  it("moves an approved request out of the queue and into history", () => {
    render(<ReservationTable tipe="kendaraan" tab="persetujuan" reservations={[TRIP]} roomCodes={null} />);
    fireEvent.click(within(screen.getByRole("table")).getByRole("button", { name: `Setujui reservasi ${TRIP.borrowerName}` }));
    fireEvent.click(within(screen.getByRole("dialog", { name: "Setujui Reservasi" })).getByRole("button", { name: "Setujui reservasi" }));
    expect(screen.queryByRole("table")).toBeNull();
    cleanup();

    render(<ReservationTable tipe="kendaraan" tab="riwayat" reservations={[TRIP]} roomCodes={null} />);
    expect(within(screen.getByRole("table")).getByText("Disetujui")).toBeTruthy();
  });

  it("keeps the rejection reason for history", () => {
    render(<ReservationTable tipe="kendaraan" tab="persetujuan" reservations={[TRIP]} roomCodes={null} />);
    fireEvent.click(within(screen.getByRole("table")).getByRole("button", { name: `Tolak reservasi ${TRIP.borrowerName}` }));
    const dialog = screen.getByRole("dialog", { name: "Tolak Reservasi" });
    fireEvent.change(within(dialog).getByLabelText("Alasan penolakan"), { target: { value: "Kendaraan sudah terpakai." } });
    fireEvent.click(within(dialog).getByRole("button", { name: "Tolak reservasi" }));
    cleanup();

    render(<ReservationTable tipe="kendaraan" tab="riwayat" reservations={[TRIP]} roomCodes={null} />);
    expect(within(screen.getByRole("table")).getByText("Kendaraan sudah terpakai.")).toBeTruthy();
  });
});

describe("ReservationTable dates for vehicles", () => {
  it("shows the trip's days without a time column", () => {
    // 00.00 WIB on 13 Nov to 00.00 WIB on 15 Nov: two whole days
    const trip = { ...TRIP, startsAt: "2026-11-12T17:00:00.000Z", endsAt: "2026-11-14T17:00:00.000Z" };
    render(<ReservationTable tipe="kendaraan" tab="persetujuan" reservations={[trip]} roomCodes={null} />);
    const table = screen.getByRole("table");
    expect(within(table).queryByRole("columnheader", { name: "Waktu" })).toBeNull();
    expect(within(table).getByText("13 – 14 Nov 2026")).toBeTruthy();
    expect(table.textContent).not.toContain("00.00");
  });
});
