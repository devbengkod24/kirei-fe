"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { CAPS_LABEL_CLASS, INPUT_CLASS, SelectInput } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { RequiredMark } from "@/shared/reservation-form/summaryParts";
import { assignVehicleCrew, type VehicleAssignment } from "@/shared/reservation-store/reservationStore";
import { useMockReservations } from "@/shared/reservation-store/useMockReservations";
import type { ReservationRequest } from "@/types/reservation";
import type { Staff } from "@/types/staff";

export interface VehicleCrewPanelProps {
  reservation: ReservationRequest;
  /** Drivers and co-drivers the admin can pick from. */
  staff: Staff[];
}

const money = z.coerce
  .number({ message: "Isi dengan angka." })
  .int("Isi dalam rupiah tanpa koma.")
  .min(0, "Tidak boleh kurang dari 0.");

const crewSchema = z.object({
  driverId: z.string().min(1, "Pilih sopir."),
  coDriverId: z.string(),
  travelAllowance: money,
  fuelAndToll: money,
  driverFee: money,
});

type CrewInput = z.input<typeof crewSchema>;
type CrewValues = z.output<typeof crewSchema>;

const COSTS = [
  { name: "travelAllowance", label: "Uang jalan" },
  { name: "fuelAndToll", label: "BBM dan tol" },
  { name: "driverFee", label: "Honor sopir" },
] as const;

const rupiah = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 });

const toInput = (assignment: VehicleAssignment | undefined): CrewInput => ({
  driverId: assignment?.driverId ?? "",
  coDriverId: assignment?.coDriverId ?? "",
  travelAllowance: String(assignment?.travelAllowance ?? 0),
  fuelAndToll: String(assignment?.fuelAndToll ?? 0),
  driverFee: String(assignment?.driverFee ?? 0),
});

/** Sopir and Uang cards beside a vehicle request: the admin picks the drivers and sets the trip costs. */
export function VehicleCrewPanel({ reservation, staff }: VehicleCrewPanelProps) {
  const store = useMockReservations();
  const stored = store.assignments?.[reservation.id];
  const values = useMemo(() => toInput(stored), [stored]);
  const form = useForm<CrewInput, unknown, CrewValues>({
    resolver: zodResolver(crewSchema),
    // the store is read after mount, so the saved values arrive after the first render
    values,
  });
  const { register, handleSubmit, control, formState } = form;
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const costs = useWatch({ control, name: ["travelAllowance", "fuelAndToll", "driverFee"] });
  const total = costs.reduce<number>((sum, value) => {
    const amount = Number(value);
    return Number.isFinite(amount) && amount > 0 ? sum + amount : sum;
  }, 0);

  // An inactive driver is not offered again, but stays listed where this trip already has them.
  const offered = (role: Staff["role"], assigned: string) =>
    staff.filter((member) => member.role === role && (member.isActive || member.id === assigned));
  const drivers = offered("sopir", values.driverId);
  const coDrivers = offered("co_sopir", values.coDriverId);
  // the licence class tells the admin who may drive this vehicle
  const label = (member: Staff) =>
    `${member.name}${member.licenseClass ? ` · SIM ${member.licenseClass}` : ""}${member.isActive ? "" : " (tidak aktif)"}`;
  const fieldId = (name: string) => `crew-${reservation.id}-${name}`;

  const save = handleSubmit((crew) => {
    // TODO: PUT the drivers and costs through the orval client. Until then the demo store keeps them.
    const saved = assignVehicleCrew(reservation.id, {
      ...crew,
      driverId: crew.driverId || null,
      coDriverId: crew.coDriverId || null,
    });
    setNotice(
      saved
        ? { ok: true, text: "Sopir dan biaya tersimpan." }
        : { ok: false, text: "Browser ini tidak bisa menyimpan data simulasi. Coba browser lain atau matikan mode privat." },
    );
  });

  return (
    <form noValidate onSubmit={save} className="flex flex-col gap-3">
      <Card as="section" aria-labelledby={fieldId("driver-title")} className="flex flex-col gap-3 p-3">
        <h3 id={fieldId("driver-title")} className="text-sm font-semibold">
          Sopir
        </h3>
        <div className="flex flex-col gap-1">
          <label htmlFor={fieldId("driver")} className={CAPS_LABEL_CLASS}>
            Sopir utama
            <RequiredMark />
          </label>
          <SelectInput
            id={fieldId("driver")}
            aria-invalid={formState.errors.driverId ? true : undefined}
            aria-describedby={formState.errors.driverId ? `${fieldId("driver")}-error` : undefined}
            {...register("driverId")}
          >
            <option value="">Belum dipilih</option>
            {drivers.map((member) => (
              <option key={member.id} value={member.id}>
                {label(member)}
              </option>
            ))}
          </SelectInput>
          {formState.errors.driverId && (
            <p id={`${fieldId("driver")}-error`} className="text-[11px] text-danger">
              {formState.errors.driverId.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor={fieldId("co-driver")} className={CAPS_LABEL_CLASS}>
            Kenek
          </label>
          <SelectInput id={fieldId("co-driver")} {...register("coDriverId")}>
            <option value="">Tanpa kenek</option>
            {coDrivers.map((member) => (
              <option key={member.id} value={member.id}>
                {label(member)}
              </option>
            ))}
          </SelectInput>
        </div>
      </Card>

      <Card as="section" aria-labelledby={fieldId("cost-title")} className="flex flex-col gap-3 p-3">
        <h3 id={fieldId("cost-title")} className="text-sm font-semibold">
          Uang
        </h3>
        {COSTS.map(({ name, label }) => {
          const error = formState.errors[name]?.message;
          return (
            <div key={name} className="flex flex-col gap-1">
              <label htmlFor={fieldId(name)} className={CAPS_LABEL_CLASS}>
                {label} (Rp)
              </label>
              <input
                id={fieldId(name)}
                type="number"
                inputMode="numeric"
                min={0}
                step={1000}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${fieldId(name)}-error` : undefined}
                className={INPUT_CLASS}
                {...register(name)}
              />
              {error && (
                <p id={`${fieldId(name)}-error`} className="text-[11px] text-danger">
                  {error}
                </p>
              )}
            </div>
          );
        })}
        <p className="flex items-center justify-between border-t border-border pt-2 text-sm font-semibold">
          <span>Total</span>
          <span>{rupiah.format(total)}</span>
        </p>
        <Button type="submit" variant="primary-outline">
          Simpan
        </Button>
        {notice && (
          <p role="status" className={`text-xs ${notice.ok ? "text-success" : "text-danger"}`}>
            {notice.text}
          </p>
        )}
      </Card>
    </form>
  );
}
