'use client';

import { useState } from 'react';
import { Button } from '../../../../design-system/components/button';
import { FormField } from '../../../../design-system/components/form-field';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface DevelopmentAction {
  id: string;
  action: string;
  type: 'training' | 'mentoring' | 'project' | 'self-study' | 'certification';
  timeline: string;
  status: 'planned' | 'in-progress' | 'completed';
}

interface IDPFormData {
  currentSkills: string[];
  targetSkills: string[];
  developmentActions: DevelopmentAction[];
  timeline: string;
  mentor: string;
  notes: string;
}

interface IDPFormProps {
  initialData?: Partial<IDPFormData>;
  employees: Array<{ id: string; name: string }>;
  onSubmit: (data: IDPFormData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const ACTION_TYPES: Record<DevelopmentAction['type'], string> = {
  training: 'Training',
  mentoring: 'Mentoring',
  project: 'Project Assignment',
  'self-study': 'Self Study',
  certification: 'Certification',
};

const ACTION_STATUS_COLORS: Record<DevelopmentAction['status'], string> = {
  planned: 'bg-muted/20 text-muted-foreground',
  'in-progress': 'bg-amber-500/10 text-amber-500',
  completed: 'bg-green-500/10 text-green-500',
};

export function IDPForm({ initialData, employees, onSubmit, onCancel, isLoading }: IDPFormProps) {
  const [currentSkills, setCurrentSkills] = useState<string[]>(initialData?.currentSkills ?? []);
  const [targetSkills, setTargetSkills] = useState<string[]>(initialData?.targetSkills ?? []);
  const [actions, setActions] = useState<DevelopmentAction[]>(initialData?.developmentActions ?? []);
  const [timeline, setTimeline] = useState(initialData?.timeline ?? '');
  const [mentor, setMentor] = useState(initialData?.mentor ?? '');
  const [notes, setNotes] = useState(initialData?.notes ?? '');
  const [newCurrentSkill, setNewCurrentSkill] = useState('');
  const [newTargetSkill, setNewTargetSkill] = useState('');

  const addSkill = (type: 'current' | 'target') => {
    if (type === 'current' && newCurrentSkill.trim()) {
      setCurrentSkills((prev) => [...prev, newCurrentSkill.trim()]);
      setNewCurrentSkill('');
    } else if (type === 'target' && newTargetSkill.trim()) {
      setTargetSkills((prev) => [...prev, newTargetSkill.trim()]);
      setNewTargetSkill('');
    }
  };

  const removeSkill = (type: 'current' | 'target', skill: string) => {
    if (type === 'current') setCurrentSkills((prev) => prev.filter((s) => s !== skill));
    else setTargetSkills((prev) => prev.filter((s) => s !== skill));
  };

  const addAction = () => {
    setActions((prev) => [
      ...prev,
      {
        id: `action-${Date.now()}`,
        action: '',
        type: 'training',
        timeline: '',
        status: 'planned',
      },
    ]);
  };

  const updateAction = (id: string, updates: Partial<DevelopmentAction>) => {
    setActions((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  };

  const removeAction = (id: string) => {
    setActions((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ currentSkills, targetSkills, developmentActions: actions, timeline, mentor, notes });
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-module-erp/10 text-module-erp">
          <GraduationCap className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-base)' }}>Individual Development Plan</h3>
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Plan your professional growth journey</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Current Skills */}
        <div className="space-y-2">
          <FormField label="Current Skills">
            <div className="flex flex-wrap gap-2 mb-2">
              {currentSkills.map((skill) => (
                <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-green-500/10 text-green-500 text-xs">
                  {skill}
                  <button onClick={() => removeSkill('current', skill)} className="hover:text-foreground transition-colors" aria-label="Remove skill">
                    <Trash2 className="h-3 w-3" strokeWidth={1.8} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newCurrentSkill}
                onChange={(e) => setNewCurrentSkill(e.target.value)}
                placeholder="Add current skill..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors"
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill('current'); } }}
              />
              <button type="button" onClick={() => addSkill('current')} className="px-3 py-2 rounded-lg bg-module-erp/10 text-module-erp hover:bg-module-erp/20 transition-colors">
                <Plus className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </div>
          </FormField>
        </div>

        {/* Target Skills */}
        <div className="space-y-2">
          <FormField label="Target Skills">
            <div className="flex flex-wrap gap-2 mb-2">
              {targetSkills.map((skill) => (
                <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-module-erp/10 text-module-erp text-xs">
                  {skill}
                  <button onClick={() => removeSkill('target', skill)} className="hover:text-foreground transition-colors" aria-label="Remove skill">
                    <Trash2 className="h-3 w-3" strokeWidth={1.8} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newTargetSkill}
                onChange={(e) => setNewTargetSkill(e.target.value)}
                placeholder="Add target skill..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors"
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill('target'); } }}
              />
              <button type="button" onClick={() => addSkill('target')} className="px-3 py-2 rounded-lg bg-module-erp/10 text-module-erp hover:bg-module-erp/20 transition-colors">
                <Plus className="h-4 w-4" strokeWidth={1.8} />
              </button>
            </div>
          </FormField>
        </div>

        {/* Development Actions */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <FormField label="Development Actions" className="[&>div]:mb-0">
              {null}
            </FormField>
            <button type="button" onClick={addAction} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-module-erp/10 text-module-erp text-xs font-medium hover:bg-module-erp/20 transition-colors">
              <Plus className="h-3.5 w-3.5" strokeWidth={1.8} /> Add Action
            </button>
          </div>
          {actions.map((action) => (
            <div key={action.id} className="bg-white/5 border border-white/5 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={action.action}
                  onChange={(e) => updateAction(action.id, { action: e.target.value })}
                  placeholder="Action description..."
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                />
                <button type="button" onClick={() => removeAction(action.id)} className="text-red-400 hover:text-red-300 transition-colors">
                  <Trash2 className="h-4 w-4" strokeWidth={1.8} />
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <select
                  value={action.type}
                  onChange={(e) => updateAction(action.id, { type: e.target.value as DevelopmentAction['type'] })}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-foreground outline-none"
                >
                  {Object.entries(ACTION_TYPES).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={action.timeline}
                  onChange={(e) => updateAction(action.id, { timeline: e.target.value })}
                  placeholder="Timeline e.g. Q2 2025"
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
                />
                <select
                  value={action.status}
                  onChange={(e) => updateAction(action.id, { status: e.target.value as DevelopmentAction['status'] })}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-foreground outline-none"
                >
                  <option value="planned">Planned</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline & Mentor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Plan Timeline">
            <input
              type="text"
              value={timeline}
              onChange={(e) => setTimeline(e.target.value)}
              placeholder="e.g. 6 months, Jan–Jun 2025"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200"
              style={{ fontSize: 'var(--text-sm)' }}
            />
          </FormField>
          <FormField label="Mentor">
            <select
              value={mentor}
              onChange={(e) => setMentor(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              <option value="">Select mentor...</option>
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
          </FormField>
        </div>

        {/* Notes */}
        <FormField label="Notes">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional notes..."
            rows={3}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200 resize-none"
            style={{ fontSize: 'var(--text-sm)' }}
          />
        </FormField>

        <div className="flex items-center gap-3 pt-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Plan'}
          </Button>
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          )}
        </div>
      </form>
    </div>
  );
}

export type { IDPFormData, DevelopmentAction };
