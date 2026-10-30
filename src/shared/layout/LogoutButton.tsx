import { Button } from "@/components/ui/Button";
import { logout } from "@/lib/auth/actions";

export function LogoutButton() {
  return (
    <form action={logout} className="w-full">
      <Button type="submit" variant="danger-outline" className="w-full tracking-[0.05em]">
        Logout
      </Button>
    </form>
  );
}
