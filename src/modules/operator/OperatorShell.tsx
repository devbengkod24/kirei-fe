import { Suspense } from "react";
import { AppBrand } from "@/components/brand/AppBrand";
import { requireRole } from "@/lib/auth/requireRole";
import { CurrentUserAvatarPlaceholder } from "@/shared/layout/CurrentUserAvatar";
import { OperatorUserMenu } from "./OperatorUserMenu";

async function OperatorAccount() {
  const user = await requireRole(["operator"]);
  return <OperatorUserMenu user={user} />;
}

/** Operators have a single page, so the shell is a header without a sidebar. */
export function OperatorShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between gap-3 bg-surface px-4 md:px-10">
        <AppBrand />
        <Suspense fallback={<CurrentUserAvatarPlaceholder />}>
          <OperatorAccount />
        </Suspense>
      </header>
      <main className="flex-1 px-4 pt-4 pb-6">{children}</main>
    </div>
  );
}
