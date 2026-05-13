'use client';

import { Star, Calendar, User } from 'lucide-react';
import type { Application, ApplicationStage } from '../types';
import { APPLICATION_STAGE_LABELS } from '../constants';
import { getStageColor } from '../recruitment.utils';

interface CandidateCardProps {
  application: Application;
  showRating?: boolean;
  onClick?: () => void;
}

export function CandidateCard({ application, showRating = true, onClick }: CandidateCardProps) {
  const stageColorClass = getStageColor(application.stage);
  const stageLabel = APPLICATION_STAGE_LABELS[application.stage] || application.stage;

  return (
    <div
      onClick={onClick}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3 hover:bg-white/[0.08] hover:border-white/15 transition-all duration-200 cursor-pointer"
    >
      {/* Name */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-full bg-module-erp/10 flex items-center justify-center shrink-0">
          <User className="h-3.5 w-3.5 text-module-erp" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-foreground truncate">
            {application.candidateName}
          </p>
          <p className="text-[10px] text-muted-foreground truncate">
            {application.candidateEmail}
          </p>
        </div>
      </div>

      {/* Stage badge */}
      <div className="flex items-center justify-between gap-2">
        <span className={`inline-flex items-center px-1.5 py-0.5 text-[9px] font-medium rounded-md border ${stageColorClass}`}>
          {stageLabel}
        </span>

        {showRating && application.rating && (
          <div className="flex items-center gap-0.5">
            <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-medium text-amber-400">{application.rating}</span>
          </div>
        )}
      </div>

      {/* Applied date */}
      <div className="flex items-center gap-1 mt-2 text-[9px] text-muted-foreground/50">
        <Calendar className="h-2.5 w-2.5" />
        <span>Applied {new Date(application.appliedAt).toLocaleDateString()}</span>
      </div>

      {/* Notes indicator */}
      {application.notes && (
        <p className="text-[10px] text-muted-foreground/60 mt-1 line-clamp-1">{application.notes}</p>
      )}

      {/* Referral indicator */}
      {application.referredBy && (
        <span className="inline-block mt-1 px-1.5 py-0.5 text-[8px] font-medium bg-purple-500/10 text-purple-400 rounded border border-purple-500/15">
          Referred
        </span>
      )}
    </div>
  );
}
