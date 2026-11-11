// TODO: match these values to the Laravel OpenAPI spec once the reservation endpoints exist.
export type ReservationStatus =
  | "draft"
  | "menunggu_persetujuan"
  | "disetujui"
  | "ditolak"
  | "selesai"
  | "batal"
  | "override_bium";

export type ReservationType = "ruangan" | "gor" | "kendaraan";

export const RESERVATION_TYPES: readonly ReservationType[] = ["ruangan", "kendaraan", "gor"];

/**
 * Which reservations a list may show. Laravel enforces the actual restriction;
 * this is only the filter the frontend sends.
 * - `{ mine: true }`: the signed-in borrower's own reservations
 * - `{ fakultasId }`: an admin view, `null` meaning all faculties
 */
export type ReservationScope = { mine: true } | { fakultasId: string | null };

export interface ReservationSummary {
  id: string;
  /** ISO 8601 (UTC) */
  startsAt: string;
  /** ISO 8601 (UTC) */
  endsAt: string;
  buildingName: string;
  roomName: string;
  status: ReservationStatus;
}

export interface ReservationRecord {
  id: string;
  type: ReservationType;
  status: ReservationStatus;
  /** ISO 8601 (UTC) */
  startsAt: string;
  /** ISO 8601 (UTC) */
  endsAt: string;
  bookerName: string;
  bookerEmail: string;
  /** Room code, vehicle name, or GOR name. */
  unitName: string;
  purpose: string;
  /** Filled when the reservation was cancelled, e.g. by an admin after approval. */
  cancellationReason: string | null;
  /** Written by the approving admin when the reservation was rejected; null for other statuses. */
  rejectionReason: string | null;
}

/** A saved reservation still waiting for its loan letter. */
export interface ReservationDraft extends ReservationRecord {
  status: "draft";
  /** ISO 8601 (UTC), set by the API. The letter must be uploaded before this moment. */
  letterDeadline: string;
}

/** A reservation as an admin sees it: who booked, for what, and the uploaded letter. */
export interface ReservationRequest extends ReservationSummary {
  type: ReservationType;
  borrowerName: string;
  /** e.g. "Dosen Pembimbing BEM • NPP: 19820411" */
  borrowerDetail: string;
  /** Contact number the borrower typed in the form, so the admin can reach them (WhatsApp); null when none was given. */
  phone: string | null;
  purpose: string;
  letterFileName: string | null;
  /** Where the uploaded letter can be opened; null when none was uploaded. */
  letterUrl: string | null;
  /** Kendaraan only: where the trip goes and how many people ride. */
  trip?: { destination: string; participants: number };
  /** GOR only: the sport or event, e.g. "Badminton". */
  activity?: string;
  /** Written by the approving admin when the reservation was rejected; null for other statuses. */
  rejectionReason: string | null;
}
