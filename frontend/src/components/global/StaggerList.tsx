'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useStaggerAnimation } from '@/hooks/useStaggerAnimation';
import { useIsMobile } from '@/hooks/use-mobile';

/* ============================================================
   STAGGER LIST PROPS
   ============================================================ */

interface StaggerListProps {
  children: React.ReactNode;
  /** Delay between each child animation (default: 0.05s) */
  staggerDelay?: number;
  /** Direction of stagger animation (default: 'up') */
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  /** Additional class names for the container */
  className?: string;
}

/* ============================================================
   STAGGER LIST COMPONENT
   ============================================================ */

export function StaggerList({
  children,
  staggerDelay = 0.05,
  direction = 'up',
  className,
}: StaggerListProps) {
  const isMobile = useIsMobile();

  // Reduce stagger delay on mobile for snappier feel
  const effectiveStaggerDelay = isMobile
    ? staggerDelay * 0.5
    : staggerDelay;

  const { containerVariants, itemVariants } = useStaggerAnimation({
    staggerDelay: effectiveStaggerDelay,
    direction,
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn(className)}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;

        return (
          <motion.div variants={itemVariants}>
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default StaggerList;
