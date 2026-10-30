import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().min(1, "Masukkan email.").pipe(z.email("Format email tidak valid.")),
  password: z.string().min(1, "Masukkan kata sandi."),
});

export type LoginValues = z.infer<typeof loginSchema>;
