"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { Card } from "@/components/ui/Card";
import { formatFullDateWIB, toWibDateKey, wibToIso } from "@/lib/date";
import { toVehicleReservationRequest } from "./createReservation";
import type { Vehicle } from "@/types/facility";
import { BOOKING_MODES, type BookingMode } from "./bookingMode";
import { LetterPanel, ReviewButton } from "./LetterPanel";
import { PanelHeading } from "./PanelHeading";
import { ReservationSubmitDialog, type ReservationLinks } from "./ReservationSubmitDialog";
import {
  VEHICLE_RESERVATION_FIELD_MAP,
  createVehicleReservationSchema,
  type VehicleReservationInput,
  type VehicleReservationValues,
} from "./schema";
import { FieldError, SummaryRow } from "./summaryParts";
import { useReservationSubmit } from "./useReservationSubmit";

export interface VehicleReservationFormProps {
  /** ISO 8601 server time */
  now: string;
  requester: { name: string };
  /** "internal" for an admin's own booking: no phone or letter, and the admin picks the vehicle. */
  mode?: BookingMode;
  /** Vehicles to pick from in "internal" mode. Borrowers leave the choice to the approving admin. */
  vehicles?: Vehicle[];
  links: ReservationLinks;
}

const DETAIL_FIELDS = ["phone", "vehicleId", "destination", "participants", "activity", "startDate", "endDate"] as const;

const LABEL = "text-[10px] font-medium tracking-wide text-plan-selected";
const INPUT = "min-h-11 w-full rounded-md border border-border bg-surface px-2 text-xs aria-invalid:border-danger-strong";

const dayLabel = (dateKey: string) => formatFullDateWIB(wibToIso(dateKey, "12:00"));

