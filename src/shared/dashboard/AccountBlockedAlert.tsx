import Image from "next/image";
import { formatDayMonthWIB } from "@/lib/date";

export interface AccountBlockedAlertProps {
  /** ISO 8601 (UTC) */
  blockedUntil: string;
}

export function AccountBlockedAlert({ blockedUntil }: AccountBlockedAlertProps) {
  return (
    <div className="flex flex-col gap-1 rounded-md bg-danger-soft p-3">
      <p className="flex items-center gap-2 text-xs leading-5 text-danger">
        <Image src="/icons/alert-blocked.svg" alt="" width={12} height={12} />
        Akun Anda telah diblokir sementara!
      </p>
      <p className="text-xs leading-4 italic">
        Tidak dapat melakukan reservasi hingga <strong className="font-semibold">{formatDayMonthWIB(blockedUntil)}.</strong>
      </p>
    </div>
  );
}
