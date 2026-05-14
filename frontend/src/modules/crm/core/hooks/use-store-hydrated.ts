// @ts-nocheck
'use client';

import { useSyncExternalStore } from 'react';

let hydrated = false;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

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
