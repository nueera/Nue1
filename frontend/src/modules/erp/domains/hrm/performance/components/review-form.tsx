'use client';

import { useState } from 'react';
import type { Review } from '../types';
import type { SubmitReviewInput } from '../performance.schema';
import { RATING_SCALE } from '../constants';
import { calcAvgRating } from '../performance.utils';
import { Button } from '../../../../design-system/components/button';
import { FormField } from '../../../../design-system/components/form-field';
import { Star, MessageSquare } from 'lucide-react';

interface ReviewFormProps {
  cycleId: string;
  employeeId: string;
  reviewerId: string;
  reviewTypes?: Review['type'][];
  competencies?: string[];
  onSubmit: (data: SubmitReviewInput & { strengths?: string; areasForImprovement?: string; competencyRatings?: Record<string, number> }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const DEFAULT_COMPETENCIES = [
  'Communication',
  'Problem Solving',
  'Teamwork',
  'Leadership',
  'Technical Skills',
  'Adaptability',
];

export function ReviewForm({
  cycleId,
  employeeId,
  reviewerId,
  reviewTypes = ['self', 'manager', 'peer'],
  competencies = DEFAULT_COMPETENCIES,
  onSubmit,
  onCancel,
  isLoading,
}: ReviewFormProps) {
  const [type, setType] = useState<Review['type']>(reviewTypes[0]);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comments, setComments] = useState('');
  const [strengths, setStrengths] = useState('');
  const [areasForImprovement, setAreasForImprovement] = useState('');
  const [competencyRatings, setCompetencyRatings] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (rating < 1) newErrors.rating = 'Overall rating is required';
    if (!comments.trim()) newErrors.comments = 'Comments are required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      cycleId,
      employeeId,
      reviewerId,
      type,
      rating,
      comments,
      strengths: strengths || undefined,
      areasForImprovement: areasForImprovement || undefined,
      competencyRatings: Object.keys(competencyRatings).length > 0 ? competencyRatings : undefined,
    });
  };

  const displayRating = hoverRating || rating;

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-module-erp/10 text-module-erp">
          <MessageSquare className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-base)' }}>Performance Review</h3>
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Provide your assessment and feedback</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Review Type */}
        <FormField label="Review Type">
          <div className="flex gap-2">
            {reviewTypes.map((rt) => (
              <button
                key={rt}
                type="button"
                onClick={() => setType(rt)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 capitalize ${
                  type === rt
                    ? 'bg-module-erp/10 text-module-erp border border-module-erp/30'
                    : 'bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10'
                }`}
              >
                {rt}
              </button>
            ))}
          </div>
        </FormField>

        {/* Competency Ratings */}
        {competencies.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium text-foreground">Competency Ratings</p>
            {competencies.map((comp) => {
              const compRating = competencyRatings[comp] ?? 0;
              const compHover = 0;

              return (
                <div key={comp} className="flex items-center gap-4">
                  <span className="flex-1 text-sm text-muted-foreground">{comp}</span>
                  <div className="flex gap-1">
                    {Array.from({ length: RATING_SCALE.max }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCompetencyRatings((prev) => ({ ...prev, [comp]: i + 1 }))}
                        className="p-0.5 hover:scale-110 transition-transform"
                        aria-label={`Rate ${comp} ${i + 1}`}
                      >
                        <Star
                          className={`h-4 w-4 transition-colors ${
                            i < (compHover || compRating) ? 'text-amber-400 fill-amber-400' : 'text-white/20'
                          }`}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Overall Rating */}
        <FormField label="Overall Rating" required error={errors.rating}>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {Array.from({ length: RATING_SCALE.max }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setRating(i + 1); if (errors.rating) setErrors((p) => ({ ...p, rating: '' })); }}
                  onMouseEnter={() => setHoverRating(i + 1)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 hover:scale-110 transition-transform"
                  aria-label={`Rate ${i + 1}`}
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${
                      i < displayRating ? 'text-amber-400 fill-amber-400' : 'text-white/20'
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
            {displayRating > 0 && (
              <span className="text-sm text-muted-foreground">
                {RATING_SCALE.labels[displayRating - 1]}
              </span>
            )}
          </div>
        </FormField>

        {/* Strengths */}
        <FormField label="Strengths">
          <textarea
            value={strengths}
            onChange={(e) => setStrengths(e.target.value)}
            placeholder="What are this person's key strengths?"
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200 resize-none"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </FormField>

        {/* Areas for Improvement */}
        <FormField label="Areas for Improvement">
          <textarea
            value={areasForImprovement}
            onChange={(e) => setAreasForImprovement(e.target.value)}
            placeholder="Where can this person improve?"
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200 resize-none"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </FormField>

        {/* Comments */}
        <FormField label="Comments" required error={errors.comments}>
          <textarea
            value={comments}
            onChange={(e) => { setComments(e.target.value); if (errors.comments) setErrors((p) => ({ ...p, comments: '' })); }}
            placeholder="Provide detailed review comments..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200 resize-none"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </FormField>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Review'}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          )}
        </div>
      </form>
    </div>
  );
}
