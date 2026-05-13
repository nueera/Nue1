'use client';

import { useSyncExternalStore } from 'react';

/**
 * Returns `true` only on the client after hydration.
 * Uses useSyncExternalStore to avoid the "setState in effect" lint warning
 * while still being hydration-safe.
 */
function subscribe() {
  return () => {};
}

function getSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function useMounted(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
