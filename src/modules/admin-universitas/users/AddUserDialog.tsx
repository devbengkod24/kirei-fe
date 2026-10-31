"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { Field, INPUT_CLASS, SelectInput } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PasswordField } from "@/shared/profile/PasswordField";
import type { Fakultas } from "@/types/fakultas";
import type { Building } from "@/types/facility";
import type { ManagedRole, ManagedUser } from "@/types/managedUser";
import { createUserSchema, type NewUserInput, type NewUserValues } from "./userSchema";
import { USER_TABS } from "./userTabs";

export interface AddUserDialogProps {
  role: ManagedRole;
  /** Accounts already in the list, to catch a duplicate email before sending. */
  existing: ManagedUser[];
  /** For dosen and admin fakultas. */
  fakultasOptions: Fakultas[];
  /** For operators, who look after one floor. */
  buildings: Building[];
  onClose: () => void;
  onAdd: (values: NewUserValues) => void;
}

const DEFAULTS: NewUserInput = { name: "", email: "", fakultas: "", npp: "", buildingId: "", floorId: "", password: "", confirmation: "" };

export function AddUserDialog({ role, existing, fakultasOptions, buildings, onClose, onAdd }: AddUserDialogProps) {
  const schema = useMemo(() => createUserSchema(role, existing, buildings), [role, existing, buildings]);
  const form = useForm<NewUserInput, unknown, NewUserValues>({ resolver: zodResolver(schema), defaultValues: DEFAULTS });
  const { errors } = form.formState;
  const buildingId = useWatch({ control: form.control, name: "buildingId" });
  const tab = USER_TABS[role];
  const floors = buildings.find((building) => building.id === buildingId)?.floors ?? [];

  const described = (field: keyof NewUserInput) =>
    errors[field] ? { "aria-invalid": true, "aria-describedby": `add-user-${field}-error` } : {};

  return (
    <Modal
      open
      onClose={onClose}
      title={`Tambah ${tab.label}`}
      footer={
        <>
          <Button variant="danger-outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" form="add-user-form">
            Tambah
          </Button>
        </>
      }
    >
      {/* TODO: POST through the orval client and map 422 errors with lib/api/form-errors. */}
      <form id="add-user-form" onSubmit={form.handleSubmit(onAdd)} noValidate className="flex flex-col gap-3">
        <Field label={`Nama ${tab.label.toLowerCase()}`} htmlFor="add-user-name" error={errors.name?.message}>
          <input id="add-user-name" placeholder={tab.namePlaceholder} {...form.register("name")} {...described("name")} className={INPUT_CLASS} />
        </Field>
        <Field label="Email" htmlFor="add-user-email" error={errors.email?.message}>
          <input
            id="add-user-email"
            type="email"
            inputMode="email"
            autoComplete="off"
            placeholder={tab.emailPlaceholder}
            {...form.register("email")}
            {...described("email")}
            className={INPUT_CLASS}
          />
        </Field>
        {tab.fields.npp && (
          <Field label="NPP" htmlFor="add-user-npp" error={errors.npp?.message}>
            <input id="add-user-npp" inputMode="numeric" placeholder="Contoh: 19820411" {...form.register("npp")} {...described("npp")} className={INPUT_CLASS} />
          </Field>
        )}
        {tab.fields.fakultas && (
          <Field label="Fakultas" htmlFor="add-user-fakultas" error={errors.fakultas?.message}>
            <SelectInput id="add-user-fakultas" {...form.register("fakultas")} {...described("fakultas")}>
              <option value="" disabled>
                Pilih fakultas
              </option>
              {fakultasOptions.map((fakultas) => (
                <option key={fakultas.id} value={fakultas.id}>
                  {fakultas.name}
                </option>
              ))}
            </SelectInput>
          </Field>
        )}
        {tab.fields.floor && (
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Gedung" htmlFor="add-user-buildingId" error={errors.buildingId?.message}>
              <SelectInput
                id="add-user-buildingId"
                {...form.register("buildingId", {
                  // A floor of the previous building no longer applies.
                  onChange: () => form.setValue("floorId", ""),
                })}
                {...described("buildingId")}
              >
                <option value="" disabled>
                  Pilih gedung
                </option>
                {buildings.map((building) => (
                  <option key={building.id} value={building.id}>
                    {building.name}
                  </option>
                ))}
              </SelectInput>
            </Field>
            <Field label="Lantai" htmlFor="add-user-floorId" error={errors.floorId?.message}>
              <SelectInput id="add-user-floorId" disabled={floors.length === 0} {...form.register("floorId")} {...described("floorId")}>
                <option value="" disabled>
                  {buildingId ? "Pilih lantai" : "Pilih gedung dulu"}
                </option>
                {floors.map((floor) => (
                  <option key={floor.id} value={floor.id}>
                    Lantai {floor.number}
                  </option>
                ))}
              </SelectInput>
            </Field>
          </div>
        )}
        <Controller
          control={form.control}
          name="password"
          render={({ field }) => (
            <PasswordField
              id="add-user-password"
              label="Kata sandi"
              labelStyle="plain"
              placeholder="Minimal 8 karakter"
              value={field.value}
              onChange={field.onChange}
              error={errors.password?.message}
              autoComplete="new-password"
            />
          )}
        />
        <Controller
          control={form.control}
          name="confirmation"
          render={({ field }) => (
            <PasswordField
              id="add-user-confirmation"
              label="Konfirmasi kata sandi"
              labelStyle="plain"
              placeholder="Ulangi kata sandi"
              value={field.value}
              onChange={field.onChange}
              error={errors.confirmation?.message}
              autoComplete="new-password"
            />
          )}
        />
        <p className="text-[11px] text-muted">Sampaikan kata sandi ini ke pemilik akun lewat jalur yang aman.</p>
      </form>
    </Modal>
  );
}
