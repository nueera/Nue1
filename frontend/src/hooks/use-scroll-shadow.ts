'use client';

import { useSyncExternalStore, useCallback } from 'react';

const SCROLL_THRESHOLD = 10;

function subscribe(callback: () => void) {
  window.addEventListener('scroll', callback, { passive: true });
  return () => window.removeEventListener('scroll', callback);
}

function getSnapshot() {
  if (typeof window === 'undefined') return false;
  return window.scrollY > SCROLL_THRESHOLD;
}

function getServerSnapshot() {
  return false;
}

export function useScrollShadow(): { hasShadow: boolean } {
  const hasShadow = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { hasShadow };
}
