import { toWibDateKey } from "@/lib/date";
import { reservationStatusLabel } from "@/shared/reservation/ReservationStatusBadge";
import { TRIP_KIND_LABEL } from "@/shared/reservation/vehicleTrip";
import type { VehicleAssignment } from "@/shared/reservation-store/reservationStore";
import type { ReservationRequest } from "@/types/reservation";
import type { Staff } from "@/types/staff";

// Excel set to Indonesian uses ";" as its list separator, so a comma file would open in one column.
const SEPARATOR = ";";

const HEADERS = [
  "Tanggal Mulai",
  "Tanggal Selesai",
  "Nama Pemesan",
  "Keterangan Pemesan",
  "No HP",
  "Kendaraan",
  "Unit",
  "Tujuan",
  "Perjalanan",
  "Peserta",
  "Keperluan",
  "Status",
  "Alasan Ditolak",
  "Sopir",
  "Co-sopir",
  "Uang Jalan",
  "BBM dan Tol",
  "Honor Sopir",
  "Total Biaya",
];

/** Quotes a cell when it holds the separator, a quote, or a line break. */
function cell(value: string | number | null | undefined) {
  const text = value === null || value === undefined ? "" : String(value);
  return /[";\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** Whole-day trips end at 00.00 after their last day. */
const lastDayKey = (endsAt: string) => toWibDateKey(new Date(Date.parse(endsAt) - 1));

/**
 * Vehicle history as CSV for Excel: one row per request, with the drivers and costs the admin set.
 * Starts with a byte order mark so Excel reads the text as UTF-8.
 */
export function vehicleHistoryCsv(
  rows: ReservationRequest[],
  assignments: Record<string, VehicleAssignment>,
  staff: Staff[],
): string {
  const staffName = (id: string | null | undefined) => staff.find((member) => member.id === id)?.name ?? "";
  const lines = rows.map((reservation) => {
    const trip = reservation.trip;
    const assignment = assignments[reservation.id];
    const total = assignment ? assignment.travelAllowance + assignment.fuelAndToll + assignment.driverFee : null;
    return [
      toWibDateKey(reservation.startsAt),
      lastDayKey(reservation.endsAt),
      reservation.borrowerName,
      reservation.borrowerDetail,
      reservation.phone,
      trip?.vehicle?.name,
      trip?.vehicle?.units,
      trip?.destination,
      trip?.kind ? TRIP_KIND_LABEL[trip.kind] : null,
      trip?.participants,
      reservation.purpose,
      reservationStatusLabel(reservation.status),
      reservation.status === "ditolak" ? reservation.rejectionReason : null,
      staffName(assignment?.driverId),
      staffName(assignment?.coDriverId),
      assignment?.travelAllowance,
      assignment?.fuelAndToll,
      assignment?.driverFee,
      total,
    ]
      .map(cell)
      .join(SEPARATOR);
  });
  return `﻿${[HEADERS.join(SEPARATOR), ...lines].join("\r\n")}\r\n`;
}
