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
  /** Room code, vehicle type and units, or GOR name. */
  unitName: string;
  purpose: string;
  /** Filled when the reservation was cancelled, e.g. by an admin after approval. */
  cancellationReason: string | null;
  /** Written by the approving admin when the reservation was rejected; null for other statuses. */
  rejectionReason: string | null;
  /** Kendaraan only: destinations, group size, vehicle type, and trip kind. */
  trip?: VehicleTrip;
}

/** A saved reservation still waiting for its loan letter. */
export interface ReservationDraft extends ReservationRecord {
  status: "draft";
  /** ISO 8601 (UTC), set by the API. The letter must be uploaded before this moment. */
  letterDeadline: string;
}

/** Whether the group stays overnight or is only dropped off and picked up. */
export type TripKind = "menginap" | "antar_jemput";

/** A vehicle request. Fields after `participants` are missing on requests made before they existed. */
export interface VehicleTrip {
  /** Every destination joined with ", ", for places that show one line. */
  destination: string;
  participants: number;
  /** In the order the borrower listed them. */
  destinations?: string[];
  /** The vehicle type asked for and how many units of it; the admin still assigns the actual units. */
  vehicle?: { id: string; name: string; units: number };
  kind?: TripKind;
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
  /** Kendaraan only: where the trip goes, how many people ride, and the vehicle type asked for. */
  trip?: VehicleTrip;
  /** GOR only: the sport or event, e.g. "Badminton". */
  activity?: string;
  /** Written by the approving admin when the reservation was rejected; null for other statuses. */
  rejectionReason: string | null;
  /** Recorded by the admin during verification; does not block approval. TODO: kirei-api store and return hard_copy_submitted. */
  hardCopySubmitted?: boolean;
}
