'use client';

import { useState } from 'react';
import type { ReviewCycle } from '../types';
import type { CreateReviewCycleInput } from '../performance.schema';
import { FormField } from '../../../../design-system/components/form-field';
import { Button } from '../../../../design-system/components/button';
import { X } from 'lucide-react';

interface ReviewCycleFormProps {
  initialData?: ReviewCycle;
  employees: Array<{ id: string; name: string }>;
  onSubmit: (data: CreateReviewCycleInput) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function ReviewCycleForm({ initialData, employees, onSubmit, onCancel, isLoading }: ReviewCycleFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [startDate, setStartDate] = useState(initialData?.startDate ?? '');
  const [endDate, setEndDate] = useState(initialData?.endDate ?? '');
  const [reviewers, setReviewers] = useState<string[]>(initialData?.reviewers ?? []);
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = 'Cycle name is required';
    if (!startDate) newErrors.startDate = 'Start date is required';
    if (!endDate) newErrors.endDate = 'End date is required';
    if (startDate && endDate && startDate > endDate) newErrors.endDate = 'End date must be after start date';
    if (reviewers.length === 0) newErrors.reviewers = 'At least one reviewer is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name, startDate, endDate, reviewers });
  };

  const toggleReviewer = (id: string) => {
    setReviewers((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
    if (errors.reviewers) setErrors((prev) => ({ ...prev, reviewers: '' }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <FormField label="Cycle Name" required error={errors.name}>
        <input
          type="text"
          value={name}
          onChange={(e) => { setName(e.target.value); if (errors.name) setErrors((p) => ({ ...p, name: '' })); }}
          placeholder="e.g. Q2 2025 Performance Review"
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200"
          style={{ fontSize: 'var(--text-sm)' }}
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField label="Start Date" required error={errors.startDate}>
          <input
            type="date"
            value={startDate}
            onChange={(e) => { setStartDate(e.target.value); if (errors.startDate) setErrors((p) => ({ ...p, startDate: '' })); }}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </FormField>
        <FormField label="End Date" required error={errors.endDate}>
          <input
            type="date"
            value={endDate}
            onChange={(e) => { setEndDate(e.target.value); if (errors.endDate) setErrors((p) => ({ ...p, endDate: '' })); }}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </FormField>
      </div>

      <FormField label="Reviewers" required error={errors.reviewers}>
        <div className="flex flex-wrap gap-2 mb-2">
          {reviewers.map((rId) => {
            const emp = employees.find((e) => e.id === rId);
            return (
              <span key={rId} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-module-erp/10 text-module-erp" style={{ fontSize: 'var(--text-xs)' }}>
                {emp?.name ?? rId}
                <button onClick={() => toggleReviewer(rId)} className="hover:text-foreground transition-colors" aria-label="Remove reviewer">
                  <X className="h-3 w-3" strokeWidth={2} />
                </button>
              </span>
            );
          })}
        </div>
        <select
          value=""
          onChange={(e) => { if (e.target.value) toggleReviewer(e.target.value); }}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
          style={{ fontSize: 'var(--text-sm)' }}
        >
          <option value="" disabled>Select a reviewer...</option>
          {employees.filter((e) => !reviewers.includes(e.id)).map((emp) => (
            <option key={emp.id} value={emp.id}>{emp.name}</option>
          ))}
        </select>
      </FormField>

      <FormField label="Description">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description for this review cycle..."
          rows={3}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200 resize-none"
          style={{ fontSize: 'var(--text-sm)' }}
        />
      </FormField>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : initialData ? 'Update Cycle' : 'Create Cycle'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
