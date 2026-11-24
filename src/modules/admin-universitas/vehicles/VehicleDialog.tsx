"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Field, INPUT_CLASS } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { Vehicle } from "@/types/facility";
import { createVehicleSchema, type VehicleInput, type VehicleValues } from "./vehicleSchema";

export interface VehicleDialogProps {
  /** The vehicle type being edited; null to add a new one. */
  vehicle: Vehicle | null;
  /** Every vehicle type in the list, to catch a name already in use. */
  existing: Vehicle[];
  /** Units of this type borrowed today; the rest are available. */
  inUse: number;
  onClose: () => void;
  onSave: (values: VehicleValues) => void;
}

const toInput = (vehicle: Vehicle | null): VehicleInput =>
  vehicle
    ? {
        name: vehicle.name,
        isActive: vehicle.isActive,
        minPassengers: vehicle.minPassengers ?? 1,
        capacity: vehicle.capacity,
        unitCount: vehicle.unitCount,
      }
    : { name: "", isActive: true, minPassengers: 3, capacity: 7, unitCount: 1 };

/** Number input with its unit ("orang", "kursi", "unit") inside the right edge. */
function UnitInput({ unit, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { unit: string }) {
  return (
    <div className="relative">
      <input type="number" inputMode="numeric" min={0} step={1} {...props} className={`${INPUT_CLASS} pr-16 tabular-nums`} />
      <span aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted">
        {unit}
      </span>
    </div>
  );
}

/** Add a vehicle type, or change one: name, passenger rule, units, and whether it can be borrowed. */
export function VehicleDialog({ vehicle, existing, inUse, onClose, onSave }: VehicleDialogProps) {
  const schema = useMemo(() => createVehicleSchema(existing, vehicle?.id ?? null, inUse), [existing, vehicle, inUse]);
  const form = useForm<VehicleInput, unknown, VehicleValues>({
    resolver: zodResolver(schema),
    defaultValues: toInput(vehicle),
    mode: "onTouched",
  });
  const { errors } = form.formState;
  const described = (field: keyof VehicleInput) =>
    errors[field] ? { "aria-invalid": true, "aria-describedby": `vehicle-${field}-error` } : {};
  const number = (field: "minPassengers" | "capacity" | "unitCount") => ({
    // Changing the seats re-checks the minimum, so a minimum above the new capacity shows its error at once.
    ...form.register(field, { valueAsNumber: true, deps: field === "capacity" ? ["minPassengers"] : undefined }),
    ...described(field),
  });

  const [minPassengers, capacity, unitCount] = useWatch({ control: form.control, name: ["minPassengers", "capacity", "unitCount"] });
  const ruleValid =
    Number.isInteger(minPassengers) && Number.isInteger(capacity) && minPassengers > 0 && minPassengers <= capacity;
  const available = Number.isInteger(unitCount) ? Math.max(0, unitCount - inUse) : null;

  return (
    <Modal
      open
      onClose={onClose}
      size="medium"
      title={vehicle ? "Detail Jenis Kendaraan" : "Tambah Jenis Kendaraan"}
      footer={
        <>
          <Button variant="danger-outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" form="vehicle-form">
            Simpan Pengaturan
          </Button>
        </>
      }
    >
      {/* TODO: POST or PATCH through the orval client and map 422 errors with lib/api/form-errors. */}
      <form id="vehicle-form" onSubmit={form.handleSubmit(onSave)} noValidate className="flex flex-col gap-3">
        <p className="text-sm text-muted">
          {vehicle ? "Ubah tipe armada beserta syarat penumpang dan kuota unit." : "Tambahkan tipe armada baru beserta syarat penumpang dan kuota unit."}
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Nama jenis kendaraan" htmlFor="vehicle-name" error={errors.name?.message}>
            <input id="vehicle-name" placeholder="Contoh: Toyota Hiace Premio" {...form.register("name")} {...described("name")} className={INPUT_CLASS} />
          </Field>
          <Controller
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <Field label="Status peminjaman" htmlFor="vehicle-isActive">
                <div className="flex min-h-11 items-center justify-between gap-3 rounded-md border border-border bg-surface px-3">
                  <span className={`text-sm font-medium ${field.value ? "text-success" : "text-muted"}`}>
                    {field.value ? "Aktif (dibuka)" : "Nonaktif (ditutup)"}
                  </span>
                  <button
                    id="vehicle-isActive"
                    type="button"
                    role="switch"
                    aria-checked={field.value}
                    onClick={() => field.onChange(!field.value)}
                    className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${field.value ? "bg-success" : "bg-border"}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`size-5 rounded-full bg-surface shadow-sm transition-transform ${field.value ? "translate-x-5.5" : "translate-x-0.5"}`}
                    />
                  </button>
                </div>
              </Field>
            )}
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Total unit dimiliki" htmlFor="vehicle-unitCount" error={errors.unitCount?.message}>
            <UnitInput id="vehicle-unitCount" unit="unit" min={1} {...number("unitCount")} />
          </Field>
          <Field label="Unit tersedia hari ini" htmlFor="vehicle-available">
            <output
              id="vehicle-available"
              aria-live="polite"
              className="flex min-h-11 items-center justify-between gap-2 rounded-md border border-border bg-page px-3 text-sm tabular-nums"
            >
              {available === null ? "-" : `${available} unit`}
              <span className="text-xs text-muted">{inUse > 0 ? `${inUse} sedang dipinjam` : "Tidak ada yang dipinjam"}</span>
            </output>
          </Field>
        </div>

        <div role="group" aria-labelledby="vehicle-rule-title" className="flex flex-col gap-3 rounded-md border border-border bg-page p-3">
          <p id="vehicle-rule-title" className="text-sm font-semibold">
            Aturan jumlah penumpang
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Minimal penumpang" htmlFor="vehicle-minPassengers" error={errors.minPassengers?.message}>
              <UnitInput
                id="vehicle-minPassengers"
                unit="orang"
                min={1}
                max={Number.isInteger(capacity) ? capacity : undefined}
                {...number("minPassengers")}
              />
            </Field>
            <Field label="Kapasitas maksimal kursi" htmlFor="vehicle-capacity" error={errors.capacity?.message}>
              <UnitInput id="vehicle-capacity" unit="kursi" min={2} {...number("capacity")} />
            </Field>
          </div>
          <p className="text-xs text-muted">
            {ruleValid
              ? `Peminjam wajib mengisi minimal ${minPassengers} penumpang dari kapasitas ${capacity} kursi.`
              : "Minimal penumpang harus diisi dan tidak boleh melebihi kapasitas kursi."}
          </p>
        </div>
      </form>
    </Modal>
  );
}
