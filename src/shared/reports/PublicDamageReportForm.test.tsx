// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import { PublicDamageReportForm } from "./PublicDamageReportForm";

beforeAll(() => {
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

describe("PublicDamageReportForm", () => {
  it("omits Jenis Pelapor, uses a text input for Kelas / Ruangan, and submits a public complaint", async () => {
    render(<PublicDamageReportForm />);

    expect(screen.queryByLabelText(/Jenis Pelapor/i)).toBeNull();

    const roomInput = screen.getByLabelText("Kelas / Ruangan") as HTMLInputElement;
    expect(roomInput.tagName).toBe("INPUT");
    expect(roomInput.type).toBe("text");

    fireEvent.change(screen.getByLabelText("Nama Pengadu"), { target: { value: "Tester Pengaduan" } });
    fireEvent.change(roomInput, { target: { value: "H.5.1" } });
    fireEvent.change(screen.getByLabelText("Kategori Pengaduan"), { target: { value: "kerusakan_alat" } });
    fireEvent.change(screen.getByLabelText("Keterangan"), {
      target: { value: "Proyektor tidak menyala di ruang H.5.1 saat pengujian." },
    });

    fireEvent.click(screen.getByRole("button", { name: "Kirim Pengaduan" }));

    await waitFor(() => {
      expect(screen.getByRole("dialog", { name: "Pengaduan Terkirim" })).toBeTruthy();
    });
  });
});
