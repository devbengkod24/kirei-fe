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

  it("offers only approve and reject while approving, and rejecting shows the details with the reason field", () => {
    render(<ReservationTable tipe="kendaraan" tab="persetujuan" reservations={[TRIP]} roomCodes={null} />);
    const table = screen.getByRole("table");
    expect(within(table).getAllByRole("button").map((button) => button.getAttribute("aria-label"))).toEqual([
      `Setujui reservasi ${TRIP.borrowerName}`,
      `Tolak reservasi ${TRIP.borrowerName}`,
    ]);

    fireEvent.click(within(table).getByRole("button", { name: `Tolak reservasi ${TRIP.borrowerName}` }));
    const dialog = screen.getByRole("dialog", { name: "Tolak Reservasi" });
    expect(within(dialog).getByText(TRIP.purpose)).toBeTruthy();
    expect(within(dialog).getByLabelText("Alasan penolakan")).toBeTruthy();
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

  it("shows the driver instead of the rejection reason for vehicles, with Status right before Aksi", () => {
    render(<ReservationTable tipe="kendaraan" tab="riwayat" reservations={[rejected, done]} roomCodes={null} />);
    const table = screen.getByRole("table");
    const headers = within(table).getAllByRole("columnheader").map((header) => header.textContent);
    expect(headers.slice(-3)).toEqual(["Nama Supir", "Status", "Aksi"]);
    expect(table.textContent).not.toContain("Jadwal bentrok dengan kegiatan fakultas.");
    expect(within(table).queryByRole("columnheader", { name: "Keperluan" })?.textContent).toBe("Keperluan");
  });

  it("keeps the rejection reason column for rooms", () => {
    const room: ReservationRequest = { ...rejected, type: "ruangan", roomName: "H.5.1", trip: undefined };
    render(<ReservationTable tipe="ruangan" tab="riwayat" reservations={[room]} roomCodes={null} />);
    const table = screen.getByRole("table");
    expect(within(table).getByRole("columnheader", { name: "Alasan Ditolak" })).toBeTruthy();
    expect(within(table).getByText("Jadwal bentrok dengan kegiatan fakultas.")).toBeTruthy();
  });

  it("has one eye action per row, and it opens the details with the reason", () => {
    render(<ReservationTable tipe="kendaraan" tab="riwayat" reservations={[rejected, done]} roomCodes={null} />);
    const table = screen.getByRole("table");
    const actions = within(table).getAllByRole("button");
    expect(actions.map((button) => button.getAttribute("aria-label"))).toEqual([
      `Lihat detail reservasi ${TRIP.borrowerName}`,
      `Lihat detail reservasi ${TRIP.borrowerName}`,
    ]);

    fireEvent.click(actions[0]);
    const dialog = screen.getByRole("dialog", { name: "Detail Reservasi" });
    expect(within(dialog).getByText("Alasan penolakan")).toBeTruthy();
    expect(within(dialog).getByText("Jadwal bentrok dengan kegiatan fakultas.")).toBeTruthy();
  });

  it("has no reason column while approving", () => {
    render(<ReservationTable tipe="kendaraan" tab="persetujuan" reservations={[TRIP]} roomCodes={null} />);
    expect(within(screen.getByRole("table")).queryByRole("columnheader", { name: "Alasan Ditolak" })).toBeNull();
  });
});

