'use client';

// ============================================================================
// StatCard
// Promoted from modules/erp/design-system/components/card to shared.
// Used by all module dashboards — not ERP-specific.
// Supports both the ERP icon-based API and a simpler value-based API.
// ============================================================================

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  /** Icon component (ERP-style API) */
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  /** Card label / title */
  label?: string;
  /** Main stat value */
  value: string | number;
  /** Change indicator (e.g., "+12% this month") */
  change?: string;
  /** Accent color class (default: "text-primary") */
  accent?: string;
  /** Description text below the value */
  description?: string;
  /** Trend percentage */
  trend?: {
    value: number;
    label?: string;
  };
  className?: string;
}

export function StatCard({
  icon: Icon,
  label,
  value,
  change,
  accent = 'text-primary',
  description,
  trend,
  className,
}: StatCardProps) {
  return (
    <motion.div
      className={cn(
        'glass-surface rounded-xl p-5 sm:p-6 group cursor-default hover:border-primary/30 transition-colors',
        className
      )}
    >
      {Icon && (
        <div className="flex items-start justify-between">
          <div
            className={cn(
              'flex items-center justify-center w-10 h-10 rounded-xl bg-primary/8',
              accent,
              'transition-transform group-hover:scale-[1.02]'
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={1.8} />
          </div>
        </div>
      )}
      <div className={cn(Icon && 'mt-4')}>
        <p className="font-bold text-foreground count-up">
          {value}
        </p>
        {(label || description) && (
          <p className="text-muted-foreground mt-1 text-sm">
            {label || description}
          </p>
        )}
      </div>
      {change && (
        <p className={cn('mt-3 text-xs', accent, '/70')}>
          {change}
        </p>
      )}
      {trend && (
        <div className="flex items-center gap-1 mt-1">
          <span
            className={cn(
              'text-xs font-medium',
              trend.value >= 0
                ? 'text-green-600 dark:text-green-400'
                : 'text-red-600 dark:text-red-400'
            )}
          >
            {trend.value >= 0 ? '+' : ''}
            {trend.value}%
          </span>
          {trend.label && (
            <span className="text-xs text-muted-foreground">{trend.label}</span>
          )}
        </div>
      )}
    </motion.div>
  );
}
