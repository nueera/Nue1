'use client';

import { useState } from 'react';
import { Star, Send, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';

interface InterviewFeedbackProps {
  candidateName: string;
  jobTitle: string;
  interviewType: string;
  onSubmit: (data: {
    rating: number;
    strengths: string;
    concerns: string;
    recommendation: 'hire' | 'no-hire' | 'maybe';
    comments: string;
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function InterviewFeedback({ candidateName, jobTitle, interviewType, onSubmit, onCancel, isLoading }: InterviewFeedbackProps) {
  const [rating, setRating] = useState(0);
  const [strengths, setStrengths] = useState('');
  const [concerns, setConcerns] = useState('');
  const [recommendation, setRecommendation] = useState<string>('');
  const [comments, setComments] = useState('');

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  const isValid = rating > 0 && strengths && recommendation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      rating,
      strengths,
      concerns,
      recommendation: recommendation as 'hire' | 'no-hire' | 'maybe',
      comments,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Info banner */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
        <p className="text-sm font-semibold text-foreground">{candidateName}</p>
        <p className="text-xs text-muted-foreground">{jobTitle} · {interviewType} Interview</p>
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Overall Rating <span className="text-red-400">*</span>
        </label>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setRating(i + 1)}
              className="p-0.5 transition-all duration-200"
            >
              <Star
                className={`h-7 w-7 transition-all duration-200 ${
                  i < rating
                    ? 'text-amber-400 fill-amber-400 scale-110'
                    : 'text-white/10 hover:text-amber-400/50'
                }`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm font-medium text-foreground">{rating}/5</span>
          )}
        </div>
      </div>

      {/* Strengths */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Strengths <span className="text-red-400">*</span>
        </label>
        <textarea
          value={strengths}
          onChange={(e) => setStrengths(e.target.value)}
          placeholder="What did the candidate do well?"
          rows={3}
          className={`${inputClass} resize-none`}
          required
        />
      </div>

      {/* Concerns */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Concerns
        </label>
        <textarea
          value={concerns}
          onChange={(e) => setConcerns(e.target.value)}
          placeholder="Any areas of concern or red flags?"
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Recommendation */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Recommendation <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setRecommendation('hire')}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
              recommendation === 'hire'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
            }`}
          >
            <ThumbsUp className="h-5 w-5" />
            <span className="text-xs font-medium">Hire</span>
          </button>
          <button
            type="button"
            onClick={() => setRecommendation('maybe')}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
              recommendation === 'maybe'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
            }`}
          >
            <Minus className="h-5 w-5" />
            <span className="text-xs font-medium">Maybe</span>
          </button>
          <button
            type="button"
            onClick={() => setRecommendation('no-hire')}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200 ${
              recommendation === 'no-hire'
                ? 'bg-red-500/10 border-red-500/30 text-red-400'
                : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
            }`}
          >
            <ThumbsDown className="h-5 w-5" />
            <span className="text-xs font-medium">No Hire</span>
          </button>
        </div>
      </div>

      {/* Additional Comments */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Additional Comments</label>
        <textarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Any additional observations..." rows={2} className={`${inputClass} resize-none`} maxLength={500} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          {isLoading ? 'Submitting...' : 'Submit Feedback'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 transition-all duration-200">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
