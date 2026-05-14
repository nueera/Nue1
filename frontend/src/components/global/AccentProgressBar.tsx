'use client';

import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

/* ============================================================
   MODULE COLOR MAP
   ============================================================ */

const MODULE_ACCENT_MAP: Record<string, string> = {
  erp: 'var(--module-erp)',
  crm: 'var(--module-crm)',
  finance: 'var(--module-finance)',
  marketing: 'var(--module-marketing)',
  analytics: 'var(--module-analytics)',
  automation: 'var(--module-automation)',
  retention: 'var(--module-retention)',
  settings: 'var(--module-settings)',
};

function getModuleColor(moduleId?: string): string {
  if (!moduleId) return 'var(--module-erp)';
  return MODULE_ACCENT_MAP[moduleId] ?? 'var(--module-erp)';
}

/* ============================================================
   PROGRESS BAR PHASES
   ============================================================ */

type ProgressPhase = 'idle' | 'start' | 'progress' | 'complete' | 'hidden';

const PHASE_DURATIONS: Record<ProgressPhase, number> = {
  idle: 0,
  start: 300,      // 0→30% in 300ms
  progress: 2000,  // 30→80% in 2s
  complete: 200,   // 80→100% in 200ms
  hidden: 0,
};

const PHASE_WIDTHS: Record<ProgressPhase, [number, number]> = {
  idle: [0, 0],
  start: [0, 30],
  progress: [30, 80],
  complete: [80, 100],
  hidden: [100, 100],
};

/* ============================================================
   ACCENT PROGRESS BAR
   ============================================================ */

interface AccentProgressBarProps {
  visible: boolean;
  moduleId?: string;
}

export function AccentProgressBar({ visible, moduleId }: AccentProgressBarProps) {
  const [phase, setPhase] = useState<ProgressPhase>('hidden');
  const [width, setWidth] = useState(0);
  const accentColor = getModuleColor(moduleId);
  const animFrameRef = useRef<number>(0);
  const phaseStartRef = useRef<number>(0);

  // Phase machine
  useEffect(() => {
    let completeTimer: ReturnType<typeof setTimeout>;
    let hideTimer: ReturnType<typeof setTimeout>;

    if (!visible) {
      // If we were showing, jump to complete then hide
      if (phase !== 'hidden' && phase !== 'idle') {
        setPhase('complete');
        setWidth(80);
        phaseStartRef.current = Date.now();

        completeTimer = setTimeout(() => {
          setWidth(100);
          hideTimer = setTimeout(() => {
            setPhase('hidden');
            setWidth(0);
          }, 300);
        }, PHASE_DURATIONS.complete);
      } else {
        setPhase('hidden');
        setWidth(0);
      }
      return () => {
        clearTimeout(completeTimer);
        clearTimeout(hideTimer);
      };
    }

    // Start the progress sequence
    setPhase('start');
    setWidth(0);
    phaseStartRef.current = Date.now();

    // Animate through phases
    const animateStart = () => {
      const elapsed = Date.now() - phaseStartRef.current;
      const progress = Math.min(elapsed / PHASE_DURATIONS.start, 1);
      const [from, to] = PHASE_WIDTHS.start;
      setWidth(from + (to - from) * progress);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animateStart);
      } else {
        // Transition to progress phase
        setPhase('progress');
        phaseStartRef.current = Date.now();
        animateProgress();
      }
    };

    const animateProgress = () => {
      const elapsed = Date.now() - phaseStartRef.current;
      const progress = Math.min(elapsed / PHASE_DURATIONS.progress, 1);
      const [from, to] = PHASE_WIDTHS.progress;
      setWidth(from + (to - from) * progress);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animateProgress);
      }
      // Stays at 80% until visible becomes false
    };

    animFrameRef.current = requestAnimationFrame(animateStart);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      clearTimeout(completeTimer);
      clearTimeout(hideTimer);
    };
  }, [visible]);

  if (phase === 'hidden' && width === 0) return null;

  return (
    <div
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] h-[2px]',
        'pointer-events-none overflow-hidden',
        phase === 'hidden' && 'opacity-0 transition-opacity duration-300'
      )}
    >
      <div
        className="h-full will-change-transform"
        style={{
          width: `${width}%`,
          backgroundColor: accentColor,
          transition: phase === 'start' ? 'none' : 'width 200ms linear',
          boxShadow: `0 0 8px ${accentColor}`,
        }}
      />
    </div>
  );
}

export default AccentProgressBar;
