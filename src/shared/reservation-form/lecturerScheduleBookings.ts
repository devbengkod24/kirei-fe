import { toWibDateKey, wibToIso } from "@/lib/date";
import type { Building, UnitBooking } from "@/types/facility";
import type { LecturerSchedule } from "@/types/schedule";

const DAY_MS = 24 * 60 * 60 * 1000;

/** ISO weekday (1 is Senin) of a WIB date. Noon WIB is the same calendar day in UTC. */
function weekdayOf(dateKey: string) {
  return new Date(wibToIso(dateKey, "12:00")).getUTCDay() || 7;
}

/**
 * Turns each faculty's weekly lecture schedule into bookings for every matching day of its
 * semester, from `fromDateKey` on, so the floor plan treats those rooms as taken. Rows whose room
 * is not on a floor plan of that faculty are skipped.
 */
export function lecturerScheduleBookings(
  schedules: LecturerSchedule[],
  buildings: Building[],
  fromDateKey: string,
): UnitBooking[] {
  const bookings: UnitBooking[] = [];

  for (const schedule of schedules) {
    const roomIds = new Map(
      buildings
        .filter((building) => building.fakultasId === schedule.fakultasId)
        .flatMap((building) => building.floors.flatMap((floor) => floor.rooms.map((room) => [room.code, room.id] as const))),
    );
    // "YYYY-MM-DD" strings compare in calendar order
    let dateKey = schedule.semester.startDate > fromDateKey ? schedule.semester.startDate : fromDateKey;

    while (dateKey <= schedule.semester.endDate) {
      const weekday = weekdayOf(dateKey);
      for (const entry of schedule.entries) {
        const unitId = roomIds.get(entry.roomCode);
        if (entry.day !== weekday || !unitId) continue;
        bookings.push({
          unitId,
          startsAt: wibToIso(dateKey, entry.startTime),
          endsAt: wibToIso(dateKey, entry.endTime),
          label: `jadwal kuliah ${entry.courseName}`,
        });
      }
      dateKey = toWibDateKey(Date.parse(wibToIso(dateKey, "12:00")) + DAY_MS);
    }
  }

  return bookings;
}
