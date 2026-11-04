import { Button } from "@/components/ui/Button";
import { logout } from "@/lib/auth/actions";

/** Full width by default, as in the sidebar footer; pass `className` to size it elsewhere, e.g. a header. */
export function LogoutButton({ className = "w-full" }: { className?: string }) {
  return (
    <form action={logout} className={className}>
      <Button type="submit" variant="danger-outline" className="w-full tracking-[0.05em]">
        Logout
      </Button>
    </form>
  );
}
