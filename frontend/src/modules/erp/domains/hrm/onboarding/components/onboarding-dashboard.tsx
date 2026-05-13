'use client';

import { useState } from 'react';
import type { NewHire, OnboardingStage } from '../types';
import { ONBOARDING_STAGES } from '../constants';
import { calcCompletionPct } from '../onboarding.utils';
import { StatusBadge } from '../../../../shared/components/status-badge/status-badge';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { UserPlus, ChevronRight, LayoutGrid, List } from 'lucide-react';

interface OnboardingDashboardProps {
  newHires: NewHire[];
  isLoading?: boolean;
  onViewHire?: (hire: NewHire) => void;
}

const STAGE_ORDER: OnboardingStage[] = ['pre-boarding', 'day-one', 'week-one', 'month-one', 'completed'];

const STAGE_COLORS: Record<OnboardingStage, string> = {
  'pre-boarding': 'bg-sky-500/10 border-sky-500/30 text-sky-500',
  'day-one': 'bg-amber-500/10 border-amber-500/30 text-amber-500',
  'week-one': 'bg-purple-500/10 border-purple-500/30 text-purple-500',
  'month-one': 'bg-green-500/10 border-green-500/30 text-green-500',
  completed: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500',
};

export function OnboardingDashboard({ newHires, isLoading, onViewHire }: OnboardingDashboardProps) {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  const renderViewToggle = () => (
    <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1">
      <button
        onClick={() => setViewMode('kanban')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
          viewMode === 'kanban' ? 'bg-module-erp/10 text-module-erp' : 'text-muted-foreground hover:bg-white/5'
        }`}
      >
        <LayoutGrid className="h-3.5 w-3.5" strokeWidth={1.8} /> Kanban
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
          viewMode === 'list' ? 'bg-module-erp/10 text-module-erp' : 'text-muted-foreground hover:bg-white/5'
        }`}
      >
        <List className="h-3.5 w-3.5" strokeWidth={1.8} /> List
      </button>
    </div>
  );

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {STAGE_ORDER.map((_, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 animate-pulse">
            <div className="h-4 bg-white/10 rounded w-2/3 mb-4" />
            {Array.from({ length: 2 }).map((_, j) => (
              <div key={j} className="h-16 bg-white/10 rounded-lg mb-2" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (newHires.length === 0) {
    return (
      <EmptyState
        icon={UserPlus}
        title="No new hires"
        description="New hires will appear here when they're added to onboarding."
      />
    );
  }

  const hiresByStage = STAGE_ORDER.reduce<Record<OnboardingStage, NewHire[]>>((acc, stage) => {
    acc[stage] = newHires.filter((h) => h.stage === stage);
    return acc;
  }, {} as Record<OnboardingStage, NewHire[]>);

  // Kanban View
  if (viewMode === 'kanban') {
    return (
      <div className="space-y-4">
        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-base)' }}>Onboarding Pipeline</h3>
          {renderViewToggle()}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {STAGE_ORDER.map((stage) => {
            const stageHires = hiresByStage[stage];
            const colors = STAGE_COLORS[stage];

            return (
              <div key={stage} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium border ${colors}`}>
                    {ONBOARDING_STAGES[stage]}
                  </span>
                  <span className="text-xs text-muted-foreground">{stageHires.length}</span>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {stageHires.length === 0 ? (
                    <p className="text-xs text-muted-foreground/50 py-4 text-center">No hires</p>
                  ) : (
                    stageHires.map((hire) => {
                      const pct = hire.completionPct;

                      return (
                        <button
                          key={hire.id}
                          onClick={() => onViewHire?.(hire)}
                          className="w-full text-left bg-white/5 border border-white/5 rounded-xl p-3 hover:bg-white/10 transition-all duration-200 group"
                        >
                          <p className="text-sm font-medium text-foreground truncate">{hire.employeeId}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Start: {hire.startDate}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                              <div className="h-full rounded-full bg-module-erp transition-all duration-500" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-xs text-muted-foreground">{pct}%</span>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // List View
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-base)' }}>New Hires</h3>
        {renderViewToggle()}
      </div>

      <div className="space-y-2">
        {newHires.map((hire) => {
          const pct = hire.completionPct;

          return (
            <button
              key={hire.id}
              onClick={() => onViewHire?.(hire)}
              className="w-full flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-all duration-200 text-left"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">{hire.employeeId}</p>
                  <StatusBadge status={hire.stage} />
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">Start: {hire.startDate} · {hire.buddy ? `Buddy: ${hire.buddy}` : ''}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full bg-module-erp transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-10 text-right">{pct}%</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
