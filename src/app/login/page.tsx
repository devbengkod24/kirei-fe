import type { Metadata } from "next";
import { LoginPage } from "@/shared/auth/LoginPage";

export const metadata: Metadata = { title: "Masuk" };

export default function Page() {
  return <LoginPage />;
}
