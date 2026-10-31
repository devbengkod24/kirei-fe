"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Popover } from "@/components/ui/Popover";
import { LogoutButton } from "@/shared/layout/LogoutButton";
import type { CurrentUser } from "@/types/user";

export function OperatorUserMenu({ user }: { user: CurrentUser }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      label="Menu akun"
      trigger={
        <>
          <Avatar src={user.avatarUrl} name={user.name} size={48} />
          <span className="sr-only">Menu akun</span>
        </>
      }
      triggerClassName="rounded-full"
    >
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xs text-primary">Operator</p>
          <p className="text-sm font-semibold uppercase">{user.name}</p>
        </div>
        <LogoutButton />
      </div>
    </Popover>
  );
}
