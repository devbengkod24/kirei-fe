export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
}

export type PasswordErrors = Partial<Record<"currentPassword" | "newPassword" | "confirmation", string>>;

export const MIN_PASSWORD_LENGTH = 8;

export function validatePasswordChange(change: PasswordChange & { confirmation: string }): PasswordErrors {
  const errors: PasswordErrors = {};
  if (!change.currentPassword) errors.currentPassword = "Masukkan kata sandi lama.";
  if (change.newPassword.length < MIN_PASSWORD_LENGTH) {
    errors.newPassword = `Kata sandi baru minimal ${MIN_PASSWORD_LENGTH} karakter.`;
  } else if (change.newPassword === change.currentPassword) {
    errors.newPassword = "Kata sandi baru harus berbeda dari yang lama.";
  }
  if (change.confirmation !== change.newPassword) errors.confirmation = "Konfirmasi tidak sama dengan kata sandi baru.";
  return errors;
}

/** Sends the change to Laravel. Rejects with a message the user can read. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars -- payload goes to the API once the endpoint exists
export async function changePassword(change: PasswordChange): Promise<void> {
  // TODO: PUT /user/password through the orval client (Sanctum session) and map 422 errors.
  throw new Error("Ubah kata sandi belum terhubung ke server. Coba lagi setelah fitur ini aktif.");
}
