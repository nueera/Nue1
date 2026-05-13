'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string | number;
  change?: string;
  accent?: string;
}

export function StatCard({ icon: Icon, label, value, change, accent = 'text-module-erp' }: StatCardProps) {
  return (
    <motion.div
      className="glass-surface rounded-xl p-5 sm:p-6 group cursor-default hover:border-module-erp/30 transition-colors duration-[var(--motion-fast)]"
    >
      <div className="flex items-start justify-between">
        <div className={cn('flex items-center justify-center w-10 h-10 rounded-xl bg-module-erp/8', accent, 'transition-transform duration-[var(--motion-fast)] group-hover:scale-[1.02]')}>
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
      </div>
      <div className="mt-4">
        <p className="font-bold text-foreground count-up" style={{ fontSize: 'var(--text-xl)', letterSpacing: 'var(--tracking-tight)', lineHeight: 'var(--leading-tight)' }}>
          {value}
        </p>
        <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)', lineHeight: 'var(--leading-normal)' }}>
          {label}
        </p>
      </div>
      {change && (
        <p className="mt-3 text-module-erp/70" style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)', lineHeight: 'var(--leading-tight)' }}>
          {change}
        </p>
      )}
    </motion.div>
  );
}
