'use client';

import type { OnboardingTask } from '../types';
import { TASK_CATEGORIES } from '../constants';
import { isOverdue } from '../onboarding.utils';
import { cn } from '@/lib/utils';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { CheckSquare, Square, Clock, User, AlertCircle } from 'lucide-react';

interface OnboardingChecklistProps {
  tasks: OnboardingTask[];
  isLoading?: boolean;
  onToggleTask?: (taskId: string, completed: boolean) => void;
  startDate: string;
}

const ASSIGNEE_COLORS: Record<string, string> = {
  hr: 'bg-blue-500/10 text-blue-500',
  manager: 'bg-purple-500/10 text-purple-500',
  it: 'bg-amber-500/10 text-amber-500',
  employee: 'bg-green-500/10 text-green-500',
};

export function OnboardingChecklist({ tasks, isLoading, onToggleTask, startDate }: OnboardingChecklistProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 animate-pulse">
            <div className="w-5 h-5 rounded bg-white/10" />
            <div className="flex-1 space-y-1">
              <div className="h-3 bg-white/10 rounded w-2/3" />
              <div className="h-2 bg-white/10 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        icon={CheckSquare}
        title="No tasks"
        description="Tasks will appear here once a template is assigned."
      />
    );
  }

  const completedCount = tasks.filter((t) => t.completed).length;

  // Calculate due dates based on start date + offset
  const getDueDate = (offsetDays: number): string => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + offsetDays);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="space-y-3">
      {/* Progress Summary */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{completedCount}</span> of <span className="font-medium text-foreground">{tasks.length}</span> tasks completed
        </p>
        <p className="text-sm font-medium text-module-erp">
          {tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0}%
        </p>
      </div>

      {/* Task List */}
      <div className="space-y-1.5">
        {tasks.map((task) => {
          const dueDate = getDueDate(task.dueOffsetDays);
          const taskIsOverdue = !task.completed && isOverdue(dueDate);

          return (
            <div
              key={task.id}
              className={cn(
                'flex items-start gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                task.completed ? 'bg-green-500/5 border border-green-500/10' : 'bg-white/5 border border-white/5 hover:bg-white/10',
                taskIsOverdue && 'bg-red-500/5 border border-red-500/10',
              )}
            >
              {/* Checkbox */}
              <button
                onClick={() => onToggleTask?.(task.id, !task.completed)}
                className="mt-0.5 shrink-0 transition-colors"
                aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
              >
                {task.completed ? (
                  <CheckSquare className="h-5 w-5 text-green-500" strokeWidth={1.8} />
                ) : (
                  <Square className="h-5 w-5 text-muted-foreground/40 hover:text-muted-foreground" strokeWidth={1.8} />
                )}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={cn('text-sm text-foreground', task.completed && 'line-through text-muted-foreground')}>
                  {task.title}
                </p>
                {task.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{task.description}</p>
                )}
                <div className="flex flex-wrap items-center gap-2 mt-1.5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs ${ASSIGNEE_COLORS[task.assignee] ?? 'bg-muted/20 text-muted-foreground'}`}>
                    <User className="h-3 w-3 mr-1" strokeWidth={1.8} />
                    {task.assignee}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" strokeWidth={1.8} />
                    Day +{task.dueOffsetDays}
                  </span>
                  <span className="text-xs text-muted-foreground">{TASK_CATEGORIES[task.category]}</span>
                  {taskIsOverdue && (
                    <span className="inline-flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" strokeWidth={1.8} /> Overdue
                    </span>
                  )}
                </div>
              </div>

              {/* Completion Time */}
              {task.completed && task.completedAt && (
                <span className="text-xs text-green-500/70 shrink-0 mt-1">Completed {task.completedAt}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
