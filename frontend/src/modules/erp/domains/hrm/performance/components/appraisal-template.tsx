'use client';

import { useState } from 'react';
import { RATING_SCALE } from '../constants';
import { Button } from '../../../../design-system/components/button';
import { FormField } from '../../../../design-system/components/form-field';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';

interface AppraisalSection {
  id: string;
  name: string;
  weight: number;
  criteria: AppraisalCriterion[];
}

interface AppraisalCriterion {
  id: string;
  name: string;
  description: string;
  weight: number;
}

interface AppraisalTemplateProps {
  initialSections?: AppraisalSection[];
  onSave: (sections: AppraisalSection[]) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const DEFAULT_SECTIONS: AppraisalSection[] = [
  { id: 'competencies', name: 'Competencies', weight: 40, criteria: [] },
  { id: 'goals', name: 'Goals', weight: 40, criteria: [] },
  { id: 'values', name: 'Values', weight: 20, criteria: [] },
];

export function AppraisalTemplate({ initialSections, onSave, onCancel, isLoading }: AppraisalTemplateProps) {
  const [sections, setSections] = useState<AppraisalSection[]>(initialSections ?? DEFAULT_SECTIONS);
  const [expandedSection, setExpandedSection] = useState<string | null>(sections[0]?.id ?? null);
  const [newCriterion, setNewCriterion] = useState<Record<string, { name: string; description: string; weight: number }>>({});

  const totalWeight = sections.reduce((sum, s) => sum + s.weight, 0);
  const isWeightValid = totalWeight === 100;

  const updateSection = (id: string, updates: Partial<AppraisalSection>) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  const addCriterion = (sectionId: string) => {
    const input = newCriterion[sectionId];
    if (!input?.name.trim()) return;
    const criterion: AppraisalCriterion = {
      id: `crit-${Date.now()}`,
      name: input.name,
      description: input.description,
      weight: input.weight,
    };
    updateSection(sectionId, { criteria: [...(sections.find((s) => s.id === sectionId)?.criteria ?? []), criterion] });
    setNewCriterion((prev) => ({ ...prev, [sectionId]: { name: '', description: '', weight: 10 } }));
  };

  const removeCriterion = (sectionId: string, criterionId: string) => {
    updateSection(sectionId, {
      criteria: sections.find((s) => s.id === sectionId)?.criteria.filter((c) => c.id !== criterionId) ?? [],
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-base)' }}>Appraisal Sections</h3>
        <span className={`text-sm font-medium ${isWeightValid ? 'text-green-500' : 'text-amber-500'}`}>
          Total Weight: {totalWeight}% {isWeightValid ? '✓' : '(must equal 100%)'}
        </span>
      </div>

      {/* Rating Scale Reference */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
        <p className="text-sm font-medium text-foreground mb-2">Rating Scale (1–5)</p>
        <div className="flex flex-wrap gap-2">
          {RATING_SCALE.labels.map((label, i) => (
            <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-muted-foreground border border-white/10">
              {i + 1} — {label}
            </span>
          ))}
        </div>
      </div>

      {/* Sections */}
      {sections.map((section) => {
        const isExpanded = expandedSection === section.id;
        const critInput = newCriterion[section.id] ?? { name: '', description: '', weight: 10 };

        return (
          <div key={section.id} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
            <button
              onClick={() => setExpandedSection(isExpanded ? null : section.id)}
              className="flex items-center gap-3 w-full px-5 py-4 hover:bg-white/5 transition-colors duration-200"
            >
              <GripVertical className="h-4 w-4 text-muted-foreground/40 shrink-0" strokeWidth={1.8} />
              <span className="flex-1 text-left font-medium text-foreground" style={{ fontSize: 'var(--text-sm)' }}>{section.name}</span>
              <span className="text-sm text-muted-foreground">{section.weight}%</span>
              {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} /> : <ChevronDown className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />}
            </button>

            {isExpanded && (
              <div className="px-5 pb-5 space-y-4 border-t border-white/5">
                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Section Name">
                    <input
                      type="text"
                      value={section.name}
                      onChange={(e) => updateSection(section.id, { name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </FormField>
                  <FormField label="Weight (%)">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={section.weight}
                      onChange={(e) => updateSection(section.id, { weight: Number(e.target.value) })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
                      style={{ fontSize: 'var(--text-sm)' }}
                    />
                  </FormField>
                </div>

                {/* Existing Criteria */}
                {section.criteria.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground/70 font-medium">Criteria</p>
                    {section.criteria.map((crit) => (
                      <div key={crit.id} className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/5 border border-white/5">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{crit.name}</p>
                          {crit.description && <p className="text-xs text-muted-foreground mt-0.5 truncate">{crit.description}</p>}
                        </div>
                        <span className="text-xs text-muted-foreground shrink-0">{crit.weight}%</span>
                        <button onClick={() => removeCriterion(section.id, crit.id)} className="shrink-0 text-red-400 hover:text-red-300 transition-colors" aria-label="Remove criterion">
                          <Trash2 className="h-3.5 w-3.5" strokeWidth={1.8} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Criterion */}
                <div className="bg-white/5 rounded-xl p-3 space-y-3 border border-white/5">
                  <p className="text-xs font-medium text-muted-foreground">Add Criterion</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="Criterion name"
                      value={critInput.name}
                      onChange={(e) => setNewCriterion((prev) => ({ ...prev, [section.id]: { ...critInput, name: e.target.value } }))}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Description"
                      value={critInput.description}
                      onChange={(e) => setNewCriterion((prev) => ({ ...prev, [section.id]: { ...critInput, description: e.target.value } }))}
                      className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200 text-sm"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Weight %"
                        min={0}
                        max={100}
                        value={critInput.weight}
                        onChange={(e) => setNewCriterion((prev) => ({ ...prev, [section.id]: { ...critInput, weight: Number(e.target.value) } }))}
                        className="w-20 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200 text-sm"
                      />
                      <button onClick={() => addCriterion(section.id)} className="flex items-center gap-1 px-3 py-2 rounded-lg bg-module-erp/10 text-module-erp hover:bg-module-erp/20 transition-colors text-sm">
                        <Plus className="h-3.5 w-3.5" strokeWidth={1.8} /> Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="flex items-center gap-3 pt-2">
        <Button onClick={() => onSave(sections)} disabled={isLoading || !isWeightValid}>
          {isLoading ? 'Saving...' : 'Save Template'}
        </Button>
        {onCancel && (
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        )}
      </div>
    </div>
  );
}

export type { AppraisalSection, AppraisalCriterion };
