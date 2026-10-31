import type { Vehicle } from "@/types/facility";

/** Units the admin assigns to one trip, per vehicle kind (vehicle id → units). */
export type VehicleAssignment = Record<string, number>;

export interface AssignedVehicle {
  vehicle: Vehicle;
  units: number;
}

/** Sets the units of one kind, kept between 0 and what the campus owns. */
export function setAssignedUnits(assignment: VehicleAssignment, vehicle: Vehicle, units: number): VehicleAssignment {
  const clamped = Math.max(0, Math.min(vehicle.unitCount, units));
  const next = { ...assignment };
  if (clamped > 0) next[vehicle.id] = clamped;
  else delete next[vehicle.id];
  return next;
}

export function summarizeAssignment(assignment: VehicleAssignment, vehicles: Vehicle[]) {
  const items: AssignedVehicle[] = vehicles
    .filter((vehicle) => (assignment[vehicle.id] ?? 0) > 0)
    .map((vehicle) => ({ vehicle, units: assignment[vehicle.id] }));
  return {
    items,
    units: items.reduce((sum, item) => sum + item.units, 0),
    seats: items.reduce((sum, item) => sum + item.units * item.vehicle.capacity, 0),
  };
}

/** "2 Toyota Hiace dan 1 Bus Udinus" */
export function describeAssignment(items: AssignedVehicle[]) {
  const parts = items.map((item) => `${item.units} ${item.vehicle.name}`);
  return parts.length > 1 ? `${parts.slice(0, -1).join(", ")} dan ${parts.at(-1)}` : (parts[0] ?? "");
}
