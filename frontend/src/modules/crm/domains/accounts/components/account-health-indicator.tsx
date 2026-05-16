'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { getHealthScoreColor } from '../utils';

interface AccountHealthIndicatorProps {
  score: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeConfig = {
  sm: { ring: 'w-8 h-8', text: 'text-xs', icon: 'h-3 w-3' },
  md: { ring: 'w-12 h-12', text: 'text-sm', icon: 'h-4 w-4' },
  lg: { ring: 'w-20 h-20', text: 'text-lg', icon: 'h-6 w-6' },
};

export function AccountHealthIndicator({ score, showLabel = true, size = 'md' }: AccountHealthIndicatorProps) {
  const color = getHealthScoreColor(score);
  const config = sizeConfig[size];
  const circumference = 2 * Math.PI * 16;
  const progress = (score / 100) * circumference;
  const strokeColor = score >= 80 ? 'var(--status-success)' : score >= 60 ? 'var(--status-warning)' : score >= 40 ? 'var(--status-elevated)' : 'var(--status-danger)';

  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <svg className={`${config.ring} -rotate-90`} viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="16" fill="none" stroke="var(--glass-border)" strokeWidth="3" />
          <motion.circle
            cx="18" cy="18" r="16" fill="none"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - progress }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <Heart className={`${config.icon} ${color}`} />
        </div>
      </div>
      {showLabel && (
        <div>
          <p className={`${config.text} font-semibold ${color}`}>{score}/100</p>
          <p className="text-xs text-muted-foreground">Health</p>
        </div>
      )}
    </div>
  );
}
