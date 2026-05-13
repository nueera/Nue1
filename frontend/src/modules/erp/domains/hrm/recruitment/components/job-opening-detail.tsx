'use client';

import {
  Briefcase,
  Users,
  MapPin,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import type { JobOpening, Application, Interview } from '../types';
import { JOB_OPENING_STATUS_LABELS } from '../constants';
import { StatusBadge } from '../../../../shared/components/status-badge';

interface JobOpeningDetailProps {
  job: JobOpening;
  applications?: Application[];
  interviews?: Interview[];
  onEdit?: () => void;
  onClose?: () => void;
}

export function JobOpeningDetail({ job, applications = [], interviews = [], onEdit, onClose }: JobOpeningDetailProps) {
  const appliedCount = applications.filter((a) => a.stage === 'applied').length;
  const screeningCount = applications.filter((a) => a.stage === 'screening').length;
  const interviewCount = applications.filter((a) => ['phone-screen', 'technical', 'managerial', 'hr-round'].includes(a.stage)).length;
  const offerCount = applications.filter((a) => a.stage === 'offer').length;
  const hiredCount = applications.filter((a) => a.stage === 'hired').length;

  const pipeline = [
    { label: 'Applied', count: appliedCount, color: 'bg-blue-500' },
    { label: 'Screening', count: screeningCount, color: 'bg-cyan-500' },
    { label: 'Interview', count: interviewCount, color: 'bg-amber-500' },
    { label: 'Offer', count: offerCount, color: 'bg-green-500' },
    { label: 'Hired', count: hiredCount, color: 'bg-emerald-500' },
  ];

  const totalApps = applications.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
              <StatusBadge status={job.status} />
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{job.department}</span>
              <span>·</span>
              <span>{job.employmentType}</span>
              {job.location && <><span>·</span><span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span></>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onEdit && (
              <button onClick={onEdit} className="px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 rounded-lg text-foreground hover:bg-white/10 transition-all duration-200">
                Edit
              </button>
            )}
            {onClose && job.status === 'open' && (
              <button onClick={onClose} className="px-3 py-1.5 text-xs font-medium bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/20 transition-all duration-200">
                Close
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard icon={Users} label="Total Applicants" value={totalApps} />
        <StatCard icon={Target} label="Open Positions" value={`${job.filledPositions}/${job.positions}`} />
        <StatCard icon={DollarSign} label="Salary Range" value={`${job.salaryMin}-${job.salaryMax} LPA`} />
        <StatCard icon={Calendar} label="Deadline" value={job.deadline} />
      </div>

      {/* Pipeline */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Hiring Pipeline</h4>
        <div className="flex items-end gap-2">
          {pipeline.map((stage) => (
            <div key={stage.label} className="flex-1 text-center">
              <div className="h-24 flex items-end justify-center mb-2">
                <div
                  className={`w-full max-w-[48px] rounded-t-lg ${stage.color} transition-all duration-500`}
                  style={{ height: totalApps > 0 ? `${Math.max(8, (stage.count / totalApps) * 100)}%` : '8%' }}
                />
              </div>
              <p className="text-sm font-semibold text-foreground">{stage.count}</p>
              <p className="text-[10px] text-muted-foreground">{stage.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Description</h4>
          <p className="text-sm text-foreground whitespace-pre-wrap">{job.description}</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Requirements</h4>
          <p className="text-sm text-foreground whitespace-pre-wrap">{job.requirements}</p>
          {job.skills.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {job.skills.map((skill) => (
                <span key={skill} className="px-2 py-0.5 text-[10px] bg-module-erp/10 text-module-erp rounded-md border border-module-erp/20">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string | number }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3.5">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="h-3.5 w-3.5 text-muted-foreground/50" />
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-semibold text-foreground">{value}</p>
    </div>
  );
}