export function VehicleReservationForm({ now, requester, mode = "request", vehicles = [], links }: VehicleReservationFormProps) {
  const { askPhone, withLetter, requesterLabel, submittedText } = BOOKING_MODES[mode];
  const pickVehicle = mode === "internal";
  const todayKey = toWibDateKey(new Date(now));
  const schema = useMemo(() => createVehicleReservationSchema(() => todayKey, mode), [todayKey, mode]);
  const defaults = useMemo(
    (): VehicleReservationInput => ({
      phone: "",
      vehicleId: "",
      destination: "",
      participants: "",
      activity: "",
      startDate: todayKey,
      endDate: todayKey,
      letter: null,
      intent: "submit",
    }),
    [todayKey],
  );

  const form = useForm<VehicleReservationInput, unknown, VehicleReservationValues>({
    resolver: zodResolver(schema),
    defaultValues: defaults,
    mode: "onTouched",
  });
  const { register, setValue, control, formState } = form;
  const { errors } = formState;
  const [phone, vehicleId, destination, participants, activity, startDate, endDate, letter] = useWatch({
    control,
    name: ["phone", "vehicleId", "destination", "participants", "activity", "startDate", "endDate", "letter"],
  });
  const vehicle = vehicles.find((item) => item.id === vehicleId);

  const flow = useReservationSubmit(form, {
    defaults,
    toRequest: toVehicleReservationRequest,
    fieldMap: VEHICLE_RESERVATION_FIELD_MAP,
  });

  const field = (id: string, error?: string) => ({
    id: `vehicle-${id}`,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? `vehicle-${id}-error` : undefined,
    className: INPUT,
  });

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={(event) => event.preventDefault()} className="mx-auto flex w-full max-w-[34rem] flex-col gap-2">
        <Card as="section" aria-labelledby="panel-borrower-data" className="flex flex-col gap-3 p-3">
          <PanelHeading id="panel-borrower-data" iconSrc="/icons/notes.svg" iconWidth={11} iconHeight={12}>
            Data {requesterLabel}
          </PanelHeading>
          <div className="grid gap-x-3 gap-y-3 sm:grid-cols-2">
            <div className={`flex flex-col gap-1 ${askPhone ? "" : "sm:col-span-2"}`}>
              <p className={LABEL}>Nama {requesterLabel}</p>
              <p className="flex min-h-11 items-center rounded-md border border-border bg-page px-2 text-xs">{requester.name}</p>
            </div>
            {askPhone && (
              <div className="flex flex-col gap-1">
                <label htmlFor="vehicle-phone" className={LABEL}>
                  No HP
                </label>
                <input type="tel" inputMode="tel" autoComplete="tel" placeholder="081234567890" {...field("phone", errors.phone?.message)} {...register("phone")} />
                <FieldError id="vehicle-phone-error" message={errors.phone?.message} />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <label htmlFor="vehicle-destination" className={LABEL}>
                Tujuan
              </label>
              <input type="text" placeholder="Contoh: Semarang Barat" {...field("destination", errors.destination?.message)} {...register("destination")} />
              <FieldError id="vehicle-destination-error" message={errors.destination?.message} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="vehicle-participants" className={LABEL}>
                Jumlah Peserta
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
              <FieldError id="vehicle-participants-error" message={errors.participants?.message} />
            </div>
            <div className="flex flex-col gap-1 sm:col-span-2">
              <label htmlFor="vehicle-activity" className={LABEL}>
                Keterangan Kegiatan
              </label>
              <input type="text" placeholder="Contoh: Kunjungan studi" {...field("activity", errors.activity?.message)} {...register("activity")} />
              <FieldError id="vehicle-activity-error" message={errors.activity?.message} />
            </div>
          </div>
        </Card>

        <Card as="section" aria-labelledby="panel-vehicle-dates" className="flex flex-col gap-2 p-3">
          <PanelHeading id="panel-vehicle-dates" iconSrc="/icons/calendar-outline.svg">
            Tanggal Reservasi
          </PanelHeading>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="vehicle-startDate" className={`${LABEL} text-center`}>
                Mulai
              </label>
              <input type="date" min={todayKey} {...field("startDate", errors.startDate?.message)} {...register("startDate", { deps: ["endDate"] })} />
              <FieldError id="vehicle-startDate-error" message={errors.startDate?.message} />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="vehicle-endDate" className={`${LABEL} text-center`}>
                Selesai
              </label>
              <input type="date" min={startDate || todayKey} {...field("endDate", errors.endDate?.message)} {...register("endDate", { deps: ["startDate"] })} />
              <FieldError id="vehicle-endDate-error" message={errors.endDate?.message} />
            </div>
          </div>
          {!pickVehicle && <p className="text-[11px] text-muted">Kendaraan yang dipakai ditentukan admin saat menyetujui reservasi.</p>}
        </Card>

        {pickVehicle && (
          <Card as="section" aria-labelledby="panel-vehicle-choice" className="flex flex-col gap-2 p-3">
            <PanelHeading id="panel-vehicle-choice" iconSrc="/icons/notes.svg" iconWidth={11} iconHeight={12}>
              Kendaraan
            </PanelHeading>
            {vehicles.length === 0 ? (
              <p className="text-xs text-muted">Belum ada kendaraan yang aktif.</p>
            ) : (
              <fieldset aria-describedby={errors.vehicleId ? "vehicle-vehicleId-error" : undefined}>
                <legend className="sr-only">Pilih kendaraan</legend>
                <div className="grid gap-2 sm:grid-cols-2">
                  {vehicles.map((item) => (
                    <label
                      key={item.id}
                      className="flex min-h-11 cursor-pointer items-center gap-2 rounded-md border border-border px-3 py-2 text-xs hover:bg-primary-soft has-[:checked]:border-primary has-[:checked]:bg-primary-soft has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-border-focus"
                    >
                      <input type="radio" value={item.id} className="accent-primary" {...register("vehicleId")} />
                      <span className="flex flex-col">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-[11px] text-muted">
                          {item.plateNumber} · {item.capacity} kursi
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}
            <FieldError id="vehicle-vehicleId-error" message={errors.vehicleId?.message} />
          </Card>
        )}

        {withLetter ? (
          <LetterPanel
            file={letter ?? null}
            onChange={(file) => setValue("letter", file, { shouldValidate: true })}
            error={errors.letter?.message}
            onReview={() => void flow.openSummary([...DETAIL_FIELDS])}
          />
        ) : (
          <ReviewButton onReview={() => void flow.openSummary([...DETAIL_FIELDS])} />
        )}

        <ReservationSubmitDialog
          open={flow.dialogOpen}
          onClose={flow.close}
          title="Informasi Reservasi"
          subject={`Reservasi kendaraan ke ${destination.trim() || "tujuan"}`}
          approver={null}
          submitting={formState.isSubmitting}
          onSubmit={flow.submit}
          result={flow.result}
          links={links}
          onCreateAnother={flow.createAnother}
          withLetter={withLetter}
          submittedText={submittedText}
        >
          <dl className="flex flex-col gap-3 py-2">
            <SummaryRow label={requesterLabel}>{requester.name}</SummaryRow>
            {askPhone && <SummaryRow label="No HP">{phone}</SummaryRow>}
            {vehicle && (
              <SummaryRow label="Kendaraan">
                {vehicle.name} ({vehicle.plateNumber})
              </SummaryRow>
            )}
            <SummaryRow label="Tujuan">
              {destination}, {String(participants)} peserta
            </SummaryRow>
            <SummaryRow label="Kegiatan">{activity}</SummaryRow>
            <SummaryRow label="Tanggal">
              {startDate === endDate ? dayLabel(startDate) : `${dayLabel(startDate)} sampai ${dayLabel(endDate)}`}
            </SummaryRow>
          </dl>
        </ReservationSubmitDialog>
      </form>
    </FormProvider>
  );
}
