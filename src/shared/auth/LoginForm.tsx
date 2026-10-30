"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Field, INPUT_CLASS } from "@/components/form/Field";
import { Button } from "@/components/ui/Button";
import { login } from "@/lib/auth/actions";
import { loginSchema, type LoginValues } from "@/lib/auth/loginSchema";
import { PasswordField } from "@/shared/profile/PasswordField";

export function LoginForm() {
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const { errors, isSubmitting } = form.formState;

  const submit = form.handleSubmit(async (values) => {
    // On success the action redirects, so a result only comes back on failure.
    const result = await login(values);
    form.setError("root.server", { message: result.error });
  });

  return (
    <form onSubmit={submit} noValidate className="flex w-full flex-col gap-4">
      {errors.root?.server && (
        <p role="alert" className="rounded-md bg-danger-soft px-3 py-2 text-xs text-danger">
          {errors.root.server.message}
        </p>
      )}
      <Field label="Email" htmlFor="login-email" error={errors.email?.message}>
        <input
          id="login-email"
          type="email"
          autoComplete="username"
          inputMode="email"
          placeholder="Masukkan email kampus"
          {...form.register("email")}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "login-email-error" : undefined}
          className={INPUT_CLASS}
        />
      </Field>
      <Controller
        control={form.control}
        name="password"
        render={({ field }) => (
          <PasswordField
            id="login-password"
            label="Kata Sandi"
            labelStyle="plain"
            placeholder="Masukkan kata sandi"
            value={field.value}
            onChange={field.onChange}
            error={errors.password?.message}
            autoComplete="current-password"
          />
        )}
      />
      <Button type="submit" disabled={isSubmitting} className="mt-2 w-full">
        {isSubmitting ? "Memproses..." : "Masuk"}
      </Button>
    </form>
  );
}
