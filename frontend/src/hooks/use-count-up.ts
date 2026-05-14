'use client';

// ============================================================================
// useCountUp Hook
// Animated number counting hook — extracted from finance/hooks/use-count-up.ts
// because it's useful for any module's dashboard stat cards.
// ============================================================================

import { useEffect, useState, useCallback } from 'react';

interface UseCountUpOptions {
  /** Target value to count up to */
  end: number;
  /** Animation duration in ms (default: 1200) */
  duration?: number;
  /** Number of decimal places (default: 0) */
  decimals?: number;
  /** String prefix (e.g., '$') */
  prefix?: string;
  /** String suffix (e.g., '%') */
  suffix?: string;
  /** Whether animation is enabled (default: true) */
  enabled?: boolean;
}

export function useCountUp({
  end,
  duration = 1200,
  decimals = 0,
  prefix = '',
  suffix = '',
  enabled = true,
}: UseCountUpOptions) {
  const [display, setDisplay] = useState(
    enabled ? prefix + '0' + suffix : prefix + end.toFixed(decimals) + suffix
  );

  const animate = useCallback(() => {
    if (!enabled) {
      setDisplay(prefix + end.toFixed(decimals) + suffix);
      return;
    }

    const startTime = performance.now();
    const startVal = 0;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (end - startVal) * eased;

      setDisplay(prefix + current.toFixed(decimals) + suffix);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [end, duration, decimals, prefix, suffix, enabled]);

  useEffect(() => {
    animate();
  }, [animate]);

  return display;
}
