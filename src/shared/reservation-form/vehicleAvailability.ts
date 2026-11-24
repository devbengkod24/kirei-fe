import { wibToIso } from "@/lib/date";
import type { Vehicle } from "@/types/facility";
import type { ReservationRequest, ReservationStatus } from "@/types/reservation";
import { rangesOverlap } from "./availability";

/** Units of one vehicle type held by a request over its days. */
export interface VehicleBooking {
  vehicleId: string;
  units: number;
  /** ISO 8601 (UTC) */
  startsAt: string;
  endsAt: string;
}

export interface VehicleOption {
  vehicle: Vehicle;
  /** Units that seat everyone, capped at the free ones: the suggested amount. The borrower may take fewer and let the rest travel on their own. */
  suggested: number;
  /** Units not held by other requests on the chosen days. */
  free: number;
  /** Passengers all free units carry together. */
  maxPeople: number;
  /** The free units seat the whole group; true while the group size is not filled in. */
  fits: boolean;
  /** The group is smaller than this kind is lent for (`minParticipants`); false while the group size is not filled in. */
  belowMin: boolean;
  /** Why it cannot be picked; null when it can. */
  reason: string | null;
}

const DATE = /^\d{4}-\d{2}-\d{2}$/;

/** A request waiting for approval already holds its units, like an approved one (KONTEKS-DASAR §7). */
const HOLDING_STATUSES = new Set<ReservationStatus>(["menunggu_persetujuan", "disetujui"]);

/** Whole WIB days: from 00:00 on the first day to 00:00 after the last; null while the dates are incomplete or reversed. */
export function tripRange(startDate: string, endDate: string) {
  if (!DATE.test(startDate) || !DATE.test(endDate) || endDate < startDate) return null;
  const end = new Date(wibToIso(endDate, "00:00"));
  end.setUTCDate(end.getUTCDate() + 1);
  return { startsAt: wibToIso(startDate, "00:00"), endsAt: end.toISOString() };
}

/** The driver takes one of the seats. */
export const passengerSeats = (vehicle: Vehicle) => Math.max(1, vehicle.capacity - 1);

export function unitsNeeded(vehicle: Vehicle, participants: number) {
  return Math.max(1, Math.ceil(participants / passengerSeats(vehicle)));
}

/** Units held by vehicle requests that are waiting or approved. */
export function vehicleBookings(reservations: ReservationRequest[], vehicles: Vehicle[]): VehicleBooking[] {
  return reservations.flatMap((reservation) => {
    if (reservation.type !== "kendaraan" || !HOLDING_STATUSES.has(reservation.status)) return [];
    // Older requests carry no vehicle type; one with an assigned unit (roomName) holds one unit of it.
    const assigned = vehicles.find((vehicle) => vehicle.name === reservation.roomName);
    const held = reservation.trip?.vehicle ?? (assigned && { id: assigned.id, units: 1 });
    return held ? [{ vehicleId: held.id, units: held.units, startsAt: reservation.startsAt, endsAt: reservation.endsAt }] : [];
  });
}

/**
 * Active vehicle types with how many units are free on the chosen days and how many would seat the group.
 * shortcut: every booking that touches the range counts against it, even two that fall on different
 * days of a long trip, so availability can read low; Laravel will answer this per day.
 */
export function vehicleOptions(
  vehicles: Vehicle[],
  bookings: VehicleBooking[],
  range: { startsAt: string; endsAt: string } | null,
  participants: number | null,
): VehicleOption[] {
  return vehicles
    .filter((vehicle) => vehicle.isActive)
    .map((vehicle) => {
      const used = range
        ? bookings
            .filter((booking) => booking.vehicleId === vehicle.id && rangesOverlap(booking.startsAt, booking.endsAt, range.startsAt, range.endsAt))
            .reduce((sum, booking) => sum + booking.units, 0)
        : 0;
      const free = Math.max(0, vehicle.unitCount - used);
      const needed = participants && participants > 0 ? unitsNeeded(vehicle, participants) : 1;
      const reason = free === 0 ? "Semua unit sudah dipesan pada tanggal ini." : null;
      const maxPeople = free * passengerSeats(vehicle);
      const fits = !participants || participants <= maxPeople;
      const belowMin = Boolean(participants && participants < (vehicle.minParticipants ?? 1));
      return { vehicle, suggested: Math.max(1, Math.min(needed, free)), free, maxPeople, fits, belowMin, reason };
    })
    // types that seat everyone first, then the rest, then too-small groups, then the ones with nothing left;
    // ties keep the list order
    .sort((a, b) => rank(a) - rank(b));
}

const rank = (option: VehicleOption) => (option.reason ? 3 : option.belowMin ? 2 : option.fits ? 0 : 1);
