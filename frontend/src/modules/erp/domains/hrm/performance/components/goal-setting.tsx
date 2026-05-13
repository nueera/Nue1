'use client';

import { useState } from 'react';
import type { Goal } from '../types';
import type { SetGoalInput } from '../performance.schema';
import { GOAL_CATEGORIES } from '../constants';
import { Button } from '../../../../design-system/components/button';
import { FormField } from '../../../../design-system/components/form-field';
import { Target } from 'lucide-react';

interface GoalSettingProps {
  cycleId: string;
  employeeId: string;
  cycles: Array<{ id: string; name: string }>;
  onSubmit: (data: SetGoalInput & { category?: string; measurableCriteria?: string }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function GoalSetting({ cycleId, employeeId, cycles, onSubmit, onCancel, isLoading }: GoalSettingProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [selectedCycleId, setSelectedCycleId] = useState(cycleId);
  const [category, setCategory] = useState<string>('');
  const [measurableCriteria, setMeasurableCriteria] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!title.trim()) newErrors.title = 'Goal title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!targetDate) newErrors.targetDate = 'Target date is required';
    if (!selectedCycleId) newErrors.cycleId = 'Cycle is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      employeeId,
      cycleId: selectedCycleId,
      title,
      description,
      targetDate,
      category: category || undefined,
      measurableCriteria: measurableCriteria || undefined,
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-module-erp/10 text-module-erp">
          <Target className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-base)' }}>Set a New Goal</h3>
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Define measurable objectives aligned to your review cycle</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormField label="Goal Title" required error={errors.title}>
          <input
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value); if (errors.title) setErrors((p) => ({ ...p, title: '' })); }}
            placeholder="e.g. Improve customer satisfaction score by 15%"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </FormField>

        <FormField label="Description" required error={errors.description}>
          <textarea
            value={description}
            onChange={(e) => { setDescription(e.target.value); if (errors.description) setErrors((p) => ({ ...p, description: '' })); }}
            placeholder="Describe the goal in detail..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200 resize-none"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Target Date" required error={errors.targetDate}>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => { setTargetDate(e.target.value); if (errors.targetDate) setErrors((p) => ({ ...p, targetDate: '' })); }}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
              style={{ fontSize: 'var(--text-sm)' }}
            />
          </FormField>
          <FormField label="Review Cycle" required error={errors.cycleId}>
            <select
              value={selectedCycleId}
              onChange={(e) => { setSelectedCycleId(e.target.value); if (errors.cycleId) setErrors((p) => ({ ...p, cycleId: '' })); }}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              <option value="" disabled>Select cycle...</option>
              {cycles.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Category">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              <option value="">Select category...</option>
              {GOAL_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </FormField>
          <FormField label="Measurable Criteria / KRAs">
            <input
              type="text"
              value={measurableCriteria}
              onChange={(e) => setMeasurableCriteria(e.target.value)}
              placeholder="e.g. CSAT score ≥ 85%"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200"
              style={{ fontSize: 'var(--text-sm)' }}
            />
          </FormField>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Set Goal'}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          )}
        </div>
      </form>
    </div>
  );
}
