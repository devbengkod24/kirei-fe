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
  /** When true, renders a single read-only card displaying assigned crew and budget history instead of editable inputs. */
  readOnly?: boolean;
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

const staffLabel = (member: Staff) =>
  `${member.name}${member.licenseClass ? ` · SIM ${member.licenseClass}` : ""}${member.isActive ? "" : " (tidak aktif)"}`;

/** Read-only history card combining Sopir and Anggaran into a single section for the Riwayat tab. */
function VehicleCrewHistoryCard({ reservation, staff }: { reservation: ReservationRequest; staff: Staff[] }) {
  const store = useMockReservations();
  const stored = store.assignments?.[reservation.id];
  const driver = staff.find((member) => member.id === stored?.driverId);
  const coDriver = staff.find((member) => member.id === stored?.coDriverId);
  const travelAllowance = stored?.travelAllowance ?? 0;
  const fuelAndToll = stored?.fuelAndToll ?? 0;
  const driverFee = stored?.driverFee ?? 0;
  const total = travelAllowance + fuelAndToll + driverFee;
  const fieldId = (name: string) => `crew-history-${reservation.id}-${name}`;

  return (
    <Card as="section" aria-labelledby={fieldId("title")} className="flex flex-col gap-3 p-3">
      <h3 id={fieldId("title")} className="text-sm font-semibold">
        Sopir & Anggaran
      </h3>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-0.5">
          <span className={CAPS_LABEL_CLASS}>Sopir utama</span>
          <p className="text-xs font-medium text-ink">{driver ? staffLabel(driver) : "-"}</p>
          {driver?.phone && (
            <p className="text-[11px] text-muted">
              No HP:{" "}
              <a href={`tel:${driver.phone}`} className="font-medium text-primary hover:underline">
                {driver.phone}
              </a>
            </p>
          )}
        </div>

        <div className="flex flex-col gap-0.5">
          <span className={CAPS_LABEL_CLASS}>Kenek</span>
          <p className="text-xs font-medium text-ink">{coDriver ? staffLabel(coDriver) : "Tanpa kenek"}</p>
          {coDriver?.phone && (
            <p className="text-[11px] text-muted">
              No HP:{" "}
              <a href={`tel:${coDriver.phone}`} className="font-medium text-primary hover:underline">
                {coDriver.phone}
              </a>
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-3">
        <span className={CAPS_LABEL_CLASS}>Rincian anggaran</span>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted">Uang jalan</span>
          <span className="font-medium text-ink">{rupiah.format(travelAllowance)}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted">BBM dan tol</span>
          <span className="font-medium text-ink">{rupiah.format(fuelAndToll)}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted">Honor sopir</span>
          <span className="font-medium text-ink">{rupiah.format(driverFee)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-2 text-sm font-semibold">
          <span>Total</span>
          <span className="text-primary font-semibold">{rupiah.format(total)}</span>
        </div>
      </div>
    </Card>
  );
}

/** Form for picking drivers and setting trip costs during reservation approval. */
function VehicleCrewForm({ reservation, staff }: { reservation: ReservationRequest; staff: Staff[] }) {
  const store = useMockReservations();
  const stored = store.assignments?.[reservation.id];
  const values = useMemo(() => toInput(stored), [stored]);
  const form = useForm<CrewInput, unknown, CrewValues>({
    resolver: zodResolver(crewSchema),
    values,
  });
  const { register, handleSubmit, control, formState } = form;
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const costs = useWatch({ control, name: ["travelAllowance", "fuelAndToll", "driverFee"] });
  const total = costs.reduce<number>((sum, value) => {
    const amount = Number(value);
    return Number.isFinite(amount) && amount > 0 ? sum + amount : sum;
  }, 0);

  const offered = (role: Staff["role"], assigned: string) =>
    staff.filter((member) => member.role === role && (member.isActive || member.id === assigned));
  const drivers = offered("sopir", values.driverId);
  const coDrivers = offered("co_sopir", values.coDriverId);
  const fieldId = (name: string) => `crew-${reservation.id}-${name}`;

  const save = handleSubmit((crew) => {
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
                {staffLabel(member)}
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
                {staffLabel(member)}
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

/**
 * Sopir and Uang panel beside a vehicle request.
 * When `readOnly` is true (Riwayat tab), renders a single combined history card.
 * When `readOnly` is false (approval flow), renders editable forms for picking drivers and trip costs.
 */
export function VehicleCrewPanel({ reservation, staff, readOnly = false }: VehicleCrewPanelProps) {
  if (readOnly) {
    return <VehicleCrewHistoryCard reservation={reservation} staff={staff} />;
  }
  return <VehicleCrewForm reservation={reservation} staff={staff} />;
}
