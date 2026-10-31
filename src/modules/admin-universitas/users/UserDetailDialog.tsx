"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { CAPS_LABEL_CLASS } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { PasswordField } from "@/shared/profile/PasswordField";
import type { ManagedUser } from "@/types/managedUser";
import { passwordResetSchema, type PasswordResetValues } from "./userSchema";
import { USER_TABS } from "./userTabs";

export interface UserDetailChanges {
  isActive: boolean;
  /** Set when the admin gave the account a new password. */
  newPassword: string | null;
}

export interface UserDetailDialogProps {
  user: ManagedUser;
  /** Where the account belongs: a faculty name, or "Gedung H · Lantai 5" for an operator. Ormawa have none. */
  placement?: string;
  onClose: () => void;
  onSave: (changes: UserDetailChanges) => void;
}

const STATUS_OPTIONS = [
  { value: true, label: "Aktif", mark: "✓", activeClass: "bg-surface text-success shadow-sm" },
  { value: false, label: "Tidak Aktif", mark: "✕", activeClass: "bg-surface text-danger shadow-sm" },
] as const;

/**
 * Account details, the active switch, and an optional new password for an owner who lost theirs.
 * An inactive account cannot sign in; it is not a penalty.
 */
export function UserDetailDialog({ user, placement, onClose, onSave }: UserDetailDialogProps) {
  const [isActive, setIsActive] = useState(user.isActive);
  const passwordForm = useForm<PasswordResetValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: { password: "", confirmation: "" },
  });
  const { errors } = passwordForm.formState;
  const [password, confirmation] = useWatch({ control: passwordForm.control, name: ["password", "confirmation"] });
  const roleLabel = USER_TABS[user.role].label;
  const dirty = isActive !== user.isActive || Boolean(password || confirmation);

  // Empty password fields keep the old password; the schema allows that.
  const submit = passwordForm.handleSubmit((values) => onSave({ isActive, newPassword: values.password || null }));

  return (
    <Modal
      open
      onClose={onClose}
      title={USER_TABS[user.role].detailTitle}
      footer={
        <>
          <Button variant="danger-outline" onClick={onClose}>
            Kembali
          </Button>
          <Button type="submit" form="user-detail-form" disabled={!dirty}>
            Simpan
          </Button>
        </>
      }
    >
      <form id="user-detail-form" onSubmit={submit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className={CAPS_LABEL_CLASS}>Data {roleLabel}</p>
          <dl className="flex flex-col gap-1 rounded-xl border border-border px-4 py-3">
            <dt className="sr-only">Nama</dt>
            <dd className="text-sm font-semibold">{user.name}</dd>
            {user.npp && (
              <>
                <dt className="sr-only">NPP</dt>
                <dd className="text-xs text-muted">NPP: {user.npp}</dd>
              </>
            )}
            {placement && (
              <>
                <dt className="sr-only">{user.floor ? "Tempat tugas" : "Fakultas"}</dt>
                <dd className="text-xs text-muted">{placement}</dd>
              </>
            )}
            <dt className="sr-only">Email</dt>
            <dd className="mt-1 text-sm break-all">{user.email}</dd>
          </dl>
        </div>

        <fieldset className="flex flex-col gap-1">
          <legend className={`${CAPS_LABEL_CLASS} mb-1`}>Status akun {roleLabel.toLowerCase()}</legend>
          <div className="grid grid-cols-2 gap-1 rounded-md bg-page p-1">
            {STATUS_OPTIONS.map((option) => (
              <label
                key={option.label}
                className={`flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-inner text-sm font-medium has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-border-focus ${
                  isActive === option.value ? option.activeClass : "text-muted hover:text-ink"
                }`}
              >
                <input
                  type="radio"
                  name="user-status"
                  checked={isActive === option.value}
                  onChange={() => setIsActive(option.value)}
                  className="sr-only"
                />
                <span aria-hidden="true">{option.mark}</span>
                {option.label}
              </label>
            ))}
          </div>
          <p className="text-[11px] text-muted">Akun tidak aktif tidak bisa masuk ke KIREI. Reservasi yang sudah ada tidak terhapus.</p>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className={`${CAPS_LABEL_CLASS} mb-1`}>Kata sandi</legend>
          <Controller
            control={passwordForm.control}
            name="password"
            render={({ field }) => (
              <PasswordField
                id="user-new-password"
                label="Kata sandi baru"
                labelStyle="plain"
                placeholder="Kosongkan bila tidak diganti"
                value={field.value}
                onChange={field.onChange}
                error={errors.password?.message}
                autoComplete="new-password"
              />
            )}
          />
          <Controller
            control={passwordForm.control}
            name="confirmation"
            render={({ field }) => (
              <PasswordField
                id="user-new-password-confirmation"
                label="Konfirmasi kata sandi baru"
                labelStyle="plain"
                placeholder="Ulangi kata sandi baru"
                value={field.value}
                onChange={field.onChange}
                error={errors.confirmation?.message}
                autoComplete="new-password"
              />
            )}
          />
          <p className="text-[11px] text-muted">
            Kata sandi lama tidak ditampilkan. Isi bila pemilik akun lupa kata sandinya; kata sandi lama tidak berlaku setelah disimpan.
          </p>
        </fieldset>
      </form>
    </Modal>
  );
}
