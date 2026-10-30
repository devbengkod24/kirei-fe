import { Avatar } from "@/components/ui/Avatar";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";

export async function CurrentUserAvatar() {
  const user = await getCurrentUser();
  return <Avatar src={user.avatarUrl} name={user.name} size={48} />;
}

export function CurrentUserAvatarPlaceholder() {
  return <span aria-hidden="true" className="size-12 rounded-full bg-primary-soft" />;
}
