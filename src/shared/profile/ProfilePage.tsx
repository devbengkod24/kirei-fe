import { Card } from "@/components/ui/Card";
import type { CurrentUser } from "@/types/user";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { ProfileSummary } from "./ProfileSummary";

export interface ProfilePageProps {
  user: CurrentUser;
  roleLabel: string;
}

export function ProfilePage({ user, roleLabel }: ProfilePageProps) {
  return (
    <Card className="grid gap-10 border-0 px-6 py-6 md:grid-cols-2 md:px-8">
      <ProfileSummary name={user.name} email={user.email} roleLabel={roleLabel} avatarUrl={user.avatarUrl} />
      <ChangePasswordForm />
    </Card>
  );
}
