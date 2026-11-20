import { describe, expect, it } from "vitest";
import { operatorReservationSchema } from "./operatorReservationSchema";

const values = { roomId: "room-h51", bookerName: "Budi Santoso", purpose: "Rapat himpunan", startTime: "09:00", endTime: "10:00" };

describe("operatorReservationSchema", () => {
  it("asks for a room while the placeholder is still selected", () => {
    const result = operatorReservationSchema.safeParse({ ...values, roomId: "" });
    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual([expect.objectContaining({ path: ["roomId"], message: "Pilih ruangan." })]);
  });

  it("accepts a filled-in form", () => {
    expect(operatorReservationSchema.safeParse(values).success).toBe(true);
  });
});
