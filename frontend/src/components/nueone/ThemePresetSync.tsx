'use client';

import { useEffect } from 'react';
import { useMounted } from '@/hooks/use-mounted';

/**
 * ThemePresetSync — Restores the saved theme preset from localStorage on mount.
 * Render-less component, mounted once in root layout alongside AccentSync.
 */
export function ThemePresetSync() {
  const mounted = useMounted();

  useEffect(() => {
    if (!mounted) return;
    const saved = localStorage.getItem('nueone-theme-preset');
    if (saved && saved !== 'default') {
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, [mounted]);

  return null;
}
