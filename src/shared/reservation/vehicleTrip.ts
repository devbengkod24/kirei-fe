import type { TripKind, VehicleTrip } from "@/types/reservation";

export const TRIP_KIND_LABEL: Record<TripKind, string> = {
  menginap: "Menginap",
  antar_jemput: "Antar jemput",
};

/** "Bus Udinus, 2 unit"; null for requests made before the vehicle type was asked for. */
export function vehicleText(trip: VehicleTrip | undefined) {
  return trip?.vehicle ? `${trip.vehicle.name}, ${trip.vehicle.units} unit` : null;
}

/** "Antar jemput, 30 orang", or only the group size when the trip kind is unknown. */
export function tripText(trip: VehicleTrip) {
  const people = `${trip.participants} orang`;
  return trip.kind ? `${TRIP_KIND_LABEL[trip.kind]}, ${people}` : people;
}
