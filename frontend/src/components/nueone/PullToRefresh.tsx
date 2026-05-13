'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { useAppStore } from '@/stores/useAppStore';
import { useMounted } from '@/hooks/use-mounted';

const PULL_THRESHOLD = 80; // px to trigger refresh
const MAX_PULL = 120; // max pull distance
const REFRESH_DURATION = 1500; // ms for simulated refresh

interface PullToRefreshProps {
  children: React.ReactNode;
}

export default function PullToRefresh({ children }: PullToRefreshProps) {
  const mounted = useMounted();
  const { accentColor } = useAppStore();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [canTrigger, setCanTrigger] = useState(false);
  const touchStartY = useRef(0);
  const scrollTop = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const pullDistance = useMotionValue(0);
  const rotate = useTransform(pullDistance, [0, MAX_PULL], [0, 360]);
  const opacity = useTransform(pullDistance, [0, PULL_THRESHOLD * 0.5, PULL_THRESHOLD], [0, 0.6, 1]);
  const scale = useTransform(pullDistance, [0, PULL_THRESHOLD], [0.6, 1]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isRefreshing) return;
    // Check if scrolled to top
    const el = containerRef.current;
    if (el && el.scrollTop <= 0) {
      touchStartY.current = e.touches[0].clientY;
      scrollTop.current = el.scrollTop;
    } else {
      touchStartY.current = 0;
    }
  }, [isRefreshing]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isRefreshing || touchStartY.current === 0) return;

    const el = containerRef.current;
    if (!el || el.scrollTop > 0) {
      pullDistance.set(0);
      setCanTrigger(false);
      return;
    }

    const diff = e.touches[0].clientY - touchStartY.current;
    if (diff <= 0) {
      pullDistance.set(0);
      setCanTrigger(false);
      return;
    }

    // Apply resistance - gets harder to pull the further you go
    const resisted = diff < MAX_PULL
      ? diff * 0.5
      : MAX_PULL * 0.5 + (diff - MAX_PULL) * 0.15;

    pullDistance.set(Math.min(resisted, MAX_PULL * 0.7));
    setCanTrigger(resisted >= PULL_THRESHOLD * 0.5);
  }, [isRefreshing, pullDistance]);

  const handleTouchEnd = useCallback(() => {
    if (isRefreshing) return;

    const currentPull = pullDistance.get();
    if (canTrigger && currentPull >= PULL_THRESHOLD * 0.4) {
      // Trigger refresh
      setIsRefreshing(true);
      pullDistance.set(52); // snap to indicator position

      // Simulate refresh
      setTimeout(() => {
        setIsRefreshing(false);
        pullDistance.set(0);
        setCanTrigger(false);
      }, REFRESH_DURATION);
    } else {
      // Snap back
      pullDistance.set(0);
      setCanTrigger(false);
    }

    touchStartY.current = 0;
  }, [isRefreshing, canTrigger, pullDistance]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      pullDistance.set(0);
    };
  }, [pullDistance]);

  return (
    <div
      ref={containerRef}
      className="relative overflow-y-auto overflow-x-hidden h-full"
      onTouchStart={mounted ? handleTouchStart : undefined}
      onTouchMove={mounted ? handleTouchMove : undefined}
      onTouchEnd={mounted ? handleTouchEnd : undefined}
    >
      {/* Pull indicator */}
      <AnimatePresence>
        {(pullDistance.get() > 0 || isRefreshing) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 right-0 z-40 flex items-center justify-center pointer-events-none"
            style={{ height: 56 }}
          >
            <motion.div
              className="flex items-center justify-center w-10 h-10 rounded-full glass-surface"
              style={{ opacity, scale }}
            >
              <motion.div
                animate={isRefreshing ? { rotate: 360 } : {}}
                transition={isRefreshing ? { duration: 0.8, repeat: Infinity, ease: 'linear' } : {}}
                style={isRefreshing ? {} : { rotate }}
              >
                <RefreshCw
                  className="h-5 w-5"
                  strokeWidth={2}
                  style={{ color: canTrigger || isRefreshing ? accentColor.hex : 'var(--color-muted-foreground)' }}
                />
              </motion.div>
            </motion.div>

            {/* Ready text */}
            {canTrigger && !isRefreshing && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-12 text-[11px] font-medium"
                style={{ color: accentColor.hex }}
              >
                Release to refresh
              </motion.span>
            )}

            {isRefreshing && (
              <motion.span
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-12 text-[11px] font-medium text-muted-foreground"
              >
                Refreshing...
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content with pull offset */}
      <motion.div style={{ y: pullDistance }}>
        {children}
      </motion.div>
    </div>
  );
}
