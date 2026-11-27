"use client";

import { useMemo, useRef, useState } from "react";
import { SelectInput } from "@/components/form/Field";
import { FILTER_INPUT_CLASS, FILTER_SELECT_CLASS, FilterField } from "@/components/form/FilterField";
import { Card } from "@/components/ui/Card";
import { MaskIcon } from "@/components/ui/MaskIcon";
import { useLiveData } from "@/hooks/useLiveData";
import { formatDateLongWIB, toWibDateKey, wibToIso } from "@/lib/date";
import { TimelineDetailPopover } from "@/shared/floor-timeline/TimelineDetailPopover";
import { itemKey, type TimelineItem } from "@/shared/floor-timeline/timelineDetail";
import { lecturerSchedulesSchema, LIVE_NAMES } from "@/shared/live-data/liveSchemas";
import { lecturesOnDay, useLiveBuildings } from "@/shared/live-data/useLiveFacilities";
import { approvedRoomBookings } from "@/shared/reservation-store/reservationStore";
import { useMockReservations } from "@/shared/reservation-store/useMockReservations";
import type { Building } from "@/types/facility";
import type { LecturerSchedule } from "@/types/schedule";
import { ImportScheduleDialog, type ScheduleImportFormat } from "./ImportScheduleDialog";
import { MenuButton } from "@/components/ui/MenuButton";
import { SksScheduleMatrix } from "./SksScheduleMatrix";

export interface ScheduleManagerProps {
  /** The admin's faculty; the schedule is kept per faculty. */
  fakultasId: string;
  /** The building the admin manages; null when the account has none. */
  building: Building | null;
  schedule: LecturerSchedule | null;
  /** ISO time the page was rendered, so server and browser start on the same WIB day. */
  now: string;
  templateHref: string;
}

const IMPORT_OPTIONS: { format: ScheduleImportFormat; label: string; hint: string }[] = [
  { format: "pdf", label: "Import PDF", hint: "PDF jadwal kuliah dari Tata Usaha" },
  { format: "csv", label: "Import CSV", hint: "Berkas CSV format SKS" },
];

const dayText = (dateKey: string) => formatDateLongWIB(wibToIso(dateKey, "12:00"));

/**
 * Kelola Jadwal: displays the building's SKS lecture schedule and approved reservations in a
 * Google Calendar-style floor grid, one floor and one day at a time, with CSV import above.
 */
