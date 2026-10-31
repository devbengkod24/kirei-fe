import { quickLogin } from "@/lib/auth/actions";
import type { CurrentUser, UserRole } from "@/types/user";

const ROLE_LABEL: Partial<Record<UserRole, string>> = {
  ormawa: "Ormawa",
  dosen: "Dosen",
  admin_fakultas: "Admin Fakultas",
  admin_universitas: "Admin Universitas",
  operator: "Operator",
};

function roleLabel(user: CurrentUser) {
  return ROLE_LABEL[user.role] ?? user.role;
}

export interface QuickLoginProps {
  accounts: CurrentUser[];
}

/** One button per demo account, while login has no backend. Plain forms, so it works before hydration. */
export function QuickLogin({ accounts }: QuickLoginProps) {
  return (
    <section aria-labelledby="quick-login-title" className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-3 text-xs text-muted">
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
        <h2 id="quick-login-title">Login cepat (akun demo)</h2>
        <span aria-hidden="true" className="h-px flex-1 bg-border" />
      </div>
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {accounts.map((user) => (
          <li key={user.id}>
            <form action={quickLogin.bind(null, user.id)}>
              <button
                type="submit"
                className="flex min-h-11 w-full flex-col items-start rounded-md border border-border px-3 py-2 text-left hover:border-primary hover:bg-primary-soft"
              >
                <span className="text-xs font-semibold text-primary">{roleLabel(user)}</span>
                <span className="w-full truncate text-[11px] text-muted">{user.name}</span>
              </button>
            </form>
          </li>
        ))}
      </ul>
    </section>
  );
}
