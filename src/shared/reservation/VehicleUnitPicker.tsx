"use client";

import type { Vehicle } from "@/types/facility";
import { setAssignedUnits, summarizeAssignment, type VehicleAssignment } from "./vehicleAssignment";

export interface VehicleUnitPickerProps {
  /** Active vehicle kinds to pick units from. */
  vehicles: Vehicle[];
  value: VehicleAssignment;
  onChange: (next: VehicleAssignment) => void;
  /** Riders on the trip; the total warns when the seats fall short. */
  participants?: number;
  /** Prefix for element ids, so two pickers on a page stay apart. */
  idPrefix: string;
  error?: string;
}

const STEP_BUTTON =
  "flex size-11 items-center justify-center rounded-md border border-border bg-surface text-base text-primary hover:bg-primary-soft disabled:cursor-not-allowed disabled:text-muted disabled:hover:bg-surface";

/** Units per vehicle kind with − / + steppers, so a trip can take several vehicles of the same kind. */
export function VehicleUnitPicker({ vehicles, value, onChange, participants = 0, idPrefix, error }: VehicleUnitPickerProps) {
  const summary = summarizeAssignment(value, vehicles);
  const totalId = `${idPrefix}-total`;
  const errorId = `${idPrefix}-error`;

  return (
    <fieldset aria-describedby={error ? `${errorId} ${totalId}` : totalId} className="flex flex-col gap-2">
      <legend className="mb-2 text-xs text-primary">Kendaraan yang dipakai</legend>
      <ul className="flex flex-col gap-2">
        {/* TODO: the API should also say how many units of each kind are still free on the chosen dates. */}
        {vehicles.map((vehicle) => {
          const units = value[vehicle.id] ?? 0;
          return (
            <li
              key={vehicle.id}
              className={`flex items-center gap-2 rounded-md border px-3 py-2 text-xs ${units > 0 ? "border-primary bg-primary-soft" : "border-border"}`}
            >
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="font-medium">{vehicle.name}</span>
                <span className="text-[11px] text-muted">
                  {vehicle.unitCount} unit · {vehicle.capacity} kursi per unit
                </span>
              </span>
              <button
                type="button"
                onClick={() => onChange(setAssignedUnits(value, vehicle, units - 1))}
                disabled={units === 0}
                aria-label={`Kurangi ${vehicle.name}`}
                className={STEP_BUTTON}
              >
                −
              </button>
              <output aria-label={`Jumlah ${vehicle.name}`} className="w-6 text-center text-sm font-semibold tabular-nums">
                {units}
              </output>
              <button
                type="button"
                onClick={() => onChange(setAssignedUnits(value, vehicle, units + 1))}
                disabled={units >= vehicle.unitCount}
                aria-label={`Tambah ${vehicle.name}`}
                className={STEP_BUTTON}
              >
                +
              </button>
            </li>
          );
        })}
      </ul>

      <p id={totalId} aria-live="polite" className="flex flex-wrap justify-between gap-x-3 text-xs">
        <span>
          Total: <span className="font-semibold">{summary.units} kendaraan</span>, {summary.seats} kursi
        </span>
        {summary.units > 0 && summary.seats < participants && (
          <span className="text-warning">Kursi kurang dari {participants} peserta</span>
        )}
      </p>
      {error && (
        <p id={errorId} className="text-[11px] text-danger">
          {error}
        </p>
      )}
    </fieldset>
  );
}
