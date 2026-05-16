'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LeadScore } from '@/modules/marketing/types';
import { getScoreCategory, getScoreColor } from '@/modules/marketing/utils';
import { motion } from 'framer-motion';

interface LeadScoreDisplayProps {
  score: LeadScore;
  className?: string;
}

export function LeadScoreDisplay({ score, className }: LeadScoreDisplayProps) {
  const category = getScoreCategory(score.total);
  // @ts-expect-error — Argument of type 'string' is not assignable to parameter of ...
  const colorClass = getScoreColor(category);

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score.total / 100) * circumference;

  const segments = [
    { label: 'Engagement', value: score.engagement, color: '#3b82f6' },
    { label: 'Fit', value: score.fit, color: '#10b981' },
    { label: 'Behavior', value: score.behavior, color: '#f59e0b' },
  ];

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm">Lead Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center pb-6">
        {/* Circular Gauge */}
        <div className="relative w-32 h-32">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="54"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/30"
            />
            {/* Progress circle */}
            <motion.circle
              cx="60"
              cy="60"
              r="54"
              stroke={colorClass}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn('text-3xl font-bold', colorClass)}>{score.total}</span>
            <span className="text-xs text-muted-foreground capitalize">{category}</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="w-full mt-4 space-y-2">
          {segments.map((segment) => (
            <div key={segment.label} className="flex items-center gap-3">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">{segment.label}</span>
                  <span className="text-xs font-medium text-foreground">{segment.value}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted/30 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: segment.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(segment.value, 100)}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-muted-foreground mt-3">
          Last updated: {new Date(score.lastUpdated).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
