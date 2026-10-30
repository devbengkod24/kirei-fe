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

/** A reservation as an admin sees it: who booked, for what, and the uploaded letter. */
export interface ReservationRequest extends ReservationSummary {
  borrowerName: string;
  /** e.g. "Dosen Pembimbing BEM • NPP: 19820411" */
  borrowerDetail: string;
  purpose: string;
  letterFileName: string | null;
}
