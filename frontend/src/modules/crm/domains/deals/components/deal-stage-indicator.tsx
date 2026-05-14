// @ts-nocheck
'use client';

import { motion } from 'framer-motion';
import type { DealStage } from '../types';
import { DEAL_STAGES } from '../constants';
import { getStageColor, getStageLabel } from '../utils';

interface DealStageIndicatorProps {
  currentStage: DealStage;
  size?: 'sm' | 'md';
}

export function DealStageIndicator({ currentStage, size = 'md' }: DealStageIndicatorProps) {
  const currentIndex = DEAL_STAGES.findIndex(s => s.value === currentStage);
  const activeStages = DEAL_STAGES.filter(s => !s.value.startsWith('closed'));

  return (
    <div className="flex items-center gap-1">
      {activeStages.map((stage, index) => {
        const isActive = index <= currentIndex && currentIndex < activeStages.length;
        const isCurrent = stage.value === currentStage;
        const color = stage.color;

        return (
          <div key={stage.value} className="flex items-center gap-1">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: isCurrent ? 1.1 : 1 }}
              className={`rounded-full transition-colors ${
                size === 'sm' ? 'w-2 h-2' : 'w-3 h-3'
              } ${isActive ? '' : 'bg-glass-hover'}`}
              style={isActive ? { backgroundColor: color } : undefined}
              title={stage.label}
            />
            {index < activeStages.length - 1 && (
              <div className={`${size === 'sm' ? 'w-4' : 'w-6'} h-0.5 rounded-full ${index < currentIndex ? '' : 'bg-glass-hover'}`}
                style={index < currentIndex ? { backgroundColor: color } : undefined}
              />
            )}
          </div>
        );
      })}
      {size === 'md' && (
        <span className="text-xs text-muted-foreground ml-2">{getStageLabel(currentStage)}</span>
      )}
    </div>
  );
}
