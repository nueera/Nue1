'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface ModuleTransitionProps {
  moduleId: string;
  targetRoute: string;
  hexColor: string;
  isTransitioning: boolean;
  onTransitionStart: () => void;
}

/**
 * Renders the full-screen expanding overlay for OS-like "app opening" transition.
 * Must be rendered at the root level (outside the tile) so it can cover the whole viewport.
 */
export function ModuleTransitionOverlay({
  isTransitioning,
  hexColor,
}: {
  isTransitioning: boolean;
  hexColor: string;
}) {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, borderRadius: '1.5rem' }}
          animate={{ opacity: 1, scale: 1, borderRadius: '0' }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.38,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="fixed inset-0 z-[100] pointer-events-none"
          style={{
            background: `linear-gradient(135deg, ${hexColor}08 0%, var(--background) 30%)`,
            originX: '50%',
            originY: '50%',
          }}
        >
          {/* Subtle radial accent glow at center */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${hexColor}18 0%, transparent 60%)`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Hook + component that wraps a trigger element and creates the "app opening" transition.
 * Usage: Place <ModuleTransitionOverlay> at root level, and call useModuleTransition() from the tile.
 */
export function useModuleTransition({
  moduleId,
  targetRoute,
  hexColor,
  onTransitionStart,
}: ModuleTransitionProps) {
  const router = useRouter();

  const triggerTransition = useCallback(() => {
    onTransitionStart();
    // Wait for animation to mostly complete, then navigate
    setTimeout(() => {
      router.push(targetRoute);
    }, 400);
  }, [router, targetRoute, onTransitionStart]);

  return { triggerTransition };
}
