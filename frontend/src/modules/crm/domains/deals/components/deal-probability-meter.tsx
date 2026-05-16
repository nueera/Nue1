'use client';

import { motion } from 'framer-motion';

interface DealProbabilityMeterProps {
  probability: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

const sizeConfig = {
  sm: { height: 'h-1.5', text: 'text-xs' },
  md: { height: 'h-2.5', text: 'text-sm' },
  lg: { height: 'h-4', text: 'text-base' },
};

function getProbabilityColor(probability: number): string {
  if (probability >= 75) return 'var(--status-success)';
  if (probability >= 50) return 'var(--status-warning)';
  if (probability >= 25) return 'var(--status-elevated)';
  return 'var(--status-danger)';
}

export function DealProbabilityMeter({ probability, size = 'md', showLabel = true }: DealProbabilityMeterProps) {
  const config = sizeConfig[size];
  const color = getProbabilityColor(probability);

  return (
    <div className="flex items-center gap-2">
      <div className={`flex-1 ${config.height} rounded-full bg-glass-bg overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${probability}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`${config.height} rounded-full`}
          style={{ backgroundColor: color }}
        />
      </div>
      {showLabel && (
        <span className={`${config.text} font-medium tabular-nums`} style={{ color }}>
          {probability}%
        </span>
      )}
    </div>
  );
}
