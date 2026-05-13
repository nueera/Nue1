'use client';

import { useState } from 'react';
import { GraduationCap, Users, Clock, Filter } from 'lucide-react';
import type { TrainingProgram } from '../types';
import { PROGRAM_STATUSES, PROGRAM_STATUS_LABELS, DELIVERY_MODE_LABELS } from '../constants';
import { calcCompletionRate } from '../training.utils';
import { EmptyState } from '../../../../shared/components/empty-state';

interface TrainingProgramTableProps {
  data: TrainingProgram[];
  isLoading?: boolean;
  onView?: (program: TrainingProgram) => void;
  onEdit?: (program: TrainingProgram) => void;
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/15',
  upcoming: 'bg-blue-500/10 text-blue-400 border-blue-500/15',
  'in-progress': 'bg-amber-500/10 text-amber-400 border-amber-500/15',
  completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/15',
};

export function TrainingProgramTable({ data, isLoading, onView, onEdit }: TrainingProgramTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = statusFilter === 'All'
    ? data
    : data.filter((p) => p.status === statusFilter);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 animate-pulse">
            <div className="h-4 w-48 bg-white/10 rounded mb-3" />
            <div className="h-3 w-64 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {PROGRAM_STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap transition-all duration-200 ${
              statusFilter === status
                ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
            }`}
          >
            {status === 'All' ? 'All' : PROGRAM_STATUS_LABELS[status] || status}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState icon={GraduationCap} title="No training programs" description="Create a training program to upskill your team" />
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Title</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Category</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Trainer</th>
                  <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Enrolled</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Duration</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((program) => {
                  const completionRate = calcCompletionRate(program.enrolledCount, program.completedCount);
                  return (
                    <tr
                      key={program.id}
                      onClick={() => onView?.(program)}
                      className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 cursor-pointer"
                    >
                      <td className="px-5 py-3.5">
                        <p className="text-sm font-semibold text-foreground">{program.title}</p>
                        <span className="text-[10px] text-muted-foreground">{DELIVERY_MODE_LABELS[program.deliveryMode]}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 text-[10px] bg-white/5 border border-white/10 rounded-md text-foreground">
                          {program.category}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{program.trainer}</td>
                      <td className="px-5 py-3.5 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Users className="h-3 w-3 text-muted-foreground/50" />
                          <span className="text-sm text-foreground">{program.enrolledCount}/{program.maxParticipants}</span>
                        </div>
                        {completionRate > 0 && (
                          <p className="text-[9px] text-muted-foreground/50 text-center">{completionRate}% completed</p>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-muted-foreground">{program.durationHours}h</td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${STATUS_COLORS[program.status] || ''}`}>
                          {PROGRAM_STATUS_LABELS[program.status] || program.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {onEdit && (
                          <button
                            onClick={(e) => { e.stopPropagation(); onEdit(program); }}
                            className="text-xs text-module-erp hover:underline"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
