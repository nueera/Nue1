'use client';

import { useState } from 'react';
import { Button } from '../../../../design-system/components/button';
import { FormField } from '../../../../design-system/components/form-field';
import { MessageSquare, Star, ThumbsUp, ThumbsDown } from 'lucide-react';

interface ExitInterviewFormData {
  reason: string;
  reasonDetails: string;
  workEnvironment: number;
  managementSupport: number;
  careerGrowth: number;
  compensation: number;
  workLifeBalance: number;
  teamCollaboration: number;
  wouldRecommend: boolean;
  recommendDetails?: string;
  improvements: string;
  positiveAspects: string;
  overallSatisfaction: number;
  additionalComments: string;
}

interface ExitInterviewProps {
  employeeId: string;
  employeeName?: string;
  onSubmit: (data: ExitInterviewFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const REASONS = [
  'Better opportunity',
  'Career change',
  'Compensation',
  'Work-life balance',
  'Management issues',
  'Relocation',
  'Personal reasons',
  'Health reasons',
  'Going back to school',
  'Retirement',
  'Other',
];

const FEEDBACK_CATEGORIES = [
  { key: 'workEnvironment', label: 'Work Environment' },
  { key: 'managementSupport', label: 'Management Support' },
  { key: 'careerGrowth', label: 'Career Growth' },
  { key: 'compensation', label: 'Compensation & Benefits' },
  { key: 'workLifeBalance', label: 'Work-Life Balance' },
  { key: 'teamCollaboration', label: 'Team Collaboration' },
] as const;

export function ExitInterview({ employeeId, employeeName, onSubmit, onCancel, isLoading }: ExitInterviewProps) {
  const [reason, setReason] = useState('');
  const [reasonDetails, setReasonDetails] = useState('');
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [recommendDetails, setRecommendDetails] = useState('');
  const [improvements, setImprovements] = useState('');
  const [positiveAspects, setPositiveAspects] = useState('');
  const [overallSatisfaction, setOverallSatisfaction] = useState(0);
  const [additionalComments, setAdditionalComments] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!reason) newErrors.reason = 'Please select a reason';
    if (!overallSatisfaction) newErrors.overallSatisfaction = 'Overall satisfaction rating is required';
    if (wouldRecommend === null) newErrors.wouldRecommend = 'Please indicate if you would recommend this company';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const formData: ExitInterviewFormData = {
      reason,
      reasonDetails,
      workEnvironment: ratings.workEnvironment ?? 0,
      managementSupport: ratings.managementSupport ?? 0,
      careerGrowth: ratings.careerGrowth ?? 0,
      compensation: ratings.compensation ?? 0,
      workLifeBalance: ratings.workLifeBalance ?? 0,
      teamCollaboration: ratings.teamCollaboration ?? 0,
      wouldRecommend: wouldRecommend ?? false,
      recommendDetails: recommendDetails || undefined,
      improvements,
      positiveAspects,
      overallSatisfaction,
      additionalComments,
    };

    onSubmit(formData);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-module-erp/10 text-module-erp">
          <MessageSquare className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-base)' }}>Exit Interview</h3>
          {employeeName && <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>{employeeName}</p>}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Reason for Leaving */}
        <FormField label="Primary Reason for Leaving" required error={errors.reason}>
          <select
            value={reason}
            onChange={(e) => { setReason(e.target.value); if (errors.reason) setErrors((p) => ({ ...p, reason: '' })); }}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <option value="" disabled>Select a reason...</option>
            {REASONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Details">
          <textarea
            value={reasonDetails}
            onChange={(e) => setReasonDetails(e.target.value)}
            placeholder="Please share more details about your reason for leaving..."
            rows={2}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200 resize-none"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </FormField>

        {/* Feedback Categories */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-foreground">Rate Your Experience</p>
          {FEEDBACK_CATEGORIES.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-4">
              <span className="flex-1 text-sm text-muted-foreground">{label}</span>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setRatings((prev) => ({ ...prev, [key]: i + 1 }))}
                    className="p-0.5 hover:scale-110 transition-transform"
                    aria-label={`Rate ${label} ${i + 1}`}
                  >
                    <Star
                      className={`h-4 w-4 transition-colors ${
                        i < (ratings[key] ?? 0) ? 'text-amber-400 fill-amber-400' : 'text-white/20'
                      }`}
                      strokeWidth={1.5}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Would Recommend */}
        <FormField label="Would you recommend this company to others?" required error={errors.wouldRecommend}>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => { setWouldRecommend(true); if (errors.wouldRecommend) setErrors((p) => ({ ...p, wouldRecommend: '' })); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                wouldRecommend === true
                  ? 'bg-green-500/10 text-green-500 border border-green-500/30'
                  : 'bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10'
              }`}
            >
              <ThumbsUp className="h-4 w-4" strokeWidth={1.8} /> Yes
            </button>
            <button
              type="button"
              onClick={() => { setWouldRecommend(false); if (errors.wouldRecommend) setErrors((p) => ({ ...p, wouldRecommend: '' })); }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                wouldRecommend === false
                  ? 'bg-red-500/10 text-red-500 border border-red-500/30'
                  : 'bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10'
              }`}
            >
              <ThumbsDown className="h-4 w-4" strokeWidth={1.8} /> No
            </button>
          </div>
        </FormField>

        {wouldRecommend === false && (
          <FormField label="Why not?">
            <textarea
              value={recommendDetails}
              onChange={(e) => setRecommendDetails(e.target.value)}
              placeholder="What could change your recommendation?"
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200 resize-none"
              style={{ fontSize: 'var(--text-sm)' }}
            />
          </FormField>
        )}

        {/* Improvements */}
        <FormField label="What could be improved?">
          <textarea
            value={improvements}
            onChange={(e) => setImprovements(e.target.value)}
            placeholder="Share your suggestions for improvement..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200 resize-none"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </FormField>

        {/* Positive Aspects */}
        <FormField label="What did you enjoy most?">
          <textarea
            value={positiveAspects}
            onChange={(e) => setPositiveAspects(e.target.value)}
            placeholder="What were the best aspects of working here?"
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200 resize-none"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </FormField>

        {/* Overall Satisfaction */}
        <FormField label="Overall Satisfaction" required error={errors.overallSatisfaction}>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { setOverallSatisfaction(i + 1); if (errors.overallSatisfaction) setErrors((p) => ({ ...p, overallSatisfaction: '' })); }}
                  className="p-1 hover:scale-110 transition-transform"
                  aria-label={`Rate ${i + 1}`}
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${
                      i < overallSatisfaction ? 'text-amber-400 fill-amber-400' : 'text-white/20'
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              ))}
            </div>
            {overallSatisfaction > 0 && (
              <span className="text-sm text-muted-foreground">
                {['Very Dissatisfied', 'Dissatisfied', 'Neutral', 'Satisfied', 'Very Satisfied'][overallSatisfaction - 1]}
              </span>
            )}
          </div>
        </FormField>

        {/* Additional Comments */}
        <FormField label="Additional Comments">
          <textarea
            value={additionalComments}
            onChange={(e) => setAdditionalComments(e.target.value)}
            placeholder="Any other feedback you'd like to share..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200 resize-none"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </FormField>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Interview'}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          )}
        </div>
      </form>
    </div>
  );
}

export type { ExitInterviewFormData };
