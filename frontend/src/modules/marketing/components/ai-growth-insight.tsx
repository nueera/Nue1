'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Target, Users, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export interface AIGrowthInsightProps {
  title: string;
  description: string;
  confidenceScore: number;
  category: 'acquisition' | 'engagement' | 'retention' | 'revenue' | 'efficiency';
  impact: 'high' | 'medium' | 'low';
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const CATEGORY_CONFIG: Record<string, { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; color: string; bg: string }> = {
  acquisition: { icon: Users, color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  engagement: { icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
  retention: { icon: Target, color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  revenue: { icon: BarChart3, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-950/30' },
  efficiency: { icon: Sparkles, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/30' },
};

const IMPACT_STYLES: Record<string, string> = {
  high: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
  medium: 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
  low: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
};

export function AIGrowthInsight({
  title,
  description,
  confidenceScore,
  category,
  impact,
  actionLabel = 'Apply Insight',
  onAction,
  className,
}: AIGrowthInsightProps) {
  const config = CATEGORY_CONFIG[category];
  const Icon = config.icon;

  const confidenceColor =
    confidenceScore >= 80
      ? 'text-emerald-600'
      : confidenceScore >= 60
        ? 'text-amber-600'
        : 'text-red-500';

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <Card className={cn('border-border/50 overflow-hidden', className)}>
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3 min-w-0">
              <div className={cn('flex items-center justify-center w-10 h-10 rounded-xl shrink-0', config.bg)}>
                <Icon className={cn('h-5 w-5', config.color)} strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-sm font-semibold text-foreground">{title}</h3>
                  <Badge variant="outline" className={cn('text-[10px] font-medium', IMPACT_STYLES[impact])}>
                    {impact} impact
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Confidence:</span>
              <span className={cn('text-xs font-bold tabular-nums', confidenceColor)}>
                {confidenceScore}%
              </span>
              {/* Confidence bar */}
              <div className="w-20 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    confidenceScore >= 80
                      ? 'bg-emerald-500'
                      : confidenceScore >= 60
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                  )}
                  style={{ width: `${confidenceScore}%` }}
                />
              </div>
            </div>

            {onAction && (
              <button
                onClick={onAction}
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {actionLabel}
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
