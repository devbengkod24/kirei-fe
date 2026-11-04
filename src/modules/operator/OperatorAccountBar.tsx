import { Avatar } from "@/components/ui/Avatar";
import { LogoutButton } from "@/shared/layout/LogoutButton";
import type { CurrentUser } from "@/types/user";

/** Who is signed in, with Logout always visible: operators have one page and no sidebar to hold it. */
export function OperatorAccountBar({ user }: { user: CurrentUser }) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar src={user.avatarUrl} name={user.name} size={40} />
      <div className="hidden min-w-0 flex-col sm:flex">
        <p className="text-xs text-primary">Operator</p>
        <p className="truncate text-sm font-semibold">{user.name}</p>
      </div>
      <LogoutButton className="shrink-0" />
    </div>
  );
}
