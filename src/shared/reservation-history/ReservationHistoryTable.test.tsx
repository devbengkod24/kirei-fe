// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReservationRecord } from "@/types/reservation";
import { ReservationHistoryTable } from "./ReservationHistoryTable";

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn(), replace: vi.fn() }), usePathname: () => "/reservasi/riwayat" }));

afterEach(cleanup);

const rejected: ReservationRecord = {
  id: "res-1",
  type: "ruangan",
  status: "ditolak",
  startsAt: "2026-11-01T01:00:00Z",
  endsAt: "2026-11-01T03:00:00Z",
  bookerName: "Dian Nuswantoro Computer Club",
  bookerEmail: "dncc@dinus.ac.id",
  unitName: "H.5.2",
  purpose: "Rapat pengurus",
  cancellationReason: null,
  rejectionReason: "Jadwal bentrok dengan kegiatan fakultas.",
};

describe("ReservationHistoryTable", () => {
  it("shows the rejection reason once per layout, not again under the purpose", () => {
    render(
      <ReservationHistoryTable tipe="ruangan" items={[rejected]} page={1} perPage={10} totalPages={1} prevHref={null} nextHref={null} baseParams={{}} />,
    );
    // one in the table column, one in the narrow-screen card; never a third under Keperluan
    expect(screen.getAllByText(/Jadwal bentrok dengan kegiatan fakultas\./)).toHaveLength(2);
    expect(screen.queryByText("Alasan dibatalkan:")).toBeNull();
  });
});
