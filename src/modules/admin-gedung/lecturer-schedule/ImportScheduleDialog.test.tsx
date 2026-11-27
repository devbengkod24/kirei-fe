// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { ImportScheduleDialog, PDF_IMPORT_PENDING_MESSAGE } from "./ImportScheduleDialog";

vi.mock("./actions", () => ({ saveLecturerSchedule: vi.fn() }));

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

const SEMESTER = { startDate: "2026-09-01", endDate: "2027-01-31" };

function renderDialog(format: "csv" | "pdf") {
  render(
    <ImportScheduleDialog
      format={format}
      roomCodes={["H.5.1"]}
      semester={SEMESTER}
      templateHref="/template.csv"
      onClose={vi.fn()}
      onSaved={vi.fn()}
    />,
  );
}

describe("ImportScheduleDialog", () => {
  it("takes a PDF and says the server reads it until the API exists", async () => {
    renderDialog("pdf");
    expect(screen.getByRole("dialog", { name: "Import Jadwal (PDF)" })).toBeTruthy();
    const input = screen.getByLabelText("Berkas PDF") as HTMLInputElement;
    expect(input.accept).toContain(".pdf");

    fireEvent.change(input, { target: { files: [new File(["%PDF"], "jadwal.csv", { type: "text/csv" })] } });
    await waitFor(() => expect(screen.getByText("Berkas harus berformat PDF.")).toBeTruthy());

    fireEvent.change(input, { target: { files: [new File(["%PDF"], "jadwal.pdf", { type: "application/pdf" })] } });
    await waitFor(() => expect(screen.queryByText("Berkas harus berformat PDF.")).toBeNull());
    fireEvent.click(screen.getByRole("button", { name: "Simpan Jadwal" }));
    expect(screen.getByRole("alert").textContent).toBe(PDF_IMPORT_PENDING_MESSAGE);
  });

  it("keeps the CSV dialog with its template link", () => {
    renderDialog("csv");
    expect(screen.getByRole("dialog", { name: "Import Jadwal (CSV)" })).toBeTruthy();
    expect((screen.getByLabelText("Berkas CSV") as HTMLInputElement).accept).toContain(".csv");
    expect(screen.getByRole("link", { name: "Unduh contoh CSV" })).toBeTruthy();
  });
});
