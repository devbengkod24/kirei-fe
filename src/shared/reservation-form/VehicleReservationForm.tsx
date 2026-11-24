"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { FormProvider, useFieldArray, useForm, useWatch } from "react-hook-form";
import { Card } from "@/components/ui/Card";
import { formatDayRangeShortWIB, toWibDateKey, wibToIso } from "@/lib/date";
import { withDecision, type ReservationOwner } from "@/shared/reservation-store/reservationStore";
import { useMockReservations } from "@/shared/reservation-store/useMockReservations";
import type { Vehicle } from "@/types/facility";
import { toVehicleReservationRequest } from "./createReservation";
import { BOOKING_MODES, type BookingMode } from "./bookingMode";
import { LetterPanel, ReviewButton } from "./LetterPanel";
import { PanelHeading } from "./PanelHeading";
import {
  ReservationSubmitDialog,
  type ReservationLinks,
} from "./ReservationSubmitDialog";
import {
  MAX_DESTINATIONS,
  TRIP_KIND_LABEL,
  VEHICLE_RESERVATION_FIELD_MAP,
  createVehicleReservationSchema,
  type VehicleIssue,
  type VehicleReservationInput,
  type VehicleReservationValues,
} from "./schema";
import { FieldError, RequiredMark, SummaryRow } from "./summaryParts";
import { useReservationSubmit } from "./useReservationSubmit";
import {
  passengerSeats,
  tripRange,
  unitsNeeded,
  vehicleBookings,
  vehicleOptions,
  type VehicleBooking,
  type VehicleOption,
} from "./vehicleAvailability";
import { VehicleFleetInfo } from "./VehicleFleetInfo";
import { VehicleIcon } from "./VehicleIcon";

export interface VehicleReservationFormProps {
  /** ISO 8601 server time */
  now: string;
  /** Every vehicle type; only the active ones are offered. */
  vehicles: Vehicle[];
  /** Units held by requests the server knows; requests made in this browser are added here. */
  bookings: VehicleBooking[];
  requester: { name: string };
  /**
   * The signed-in user. When set, a sent request is kept in the demo store: waiting for approval,
   * or approved right away in a mode that needs none (Reservasi Internal).
   */
  owner?: ReservationOwner;
  /** "internal" for an admin's own booking: no phone or letter. */
  mode?: BookingMode;
  links: ReservationLinks;
}

const DETAIL_FIELDS = [
  "phone",
  "startDate",
  "endDate",
  "tripKind",
  "participants",
  "vehicleId",
  "units",
  "destinations",
  "activity",
] as const;

const TRIP_KINDS = Object.keys(TRIP_KIND_LABEL) as (keyof typeof TRIP_KIND_LABEL)[];

const LABEL = "text-[10px] font-medium tracking-wide text-plan-selected";
const INPUT =
  "min-h-11 w-full rounded-md border border-border bg-surface px-2 text-xs aria-invalid:border-danger-strong";
const CHOICE =
  "flex min-h-11 items-center gap-2 rounded-md border border-border px-3 text-xs has-[:checked]:border-primary has-[:checked]:bg-primary-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-border-focus";

// A small tile per vehicle type: icon and name. The color says whether it seats the group; the checked one gets the primary outline.
const TILE =
  "flex flex-col items-center gap-1 rounded-md border px-2 py-2.5 text-center has-[:checked]:border-primary has-[:checked]:bg-primary-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-border-focus";

type TileState = "waiting" | "available" | "short" | "belowMin" | "gone";

const TILE_STYLE: Record<TileState, string> = {
  waiting: "cursor-not-allowed border-border bg-page text-muted",
  available: "cursor-pointer border-success bg-success-soft",
  short: "cursor-pointer border-border bg-surface",
  belowMin: "cursor-not-allowed border-border bg-page text-muted",
  gone: "cursor-not-allowed border-danger-soft bg-danger-soft text-muted",
};

/** Read out with the tile, so the state is not told by color alone. */
const TILE_STATE_TEXT: Record<TileState, string> = {
  waiting: "isi jumlah peserta dulu",
  available: "tersedia untuk semua peserta",
  short: "unit kurang untuk semua peserta",
  belowMin: "peserta di bawah minimal",
  gone: "habis pada tanggal ini",
};

