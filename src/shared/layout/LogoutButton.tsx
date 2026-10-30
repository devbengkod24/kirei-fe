import { Button } from "@/components/ui/Button";

export function LogoutButton() {
  // TODO: POST /logout (Sanctum) and redirect to /login once auth is wired up.
  return (
    <Button variant="danger-outline" disabled title="Logout belum tersedia" className="w-full tracking-[0.05em]">
      Logout
    </Button>
  );
}
