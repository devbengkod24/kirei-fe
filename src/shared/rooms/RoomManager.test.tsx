// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import type { Building, Room } from "@/types/room";
import { RoomManager } from "./RoomManager";

const BUILDINGS: Building[] = [{ id: "gedung-h", name: "Gedung H", fakultasId: "fik", floors: [5, 6] }];
const ROOMS: Room[] = [
  {
    id: "room-h-5-1",
    code: "H.5.1",
    type: "ruang_kelas",
    buildingId: "gedung-h",
    floor: 5,
    isActive: true,
    photoUrl: null,
    plan: null,
  },
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

function openAddDialog() {
  fireEvent.click(screen.getByRole("button", { name: "Tambah Ruangan" }));
  return screen.getByRole("dialog", { name: "Tambah Ruangan" });
}

describe("RoomManager", () => {
  it("shows room details without a per-room QR button", () => {
    render(<RoomManager buildings={BUILDINGS} rooms={ROOMS} canChangeManager={false} canAddRoom />);

    expect(screen.getByRole("heading", { name: "Kelas H.5.1" })).toBeTruthy();
    expect(screen.queryByRole("button", { name: /QR/i })).toBeNull();
  });

  it("adds a room and selects it on its floor", async () => {
    render(<RoomManager buildings={BUILDINGS} rooms={ROOMS} canChangeManager={false} canAddRoom />);
    const dialog = openAddDialog();

    expect(within(dialog).queryByRole("combobox", { name: "Gedung" })).toBeNull();
    expect(within(dialog).getByText("Gedung H")).toBeTruthy();
    fireEvent.change(within(dialog).getByLabelText("Nama Ruangan"), { target: { value: " H.6.1 " } });
    fireEvent.change(within(dialog).getByLabelText("Tipe Ruangan"), { target: { value: "lab" } });
    fireEvent.change(within(dialog).getByLabelText("Lantai"), { target: { value: "6" } });
    fireEvent.click(within(dialog).getByRole("radio", { name: /Tidak Aktif/ }));
    fireEvent.click(within(dialog).getByRole("button", { name: "Simpan" }));

    await waitFor(() => expect(screen.getByRole("heading", { name: "Lab H.6.1" })).toBeTruthy());
    expect(screen.getByRole("status").textContent).toBe("Lab H.6.1 ditambahkan.");
    expect(screen.getByRole("button", { name: /Lab H\.6\.1/, pressed: true })).toBeTruthy();
    expect(screen.queryByRole("dialog", { name: "Tambah Ruangan" })).toBeNull();
  });

  it("rejects an empty or taken room name and a missing type", () => {
    render(<RoomManager buildings={BUILDINGS} rooms={ROOMS} canChangeManager={false} canAddRoom />);
    const dialog = openAddDialog();
    const save = within(dialog).getByRole("button", { name: "Simpan" });

    fireEvent.click(save);
    expect(within(dialog).getByText("Nama ruangan wajib diisi.")).toBeTruthy();
    expect(within(dialog).getByText("Pilih tipe ruangan.")).toBeTruthy();

    fireEvent.change(within(dialog).getByLabelText("Nama Ruangan"), { target: { value: "H.5.1" } });
    fireEvent.click(save);
    expect(within(dialog).getByText("Ruangan H.5.1 sudah ada.")).toBeTruthy();
  });

  it("changes a room's type in the edit form", async () => {
    render(<RoomManager buildings={BUILDINGS} rooms={ROOMS} canChangeManager={false} canAddRoom />);
    fireEvent.change(screen.getByLabelText("Tipe"), { target: { value: "ruang_kelas" } });
    fireEvent.click(screen.getByRole("button", { name: "Edit Kelas H.5.1" }));
    const dialog = screen.getByRole("dialog", { name: "Edit Ruangan" });

    fireEvent.change(within(dialog).getByLabelText("Tipe Ruangan"), { target: { value: "meeting_room" } });
    fireEvent.click(within(dialog).getByRole("button", { name: "Simpan" }));

    await waitFor(() => expect(screen.getByRole("heading", { name: "Meeting H.5.1" })).toBeTruthy());
    expect(within(screen.getByRole("region", { name: "Detail ruangan" })).getByText("Meeting Room")).toBeTruthy();
    // the type filter is reset so the edited room stays in the list
    expect((screen.getByLabelText("Tipe") as HTMLSelectElement).value).toBe("semua");
  });

  it("moves a room to another floor in the edit form, but not to another building", async () => {
    render(<RoomManager buildings={BUILDINGS} rooms={ROOMS} canChangeManager={false} canAddRoom />);
    fireEvent.click(screen.getByRole("button", { name: "Edit Kelas H.5.1" }));
    const dialog = screen.getByRole("dialog", { name: "Edit Ruangan" });

    expect(within(dialog).queryByRole("combobox", { name: "Gedung" })).toBeNull();
    fireEvent.change(within(dialog).getByLabelText("Lantai"), { target: { value: "6" } });
    fireEvent.click(within(dialog).getByRole("button", { name: "Simpan" }));

    await waitFor(() => expect((screen.getByLabelText("Lantai") as HTMLSelectElement).value).toBe("6"));
    expect(screen.getByRole("heading", { name: "Kelas H.5.1" })).toBeTruthy();
    expect(within(screen.getByRole("region", { name: "Detail ruangan" })).getByText("Lantai 6")).toBeTruthy();
  });

  it("has no Tambah Ruangan for admin universitas", () => {
    render(<RoomManager buildings={BUILDINGS} rooms={ROOMS} canChangeManager canAddRoom={false} />);

    expect(screen.queryByRole("button", { name: "Tambah Ruangan" })).toBeNull();
    expect(screen.getByText("Dikelola oleh :")).toBeTruthy();
  });

  it("hides Dikelola oleh from admin gedung in the details and the edit form", () => {
    render(<RoomManager buildings={BUILDINGS} rooms={ROOMS} canChangeManager={false} canAddRoom />);

    expect(screen.queryByText(/Dikelola oleh/)).toBeNull();
    fireEvent.click(screen.getByRole("button", { name: "Edit Kelas H.5.1" }));
    const dialog = screen.getByRole("dialog", { name: "Edit Ruangan" });
    expect(within(dialog).queryByText(/Dikelola oleh/)).toBeNull();
  });
});