function tileState(option: VehicleOption, hasGroup: boolean): TileState {
  if (!hasGroup) return "waiting";
  if (option.reason) return "gone";
  if (option.belowMin) return "belowMin";
  return option.fits ? "available" : "short";
}


export function VehicleReservationForm({
  now,
  vehicles,
  bookings: serverBookings,
  requester,
  owner,
  mode = "request",
  links,
}: VehicleReservationFormProps) {
  const { askPhone, withLetter, withDraft, needsApproval, requesterLabel, submittedText } =
    BOOKING_MODES[mode];
  const todayKey = toWibDateKey(new Date(now));

  // Requests sent in this browser (demo store) hold their units too, until kirei-api serves availability.
  const store = useMockReservations();
  const bookings = useMemo(
    () => [
      ...serverBookings,
      ...vehicleBookings(store.created.map((reservation) => withDecision(reservation, store.decisions)), vehicles),
    ],
    [serverBookings, store, vehicles],
  );

  // Rebuilt when the bookings change; useForm picks up the new resolver on the next render.
  const schema = useMemo(() => {
    const vehicleIssue: VehicleIssue = ({ vehicleId, units, participants, startDate, endDate }) => {
      const group = Number.isInteger(participants) && participants > 0 ? participants : null;
      const option = vehicleOptions(vehicles, bookings, tripRange(startDate, endDate), group).find(
        (item) => item.vehicle.id === vehicleId,
      );
      if (!option) return { field: "vehicleId", message: "Kendaraan ini tidak bisa dipesan." };
      if (option.reason) return { field: "vehicleId", message: option.reason };
      if (option.belowMin) {
        return { field: "vehicleId", message: `${option.vehicle.name} minimal untuk ${option.vehicle.minPassengers} orang.` };
      }
      if (units > option.free) return { field: "units", message: `Tersisa ${option.free} unit pada tanggal ini.` };
      if (group && units > unitsNeeded(option.vehicle, group)) {
        const enough = unitsNeeded(option.vehicle, group);
        return { field: "units", message: `${group} orang cukup dengan ${enough} unit ${option.vehicle.name}.` };
      }
      return null;
    };
    return createVehicleReservationSchema(() => todayKey, mode, vehicleIssue);
  }, [todayKey, mode, vehicles, bookings]);
  const defaults = useMemo(
    (): VehicleReservationInput => ({
      phone: "",
      startDate: todayKey,
      endDate: todayKey,
      tripKind: "",
      participants: "",
      vehicleId: "",
      units: "1",
      destinations: [{ name: "" }],
      activity: "",
      letter: null,
      intent: "submit",
    }),
    [todayKey],
  );

  const form = useForm<
    VehicleReservationInput,
    unknown,
    VehicleReservationValues
  >({
    resolver: zodResolver(schema),
    defaultValues: defaults,
    mode: "onTouched",
  });
  const { register, setValue, trigger, control, formState } = form;
  const { errors } = formState;
  const destinationFields = useFieldArray({ control, name: "destinations" });
  const [phone, startDate, endDate, tripKind, participants, vehicleId, units, destinations, activity, letter] = useWatch({
    control,
    name: ["phone", "startDate", "endDate", "tripKind", "participants", "vehicleId", "units", "destinations", "activity", "letter"],
  });

  const flow = useReservationSubmit(form, {
    defaults,
    toRequest: (values) => toVehicleReservationRequest(values, vehicles),
    fieldMap: VEHICLE_RESERVATION_FIELD_MAP,
    toDraft: (values) => ({
      unitName: `Kendaraan ke ${values.destinations.map((item) => item.name).join(", ")}`,
      purpose: values.activity,
    }),
    owner,
    approvedOnSubmit: !needsApproval,
  });

  const groupSize = Number(participants);
  // Vehicles are picked for a group, so the choice opens once the group size is filled in.
  const hasGroup = Number.isInteger(groupSize) && groupSize > 0;
  const options = vehicleOptions(
    vehicles,
    bookings,
    tripRange(startDate, endDate),
    Number.isInteger(groupSize) && groupSize > 0 ? groupSize : null,
  );
  const chosen = options.find((option) => option.vehicle.id === vehicleId);
  const unitCount = Number(units);
  // No more units than the group fills: 10 people take 1 Hiace (14 seats), 15 people may take 2.
  const maxUnits = chosen && hasGroup ? Math.min(chosen.free, unitsNeeded(chosen.vehicle, groupSize)) : 1;
  const changeUnits = (next: number) => {
    setValue("units", String(next), { shouldValidate: true });
  };
  // One handler for every radio: they share the field name, so RHF keeps only the last registration.
  const pickVehicle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const picked = options.find((option) => option.vehicle.id === event.target.value);
    // start from enough units for the whole group, or as many as are left
    if (picked) setValue("units", String(picked.suggested));
    void trigger(["vehicleId", "units"]);
  };

  // Drop the chosen vehicle once new dates or a bigger group make it unavailable. Not after sending:
  // the sent request now holds the units, and the result dialog still names it.
  const selectionLost = Boolean(vehicleId) && !flow.result && Boolean(!hasGroup || !chosen || chosen.reason || chosen.belowMin);
  useEffect(() => {
    if (selectionLost) setValue("vehicleId", "");
  }, [selectionLost, setValue]);

  // A smaller group needs fewer units, so a count above the new limit comes down to it.
  const unitsTooMany = Boolean(chosen) && !flow.result && unitCount > maxUnits;
  useEffect(() => {
    if (unitsTooMany) setValue("units", String(maxUnits), { shouldValidate: true });
  }, [unitsTooMany, maxUnits, setValue]);

  const destinationNames = (destinations ?? []).map((item) => item.name.trim()).filter(Boolean);
  const destinationError = errors.destinations?.message ?? errors.destinations?.root?.message;

  const field = (id: string, error?: string) => ({
    id: `vehicle-${id}`,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `vehicle-${id}-error` : undefined,
    className: INPUT,
  });

  return (
    <FormProvider {...form}>
      <form
        noValidate
        onSubmit={(event) => event.preventDefault()}
        className="flex w-full flex-col gap-2"
      >
        {/* one column: trip details and dates, then the letter and the send button below them */}
        <Card
          as="section"
          aria-labelledby="panel-vehicle-data"
          className="flex flex-col gap-3 p-3 lg:p-4"
        >
          <PanelHeading
            id="panel-vehicle-data"
            iconSrc="/icons/notes.svg"
            iconWidth={11}
            iconHeight={12}
          >
            Data dan Tanggal Reservasi
          </PanelHeading>

          <div className="grid gap-x-3 gap-y-3 sm:grid-cols-2">
            <div
              className={`flex flex-col gap-1 ${askPhone ? "" : "sm:col-span-2"}`}
            >
              <p className={LABEL}>Nama {requesterLabel}</p>
              <p className="flex min-h-11 items-center rounded-md border border-border bg-page px-2 text-xs">
                {requester.name}
              </p>
            </div>
            {askPhone && (
              <div className="flex flex-col gap-1">
                <label htmlFor="vehicle-phone" className={LABEL}>
                  No HP<RequiredMark />
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="081234567890"
                  {...field("phone", errors.phone?.message)}
                  {...register("phone")}
                />
                <FieldError
                  id="vehicle-phone-error"
                  message={errors.phone?.message}
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label htmlFor="vehicle-startDate" className={LABEL}>
                Mulai<RequiredMark />
              </label>
              <input
                type="date"
                min={todayKey}
                {...field("startDate", errors.startDate?.message)}
                {...register("startDate", { deps: ["endDate", "tripKind", "vehicleId", "units"] })}
              />
              <FieldError
                id="vehicle-startDate-error"
                message={errors.startDate?.message}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="vehicle-endDate" className={LABEL}>
                Selesai<RequiredMark />
              </label>
              <input
                type="date"
                min={startDate || todayKey}
                {...field("endDate", errors.endDate?.message)}
                {...register("endDate", { deps: ["startDate", "tripKind", "vehicleId", "units"] })}
              />
              <FieldError
                id="vehicle-endDate-error"
                message={errors.endDate?.message}
              />
            </div>

            <fieldset
              className="flex flex-col gap-1 sm:col-span-2"
              aria-describedby={errors.tripKind ? "vehicle-tripKind-error" : undefined}
            >
              <legend className={`${LABEL} mb-1`}>Jenis Perjalanan<RequiredMark /></legend>
              <div className="grid grid-cols-2 gap-2">
                {TRIP_KINDS.map((kind) => (
                  <label key={kind} className={CHOICE}>
                    <input
                      type="radio"
                      value={kind}
                      className="size-4 accent-primary"
                      {...register("tripKind", { onChange: () => void trigger("tripKind") })}
                    />
                    {TRIP_KIND_LABEL[kind]}
                  </label>
                ))}
              </div>
              <FieldError
                id="vehicle-tripKind-error"
                message={errors.tripKind?.message}
              />
            </fieldset>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label htmlFor="vehicle-participants" className={LABEL}>
                Jumlah Peserta<RequiredMark />
              </label>
              <input
                type="number"
                inputMode="numeric"
                min={1}
                step={1}
                placeholder="Contoh: 12"
                {...field("participants", errors.participants?.message)}
                {...register("participants")}
              />
              <FieldError
                id="vehicle-participants-error"
                message={errors.participants?.message}
              />
            </div>

            <fieldset
              className="flex flex-col gap-1 sm:col-span-2"
              aria-describedby={errors.vehicleId ? "vehicle-vehicleId-error" : undefined}
            >
              <legend className={`${LABEL} mb-1`}>Kendaraan<RequiredMark /></legend>
              <div className="flex items-start justify-between gap-2">
                {hasGroup ? (
                  <p className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-muted">
                    <span className="flex items-center gap-1">
                      <span aria-hidden="true" className="size-2.5 rounded-full border border-success bg-success-soft" />
                      Cukup untuk semua peserta
                    </span>
                    <span className="flex items-center gap-1">
                      <span aria-hidden="true" className="size-2.5 rounded-full border border-border bg-surface" />
                      Unit kurang
                    </span>
                    <span className="flex items-center gap-1">
                      <span aria-hidden="true" className="size-2.5 rounded-full border border-border bg-page" />
                      Di bawah minimal
                    </span>
                    <span className="flex items-center gap-1">
                      <span aria-hidden="true" className="size-2.5 rounded-full bg-danger-soft" />
                      Habis
                    </span>
                  </p>
                ) : (
                  <p className="text-[11px] text-muted">Isi jumlah peserta dulu untuk memilih kendaraan.</p>
                )}
                {/* borrowers only; admins booking internally see the fleet in Kelola Kendaraan */}
                {mode !== "internal" && <VehicleFleetInfo vehicles={vehicles} bookings={serverBookings} now={now} />}
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {options.map((option) => {
                  const state = tileState(option, hasGroup);
                  const locked = state === "waiting" || state === "belowMin" || state === "gone";
                  const min = option.vehicle.minPassengers ?? 1;
                  return (
                    <label key={option.vehicle.id} className={`${TILE} ${TILE_STYLE[state]}`}>
                      <input
                        type="radio"
                        value={option.vehicle.id}
                        disabled={locked}
                        className="sr-only"
                        {...register("vehicleId", { onChange: pickVehicle })}
                      />
                      <VehicleIcon vehicle={option.vehicle} className={`h-7 w-9 ${locked ? "text-muted" : "text-primary"}`} />
                      <span className={`text-xs font-medium ${locked ? "" : "text-ink"}`}>
                        {option.vehicle.name}
                        <span className="sr-only">, {TILE_STATE_TEXT[state]}</span>
                      </span>
                      {min > 1 && <span className="text-[10px] text-muted">min. {min} orang</span>}
                    </label>
                  );
                })}
              </div>
              <FieldError
                id="vehicle-vehicleId-error"
                message={errors.vehicleId?.message}
              />
            </fieldset>

            {chosen && !chosen.reason && (
              <div className="flex flex-col gap-1 sm:col-span-2">
                <p className="text-xs text-ink">
                  <span className="font-medium">{chosen.vehicle.name}</span> · {passengerSeats(chosen.vehicle)} kursi per unit ·{" "}
                  {chosen.free} unit tersisa
                </p>
                <label htmlFor="vehicle-units" className={LABEL}>
                  Jumlah Unit<RequiredMark />
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => changeUnits(unitCount - 1)}
                    disabled={!(unitCount > 1)}
                    aria-label="Kurangi unit"
                    className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-sm text-primary hover:bg-primary-soft disabled:text-muted disabled:hover:bg-transparent"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    inputMode="numeric"
                    min={1}
                    max={maxUnits}
                    step={1}
                    {...field("units", errors.units?.message)}
                    className={`${INPUT} max-w-20 text-center`}
                    {...register("units")}
                  />
                  <button
                    type="button"
                    onClick={() => changeUnits(unitCount + 1)}
                    disabled={!(unitCount < maxUnits)}
                    aria-label="Tambah unit"
                    className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-sm text-primary hover:bg-primary-soft disabled:text-muted disabled:hover:bg-transparent"
                  >
                    +
                  </button>
                </div>
                <FieldError id="vehicle-units-error" message={errors.units?.message} />
              </div>
            )}

            <fieldset className="flex flex-col gap-2 sm:col-span-2">
              <legend className={`${LABEL} mb-1`}>Tujuan<RequiredMark /></legend>
              {destinationFields.fields.map((item, index) => {
                const error = errors.destinations?.[index]?.name?.message;
                return (
                  <div key={item.id} className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        aria-label={`Tujuan ${index + 1}`}
                        placeholder={index === 0 ? "Contoh: Semarang Barat" : "Tujuan berikutnya"}
                        {...field(`destinations-${index}`, error)}
                        {...register(`destinations.${index}.name`)}
                      />
                      {destinationFields.fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => destinationFields.remove(index)}
                          aria-label={`Hapus tujuan ${index + 1}`}
                          className="flex min-h-11 min-w-11 items-center justify-center rounded-md border border-border text-sm text-danger hover:bg-danger-soft"
                        >
                          ×
                        </button>
                      )}
                    </div>
                    <FieldError id={`vehicle-destinations-${index}-error`} message={error} />
                  </div>
                );
              })}
              {destinationFields.fields.length < MAX_DESTINATIONS && (
                <button
                  type="button"
                  onClick={() => destinationFields.append({ name: "" })}
                  className="flex min-h-11 items-center justify-center gap-1 rounded-md border border-dashed border-primary text-xs font-medium text-primary hover:bg-primary-soft"
                >
                  + Tambah tujuan
                </button>
              )}
              <FieldError id="vehicle-destinations-error" message={destinationError} />
            </fieldset>

            <div className="flex flex-col gap-1 sm:col-span-2">
              <label htmlFor="vehicle-activity" className={LABEL}>
                Keterangan Kegiatan<RequiredMark />
              </label>
              <input
                type="text"
                placeholder="Contoh: Kunjungan studi"
                {...field("activity", errors.activity?.message)}
                {...register("activity")}
              />
              <FieldError
                id="vehicle-activity-error"
                message={errors.activity?.message}
              />
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-2">
          {withLetter ? (
            <LetterPanel
              file={letter ?? null}
              onChange={(file) =>
                setValue("letter", file, { shouldValidate: true })
              }
              error={errors.letter?.message}
              onReview={() => void flow.openSummary([...DETAIL_FIELDS])}
            />
          ) : (
            <ReviewButton
              onReview={() => void flow.openSummary([...DETAIL_FIELDS])}
            />
          )}
        </div>

        <ReservationSubmitDialog
          open={flow.dialogOpen}
          onClose={flow.close}
          title="Informasi Reservasi"
          subject="Reservasi kendaraan"
          approver={null}
          submitting={formState.isSubmitting}
          onSubmit={flow.submit}
          result={flow.result}
          links={links}
          onCreateAnother={flow.createAnother}
          withLetter={withLetter}
          withDraft={withDraft}
          submittedText={submittedText}
        >
          <dl className="flex flex-col gap-3 py-2">
            <SummaryRow label={requesterLabel}>{requester.name}</SummaryRow>
            {askPhone && <SummaryRow label="No HP">{phone}</SummaryRow>}
            <SummaryRow label="Tanggal">
              {formatDayRangeShortWIB(wibToIso(startDate, "12:00"), wibToIso(endDate, "12:00"))}
            </SummaryRow>
            {(tripKind === "menginap" || tripKind === "antar_jemput") && (
              <SummaryRow label="Perjalanan">{TRIP_KIND_LABEL[tripKind]}</SummaryRow>
            )}
            <SummaryRow label="Peserta">{String(participants)} orang</SummaryRow>
            {chosen && (
              <SummaryRow label="Kendaraan">
                {chosen.vehicle.name}, {String(units)} unit
              </SummaryRow>
            )}
            <SummaryRow label="Tujuan">{destinationNames.join(", ")}</SummaryRow>
            <SummaryRow label="Kegiatan">{activity}</SummaryRow>
          </dl>
        </ReservationSubmitDialog>
      </form>
    </FormProvider>
  );
}
