export type ReservationStatus =
  | "menunggu_konfirmasi"
  | "disetujui"
  | "ditolak"
  | "selesai"
  | "dibatalkan";

export interface ReservationSummary {
  id: string;
  ticketCode: string;
  /** ISO 8601 (UTC) */
  startsAt: string;
  /** ISO 8601 (UTC) */
  endsAt: string;
  buildingName: string;
  roomName: string;
  status: ReservationStatus;
}
