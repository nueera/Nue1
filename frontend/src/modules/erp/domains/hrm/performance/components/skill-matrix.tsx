'use client';

import { useState } from 'react';
import type { SkillRating } from '../types';
import { Button } from '../../../../design-system/components/button';
import { EmptyState } from '../../../../shared/components/empty-state/empty-state';
import { Grid3X3, Plus, Pencil, X } from 'lucide-react';

interface SkillMatrixProps {
  skills: string[];
  employees: Array<{ id: string; name: string; avatar?: string }>;
  ratings: Record<string, SkillRating[]>; // employeeId -> ratings
  onAddSkill?: (skill: string) => void;
  onEditRating?: (employeeId: string, skill: string, rating: number) => void;
  isLoading?: boolean;
}

const RATING_COLORS: Record<number, string> = {
  1: 'bg-red-500/20 text-red-400 border-red-500/30',
  2: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  3: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  4: 'bg-green-500/20 text-green-400 border-green-500/30',
  5: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

const RATING_LABELS = ['', 'Novice', 'Beginner', 'Competent', 'Proficient', 'Expert'];

export function SkillMatrix({ skills, employees, ratings, onAddSkill, onEditRating, isLoading }: SkillMatrixProps) {
  const [newSkill, setNewSkill] = useState('');
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [editingCell, setEditingCell] = useState<{ employeeId: string; skill: string } | null>(null);

  const getRating = (employeeId: string, skill: string): number => {
    const empRatings = ratings[employeeId] ?? [];
    return empRatings.find((r) => r.skill === skill)?.rating ?? 0;
  };

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse">
        <div className="h-4 bg-white/10 rounded w-1/4 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-10 bg-white/10 rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (skills.length === 0 || employees.length === 0) {
    return (
      <EmptyState
        icon={Grid3X3}
        title="No skill data"
        description="Add skills and employee ratings to build the matrix."
        action={onAddSkill ? { label: 'Add Skill', onClick: () => setShowAddSkill(true) } : undefined}
      />
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-base)' }}>Skill Matrix</h3>
        {onAddSkill && (
          <Button size="sm" onClick={() => setShowAddSkill(true)}>
            <Plus className="h-3.5 w-3.5 mr-1" strokeWidth={1.8} /> Add Skill
          </Button>
        )}
      </div>

      {/* Add Skill Input */}
      {showAddSkill && (
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Skill name..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newSkill.trim() && onAddSkill) {
                onAddSkill(newSkill.trim());
                setNewSkill('');
                setShowAddSkill(false);
              }
            }}
          />
          <Button size="sm" onClick={() => { if (newSkill.trim() && onAddSkill) { onAddSkill(newSkill.trim()); setNewSkill(''); setShowAddSkill(false); } }}>
            Add
          </Button>
          <button onClick={() => { setShowAddSkill(false); setNewSkill(''); }} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
          </button>
        </div>
      )}

      {/* Matrix Grid */}
      <div className="overflow-x-auto smooth-scroll">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left text-xs uppercase tracking-widest text-muted-foreground/70 font-medium py-2 px-3 border-b border-white/10 sticky left-0 bg-white/5 backdrop-blur-xl z-10 min-w-[120px]">
                Employee
              </th>
              {skills.map((skill) => (
                <th key={skill} className="text-center text-xs uppercase tracking-widest text-muted-foreground/70 font-medium py-2 px-3 border-b border-white/10 min-w-[90px]">
                  {skill}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-white/5 transition-colors duration-200">
                <td className="py-3 px-3 border-b border-white/5 text-sm font-medium text-foreground sticky left-0 bg-white/5 backdrop-blur-xl z-10">
                  {emp.name}
                </td>
                {skills.map((skill) => {
                  const rating = getRating(emp.id, skill);
                  const isEditing = editingCell?.employeeId === emp.id && editingCell?.skill === skill;

                  return (
                    <td key={skill} className="py-3 px-3 border-b border-white/5 text-center">
                      {isEditing ? (
                        <div className="flex items-center justify-center gap-1">
                          {[1, 2, 3, 4, 5].map((r) => (
                            <button
                              key={r}
                              onClick={() => {
                                onEditRating?.(emp.id, skill, r);
                                setEditingCell(null);
                              }}
                              className={`w-6 h-6 rounded text-xs font-medium transition-all duration-200 ${
                                r <= rating ? 'bg-module-erp text-white' : 'bg-white/5 text-muted-foreground hover:bg-white/10'
                              }`}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingCell({ employeeId: emp.id, skill })}
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-lg border text-xs font-medium transition-all duration-200 hover:scale-105 ${
                            rating > 0 ? RATING_COLORS[rating] : 'bg-white/5 text-muted-foreground/30 border-white/5'
                          }`}
                          title={rating > 0 ? `${RATING_LABELS[rating]} (${rating}/${5})` : 'Not rated'}
                        >
                          {rating > 0 ? rating : '—'}
                        </button>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-white/5">
        <span className="text-xs text-muted-foreground">Legend:</span>
        {[1, 2, 3, 4, 5].map((r) => (
          <span key={r} className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs ${RATING_COLORS[r]}`}>
            {r} — {RATING_LABELS[r]}
          </span>
        ))}
      </div>
    </div>
  );
}
