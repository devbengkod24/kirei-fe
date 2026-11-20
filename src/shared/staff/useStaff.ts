"use client";

import { useCallback, useEffect, useState } from "react";
import type { Staff } from "@/types/staff";
import { readStoredStaff, saveStaff, subscribeStaff } from "./staffStore";

/**
 * The drivers as this browser has them: the stored list once something was saved, otherwise the
 * server's `initial`. The first render uses `initial` on both server and client, so hydration
 * matches. When the browser refuses to store, changes stay in this component until it unmounts.
 */
export function useStaff(initial: Staff[]): [Staff[], (next: Staff[]) => void] {
  const [stored, setStored] = useState<Staff[] | null>(null);
  const [unsaved, setUnsaved] = useState<Staff[] | null>(null);

  useEffect(() => {
    const sync = () => setStored(readStoredStaff());
    const unsubscribe = subscribeStaff(sync);
    sync();
    return unsubscribe;
  }, []);

  const set = useCallback((next: Staff[]) => setUnsaved(saveStaff(next) ? null : next), []);
  return [unsaved ?? stored ?? initial, set];
}
