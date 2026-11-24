"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { RadioRow } from "@/components/form/ChoiceGroups";
import { Field, INPUT_CLASS, SelectInput } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { LICENSE_CLASSES, type Staff, type StaffRole } from "@/types/staff";
import { STAFF_ROLE_LABEL, createStaffSchema, type StaffInput, type StaffValues } from "./staffSchema";

export interface StaffDialogProps {
  /** The driver being edited; null to add a new one. */
  staff: Staff | null;
  onClose: () => void;
  onSave: (values: StaffValues) => void;
}

const ROLES = Object.keys(STAFF_ROLE_LABEL) as StaffRole[];

const toInput = (staff: Staff | null): StaffInput =>
  staff
    ? { name: staff.name, phone: staff.phone, licenseClass: staff.licenseClass, role: staff.role, isActive: staff.isActive }
    : { name: "", phone: "", licenseClass: "", role: "", isActive: true };

/** Add a driver, or change one: details, licence, type, and whether they still drive. */
export function StaffDialog({ staff, onClose, onSave }: StaffDialogProps) {
  const schema = useMemo(() => createStaffSchema(), []);
  const form = useForm<StaffInput, unknown, StaffValues>({ resolver: zodResolver(schema), defaultValues: toInput(staff) });
  const { errors } = form.formState;
  const described = (field: keyof StaffInput) =>
    errors[field] ? { "aria-invalid": true, "aria-describedby": `staff-${field}-error` } : {};

  return (
    <Modal
      open
      onClose={onClose}
      title={staff ? "Detail Staf" : "Tambah Staf"}
      footer={
        <>
          <Button variant="danger-outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" form="staff-form">
            {staff ? "Simpan" : "Tambah"}
          </Button>
        </>
      }
    >
      {/* TODO: POST or PATCH through the orval client and map 422 errors with lib/api/form-errors. */}
      <form id="staff-form" onSubmit={form.handleSubmit(onSave)} noValidate className="flex flex-col gap-3">
        <Field label="Nama" htmlFor="staff-name" error={errors.name?.message}>
          <input id="staff-name" placeholder="Contoh: Slamet Riyadi" {...form.register("name")} {...described("name")} className={INPUT_CLASS} />
        </Field>
        <Field label="No telp" htmlFor="staff-phone" error={errors.phone?.message}>
          <input
            id="staff-phone"
            type="tel"
            inputMode="tel"
            placeholder="081234567890"
            {...form.register("phone")}
            {...described("phone")}
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="Golongan SIM" htmlFor="staff-licenseClass" error={errors.licenseClass?.message}>
          <SelectInput id="staff-licenseClass" {...form.register("licenseClass")} {...described("licenseClass")}>
            <option value="" disabled>
              Pilih golongan SIM
            </option>
            {LICENSE_CLASSES.map((licenseClass) => (
              <option key={licenseClass} value={licenseClass}>
                SIM {licenseClass}
              </option>
            ))}
          </SelectInput>
        </Field>
        <Field label="Tipe" htmlFor="staff-role" error={errors.role?.message}>
          <SelectInput id="staff-role" {...form.register("role")} {...described("role")}>
            <option value="" disabled>
              Pilih tipe
            </option>
            {ROLES.map((role) => (
              <option key={role} value={role}>
                {STAFF_ROLE_LABEL[role]}
              </option>
            ))}
          </SelectInput>
        </Field>
        {/* A new driver starts active; only an existing one can be switched off. */}
        {staff && (
          <Controller
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <RadioRow
                legend="Status"
                name="staff-status"
                options={[
                  { value: "aktif", label: "Aktif" },
                  { value: "tidak_aktif", label: "Tidak aktif" },
                ]}
                value={field.value ? "aktif" : "tidak_aktif"}
                onChange={(value) => field.onChange(value === "aktif")}
              />
            )}
          />
        )}
      </form>
    </Modal>
  );
}
