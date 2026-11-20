import Image from "next/image";

export interface RoomPhotoImageProps {
  url: string | null;
  alt: string;
  sizes: string;
  className?: string;
}

/** The room photo, or the default image when the room has none yet. Fills its positioned parent. */
export function RoomPhotoImage({ url, alt, sizes, className = "" }: RoomPhotoImageProps) {
  if (url) {
    // local blob and data URLs (a photo picked in this browser) cannot go through the image optimizer
    return <Image src={url} alt={alt} fill sizes={sizes} unoptimized={/^(blob|data):/.test(url)} className={`object-cover ${className}`} />;
  }
  return (
    <div role="img" aria-label={`${alt} (foto default)`} className={`flex size-full flex-col items-center justify-center gap-2 bg-page ${className}`}>
      <Image src="/icons/admin/detail-room.svg" alt="" width={40} height={40} className="opacity-70" />
      <p className="text-xs text-muted">Foto default</p>
    </div>
  );
}
