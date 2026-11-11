"use client";

import { useEffect, useMemo, useState } from "react";
import { parseState, readSnapshot, subscribe, type MockReservationState } from "./reservationStore";

/**
 * The demo reservation store, kept in sync across tabs. The server and the first client render
 * both see an empty store, so hydration matches; the stored data is read once the component has
 * mounted.
 */
export function useMockReservations(): MockReservationState {
  const [raw, setRaw] = useState("");

  useEffect(() => {
    const sync = () => setRaw(readSnapshot());
    const unsubscribe = subscribe(sync);
    sync();
    return unsubscribe;
  }, []);

  return useMemo(() => parseState(raw), [raw]);
}
