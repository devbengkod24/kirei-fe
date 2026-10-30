"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { applyFormErrors } from "@/lib/api/form-errors";
import { toWibDateKey } from "@/lib/date";
import type { Building, FloorPlanRoom, RoomBooking, RoomCategory } from "@/types/facility";
import { crossFacultyApprover, defaultSchedule, roomStatus, toIsoRange } from "./availability";
import { createRoomReservation } from "./createRoomReservation";
import { FloorPlan } from "./FloorPlan";
import { ROOM_CATEGORY_LABEL, ROOM_STATUS_LABEL } from "./labels";
import { LetterField } from "./LetterField";
import { PanelHeading } from "./PanelHeading";
import { ReservationSteps } from "./ReservationSteps";
import { ReservationSummaryDialog } from "./ReservationSummaryDialog";
import { RoomPreview } from "./RoomPreview";
import {
  ROOM_RESERVATION_FIELD_MAP,
  SCHEDULE_FIELDS,
  createRoomReservationSchema,
  type ReservationIntent,
  type RoomReservationInput,
  type RoomReservationValues,
} from "./schema";

export interface RoomReservationFormProps {
  buildings: Building[];
  bookings: RoomBooking[];
  /** ISO 8601 server time, for the default date and time */
  now: string;
  requester: { name: string; fakultasId: string | null };
  /** Lets admins pick a booked room; the replacement-schedule flow is not built yet. */
  canUseBookedSlot?: boolean;
  links: { history: string; drafts: string };
}

const CATEGORIES = Object.keys(ROOM_CATEGORY_LABEL) as RoomCategory[];
const LEGEND = [
  { status: "selected", dot: "bg-plan-selected" },
  { status: "booked", dot: "bg-plan-booked" },
  { status: "available", dot: "bg-border" },
  { status: "filtered", dot: "bg-plan-filtered" },
] as const;

const FIELD_ROW = "flex min-h-11 items-center gap-2 rounded-md border border-border px-2.5";
const SELECT =
  "min-h-8 w-full min-w-0 appearance-none rounded-sm bg-primary-soft py-1 pr-7 pl-2 text-center text-[11px] font-medium text-primary hover:bg-primary-tint";
const ERROR = "text-[11px] text-danger";

function firstFloorId(building: Building | undefined) {
  return building?.floors[0]?.id ?? "";
}

