"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useMemo, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Card } from "@/components/ui/Card";
import { formatLongDateWIB, toWibDateKey, wibToIso } from "@/lib/date";
import type { SportsHall, UnitBooking } from "@/types/facility";
import { toSportsHallReservationRequest } from "./createReservation";
import { LetterPanel } from "./LetterPanel";
import { PanelHeading } from "./PanelHeading";
import { ReservationSteps, STEPS_BY_TYPE } from "./ReservationSteps";
import { ReservationSubmitDialog } from "./ReservationSubmitDialog";
import {
  SPORTS_HALL_RESERVATION_FIELD_MAP,
  SPORTS_HALL_SCHEDULE_FIELDS,
  createSportsHallReservationSchema,
  type SportsHallReservationInput,
  type SportsHallReservationValues,
} from "./schema";
import { buildSlots, slotStatus, toggleSlot, upcomingDays, type SlotSelection, type SlotStatus } from "./sportsHallSlots";
import { SummaryValue, SummaryWhen } from "./summaryParts";
import { useReservationSubmit } from "./useReservationSubmit";

export interface SportsHallReservationFormProps {
  hall: SportsHall;
  bookings: UnitBooking[];
  /** ISO 8601 server time */
  now: string;
  requester: { name: string };
  links: { history: string; drafts: string };
}

const DAYS_SHOWN = 7;

const SLOT_STYLES: Record<SlotStatus | "selected", string> = {
  available: "border-border bg-surface text-ink hover:bg-primary-soft",
  selected: "border-plan-selected bg-plan-selected text-on-primary",
  booked: "border-plan-booked bg-plan-booked text-on-primary",
  past: "border-border bg-page text-muted",
};

const SLOT_LABEL: Record<SlotStatus | "selected", string> = {
  available: "Tersedia",
  selected: "Dipilih",
  booked: "Sudah dipesan",
  past: "Sudah lewat",
};

const LEGEND = [
  { status: "selected", dot: "bg-plan-selected" },
  { status: "booked", dot: "bg-plan-booked" },
  { status: "available", dot: "border border-border bg-surface" },
  { status: "past", dot: "bg-border" },
] as const;

const ERROR = "text-[11px] text-danger";

