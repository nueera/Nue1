'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { ClipboardList, Check, Square, AlertCircle, Clock, ArrowRight } from 'lucide-react';

interface OffboardingTask {
  id: string;
  title: string;
  category: 'asset-return' | 'knowledge-transfer' | 'access-revocation' | 'exit-formalities';
  assignee: string;
  dueDate: string;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

interface OffboardingChecklistProps {
  tasks: OffboardingTask[];
  isLoading?: boolean;
  onToggleTask?: (taskId: string, completed: boolean) => void;
  employeeName?: string;
  lastWorkingDate?: string;
}

const CATEGORY_LABELS: Record<OffboardingTask['category'], string> = {
  'asset-return': 'Asset Return',
  'knowledge-transfer': 'Knowledge Transfer',
  'access-revocation': 'Access Revocation',
  'exit-formalities': 'Exit Formalities',
};

const CATEGORY_COLORS: Record<OffboardingTask['category'], string> = {
  'asset-return': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  'knowledge-transfer': 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  'access-revocation': 'bg-red-500/10 text-red-500 border-red-500/20',
  'exit-formalities': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
};

export function OffboardingChecklist({ tasks, isLoading, onToggleTask, employeeName, lastWorkingDate }: OffboardingChecklistProps) {
  const [filterCategory, setFilterCategory] = useState<OffboardingTask['category'] | 'all'>('all');

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
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
        icon={ClipboardList}
        title="No offboarding tasks"
        description="Offboarding checklist will appear here when an employee resigns."
      />
    );
  }

  const completedCount = tasks.filter((t) => t.completed).length;
  const filteredTasks = filterCategory === 'all' ? tasks : tasks.filter((t) => t.category === filterCategory);
  const categories = [...new Set(tasks.map((t) => t.category))];

  const isOverdue = (dueDate: string, completed: boolean) => !completed && new Date(dueDate) < new Date();

  return (
    <div className="space-y-4">
      {/* Header */}
      {(employeeName || lastWorkingDate) && (
        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/5">
          <div>
            {employeeName && <p className="text-sm font-medium text-foreground">{employeeName}</p>}
            {lastWorkingDate && (
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" strokeWidth={1.8} /> Last working day: {lastWorkingDate}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-module-erp">{completedCount}/{tasks.length}</p>
            <p className="text-xs text-muted-foreground">completed</p>
          </div>
        </div>
      )}

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilterCategory('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            filterCategory === 'all' ? 'bg-module-erp/10 text-module-erp border border-module-erp/30' : 'bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10'
          }`}
        >
          All ({tasks.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              filterCategory === cat ? CATEGORY_COLORS[cat] : 'bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10'
            }`}
          >
            {CATEGORY_LABELS[cat]} ({tasks.filter((t) => t.category === cat).length})
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-1.5">
        {filteredTasks.map((task) => {
          const overdue = isOverdue(task.dueDate, task.completed);

          return (
            <div
              key={task.id}
              className={cn(
                'flex items-start gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                task.completed ? 'bg-green-500/5 border border-green-500/10' : 'bg-white/5 border border-white/5 hover:bg-white/10',
                overdue && 'bg-red-500/5 border border-red-500/10',
              )}
            >
              <button
                onClick={() => onToggleTask?.(task.id, !task.completed)}
                className="mt-0.5 shrink-0"
                aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
              >
                {task.completed ? (
                  <Check className="h-5 w-5 text-green-500" strokeWidth={2} />
                ) : (
                  <Square className="h-5 w-5 text-muted-foreground/40 hover:text-muted-foreground" strokeWidth={1.8} />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <p className={cn('text-sm text-foreground', task.completed && 'line-through text-muted-foreground')}>
                  {task.title}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border ${CATEGORY_COLORS[task.category]}`}>
                    {CATEGORY_LABELS[task.category]}
                  </span>
                  <span className="text-xs text-muted-foreground">Assignee: {task.assignee}</span>
                  <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
                  {overdue && (
                    <span className="inline-flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="h-3 w-3" strokeWidth={1.8} /> Overdue
                    </span>
                  )}
                </div>
                {task.notes && <p className="text-xs text-muted-foreground mt-1">{task.notes}</p>}
              </div>

              {task.completed && task.completedAt && (
                <span className="text-xs text-green-500/70 shrink-0 mt-1">{task.completedAt}</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress Summary */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-muted-foreground">
          {completedCount} of {tasks.length} tasks completed
        </p>
        <div className="w-32 h-1.5 rounded-full bg-white/10 overflow-hidden">
          <div className="h-full rounded-full bg-module-erp transition-all duration-500" style={{ width: `${tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0}%` }} />
        </div>
      </div>
    </div>
  );
}

export type { OffboardingTask };
