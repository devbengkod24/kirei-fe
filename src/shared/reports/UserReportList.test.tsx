// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeAll, describe, expect, it } from "vitest";
import type { UserReport } from "@/types/report";
import { UserReportList } from "./UserReportList";

const REPORT: UserReport = {
  id: "rep-1",
  category: "kerusakan_alat",
  body: "Proyektor mati di H.5.6",
  roomCode: "H.5.6",
  authorName: "Erdin Purwa Putra",
  createdAt: "2026-10-30T00:20:00Z",
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

describe("UserReportList", () => {
  it("keeps the description out of the table and shows it in the detail dialog", () => {
    render(<UserReportList reports={[REPORT]} loadedAt="2026-10-30T03:00:00Z" />);

    const table = screen.getByRole("table");
    expect(within(table).queryByText(REPORT.body)).toBeNull();

    fireEvent.click(within(table).getByRole("button", { name: "Lihat detail laporan Erdin Purwa Putra" }));

    const dialog = screen.getByRole("dialog", { name: "Detail Laporan" });
    expect(within(dialog).getByText(REPORT.body)).toBeTruthy();
    expect(within(dialog).getByText("Kerusakan Alat")).toBeTruthy();
    expect(within(dialog).getByText("07.20 WIB", { exact: false })).toBeTruthy();
  });
});