export function SportsHallReservationForm({ hall, bookings, now, requester, links }: SportsHallReservationFormProps) {
  const nowDate = useMemo(() => new Date(now), [now]);
  const todayKey = toWibDateKey(nowDate);
  const days = useMemo(() => upcomingDays(todayKey, DAYS_SHOWN), [todayKey]);
  const slots = useMemo(() => buildSlots(hall.openTime, hall.closeTime, hall.slotMinutes), [hall]);

  const schema = useMemo(() => createSportsHallReservationSchema(), []);
  const defaults = useMemo(
    (): SportsHallReservationInput => ({
      date: todayKey,
      startTime: "",
      endTime: "",
      activity: hall.activities[0] ?? "",
      notes: "",
      letter: null,
      intent: "submit",
    }),
    [todayKey, hall.activities],
  );

  const form = useForm<SportsHallReservationInput, unknown, SportsHallReservationValues>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
    mode: "onTouched",
  });
  const { register, setValue, control, formState } = form;
  const { errors } = formState;
  const [date, startTime, endTime, activity, notes, letter] = useWatch({
    control,
    name: ["date", "startTime", "endTime", "activity", "notes", "letter"],
  });

  const [selection, setSelection] = useState<SlotSelection | null>(null);
  const flow = useReservationSubmit(form, {
    defaults,
    toRequest: (values) => toSportsHallReservationRequest(values, hall.id),
    fieldMap: SPORTS_HALL_RESERVATION_FIELD_MAP,
    onReset: () => setSelection(null),
  });

  const statuses = slots.map((slot) => slotStatus(date, slot, bookings, nowDate));
  const hasFreeSlot = statuses.includes("available");

  const applySelection = (next: SlotSelection | null) => {
    setSelection(next);
    const validate = { shouldValidate: Boolean(errors.startTime || errors.endTime) };
    setValue("startTime", next ? slots[next.from].start : "", validate);
    setValue("endTime", next ? slots[next.to].end : "", validate);
  };

  const chooseDay = (dateKey: string) => {
    setValue("date", dateKey);
    applySelection(null);
  };

  const isSelected = (index: number) => selection !== null && index >= selection.from && index <= selection.to;

  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={(event) => event.preventDefault()}
        className="flex flex-col gap-2 lg:grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:items-start"
      >
        <Card className="flex flex-col gap-3 p-3 lg:col-start-1 lg:row-start-1">
          <ReservationSteps steps={STEPS_BY_TYPE.gor} />
          <hr className="border-border" />

          <fieldset>
            <legend className="sr-only">Tanggal reservasi</legend>
            <div className="grid grid-cols-7 sm:gap-2 lg:px-16">
              {days.map((day) => {
                const active = day.dateKey === date;
                return (
                  <button
                    key={day.dateKey}
                    type="button"
                    aria-pressed={active}
                    aria-label={formatLongDateWIB(wibToIso(day.dateKey, "12:00"))}
                    onClick={() => chooseDay(day.dateKey)}
                    className={`flex min-h-16 flex-col items-center justify-center rounded-md py-2 ${
                      active ? "bg-primary text-on-primary" : "text-ink hover:bg-primary-soft"
                    }`}
                  >
                    <span className={`text-[11px] font-semibold uppercase ${active ? "" : "text-muted"}`}>{day.weekday}</span>
                    <span className="text-xl leading-7 font-extrabold">{day.day}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset aria-describedby="slot-legend">
            <legend className="sr-only">Jam reservasi pada {formatLongDateWIB(wibToIso(date, "12:00"))}</legend>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              {slots.map((slot, index) => {
                const state = isSelected(index) ? "selected" : statuses[index];
                return (
                  <button
                    key={slot.start}
                    type="button"
                    disabled={statuses[index] !== "available"}
                    aria-pressed={state === "selected"}
                    aria-label={`${slot.start.replace(":", ".")} sampai ${slot.end.replace(":", ".")}, ${SLOT_LABEL[state]}`}
                    onClick={() => applySelection(toggleSlot(selection, index, statuses))}
                    className={`relative flex min-h-14 items-start overflow-hidden rounded-sm border p-4 text-left text-sm font-bold tabular-nums transition-colors disabled:cursor-not-allowed sm:min-h-20 lg:min-h-[6.5rem] lg:p-6 ${SLOT_STYLES[state]}`}
                  >
                    {slot.start.replace(":", ".")} - {slot.end.replace(":", ".")}
                    {state === "selected" && (
                      <Image
                        src="/icons/slot-check.svg"
                        alt=""
                        width={75}
                        height={75}
                        className="pointer-events-none absolute right-[-10px] bottom-[-12px] size-16 lg:size-[75px]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <ul id="slot-legend" className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
            {LEGEND.map((item) => (
              <li key={item.status} className="flex items-center gap-2">
                <span aria-hidden="true" className={`size-3 rounded-full ${item.dot}`} />
                {SLOT_LABEL[item.status]}
              </li>
            ))}
          </ul>
          {!hasFreeSlot && <p className="text-[11px] text-muted">Tidak ada jam yang tersedia pada tanggal ini. Pilih tanggal lain.</p>}
          {(errors.startTime || errors.endTime) && (
            <p role="alert" className={ERROR}>
              {errors.startTime?.message ?? errors.endTime?.message}
            </p>
          )}
          {selection && (
            <p aria-live="polite" className="text-xs text-primary">
              Dipilih: {startTime.replace(":", ".")} - {endTime.replace(":", ".")} WIB. Klik jam di sebelahnya untuk menambah, atau ujung pilihan untuk mengurangi.
            </p>
          )}
        </Card>

        <div className="flex flex-col gap-2 lg:col-start-2 lg:row-start-1">
          <Card as="section" aria-labelledby="panel-borrower" className="flex flex-col gap-2 p-3">
            <PanelHeading id="panel-borrower" iconSrc="/icons/person-circle.svg" iconWidth={17} iconHeight={17}>
              Nama Peminjam
            </PanelHeading>
            <p className="flex min-h-10 items-center justify-center rounded-md border border-border px-2 text-xs">{requester.name}</p>
          </Card>

          <Card as="section" aria-labelledby="panel-activity" className="flex flex-col gap-3 p-3">
            <PanelHeading id="panel-activity" iconSrc="/icons/running.svg" iconWidth={10} iconHeight={13}>
              Jenis Kegiatan
            </PanelHeading>
            <div className="flex min-h-11 items-center gap-2 rounded-md border border-border px-2.5">
              <label htmlFor="reservation-activity" className="shrink-0 text-xs">
                Kegiatan :
              </label>
              <div className="relative flex-1">
                <select
                  id="reservation-activity"
                  aria-invalid={errors.activity ? true : undefined}
                  className="min-h-11 w-full min-w-0 appearance-none rounded-sm bg-primary-soft py-1 pr-7 pl-2 text-center text-[11px] font-medium text-primary hover:bg-primary-tint lg:min-h-8"
                  {...register("activity")}
                >
                  {hall.activities.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <Image src="/icons/caret-down.svg" alt="" width={16} height={16} className="pointer-events-none absolute top-1/2 right-1.5 -translate-y-1/2" />
              </div>
            </div>
            {errors.activity && <p className={ERROR}>{errors.activity.message}</p>}
          </Card>

          <Card as="section" aria-labelledby="panel-notes" className="flex flex-col gap-3 p-3">
            <PanelHeading id="panel-notes" iconSrc="/icons/notes.svg" iconWidth={11} iconHeight={12}>
              <label htmlFor="reservation-notes">Keterangan</label>
            </PanelHeading>
            <textarea
              id="reservation-notes"
              rows={4}
              placeholder="Opsional, mis. jumlah pemain atau nama acara"
              aria-invalid={errors.notes ? true : undefined}
              className="max-h-40 min-h-24 w-full resize-y rounded-md border border-border px-2 py-1.5 text-xs aria-invalid:border-danger-strong"
              {...register("notes")}
            />
            {errors.notes && <p className={ERROR}>{errors.notes.message}</p>}
          </Card>

          <LetterPanel
            file={letter ?? null}
            onChange={(file) => setValue("letter", file, { shouldValidate: true })}
            error={errors.letter?.message}
            onReview={() => void flow.openSummary([...SPORTS_HALL_SCHEDULE_FIELDS])}
          />
        </div>

        {selection && (
          <ReservationSubmitDialog
            open={flow.dialogOpen}
            onClose={flow.close}
            title="Detail Pemesanan"
            subject={`Reservasi ${hall.name}`}
            approver={null}
            submitting={formState.isSubmitting}
            onSubmit={flow.submit}
            result={flow.result}
            links={links}
            onCreateAnother={flow.createAnother}
          >
            <SummaryValue label="Peminjam">{requester.name}</SummaryValue>
            <SummaryWhen
              date={formatLongDateWIB(wibToIso(date, startTime))}
              startTime={startTime}
              endTime={endTime}
              places={[{ iconSrc: "/icons/building-solid.svg", iconWidth: 13, iconHeight: 15, label: hall.name }]}
            />
            <SummaryValue label="Jenis Kegiatan">{activity}</SummaryValue>
            {notes.trim() && <SummaryValue label="Keterangan">{notes}</SummaryValue>}
          </ReservationSubmitDialog>
        )}
      </form>
    </FormProvider>
  );
}
