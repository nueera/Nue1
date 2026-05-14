// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LEAD_STAGE_CONFIG } from '@/modules/marketing/constants/lead-constants';
import type { LeadStage } from '@/modules/marketing/types';
import { Check, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface LeadStageFlowProps {
  currentStage: LeadStage;
  className?: string;
}

const STAGE_ORDER: LeadStage[] = [
  'new',
  'contacted',
  'qualified',
  'proposal',
  'negotiation',
  'closed_won',
];

const COLOR_MAP: Record<string, string> = {
  blue: 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
  cyan: 'bg-cyan-100 text-cyan-700 border-cyan-300 dark:bg-cyan-900/30 dark:text-cyan-300 dark:border-cyan-700',
  green: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
  amber: 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700',
  orange: 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-700',
  emerald: 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700',
  red: 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
  slate: 'bg-slate-100 text-slate-600 border-slate-300 dark:bg-slate-800/50 dark:text-slate-400 dark:border-slate-600',
};

const INACTIVE_CLASS = 'bg-muted/30 text-muted-foreground border-muted';

export function LeadStageFlow({ currentStage, className }: LeadStageFlowProps) {
  const currentIndex = STAGE_ORDER.indexOf(currentStage);

  // If stage is closed_lost or nurturing, show special layout
  const isSpecialStage = currentStage === 'closed_lost' || currentStage === 'nurturing';

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Stage Progression</CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        <div className="flex items-center gap-1 overflow-x-auto pb-2">
          {STAGE_ORDER.map((stage, index) => {
            const config = LEAD_STAGE_CONFIG[stage];
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const colorStyle = COLOR_MAP[config.color] ?? INACTIVE_CLASS;

            return (
              <div key={stage} className="flex items-center shrink-0">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={cn(
                    'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-colors',
                    isCompleted
                      ? 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-700'
                      : isCurrent
                        ? colorStyle
                        : INACTIVE_CLASS
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-3 w-3 shrink-0" />
                  ) : (
                    <span className="text-[10px] font-bold shrink-0">{config.probability}%</span>
                  )}
                  <span>{config.label}</span>
                </motion.div>
                {index < STAGE_ORDER.length - 1 && (
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 mx-0.5 shrink-0" />
                )}
              </div>
            );
          })}
        </div>

        {isSpecialStage && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              'mt-3 px-3 py-2 rounded-lg border text-xs font-medium',
              currentStage === 'closed_lost'
                ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800'
                : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800/30 dark:text-slate-400 dark:border-slate-700'
            )}
          >
            Currently in: {LEAD_STAGE_CONFIG[currentStage].label}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
