import { connection } from "next/server";
import { MOCK_CURRENT_USER } from "@/mocks/user";
import type { CurrentUser } from "@/types/user";

export async function getCurrentUser(): Promise<CurrentUser> {
  await connection();
  // TODO: replace with GET /api/user (Sanctum session) once the orval client is generated.
  return MOCK_CURRENT_USER;
}
