import { z } from "zod";
import { readBrowserDataMode } from "@/lib/data-mode/dataMode";
import type { Room } from "@/types/room";

/** Rooms changed in Kelola Ruangan, by room id. The "empty" data mode keeps them in the browser. */
export const ROOM_EDITS_NAME = "room-edits";

const roomSchema = z.object({
  id: z.string(),
  code: z.string(),
  type: z.enum(["ruang_kelas", "lab", "meeting_room", "auditorium", "gallery"]),
  buildingId: z.string(),
  floor: z.number(),
  isActive: z.boolean(),
  photoUrl: z.string().nullable(),
  plan: z.object({ x: z.number(), y: z.number(), width: z.number(), height: z.number() }).nullable(),
  managedBy: z.enum(["gedung", "universitas"]).optional(),
});

export const roomEditsSchema: z.ZodType<Record<string, Room>> = z.record(z.string(), roomSchema);

/** Rooms added with Tambah Ruangan, until the API stores them. Later edits to them go in the room edits. */
export const ROOM_ADDITIONS_NAME = "room-additions";

export const roomAdditionsSchema: z.ZodType<Room[]> = z.array(roomSchema);

export const applyRoomEdits = (rooms: Room[], edits: Record<string, Room>) => rooms.map((room) => edits[room.id] ?? room);

/** Pilih banyak: the same change for every chosen room, added to the saved edits. */
export function editManyRooms(
  rooms: Room[],
  edits: Record<string, Room>,
  ids: ReadonlySet<string>,
  change: Partial<Pick<Room, "photoUrl" | "managedBy">>,
): Record<string, Room> {
  const next = { ...edits };
  for (const room of applyRoomEdits(rooms, edits)) {
    if (ids.has(room.id)) next[room.id] = { ...room, ...change };
  }
  return next;
}

/** Longest side of a stored photo; keeps one photo well under the browser's storage quota. */
const STORED_PHOTO_MAX_PX = 1280;

/** The photo scaled down, as a JPEG data URL that survives a reload. */
async function toStoredPhoto(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, STORED_PHOTO_MAX_PX / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const context = canvas.getContext("2d");
  if (!context) throw new Error("no 2d context");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL("image/jpeg", 0.8);
}

/**
 * Mock only: until the API returns the stored photo URL, a new photo is shown from a local URL.
 * The "empty" data mode needs one that outlives the page, so it stores a scaled-down copy; a blob
 * URL is the fallback and lasts until the page reloads.
 */
export async function localPhotoUrl(file: File): Promise<string> {
  if (readBrowserDataMode() === "empty") {
    try {
      return await toStoredPhoto(file);
    } catch {
      // fall through to the blob URL
    }
  }
  return URL.createObjectURL(file);
}
