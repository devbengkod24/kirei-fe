import Image from "next/image";
import { Card } from "@/components/ui/Card";

export interface UserActivityCardProps {
  activeUsers: number;
  totalUsers: number;
  /** e.g. "Pengguna yang memesan ruangan bulan ini" */
  description: string;
}

export function UserActivityCard({ activeUsers, totalUsers, description }: UserActivityCardProps) {
  return (
    <Card as="section" aria-labelledby="user-activity-title" className="flex flex-col gap-4 p-3">
      <div>
        <h2 id="user-activity-title" className="text-sm font-medium">
          Distribusi Pengguna
        </h2>
        <p className="text-xs text-muted">{description}</p>
      </div>
      <dl className="flex items-center gap-2 rounded-md border border-border px-4 py-3">
        <span className="flex rounded-md bg-success-soft p-2">
          <Image src="/icons/admin/users-active.svg" alt="" width={24} height={24} />
        </span>
        <div className="flex flex-col-reverse">
          <dt className="text-[11px] text-success">Pengguna aktif</dt>
          <dd className="flex items-end gap-0.5">
            <span className="text-2xl leading-5 font-semibold text-success">{activeUsers}</span>
            <span className="text-[11px] leading-4 text-muted">/{totalUsers} terdaftar</span>
          </dd>
        </div>
      </dl>
    </Card>
  );
}
