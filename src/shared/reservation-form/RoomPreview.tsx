import Image from "next/image";
import type { FloorPlanRoom } from "@/types/facility";
import { ROOM_CATEGORY_LABEL } from "./labels";

export interface RoomPreviewProps {
  room: FloorPlanRoom | null;
  /** Faculty whose admin approves, when it is not the borrower's own. */
  approver: string | null;
}

export function RoomPreview({ room, approver }: RoomPreviewProps) {
  return (
    <div aria-live="polite" className="flex flex-col overflow-hidden rounded-lg bg-primary-soft">
      <div className="relative aspect-[355/210] w-full bg-primary-tint">
        {room?.photoUrl ? (
          <Image src={room.photoUrl} alt={`Foto ruangan ${room.code}`} fill sizes="(min-width: 1280px) 356px, 100vw" className="object-cover" />
        ) : (
          <p className="absolute inset-0 flex items-center justify-center px-6 text-center text-xs text-primary">
            {room ? "Foto ruangan ini belum tersedia." : "Pilih ruangan pada denah untuk melihat fotonya."}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1 px-3 py-3">
        <p className="text-[13px] font-semibold tracking-wide">Ruang: {room ? room.code : "belum dipilih"}</p>
        {room && <p className="text-[11px] text-muted">{ROOM_CATEGORY_LABEL[room.category]}</p>}
        {room && approver && (
          <p className="text-[11px] text-primary">
            Ruangan ini milik {approver}. Reservasi akan disetujui admin {approver}, tanpa surat tambahan.
          </p>
        )}
      </div>
    </div>
  );
}
