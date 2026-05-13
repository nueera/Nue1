'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore, DEFAULT_ACCENT } from '@/stores/useAppStore';
import { useMounted } from '@/hooks/use-mounted';

export default function DateTime() {
  const [time, setTime] = useState<Date | null>(null);
  const mounted = useMounted();
  const { accentColor } = useAppStore();
  const safeAccent = mounted ? accentColor : DEFAULT_ACCENT;

  useEffect(() => {
    // Defer initial time set to avoid synchronous setState in effect
    const frame = requestAnimationFrame(() => {
      setTime(new Date());
    });
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      cancelAnimationFrame(frame);
      clearInterval(interval);
    };
  }, []);

  if (!time) {
    return (
      <div className="glass-surface rounded-xl p-4 min-w-[180px]">
        <div className="h-10" />
      </div>
    );
  }

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');

  const dateStr = time.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.8 }}
      className="glass-surface rounded-xl p-3 sm:p-4 min-w-[180px]"
    >
      <div className="flex items-baseline gap-1">
        <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-foreground tabular-nums">
          {hours}
        </span>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-2xl sm:text-3xl font-bold font-mono"
          style={{ color: safeAccent.hex }}
        >
          :
        </motion.span>
        <span className="text-2xl sm:text-3xl font-bold font-mono tracking-tight text-foreground tabular-nums">
          {minutes}
        </span>
        <span className="text-sm font-mono text-muted-foreground tabular-nums ml-1 self-end mb-1">
          {seconds}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mt-1 tracking-wide">
        {dateStr}
      </p>
    </motion.div>
  );
}
