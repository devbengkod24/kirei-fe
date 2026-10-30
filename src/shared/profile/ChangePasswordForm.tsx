"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog } from "@/components/ui/Dialog";
import { changePassword, validatePasswordChange, type PasswordErrors } from "./changePassword";
import { PasswordField } from "./PasswordField";

type Result = { ok: true } | { ok: false; message: string };

export function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [errors, setErrors] = useState<PasswordErrors>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const found = validatePasswordChange({ currentPassword, newPassword, confirmation });
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setPending(true);
    try {
      await changePassword({ currentPassword, newPassword });
      setResult({ ok: true });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmation("");
    } catch (error) {
      setResult({ ok: false, message: error instanceof Error ? error.message : "Terjadi kesalahan saat mengubah kata sandi." });
    } finally {
      setPending(false);
    }
  };

  return (
    <section aria-labelledby="change-password-title" className="flex flex-col gap-3">
      <h2 id="change-password-title" className="border-b border-border pb-2 text-base font-semibold tracking-[0.05em]">
        Ubah Kata Sandi
      </h2>
      <p className="text-xs tracking-[0.05em]">Pastikan kata sandi yang dibuat mudah untuk diingat dan sulit ditebak</p>
      <form onSubmit={submit} noValidate className="flex flex-col gap-3">
        <PasswordField
          id="current-password"
          label="Kata sandi"
          placeholder="Masukkan kata sandi lama"
          value={currentPassword}
          onChange={setCurrentPassword}
          error={errors.currentPassword}
          autoComplete="current-password"
        />
        <PasswordField
          id="new-password"
          label="Kata sandi baru"
          placeholder="Masukkan kata sandi baru"
          value={newPassword}
          onChange={setNewPassword}
          error={errors.newPassword}
          autoComplete="new-password"
        />
        <PasswordField
          id="confirm-password"
          label="Konfirmasi kata sandi baru"
          placeholder="Ulang kata sandi baru"
          value={confirmation}
          onChange={setConfirmation}
          error={errors.confirmation}
          autoComplete="new-password"
        />
        <Button type="submit" disabled={pending} className="self-start">
          {pending ? "Menyimpan..." : "Ubah sandi"}
        </Button>
      </form>

      {result && (
        <Dialog
          open
          onClose={() => setResult(null)}
          title={result.ok ? "Kata Sandi Diubah" : "Kata Sandi Gagal Diubah"}
          className="max-w-[348px] text-center"
          footer={
            <Button onClick={() => setResult(null)} className="mx-auto px-6">
              OK
            </Button>
          }
        >
          <p role="alert" className="text-sm">
            {result.ok ? "Gunakan kata sandi baru saat login berikutnya." : result.message}
          </p>
        </Dialog>
      )}
    </section>
  );
}
