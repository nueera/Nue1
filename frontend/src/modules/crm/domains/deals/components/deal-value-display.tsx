// @ts-nocheck
'use client';

import { motion } from 'framer-motion';
import { formatDealValue } from '../utils';
import { rankDealSize } from '../utils';

interface DealValueDisplayProps {
  amount: number;
  probability?: number;
  showWeighted?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeConfig = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-2xl',
};

const rankColors: Record<string, string> = {
  small: 'text-status-neutral',
  medium: 'text-status-info',
  large: 'text-status-warning',
  enterprise: 'text-status-accent',
};

export function DealValueDisplay({ amount, probability, showWeighted = false, size = 'md' }: DealValueDisplayProps) {
  const rank = rankDealSize(amount);
  const weightedValue = probability !== undefined ? amount * (probability / 100) : 0;

  return (
    <div>
      <motion.span
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${sizeConfig[size]} font-bold ${rankColors[rank]} block`}
      >
        {formatDealValue(amount)}
      </motion.span>
      {showWeighted && probability !== undefined && (
        <span className="text-xs text-muted-foreground block mt-0.5">
          Weighted: {formatDealValue(weightedValue)}
        </span>
      )}
    </div>
  );
}
