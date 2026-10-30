"use client";

import Image from "next/image";
import { useState } from "react";
import { Field, INPUT_CLASS } from "@/components/form/Field";

export interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete: "current-password" | "new-password";
}

export function PasswordField({ id, label, placeholder, value, onChange, error, autoComplete }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <Field label={label} htmlFor={id} labelStyle="caps" error={error}>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${INPUT_CLASS} pr-12 tracking-[0.05em] focus-visible:border-primary`}
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
          aria-pressed={visible}
          aria-controls={id}
          className="absolute top-0 right-0 flex size-11 items-center justify-center rounded-md hover:bg-primary-soft aria-pressed:bg-primary-soft"
        >
          <Image src="/icons/admin/eye-off.svg" alt="" width={20} height={20} />
        </button>
      </div>
    </Field>
  );
}