describe("ReservationTable vehicle drivers and report", () => {
  const STAFF = [
    { id: "staff-1", name: "Slamet Riyadi", phone: "081234500011", licenseClass: "B1 Umum", role: "sopir" as const, isActive: true },
  ];
  const approved: ReservationRequest = { ...TRIP, id: "res-kendaraan-4", status: "disetujui" };

  it("offers the report on every type's history, never while approving", () => {
    const { rerender } = render(<ReservationTable tipe="kendaraan" tab="riwayat" reservations={[approved]} roomCodes={null} staff={STAFF} />);
    expect(screen.getByRole("button", { name: "Ekspor Laporan" })).toBeTruthy();

    rerender(<ReservationTable tipe="kendaraan" tab="persetujuan" reservations={[TRIP]} roomCodes={null} staff={STAFF} />);
    expect(screen.queryByRole("button", { name: "Ekspor Laporan" })).toBeNull();

    const room: ReservationRequest = { ...approved, type: "ruangan", roomName: "H.5.1", trip: undefined };
    rerender(<ReservationTable tipe="ruangan" tab="riwayat" reservations={[room]} roomCodes={null} />);
    expect(screen.getByRole("button", { name: "Ekspor Laporan" })).toBeTruthy();
  });

  it("shows the assigned driver in the vehicle history", () => {
    window.localStorage.setItem(
      "kirei:mock-reservations",
      JSON.stringify({ created: [], decisions: {}, assignments: { [approved.id]: { driverId: "staff-1", coDriverId: null, travelAllowance: 0, fuelAndToll: 0, driverFee: 0 } } }),
    );
    render(<ReservationTable tipe="kendaraan" tab="riwayat" reservations={[approved]} roomCodes={null} staff={STAFF} />);
    expect(within(screen.getByRole("table")).getByText("Slamet Riyadi")).toBeTruthy();
  });

  it("saves the driver and costs from the detail of an approved trip", () => {
    render(<ReservationTable tipe="kendaraan" tab="riwayat" reservations={[approved]} roomCodes={null} staff={STAFF} />);
    fireEvent.click(within(screen.getByRole("table")).getByRole("button", { name: `Lihat detail reservasi ${TRIP.borrowerName}` }));
    const dialog = screen.getByRole("dialog", { name: "Detail Reservasi" });

    fireEvent.change(within(dialog).getByLabelText(/Sopir utama/), { target: { value: "staff-1" } });
    fireEvent.change(within(dialog).getByLabelText("Uang jalan (Rp)"), { target: { value: "300000" } });
    fireEvent.click(within(dialog).getByRole("button", { name: "Simpan" }));

    return screen.findByText("Sopir dan biaya tersimpan.").then(() => {
      const stored = JSON.parse(window.localStorage.getItem("kirei:mock-reservations") ?? "{}");
      expect(stored.assignments["res-kendaraan-4"]).toMatchObject({ driverId: "staff-1", coDriverId: null, travelAllowance: 300000 });
    });
  });

  it("needs a driver before saving, while the kenek stays optional", () => {
    render(<ReservationTable tipe="kendaraan" tab="riwayat" reservations={[approved]} roomCodes={null} staff={STAFF} />);
    fireEvent.click(within(screen.getByRole("table")).getByRole("button", { name: `Lihat detail reservasi ${TRIP.borrowerName}` }));
    const dialog = screen.getByRole("dialog", { name: "Detail Reservasi" });
    fireEvent.click(within(dialog).getByRole("button", { name: "Simpan" }));
    return within(dialog)
      .findByText("Pilih sopir.")
      .then(() => {
        expect(within(dialog).getByLabelText("Kenek")).toBeTruthy();
        expect(window.localStorage.getItem("kirei:mock-reservations")).toBeNull();
      });
  });

  it("leaves the drivers and costs out of a rejected trip", () => {
    const rejected = { ...TRIP, id: "res-kendaraan-5", status: "ditolak" as const, rejectionReason: "Bentrok" };
    render(<ReservationTable tipe="kendaraan" tab="riwayat" reservations={[rejected]} roomCodes={null} staff={STAFF} />);
    fireEvent.click(within(screen.getByRole("table")).getByRole("button", { name: `Lihat detail reservasi ${TRIP.borrowerName}` }));
    expect(within(screen.getByRole("dialog", { name: "Detail Reservasi" })).queryByText("Uang")).toBeNull();
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
    expect(within(screen.getByRole("table")).getByText("Ditolak")).toBeTruthy();
    fireEvent.click(within(screen.getByRole("table")).getByRole("button", { name: `Lihat detail reservasi ${TRIP.borrowerName}` }));
    expect(within(screen.getByRole("dialog", { name: "Detail Reservasi" })).getByText("Kendaraan sudah terpakai.")).toBeTruthy();
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