export function RoomReservationForm({
  buildings,
  bookings,
  now,
  requester,
  canUseBookedSlot = false,
  links,
}: RoomReservationFormProps) {
  const schema = useMemo(() => createRoomReservationSchema(), []);
  const defaults = useMemo((): RoomReservationInput => {
    const building = buildings.find((b) => b.floors.length > 0) ?? buildings[0];
    return {
      buildingId: building?.id ?? "",
      floorId: firstFloorId(building),
      ...defaultSchedule(new Date(now)),
      roomId: "",
      phone: "",
      purpose: "",
      letter: null,
      intent: "submit",
    };
  }, [buildings, now]);

  const form = useForm<RoomReservationInput, unknown, RoomReservationValues>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
    mode: "onTouched",
  });
  const { register, setValue, trigger, handleSubmit, setError, clearErrors, reset, control, formState } = form;
  const { errors } = formState;

  const [buildingId, floorId, date, startTime, endTime, roomId, letter] = useWatch({
    control,
    name: ["buildingId", "floorId", "date", "startTime", "endTime", "roomId", "letter"],
  });
  const [category, setCategory] = useState<RoomCategory | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [result, setResult] = useState<ReservationIntent | null>(null);

  const todayKey = toWibDateKey(new Date(now));
  const building = buildings.find((b) => b.id === buildingId);
  const floor = building?.floors.find((f) => f.id === floorId);
  const range = toIsoRange(date, startTime, endTime);

  const statuses = new Map(
    (floor?.rooms ?? []).map((room) => [
      room.id,
      roomStatus(room, {
        bookings,
        startsAt: range?.startsAt ?? null,
        endsAt: range?.endsAt ?? null,
        category,
        selectedRoomId: roomId,
        canUseBookedSlot,
      }),
    ]),
  );

  // Drop the chosen room once a new date, time, or filter makes it unavailable.
  const selectionLost = Boolean(roomId) && !statuses.get(roomId)?.selectable;
  useEffect(() => {
    if (selectionLost) setValue("roomId", "");
  }, [selectionLost, setValue]);

  const selectedRoom = floor?.rooms.find((room) => room.id === roomId) ?? null;
  const approver = building ? crossFacultyApprover(requester.fakultasId, building) : null;
  const selectableRooms = (floor?.rooms ?? []).filter((room) => statuses.get(room.id)?.selectable);

  const selectRoom = (room: FloorPlanRoom) => {
    setValue("roomId", room.id === roomId ? "" : room.id, { shouldValidate: Boolean(errors.roomId) });
  };

  const openSummary = async () => {
    if (await trigger([...SCHEDULE_FIELDS])) {
      clearErrors("root");
      setDialogOpen(true);
    }
  };

  const submit = (intent: ReservationIntent) => {
    setValue("intent", intent);
    void handleSubmit(async (values) => {
      const response = await createRoomReservation(values);
      if (response.ok) {
        setResult(response.intent);
      } else if ("validation" in response) {
        applyFormErrors(response.validation, setError, ROOM_RESERVATION_FIELD_MAP);
      } else {
        setError("root.server", { message: response.message });
      }
    })();
  };

  const createAnother = () => {
    reset(defaults);
    setCategory(null);
    setResult(null);
    setDialogOpen(false);
  };

  if (buildings.length === 0) {
    return (
      <Card className="px-6 py-12 text-center">
        <p className="text-sm font-medium">Belum ada gedung yang bisa dipesan.</p>
        <p className="mt-1 text-xs text-muted">Data gedung dan ruangan belum tersedia. Coba lagi nanti.</p>
      </Card>
    );
  }

  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-2 lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start"
      >
        <Card className="order-2 flex flex-col gap-3 p-3 lg:order-none lg:col-start-1 lg:row-start-1">
          <ReservationSteps />
          <hr className="border-border" />

          <div className="grid gap-3.5 xl:grid-cols-[minmax(0,471fr)_minmax(0,356fr)]">
            <div className="flex flex-col gap-2">
              <div className="rounded-lg border border-border p-2">
                {floor && floor.rooms.length > 0 ? (
                  <FloorPlan floor={floor} statuses={statuses} onSelect={selectRoom} legendId="floor-plan-legend" />
                ) : (
                  <p className="flex aspect-[467/300] items-center justify-center px-6 text-center text-xs text-muted">
                    Denah untuk lantai ini belum tersedia. Pilih lantai atau gedung lain.
                  </p>
                )}
              </div>
              <ul id="floor-plan-legend" className="flex flex-wrap gap-x-4 gap-y-1 px-2 text-[11px]">
                {LEGEND.map((item) => (
                  <li key={item.status} className="flex items-center gap-2">
                    <span aria-hidden="true" className={`size-3 rounded-full ${item.dot}`} />
                    {ROOM_STATUS_LABEL[item.status]}
                  </li>
                ))}
              </ul>
              {!range && <p className="px-2 text-[11px] text-muted">Pilih tanggal dan jam untuk melihat ruangan yang tersedia.</p>}
              {errors.roomId && (
                <p role="alert" className={`px-2 ${ERROR}`}>
                  {errors.roomId.message}
                </p>
              )}

              {selectableRooms.length > 0 && (
                <fieldset className="flex flex-col gap-1 px-2 md:hidden">
                  <legend className="mb-1 text-[11px] text-muted">Atau pilih dari daftar ruangan yang bisa dipesan:</legend>
                  <div className="flex flex-wrap gap-1.5">
                    {selectableRooms.map((room) => (
                      <button
                        key={room.id}
                        type="button"
                        aria-pressed={room.id === roomId}
                        onClick={() => selectRoom(room)}
                        className={`min-h-11 min-w-16 rounded-md border px-3 text-xs ${
                          room.id === roomId
                            ? "border-plan-selected bg-plan-selected text-on-primary"
                            : "border-border bg-surface hover:bg-primary-soft"
                        }`}
                      >
                        {room.code}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div role="group" aria-label="Filter jenis ruangan" className="flex flex-wrap gap-2">
                {CATEGORIES.map((option) => {
                  const active = option === category;
                  return (
                    <button
                      key={option}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setCategory(active ? null : option)}
                      className={`min-h-11 rounded-inner px-2 text-[11px] font-medium tracking-wide sm:min-h-8 ${
                        active ? "bg-primary-soft text-primary" : "bg-chip text-muted hover:bg-border"
                      }`}
                    >
                      {ROOM_CATEGORY_LABEL[option]}
                    </button>
                  );
                })}
              </div>
              <RoomPreview room={selectedRoom} approver={approver} />
            </div>
          </div>
        </Card>

        <div className="contents lg:col-start-2 lg:row-start-1 lg:flex lg:flex-col lg:gap-2">
          <Card as="section" aria-labelledby="panel-location" className="order-1 flex flex-col gap-3 p-3 lg:order-none">
            <PanelHeading id="panel-location" iconSrc="/icons/building-solid.svg" iconWidth={13} iconHeight={15}>
              Gedung &amp; Lantai
            </PanelHeading>
            <div className={FIELD_ROW}>
              <label htmlFor="reservation-building" className="shrink-0 text-xs">
                Lokasi :
              </label>
              <div className="relative flex-1">
                <select
                  id="reservation-building"
                  className={SELECT}
                  {...register("buildingId", {
                    onChange: (event) => {
                      setValue("floorId", firstFloorId(buildings.find((b) => b.id === event.target.value)));
                      setValue("roomId", "");
                    },
                  })}
                >
                  {buildings.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
                <Image src="/icons/caret-down.svg" alt="" width={16} height={16} className="pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2" />
              </div>
            </div>
            <div className={FIELD_ROW}>
              <label htmlFor="reservation-floor" className="shrink-0 text-xs">
                Lantai
              </label>
              <div className="relative flex-1">
                <select
                  id="reservation-floor"
                  className={SELECT}
                  {...register("floorId", { onChange: () => setValue("roomId", "") })}
                >
                  {building?.floors.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.number}
                    </option>
                  ))}
                </select>
                <Image src="/icons/caret-down.svg" alt="" width={16} height={16} className="pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2" />
              </div>
            </div>
            {building?.fakultasName && <p className="text-[11px] text-muted">Milik {building.fakultasName}</p>}
          </Card>

          <Card as="section" aria-labelledby="panel-date" className="order-1 flex flex-col gap-2 p-3 lg:order-none">
            <PanelHeading id="panel-date" iconSrc="/icons/calendar-outline.svg">
              <label htmlFor="reservation-date">Tanggal Reservasi</label>
            </PanelHeading>
            <input
              id="reservation-date"
              type="date"
              min={todayKey}
              aria-invalid={errors.date ? true : undefined}
              className="min-h-11 w-full rounded-md border border-border px-2 text-xs aria-invalid:border-danger-strong"
              {...register("date")}
            />
            {errors.date && <p className={ERROR}>{errors.date.message}</p>}
          </Card>

          <Card as="section" aria-labelledby="panel-time" className="order-1 flex flex-col gap-3 p-3 lg:order-none">
            <PanelHeading id="panel-time" iconSrc="/icons/clock-outline.svg">
              Pemilihan Jam Reservasi
            </PanelHeading>
            <div className="flex items-end gap-2 rounded-md border border-border p-2">
              <span className="pb-3 text-xs">Pukul :</span>
              <div className="flex min-w-0 flex-1 flex-col items-center gap-0.5">
                <label htmlFor="reservation-start" className="text-[9px] font-semibold tracking-wide text-plan-selected">
                  Mulai
                </label>
                <input
                  id="reservation-start"
                  type="time"
                  step={600}
                  aria-invalid={errors.startTime ? true : undefined}
                  className="min-h-11 w-full rounded-inner bg-primary-tint px-1 text-center text-xs text-primary aria-invalid:outline aria-invalid:outline-danger-strong"
                  {...register("startTime", { deps: ["endTime"] })}
                />
              </div>
              <span aria-hidden="true" className="pb-3 text-xs">
                -
              </span>
              <div className="flex min-w-0 flex-1 flex-col items-center gap-0.5">
                <label htmlFor="reservation-end" className="text-[9px] font-semibold tracking-wide text-plan-selected">
                  Selesai
                </label>
                <input
                  id="reservation-end"
                  type="time"
                  step={600}
                  aria-invalid={errors.endTime ? true : undefined}
                  className="min-h-11 w-full rounded-inner bg-primary-tint px-1 text-center text-xs text-primary aria-invalid:outline aria-invalid:outline-danger-strong"
                  {...register("endTime", { deps: ["startTime"] })}
                />
              </div>
            </div>
            {(errors.startTime || errors.endTime) && (
              <p className={ERROR}>{errors.startTime?.message ?? errors.endTime?.message}</p>
            )}
          </Card>

          <Card as="section" aria-labelledby="panel-letter" className="order-3 flex flex-col gap-2 p-3 lg:order-none">
            <PanelHeading id="panel-letter" iconSrc="/icons/sticky-note.svg">
              Upload Surat Peminjaman
            </PanelHeading>
            <LetterField
              variant="dropzone"
              file={letter ?? null}
              onChange={(file) => setValue("letter", file, { shouldValidate: true })}
              error={errors.letter?.message}
            />
          </Card>

          {/* type="button": before hydration a submit button would send the fields as a GET query */}
          <Button onClick={() => void openSummary()} className="order-3 min-h-12 w-full text-base font-normal lg:order-none">
            Reservasi sekarang
          </Button>
        </div>

        {building && selectedRoom && (
          <ReservationSummaryDialog
            open={dialogOpen}
            // after a successful send, closing starts a fresh form
            onClose={() => (result ? createAnother() : setDialogOpen(false))}
            requesterName={requester.name}
            buildingName={building.name}
            roomCode={selectedRoom.code}
            approver={approver}
            submitting={formState.isSubmitting}
            onSubmit={submit}
            result={result}
            links={links}
            onCreateAnother={createAnother}
          />
        )}
      </form>
    </FormProvider>
  );
}
