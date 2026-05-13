import { useMemo } from 'react';
import type { Variants } from 'framer-motion';

/* ============================================================
   STAGGER ANIMATION CONFIG
   ============================================================ */

interface StaggerConfig {
  /** Delay between each child animation (default: 0.05s) */
  staggerDelay?: number;
  /** Initial delay before first child animates (default: 0s) */
  initialDelay?: number;
  /** Duration of each child animation (default: 0.3s) */
  duration?: number;
  /** Easing curve (default: [0.25, 0.46, 0.45, 0.94]) */
  easing?: number[];
  /** Direction of the stagger animation (default: 'up') */
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
}

/* ============================================================
   DIRECTION OFFSETS
   ============================================================ */

function getHiddenOffset(
  direction: NonNullable<StaggerConfig['direction']>
): { x: number; y: number } {
  switch (direction) {
    case 'up':
      return { x: 0, y: 8 };
    case 'down':
      return { x: 0, y: -8 };
    case 'left':
      return { x: -8, y: 0 };
    case 'right':
      return { x: 8, y: 0 };
    case 'fade':
      return { x: 0, y: 0 };
    default:
      return { x: 0, y: 8 };
  }
}

/* ============================================================
   USE STAGGER ANIMATION HOOK
   ============================================================ */

export function useStaggerAnimation(config?: StaggerConfig) {
  const staggerDelay = config?.staggerDelay ?? 0.05;
  const initialDelay = config?.initialDelay ?? 0;
  const duration = config?.duration ?? 0.3;
  const easing = config?.easing ?? [0.25, 0.46, 0.45, 0.94];
  const direction = config?.direction ?? 'up';

  const offset = getHiddenOffset(direction);

  const containerVariants = useMemo<Variants>(
    () => ({
      hidden: {
        opacity: 0,
      },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: initialDelay,
        },
      },
    }),
    [staggerDelay, initialDelay]
  );

  const itemVariants = useMemo<Variants>(
    () => ({
      hidden: {
        opacity: 0,
        x: offset.x,
        y: offset.y,
      },
      visible: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration,
          ease: easing as [number, number, number, number],
        },
      },
    }),
    [offset.x, offset.y, duration, easing]
  );

  return { containerVariants, itemVariants };
}
