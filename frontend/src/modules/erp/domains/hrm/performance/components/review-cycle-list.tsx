'use client';

import { useState } from 'react';
import type { ReviewCycle } from '../types';
import { REVIEW_STATUS_LABELS } from '../constants';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Calendar, Users, MoreVertical, Pencil, Trash2, Eye } from 'lucide-react';

interface ReviewCycleListProps {
  data: ReviewCycle[];
  isLoading?: boolean;
  onView?: (cycle: ReviewCycle) => void;
  onEdit?: (cycle: ReviewCycle) => void;
  onDelete?: (cycle: ReviewCycle) => void;
}

export function ReviewCycleList({ data, isLoading, onView, onEdit, onDelete }: ReviewCycleListProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2 flex-1">
                <div className="h-4 bg-white/10 rounded w-1/3" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
              </div>
              <div className="h-6 bg-white/10 rounded w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <EmptyState
        icon={Calendar}
        title="No review cycles"
        description="Create your first review cycle to start the performance process."
      />
    );
  }

  return (
    <div className="space-y-3">
      {data.map((cycle) => (
        <div
          key={cycle.id}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-200 group"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-foreground truncate" style={{ fontSize: 'var(--text-base)' }}>
                  {cycle.name}
                </h3>
                <StatusBadge status={cycle.status} />
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" strokeWidth={1.8} />
                  {cycle.startDate} — {cycle.endDate}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5" strokeWidth={1.8} />
                  {cycle.reviewers.length} reviewer{cycle.reviewers.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>

            <div className="relative shrink-0">
              <button
                onClick={() => setOpenMenu(openMenu === cycle.id ? null : cycle.id)}
                className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-white/10 transition-colors duration-200"
                aria-label="Cycle actions"
              >
                <MoreVertical className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
              </button>

              {openMenu === cycle.id && (
                <div className="absolute right-0 top-10 z-10 w-40 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl shadow-lg py-1">
                  {onView && (
                    <button
                      onClick={() => { onView(cycle); setOpenMenu(null); }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-white/10 transition-colors duration-200"
                    >
                      <Eye className="h-3.5 w-3.5" strokeWidth={1.8} /> View
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => { onEdit(cycle); setOpenMenu(null); }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-foreground hover:bg-white/10 transition-colors duration-200"
                    >
                      <Pencil className="h-3.5 w-3.5" strokeWidth={1.8} /> Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => { onDelete(cycle); setOpenMenu(null); }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors duration-200"
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} /> Delete
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
