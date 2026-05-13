'use client';

import { useState } from 'react';
import { Briefcase, Users, MapPin, Clock, Filter } from 'lucide-react';
import type { JobOpening, JobOpeningStatus } from '../types';
import { JOB_OPENING_STATUSES, JOB_OPENING_STATUS_LABELS } from '../constants';
import { StatusBadge } from '../../../../shared/components/status-badge';
import { EmptyState } from '../../../../shared/components/empty-state';

interface JobOpeningTableProps {
  data: JobOpening[];
  isLoading?: boolean;
  onView?: (job: JobOpening) => void;
  onEdit?: (job: JobOpening) => void;
  onClose?: (id: string) => void;
}

const STATUS_COLORS: Record<string, string> = {
  draft: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/15',
  open: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15',
  'on-hold': 'bg-amber-500/10 text-amber-400 border-amber-500/15',
  closed: 'bg-red-500/10 text-red-400 border-red-500/15',
  filled: 'bg-blue-500/10 text-blue-400 border-blue-500/15',
};

export function JobOpeningTable({ data, isLoading, onView, onEdit, onClose }: JobOpeningTableProps) {
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filtered = statusFilter === 'All'
    ? data
    : data.filter((j) => j.status === statusFilter);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 animate-pulse">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-48 bg-white/10 rounded" />
                <div className="h-3 w-64 bg-white/10 rounded" />
              </div>
              <div className="h-8 w-16 bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto">
        {JOB_OPENING_STATUSES.map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border whitespace-nowrap transition-all duration-200 ${
              statusFilter === status
                ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
            }`}
          >
            {status === 'All' ? 'All' : JOB_OPENING_STATUS_LABELS[status] || status}
          </button>
        ))}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <EmptyState icon={Briefcase} title="No job openings" description="Create a job opening to start hiring" />
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Title</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Department</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Type</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Experience</th>
                  <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Applicants</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((job) => (
                  <tr
                    key={job.id}
                    onClick={() => onView?.(job)}
                    className="border-b border-white/5 hover:bg-white/5 transition-all duration-200 cursor-pointer"
                  >
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-semibold text-foreground">{job.title}</p>
                      {job.location && (
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="h-2.5 w-2.5" />{job.location}
                        </p>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">{job.department}</td>
                    <td className="px-5 py-3.5">
                      <span className="px-2 py-0.5 text-[10px] bg-white/5 border border-white/10 rounded-md text-foreground">
                        {job.employmentType}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-sm text-muted-foreground">
                      {job.minExperience}-{job.maxExperience} yrs
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground/50" />
                        <span className="text-sm font-medium text-foreground">
                          {job.filledPositions}/{job.positions}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${STATUS_COLORS[job.status] || ''}`}>
                        {JOB_OPENING_STATUS_LABELS[job.status] || job.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      {onEdit && (
                        <button
                          onClick={(e) => { e.stopPropagation(); onEdit(job); }}
                          className="text-xs text-module-erp hover:underline"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
