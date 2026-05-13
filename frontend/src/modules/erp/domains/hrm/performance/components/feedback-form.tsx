'use client';

import { useState } from 'react';
import type { SubmitFeedbackInput } from '../performance.schema';
import { Button } from '../../../../design-system/components/button';
import { FormField } from '../../../../design-system/components/form-field';
import { MessageSquare, Eye, EyeOff } from 'lucide-react';

interface FeedbackFormProps {
  employees: Array<{ id: string; name: string }>;
  onSubmit: (data: SubmitFeedbackInput) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function FeedbackForm({ employees, onSubmit, onCancel, isLoading }: FeedbackFormProps) {
  const [toEmployeeId, setToEmployeeId] = useState('');
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!toEmployeeId) newErrors.toEmployeeId = 'Please select an employee';
    if (!content.trim()) newErrors.content = 'Feedback content is required';
    if (content.length > 2000) newErrors.content = 'Feedback must be under 2000 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ toEmployeeId, content, isAnonymous });
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-module-erp/10 text-module-erp">
          <MessageSquare className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-base)' }}>360° Feedback</h3>
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Provide constructive feedback for a colleague</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Select Employee" required error={errors.toEmployeeId}>
          <select
            value={toEmployeeId}
            onChange={(e) => { setToEmployeeId(e.target.value); if (errors.toEmployeeId) setErrors((p) => ({ ...p, toEmployeeId: '' })); }}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            <option value="" disabled>Choose an employee...</option>
            {employees.map((emp) => (
              <option key={emp.id} value={emp.id}>{emp.name}</option>
            ))}
          </select>
        </FormField>

        <FormField label="Feedback" required error={errors.content}>
          <textarea
            value={content}
            onChange={(e) => { setContent(e.target.value); if (errors.content) setErrors((p) => ({ ...p, content: '' })); }}
            placeholder="Share your constructive feedback..."
            rows={5}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200 resize-none"
            style={{ fontSize: 'var(--text-sm)' }}
          />
          <p className="text-xs text-muted-foreground mt-1 text-right">{content.length}/2000</p>
        </FormField>

        {/* Anonymous Toggle */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
              isAnonymous ? 'bg-module-erp' : 'bg-white/10'
            }`}
            role="switch"
            aria-checked={isAnonymous}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white transition-transform duration-200 mt-1 ${
                isAnonymous ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <div className="flex items-center gap-2">
            {isAnonymous ? (
              <EyeOff className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
            ) : (
              <Eye className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
            )}
            <span className="text-sm text-muted-foreground">
              {isAnonymous ? 'Your name will be hidden' : 'Your name will be visible'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Submitting...' : 'Submit Feedback'}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          )}
        </div>
      </form>
    </div>
  );
}
