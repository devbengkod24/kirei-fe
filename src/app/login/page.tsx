import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginPage } from "@/shared/auth/LoginPage";
import { RedirectIfSignedIn } from "@/shared/auth/RedirectIfSignedIn";

export const metadata: Metadata = { title: "Masuk" };

export default function Page() {
  return (
    <>
      <Suspense fallback={null}>
        <RedirectIfSignedIn />
      </Suspense>
      <LoginPage />
    </>
  );
}
