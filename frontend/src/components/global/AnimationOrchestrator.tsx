'use client';

import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';

/* ============================================================
   PAGE ANIMATION PROPS
   ============================================================ */

interface PageAnimationProps {
  children: React.ReactNode;
  /** Animation variant to use (default: 'slide-up') */
  variant?: 'fade' | 'slide-up' | 'slide-right' | 'scale' | 'none';
  /** Duration in seconds (default: reads from CSS --motion-base / 220ms) */
  duration?: number;
  /** Delay in seconds before animation starts (default: 0) */
  delay?: number;
  /** Unique key to trigger re-animation on route change */
  key?: string;
}

/* ============================================================
   PAGE ANIMATION VARIANTS OBJECT
   ============================================================ */

interface PageVariantSet {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
}

function getPageVariantSet(
  variant: NonNullable<PageAnimationProps['variant']>,
  duration: number,
  delay: number
): PageVariantSet {
  const easing: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

  switch (variant) {
    case 'fade':
      return {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { duration, delay, ease: easing },
        },
        exit: {
          opacity: 0,
          transition: { duration: duration * 0.6, ease: easing },
        },
      };

    case 'slide-up':
      return {
        initial: { opacity: 0, y: 12 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration, delay, ease: easing },
        },
        exit: {
          opacity: 0,
          y: 12,
          transition: { duration: duration * 0.6, ease: easing },
        },
      };

    case 'slide-right':
      return {
        initial: { opacity: 0, x: -12 },
        animate: {
          opacity: 1,
          x: 0,
          transition: { duration, delay, ease: easing },
        },
        exit: {
          opacity: 0,
          x: -12,
          transition: { duration: duration * 0.6, ease: easing },
        },
      };

    case 'scale':
      return {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: { duration, delay, ease: easing },
        },
        exit: {
          opacity: 0,
          transition: { duration: duration * 0.6, ease: easing },
        },
      };

    case 'none':
      return {
        initial: {},
        animate: {},
        exit: {},
      };

    default:
      return {
        initial: { opacity: 0, y: 12 },
        animate: {
          opacity: 1,
          y: 0,
          transition: { duration, delay, ease: easing },
        },
        exit: {
          opacity: 0,
          y: 12,
          transition: { duration: duration * 0.6, ease: easing },
        },
      };
  }
}

/* ============================================================
   HELPER: Read CSS motion token
   ============================================================ */

function getCSSMotionBase(): number {
  if (typeof window === 'undefined') return 0.22;
  try {
    const value = getComputedStyle(document.documentElement)
      .getPropertyValue('--motion-base')
      .trim();
    if (value) {
      // Parse "220ms" or "0.22s"
      if (value.endsWith('ms')) {
        return parseInt(value, 10) / 1000;
      }
      if (value.endsWith('s')) {
        return parseFloat(value);
      }
    }
  } catch {
    // Fallback
  }
  return 0.22;
}

/* ============================================================
   PAGE ANIMATION COMPONENT
   ============================================================ */

export function PageAnimation({
  children,
  variant = 'slide-up',
  duration: durationProp,
  delay = 0,
  key: routeKey,
}: PageAnimationProps) {
  // Resolve duration from CSS token if not provided
  const duration = useMemo(() => {
    if (durationProp !== undefined) return durationProp;
    return getCSSMotionBase();
  }, [durationProp]);

  const variantSet = useMemo(
    () => getPageVariantSet(variant, duration, delay),
    [variant, duration, delay]
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={routeKey}
        initial={variantSet.initial}
        animate={variantSet.animate}
        exit={variantSet.exit}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/* ============================================================
   PAGE TRANSITION — Convenience Component
   Auto-wraps with the default 'slide-up' variant
   ============================================================ */

export function PageTransition({
  children,
  key: routeKey,
}: {
  children: React.ReactNode;
  key?: string;
}) {
  return (
    <PageAnimation variant="slide-up" key={routeKey}>
      {children}
    </PageAnimation>
  );
}

export default PageAnimation;
