'use client';

import { useState } from 'react';
import { Star, Send, ThumbsUp, MessageSquare } from 'lucide-react';
import { FEEDBACK_RATING_LABELS } from '../constants';

interface TrainingFeedbackFormProps {
  programTitle: string;
  enrollmentId: string;
  onSubmit: (data: {
    programId: string;
    enrollmentId: string;
    rating: number;
    content: string;
    wouldRecommend?: boolean;
    trainerRating?: number;
    materialRating?: number;
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  isAnonymous?: boolean;
}

export function TrainingFeedbackForm({ programTitle, enrollmentId, onSubmit, onCancel, isLoading, isAnonymous = false }: TrainingFeedbackFormProps) {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [trainerRating, setTrainerRating] = useState(0);
  const [materialRating, setMaterialRating] = useState(0);

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  const isValid = rating > 0 && content;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      programId: '',
      enrollmentId,
      rating,
      content,
      wouldRecommend: wouldRecommend ?? undefined,
      trainerRating: trainerRating > 0 ? trainerRating : undefined,
      materialRating: materialRating > 0 ? materialRating : undefined,
    });
  };

  const RatingStars = ({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) => (
    <div className="space-y-1">
      <label className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</label>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <button key={i} type="button" onClick={() => onChange(i + 1)} className="p-0.5 transition-all duration-200">
            <Star className={`h-5 w-5 transition-all duration-200 ${i < value ? 'text-amber-400 fill-amber-400 scale-110' : 'text-white/10 hover:text-amber-400/50'}`} />
          </button>
        ))}
        {value > 0 && <span className="text-[10px] text-muted-foreground ml-1">{FEEDBACK_RATING_LABELS[value - 1]}</span>}
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
        <p className="text-sm font-semibold text-foreground">{programTitle}</p>
        {isAnonymous && <p className="text-[10px] text-amber-400 mt-1">Your feedback will be submitted anonymously</p>}
      </div>

      <RatingStars value={rating} onChange={setRating} label="Overall Rating *" />

      <RatingStars value={trainerRating} onChange={setTrainerRating} label="Trainer Rating" />

      <RatingStars value={materialRating} onChange={setMaterialRating} label="Training Material Rating" />

      {/* Would Recommend */}
      <div className="space-y-2">
        <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Would you recommend this training?</label>
        <div className="flex items-center gap-3">
          <button type="button" onClick={() => setWouldRecommend(true)} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-medium transition-all duration-200 ${wouldRecommend === true ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}>
            <ThumbsUp className="h-3.5 w-3.5" />Yes
          </button>
          <button type="button" onClick={() => setWouldRecommend(false)} className={`flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-medium transition-all duration-200 ${wouldRecommend === false ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2" /></svg>
            No
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Feedback <span className="text-red-400">*</span>
        </label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Share your experience, what went well, and suggestions for improvement..." rows={4} className={`${inputClass} resize-none`} required maxLength={2000} />
        <p className="text-[10px] text-muted-foreground/50 text-right">{content.length}/2000</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={!isValid || isLoading} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50">
          <Send className="h-4 w-4" />
          {isLoading ? 'Submitting...' : 'Submit Feedback'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 transition-all duration-200">Cancel</button>
        )}
      </div>
    </form>
  );
}
