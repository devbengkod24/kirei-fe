"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { z } from "zod";
import { readBrowserDataMode } from "@/lib/data-mode/dataMode";
import { parseLive, readLiveRaw, subscribeLive, writeLive } from "@/lib/data-mode/liveStorage";

export interface LiveData<T> {
  /** True once the browser's data was read in the "empty" data mode; always false in "sample" mode. */
  ready: boolean;
  /** What is stored under this name; null when nothing is, or while not ready. */
  value: T | null;
  /** Returns false when the browser would not store it. */
  save: (next: T) => boolean;
}

/**
 * One named value kept in this browser for the "empty" data mode, in sync across tabs. The server
 * and the first client render see nothing stored, so hydration matches; the stored value is read
 * once the component has mounted. Pass a schema that keeps its identity between renders.
 */
export function useLiveData<T>(name: string, schema: z.ZodType<T>): LiveData<T> {
  // undefined: not read (yet, or "sample" mode). null: read, nothing stored.
  const [raw, setRaw] = useState<string | null | undefined>(undefined);

  useEffect(() => {
    if (readBrowserDataMode() !== "empty") return;
    const sync = () => setRaw(readLiveRaw(name));
    const unsubscribe = subscribeLive(name, sync);
    sync();
    return unsubscribe;
  }, [name]);

  const value = useMemo(() => (raw === undefined ? null : parseLive(raw, schema)), [raw, schema]);
  const save = useCallback((next: T) => writeLive(name, next), [name]);
  return { ready: raw !== undefined, value, save };
}

/**
 * `useState` whose value is kept in this browser in the "empty" data mode. In "sample" mode, or
 * when the browser refuses to store, it is plain component state that starts from `initial`.
 */
export function useLiveState<T>(name: string, schema: z.ZodType<T>, initial: T): [T, (next: T) => void] {
  const live = useLiveData(name, schema);
  const [local, setLocal] = useState<{ value: T } | null>(null);
  const { ready, save } = live;

  const set = useCallback(
    (next: T) => {
      // A value the browser stored comes back through `live.value`; anything else stays in state.
      setLocal(ready && save(next) ? null : { value: next });
    },
    [ready, save],
  );

  return [local ? local.value : (live.value ?? initial), set];
}
