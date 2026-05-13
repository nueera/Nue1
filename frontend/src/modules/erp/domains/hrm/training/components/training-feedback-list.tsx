'use client';

import { Star, MessageSquare, User, ThumbsUp } from 'lucide-react';
import type { TrainingFeedback } from '../types';
import { FEEDBACK_RATING_LABELS } from '../constants';
import { getAvgFeedbackScore } from '../training.utils';
import { EmptyState } from '../../../../shared/components/empty-state';

interface TrainingFeedbackListProps {
  feedback: TrainingFeedback[];
  isLoading?: boolean;
}

export function TrainingFeedbackList({ feedback, isLoading }: TrainingFeedbackListProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 animate-pulse">
            <div className="h-4 w-32 bg-white/10 rounded mb-2" />
            <div className="h-3 w-64 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (feedback.length === 0) {
    return <EmptyState icon={MessageSquare} title="No feedback yet" description="Feedback will appear here after participants complete the training" />;
  }

  const avgRating = getAvgFeedbackScore(feedback.map((f) => f.rating));
  const recommendCount = feedback.filter((f) => f.wouldRecommend).length;
  const recommendPct = feedback.length > 0 ? Math.round((recommendCount / feedback.length) * 100) : 0;

  return (
    <div className="space-y-5">
      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{avgRating}</p>
          <div className="flex items-center justify-center gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`h-3 w-3 ${i < Math.round(avgRating) ? 'text-amber-400 fill-amber-400' : 'text-white/10'}`} />
            ))}
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">Avg Rating</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-foreground">{feedback.length}</p>
          <p className="text-[10px] text-muted-foreground mt-1">Total Reviews</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-emerald-400">{recommendPct}%</p>
          <div className="flex items-center justify-center gap-1 mt-1">
            <ThumbsUp className="h-3 w-3 text-emerald-400" />
            <p className="text-[10px] text-muted-foreground">Recommend</p>
          </div>
        </div>
      </div>

      {/* Feedback List */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {feedback.map((fb) => (
          <div key={fb.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                {fb.isAnonymous ? (
                  <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center">
                    <User className="h-3.5 w-3.5 text-muted-foreground/50" />
                  </div>
                ) : (
                  <div className="w-7 h-7 rounded-full bg-module-erp/10 flex items-center justify-center">
                    <span className="text-[10px] font-semibold text-module-erp">{fb.employeeName.charAt(0)}</span>
                  </div>
                )}
                <div>
                  <p className="text-xs font-medium text-foreground">{fb.isAnonymous ? 'Anonymous' : fb.employeeName}</p>
                  <p className="text-[9px] text-muted-foreground">{new Date(fb.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3 w-3 ${i < fb.rating ? 'text-amber-400 fill-amber-400' : 'text-white/10'}`} />
                ))}
              </div>
            </div>
            <p className="text-xs text-foreground/90 whitespace-pre-wrap">{fb.content}</p>
            <div className="flex items-center gap-3 mt-2 text-[9px] text-muted-foreground/50">
              {fb.trainerRating && <span>Trainer: {fb.trainerRating}/5</span>}
              {fb.materialRating && <span>Material: {fb.materialRating}/5</span>}
              {fb.wouldRecommend !== undefined && (
                <span className={fb.wouldRecommend ? 'text-emerald-400/70' : 'text-red-400/70'}>
                  {fb.wouldRecommend ? 'Recommends' : 'Does not recommend'}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
