"use client";

import { useMemo } from "react";
import { useLiveData } from "@/hooks/useLiveData";
import { toWibDateKey, wibToIso } from "@/lib/date";
import { lecturerScheduleBookings } from "@/shared/reservation-form/lecturerScheduleBookings";
import type { Building, Floor, UnitBooking } from "@/types/facility";
import type { ClassSchedule, LecturerSchedule } from "@/types/schedule";
import { buildingsSchema, lecturerSchedulesSchema, LIVE_NAMES } from "./liveSchemas";

/** The floor plans saved in Kelola Denah in the "empty" data mode; null in "sample" mode or before a save. */
export function useStoredBuildings(): Building[] | null {
  return useLiveData(LIVE_NAMES.buildings, buildingsSchema).value;
}

/** The server's buildings, each replaced by its saved version when Kelola Denah has one. */
export function useLiveBuildings(base: Building[]): Building[] {
  const stored = useStoredBuildings();
  return useMemo(() => (stored ? base.map((building) => stored.find((item) => item.id === building.id) ?? building) : base), [base, stored]);
}

/** The server's floor, replaced by its saved version when Kelola Denah has one. */
export function useLiveFloor(base: Floor): Floor {
  const stored = useStoredBuildings();
  return useMemo(() => stored?.flatMap((building) => building.floors).find((floor) => floor.id === base.id) ?? base, [base, stored]);
}

/** Lecture schedules uploaded in the "empty" data mode, one per faculty; empty in "sample" mode. */
export function useLiveLecturerSchedules(): LecturerSchedule[] {
  const { value } = useLiveData(LIVE_NAMES.lecturerSchedules, lecturerSchedulesSchema);
  return useMemo(() => Object.values(value ?? {}), [value]);
}

/** Bookings that the uploaded lecture schedules put on these buildings' rooms, from the day of `now` on. */
export function useLiveLectureBookings(buildings: Building[], now: string): UnitBooking[] {
  const schedules = useLiveLecturerSchedules();
  return useMemo(
    () => (schedules.length > 0 ? lecturerScheduleBookings(schedules, buildings, toWibDateKey(now)) : []),
    [schedules, buildings, now],
  );
}

const ISO_WEEKDAY_NOON = "12:00";

/** The lectures of one WIB day in the given rooms, as the operator's timeline shows classes. */
export function lecturesOnDay(schedules: LecturerSchedule[], roomCodes: string[], dateKey: string): ClassSchedule[] {
  const rooms = new Set(roomCodes);
  const weekday = new Date(wibToIso(dateKey, ISO_WEEKDAY_NOON)).getUTCDay() || 7;
  return schedules.flatMap((schedule) =>
    dateKey < schedule.semester.startDate || dateKey > schedule.semester.endDate
      ? []
      : schedule.entries
          .filter((entry) => entry.day === weekday && rooms.has(entry.roomCode))
          .map((entry, index) => ({
            id: `lecture-${schedule.fakultasId}-${index}-${entry.roomCode}-${entry.startTime}`,
            unitName: entry.roomCode,
            startsAt: wibToIso(dateKey, entry.startTime),
            endsAt: wibToIso(dateKey, entry.endTime),
            courseName: entry.courseName,
            lecturerName: entry.lecturerName,
          })),
  );
}
