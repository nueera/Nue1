'use client';

import { useState } from 'react';
import { GripVertical, ChevronRight, User } from 'lucide-react';
import type { Application, ApplicationStage } from '../types';
import { APPLICATION_STAGES, APPLICATION_STAGE_LABELS } from '../constants';
import { CandidateCard } from './candidate-card';

interface CandidatePipelineProps {
  applications: Application[];
  onStageChange?: (applicationId: string, newStage: ApplicationStage) => void;
  onCardClick?: (application: Application) => void;
  isLoading?: boolean;
}

const STAGE_COLORS: Record<string, string> = {
  applied: 'border-blue-500/30 bg-blue-500/5',
  screening: 'border-cyan-500/30 bg-cyan-500/5',
  'phone-screen': 'border-teal-500/30 bg-teal-500/5',
  technical: 'border-amber-500/30 bg-amber-500/5',
  managerial: 'border-orange-500/30 bg-orange-500/5',
  'hr-round': 'border-purple-500/30 bg-purple-500/5',
  offer: 'border-green-500/30 bg-green-500/5',
  hired: 'border-emerald-500/30 bg-emerald-500/5',
  rejected: 'border-red-500/30 bg-red-500/5',
};

const PIPELINE_STAGES: ApplicationStage[] = ['applied', 'screening', 'technical', 'hr-round', 'offer', 'hired'];

export function CandidatePipeline({ applications, onStageChange, onCardClick, isLoading }: CandidatePipelineProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const getAppsForStage = (stage: ApplicationStage) =>
    applications.filter((a) => a.stage === stage);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDrop = (targetStage: ApplicationStage) => {
    if (draggedId && onStageChange) {
      onStageChange(draggedId, targetStage);
    }
    setDraggedId(null);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {PIPELINE_STAGES.map((stage) => (
          <div key={stage} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 animate-pulse min-h-[200px]">
            <div className="h-4 w-20 bg-white/10 rounded mb-3" />
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-16 bg-white/5 rounded-lg mb-2" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {PIPELINE_STAGES.map((stage) => {
        const stageApps = getAppsForStage(stage);
        return (
          <div
            key={stage}
            className={`bg-white/5 backdrop-blur-xl border rounded-2xl p-3 min-h-[200px] transition-all duration-200 ${
              STAGE_COLORS[stage] || 'border-white/10'
            }`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(stage)}
          >
            {/* Stage header */}
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-foreground truncate">
                {APPLICATION_STAGE_LABELS[stage]}
              </h4>
              <span className="px-1.5 py-0.5 text-[10px] font-medium bg-white/10 rounded-md text-muted-foreground">
                {stageApps.length}
              </span>
            </div>

            {/* Cards */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {stageApps.length === 0 ? (
                <div className="py-6 text-center text-[10px] text-muted-foreground/40">
                  No candidates
                </div>
              ) : (
                stageApps.map((app) => (
                  <div
                    key={app.id}
                    draggable={!!onStageChange}
                    onDragStart={() => handleDragStart(app.id)}
                    onClick={() => onCardClick?.(app)}
                    className={`cursor-pointer transition-all duration-200 ${
                      draggedId === app.id ? 'opacity-50 scale-95' : 'hover:scale-[1.02]'
                    }`}
                  >
                    <CandidateCard application={app} />
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
