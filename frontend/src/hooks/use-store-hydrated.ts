'use client';

import { useSyncExternalStore } from 'react';

/**
 * Returns `true` only after the component has mounted AND the first client
 * render has completed. This guarantees the first client render matches the
 * server render, preventing hydration mismatches when using
 * localStorage-persisted store data (e.g. Zustand with `persist` middleware).
 *
 * WHY NOT useMounted()?
 * - useMounted() uses useSyncExternalStore, which returns `true` on the very
 *   first client render. By that point, Zustand persist may have already
 *   rehydrated from localStorage, so store selectors return different data
 *   than what the server rendered with → hydration mismatch.
 *
 * - useStoreHydrated() starts as `false` on both server AND the first client
 *   render, then flips to `true` after a microtask. This ensures:
 *   1. Server render:  hydrated=false → default data
 *   2. Client 1st render: hydrated=false → default data (matches server!)
 *   3. After microtask:   hydrated=true  → store data (re-render, no mismatch)
 *
 * Use this for ANY rendering that depends on Zustand persisted store data
 * (intelligence layer, accent color, view mode, etc.).
 */

let hydrated = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

// Fire once on the client after the first render completes
if (typeof window !== 'undefined') {
  queueMicrotask(() => {
    hydrated = true;
    notify();
  });
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot() {
  return hydrated;
}

function getServerSnapshot() {
  return false;
}

export function useStoreHydrated(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