export function ScheduleManager({ fakultasId, building: serverBuilding, schedule: initial, now: renderedAt, templateHref }: ScheduleManagerProps) {
  const live = useLiveData(LIVE_NAMES.lecturerSchedules, lecturerSchedulesSchema);
  const [uploaded, setUploaded] = useState(initial);
  const schedule = live.value?.[fakultasId] ?? uploaded;
  const buildings = useMemo(() => (serverBuilding ? [serverBuilding] : []), [serverBuilding]);
  const building = useLiveBuildings(buildings)[0];

  const [dateKey, setDateKey] = useState(() => toWibDateKey(renderedAt));
  const [floorId, setFloorId] = useState(serverBuilding?.floors[0]?.id ?? "");
  const [detail, setDetail] = useState<{ item: TimelineItem; anchor: HTMLElement; container: HTMLElement } | null>(null);
  const [importFormat, setImportFormat] = useState<ScheduleImportFormat | null>(null);
  const [notice, setNotice] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  const floor = building?.floors.find((item) => item.id === floorId) ?? building?.floors[0];
  const rooms = useMemo(() => floor?.rooms ?? [], [floor]);
  const roomCodes = useMemo(() => rooms.map((room) => room.code), [rooms]);
  // Every room of the building, so a CSV row for another floor is still accepted.
  const buildingRoomCodes = useMemo(
    () => building?.floors.flatMap((level) => level.rooms.map((room) => room.code)) ?? [],
    [building],
  );
  const classSchedules = useMemo(() => lecturesOnDay(schedule ? [schedule] : [], roomCodes, dateKey), [schedule, roomCodes, dateKey]);
  const store = useMockReservations();
  const reservations = useMemo(() => approvedRoomBookings(store, roomCodes, dateKey), [store, roomCodes, dateKey]);

  const closeDetail = () => {
    const anchor = detail?.anchor;
    setDetail(null);
    if (anchor?.isConnected) anchor.focus();
    else headingRef.current?.focus();
  };

  const saved = (next: LecturerSchedule) => {
    const stored = live.ready && live.save({ ...live.value, [fakultasId]: next });
    if (!stored) setUploaded(next);
    setImportFormat(null);
    setDetail(null);
    const { startDate, endDate } = next.semester;
    const shown = dateKey >= startDate && dateKey <= endDate;
    setNotice(
      `${next.entries.length} jadwal SKS disimpan dan langsung tampil di kalender.${
        shown ? "" : ` Tanggal yang dipilih di luar semester ${dayText(startDate)} sampai ${dayText(endDate)}, jadi pilih tanggal di dalamnya.`
      }`,
    );
    headingRef.current?.focus();
  };

  if (!building) {
    return (
      <Card className="px-6 py-16 text-center text-sm text-muted">
        Akun ini belum terhubung ke gedung. Minta Admin Universitas menghubungkan akun Anda ke gedung yang Anda kelola.
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <Card as="section" aria-labelledby="schedule-filter-title" className="flex flex-col gap-2 p-3">
        <h2 id="schedule-filter-title" className="sr-only">
          Filter jadwal
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <FilterField label="Lantai" htmlFor="schedule-floor">
            <SelectInput
              id="schedule-floor"
              className={FILTER_SELECT_CLASS}
              value={floor?.id ?? ""}
              onChange={(event) => {
                setFloorId(event.target.value);
                setDetail(null);
              }}
              disabled={building.floors.length === 0}
            >
              {building.floors.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.number}
                </option>
              ))}
            </SelectInput>
          </FilterField>
          <FilterField label="Tanggal" htmlFor="schedule-date">
            <input
              id="schedule-date"
              type="date"
              value={dateKey}
              onChange={(event) => {
                if (!event.target.value) return;
                setDateKey(event.target.value);
                setDetail(null);
              }}
              className={FILTER_INPUT_CLASS}
            />
          </FilterField>
          <MenuButton
            className="sm:ml-auto"
            label="Import Jadwal"
            menuLabel="Pilih format import jadwal"
            options={IMPORT_OPTIONS.map((option) => ({
              key: option.format,
              label: option.label,
              hint: option.hint,
              onSelect: () => setImportFormat(option.format),
            }))}
          />
        </div>
        {!schedule && (
          <p className="text-[11px] text-muted">
            Belum ada jadwal dosen untuk gedung ini. Import berkas PDF atau CSV (format SKS) untuk menampilkannya di tabel jadwal.
          </p>
        )}
      </Card>

      <Card as="section" aria-labelledby="schedule-timeline-title" className="flex min-w-0 flex-col gap-3 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4">
          <h2
            id="schedule-timeline-title"
            ref={headingRef}
            tabIndex={-1}
            className="flex items-center gap-1.5 text-xs font-medium text-primary"
          >
            <MaskIcon src="/icons/calendar-clock.svg" size={18} />
            Jadwal {floor ? `Lantai ${floor.number}` : building.name}
          </h2>
          <p className="flex items-center gap-1.5 text-xs">
            <MaskIcon src="/icons/calendar-outline.svg" size={14} className="text-muted" />
            <time dateTime={dateKey}>{dayText(dateKey)}</time>
          </p>
        </div>

        <p role="status" className={notice ? "px-4 text-xs text-success" : "sr-only"}>
          {notice}
        </p>

        {rooms.length > 0 ? (
          <SksScheduleMatrix
            rooms={rooms}
            dateKey={dateKey}
            reservations={reservations}
            schedules={classSchedules}
            activeKey={detail ? itemKey(detail.item) : null}
            onOpen={(item, anchor, container) => {
              setNotice("");
              setDetail({ item, anchor, container });
            }}
          />
        ) : (
          <p className="px-4 py-12 text-center text-sm text-muted">
            {floor ? `Belum ada ruangan di lantai ${floor.number}.` : "Gedung ini belum punya lantai."}
          </p>
        )}

        {detail && <TimelineDetailPopover item={detail.item} anchor={detail.anchor} container={detail.container} onClose={closeDetail} />}
      </Card>

      {importFormat && (
        <ImportScheduleDialog
          format={importFormat}
          roomCodes={buildingRoomCodes}
          semester={schedule?.semester ?? null}
          templateHref={templateHref}
          onClose={() => setImportFormat(null)}
          onSaved={saved}
        />
      )}
    </div>
  );
}
