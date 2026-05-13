'use client';

import type { Goal } from '../types';
import { getGoalCompletionPct } from '../performance.utils';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Target, CheckCircle2, Clock, AlertCircle, TrendingUp } from 'lucide-react';

interface GoalTrackingProps {
  goals: Goal[];
  isLoading?: boolean;
  onUpdateProgress?: (goalId: string, progress: number) => void;
}

const STATUS_CONFIG: Record<Goal['status'], { icon: typeof Target; label: string; colorClass: string; bgClass: string }> = {
  'not-started': { icon: Clock, label: 'Not Started', colorClass: 'text-muted-foreground', bgClass: 'bg-muted/20' },
  'in-progress': { icon: TrendingUp, label: 'In Progress', colorClass: 'text-amber-500', bgClass: 'bg-amber-500/10' },
  'completed': { icon: CheckCircle2, label: 'Completed', colorClass: 'text-green-500', bgClass: 'bg-green-500/10' },
  'overdue': { icon: AlertCircle, label: 'Overdue', colorClass: 'text-red-500', bgClass: 'bg-red-500/10' },
};

function ProgressBar({ value }: { value: number }) {
  const pct = getGoalCompletionPct(value);
  const barColor = pct >= 100 ? 'bg-green-500' : pct >= 60 ? 'bg-amber-500' : 'bg-module-erp';

  return (
    <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${barColor}`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function GoalTracking({ goals, isLoading, onUpdateProgress }: GoalTrackingProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 animate-pulse">
            <div className="h-4 bg-white/10 rounded w-1/3 mb-3" />
            <div className="h-2 bg-white/10 rounded w-full mb-2" />
            <div className="h-3 bg-white/10 rounded w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <EmptyState
        icon={Target}
        title="No goals set"
        description="Set goals to track your performance progress."
      />
    );
  }

  return (
    <div className="space-y-3">
      {goals.map((goal) => {
        const config = STATUS_CONFIG[goal.status];
        const StatusIcon = config.icon;
        const pct = getGoalCompletionPct(goal.progress);

        return (
          <div
            key={goal.id}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate" style={{ fontSize: 'var(--text-sm)' }}>
                  {goal.title}
                </h4>
                <p className="text-muted-foreground mt-0.5 truncate" style={{ fontSize: 'var(--text-xs)' }}>
                  {goal.description}
                </p>
              </div>
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg ${config.bgClass} shrink-0`}>
                <StatusIcon className={`h-3.5 w-3.5 ${config.colorClass}`} strokeWidth={1.8} />
                <span className={`text-xs font-medium ${config.colorClass}`}>{config.label}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-2">
              <ProgressBar value={goal.progress} />
              <span className="text-xs font-medium text-foreground shrink-0">{pct}%</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Target: {goal.targetDate}</span>
              {onUpdateProgress && goal.status !== 'completed' && (
                <button
                  onClick={() => {
                    const newProgress = Math.min(100, goal.progress + 10);
                    onUpdateProgress(goal.id, newProgress);
                  }}
                  className="text-xs text-module-erp hover:text-module-erp/80 transition-colors duration-200 font-medium"
                >
                  Update Progress
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
