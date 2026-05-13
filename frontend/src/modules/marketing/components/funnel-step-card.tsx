'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Users, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export interface FunnelStep {
  name: string;
  count: number;
  conversionRate?: number;
  color?: string;
}

export interface FunnelStepCardProps {
  step: FunnelStep;
  stepNumber: number;
  totalSteps: number;
  isLast?: boolean;
  className?: string;
}

const STEP_COLORS = [
  'bg-blue-500',
  'bg-cyan-500',
  'bg-emerald-500',
  'bg-amber-500',
  'bg-orange-500',
];

export function FunnelStepCard({
  step,
  stepNumber,
  totalSteps,
  isLast = false,
  className,
}: FunnelStepCardProps) {
  const colorClass = step.color ?? STEP_COLORS[stepNumber % STEP_COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: stepNumber * 0.08 }}
      className={cn('relative', className)}
    >
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            {/* Step indicator */}
            <div className="flex flex-col items-center gap-1">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold', colorClass)}>
                {stepNumber + 1}
              </div>
            </div>

            {/* Step content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">{step.name}</h4>
                {step.conversionRate !== undefined && (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-emerald-600" />
                    <span className="text-xs font-medium text-emerald-600 tabular-nums">
                      {step.conversionRate}%
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <Users className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground tabular-nums">
                  {step.count.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Visual funnel bar */}
          <div className="mt-3">
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className={cn('h-full rounded-full', colorClass)}
                style={{
                  width: `${Math.max((step.count / (stepNumber === 0 ? step.count : step.count * (totalSteps / (stepNumber + 1)))) * 100, 10)}%`,
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connector arrow */}
      {!isLast && (
        <div className="flex justify-center my-1">
          <ArrowRight className="h-4 w-4 text-muted-foreground/40 rotate-90" />
        </div>
      )}
    </motion.div>
  );
}
