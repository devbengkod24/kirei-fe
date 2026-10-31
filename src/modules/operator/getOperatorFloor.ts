import { connection } from "next/server";
import { MOCK_BUILDINGS } from "@/mocks/facilities";
import { buildOperatorReservationsMock, MOCK_OPERATOR_FLOOR } from "@/mocks/operator";
import type { Floor } from "@/types/facility";
import type { ReservationRecord } from "@/types/reservation";

export interface OperatorFloorData {
  buildingName: string;
  floor: Floor;
  /** Reservations on this floor for today. */
  reservations: ReservationRecord[];
  /** ISO 8601, server time, so the default hour filter matches on server and client */
  now: string;
  /** Set by the API; Laravel decides whether this operator may add or delete reservations. */
  canCreate: boolean;
  canDelete: boolean;
}

/** The operator's floor with today's reservations, or null when no floor is assigned yet. */
export async function getOperatorFloor(): Promise<OperatorFloorData | null> {
  await connection();
  const now = new Date();
  // TODO: replace with the orval client for the operator's floor and today's reservations (no-store).
  const building = MOCK_BUILDINGS.find((item) => item.id === MOCK_OPERATOR_FLOOR.buildingId);
  const floor = building?.floors.find((item) => item.number === MOCK_OPERATOR_FLOOR.floorNumber);
  if (!building || !floor) return null;

  return {
    buildingName: building.name,
    floor,
    reservations: buildOperatorReservationsMock(now),
    now: now.toISOString(),
    canCreate: true,
    canDelete: true,
  };
}
