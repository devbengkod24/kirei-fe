"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { Field, INPUT_CLASS, SelectInput } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PasswordField } from "@/shared/profile/PasswordField";
import type { Fakultas } from "@/types/fakultas";
import type { ManagedRole, ManagedUser } from "@/types/managedUser";
import { createUserSchema, type NewUserInput, type NewUserValues } from "./userSchema";
import { USER_TABS } from "./userTabs";

export interface AddUserDialogProps {
  role: ManagedRole;
  /** Accounts already in the list, to catch a duplicate email before sending. */
  existing: ManagedUser[];
  /** Faculties a dosen can belong to. Ormawa have none. */
  fakultasOptions: Fakultas[];
  onClose: () => void;
  onAdd: (values: NewUserValues) => void;
}

const DEFAULTS: NewUserInput = { name: "", email: "", fakultas: "", npp: "", password: "", confirmation: "" };

export function AddUserDialog({ role, existing, fakultasOptions, onClose, onAdd }: AddUserDialogProps) {
  const schema = useMemo(() => createUserSchema(role, existing), [role, existing]);
  const form = useForm<NewUserInput, unknown, NewUserValues>({ resolver: zodResolver(schema), defaultValues: DEFAULTS });
  const { errors } = form.formState;
  const label = USER_TABS[role].label;
  const isDosen = role === "dosen";

  const described = (field: keyof NewUserInput) =>
    errors[field] ? { "aria-invalid": true, "aria-describedby": `add-user-${field}-error` } : {};

  return (
    <Modal
      open
      onClose={onClose}
      title={`Tambah ${label}`}
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
        <Field label={isDosen ? "Nama dosen" : "Nama ormawa"} htmlFor="add-user-name" error={errors.name?.message}>
          <input
            id="add-user-name"
            placeholder={isDosen ? "Contoh: Dr. Andi Pratama, M.Kom." : "Contoh: UKM Paduan Suara"}
            {...form.register("name")}
            {...described("name")}
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="Email" htmlFor="add-user-email" error={errors.email?.message}>
          <input
            id="add-user-email"
            type="email"
            inputMode="email"
            autoComplete="off"
            placeholder={isDosen ? "nama@dsn.dinus.ac.id" : "nama@dinus.ac.id"}
            {...form.register("email")}
            {...described("email")}
            className={INPUT_CLASS}
          />
        </Field>
        {isDosen && (
          <Field label="NPP" htmlFor="add-user-npp" error={errors.npp?.message}>
            <input id="add-user-npp" inputMode="numeric" placeholder="Contoh: 19820411" {...form.register("npp")} {...described("npp")} className={INPUT_CLASS} />
          </Field>
        )}
        {isDosen && (
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
