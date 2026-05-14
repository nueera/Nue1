// ============================================================================
// Shared Animation Variants
// Consolidated from modules/erp/design-system/components/animations.tsx
// and duplicated animation objects across marketing, finance, and CRM modules.
//
// Usage:
//   import { fadeIn, pageTransition, PageTransition } from '@/lib/motion';
// ============================================================================

import { motion } from 'framer-motion';

// ── Easing curves ──────────────────────────────────────────────────────────
const EASE_STANDARD = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

// ── Variants ───────────────────────────────────────────────────────────────

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.16, ease: EASE_STANDARD },
  },
};

export const slideUp = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: EASE_STANDARD },
  },
};

export const slideDown = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: EASE_STANDARD },
  },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.18, ease: EASE_STANDARD },
  },
};

export const slideRight = {
  hidden: { opacity: 0, x: 8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.18, ease: EASE_STANDARD },
  },
};

export const pageTransition = {
  initial: { opacity: 0, y: 4 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.16, ease: EASE_STANDARD },
};

export const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.06 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: EASE_STANDARD },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.2, ease: EASE_STANDARD },
  },
};

// ── Components ─────────────────────────────────────────────────────────────

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  );
}
