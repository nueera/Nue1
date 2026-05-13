'use client';

import { motion } from 'framer-motion';

/**
 * Wrap every ERP page content in this for consistent page transition animations.
 * Elite version: faster, more subtle — feels like content is just "appearing" not "animating in".
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.16, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}
