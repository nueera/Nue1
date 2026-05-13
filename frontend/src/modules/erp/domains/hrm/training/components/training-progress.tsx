'use client';

import { BookOpen, CheckCircle2, Clock, TrendingUp, GraduationCap } from 'lucide-react';
import type { Enrollment } from '../types';
import { EmptyState } from '../../../../shared/components/empty-state';

interface TrainingProgressProps {
  enrollments: Enrollment[];
  employeeName: string;
  isLoading?: boolean;
  onViewProgram?: (enrollment: Enrollment) => void;
}

const STATUS_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  enrolled: { bg: 'bg-zinc-500/10', text: 'text-zinc-400', border: 'border-zinc-500/15' },
  'in-progress': { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/15' },
  completed: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/15' },
  cancelled: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/15' },
  'no-show': { bg: 'bg-zinc-500/10', text: 'text-zinc-400', border: 'border-zinc-500/15' },
};

export function TrainingProgress({ enrollments, employeeName, isLoading, onViewProgram }: TrainingProgressProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 animate-pulse">
              <div className="h-6 w-10 bg-white/10 rounded mb-2" />
              <div className="h-3 w-16 bg-white/10 rounded" />
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 animate-pulse">
              <div className="h-4 w-48 bg-white/10 rounded mb-3" />
              <div className="h-2 w-full bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (enrollments.length === 0) {
    return (
      <EmptyState
        icon={GraduationCap}
        title="No training progress"
        description={`${employeeName} is not enrolled in any training programs yet`}
      />
    );
  }

  const completedCount = enrollments.filter((e) => e.status === 'completed').length;
  const inProgressCount = enrollments.filter((e) => e.status === 'in-progress').length;
  const totalHours = enrollments
    .filter((e) => e.status === 'completed')
    .reduce((sum, e) => sum + e.durationHours, 0);

  const upcomingEnrollments = enrollments.filter((e) => e.status === 'enrolled');
  const activeEnrollments = enrollments.filter((e) => e.status === 'in-progress');
  const completedEnrollments = enrollments.filter((e) => e.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Employee header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-module-erp/10 flex items-center justify-center">
          <span className="text-sm font-semibold text-module-erp">{employeeName.charAt(0)}</span>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-foreground">{employeeName}</h3>
          <p className="text-[10px] text-muted-foreground">Training Progress Overview</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span className="text-xl font-bold text-foreground">{completedCount}</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Completed</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-amber-400" />
            <span className="text-xl font-bold text-foreground">{inProgressCount}</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">In Progress</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-module-erp" />
            <span className="text-xl font-bold text-foreground">{totalHours}h</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Training Hours</p>
        </div>
      </div>

      {/* In Progress */}
      {activeEnrollments.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-amber-400" />
            Currently In Progress ({activeEnrollments.length})
          </h4>
          <div className="space-y-2">
            {activeEnrollments.map((enr) => (
              <EnrollmentCard key={enr.id} enrollment={enr} onClick={onViewProgram} />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming */}
      {upcomingEnrollments.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <BookOpen className="h-3.5 w-3.5 text-module-erp" />
            Upcoming Sessions ({upcomingEnrollments.length})
          </h4>
          <div className="space-y-2">
            {upcomingEnrollments.map((enr) => (
              <EnrollmentCard key={enr.id} enrollment={enr} onClick={onViewProgram} />
            ))}
          </div>
        </div>
      )}

      {/* Completed */}
      {completedEnrollments.length > 0 && (
        <div>
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            Completed ({completedEnrollments.length})
          </h4>
          <div className="space-y-2">
            {completedEnrollments.map((enr) => (
              <EnrollmentCard key={enr.id} enrollment={enr} onClick={onViewProgram} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EnrollmentCard({
  enrollment,
  onClick,
}: {
  enrollment: Enrollment;
  onClick?: (enrollment: Enrollment) => void;
}) {
  const statusStyle = STATUS_STYLES[enrollment.status] || STATUS_STYLES.enrolled;

  return (
    <div
      onClick={() => onClick?.(enrollment)}
      className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 hover:bg-white/[0.07] transition-all duration-200 cursor-pointer"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">{enrollment.programTitle}</p>
          <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
            <span>{enrollment.durationHours}h</span>
            {enrollment.score !== undefined && <span>· Score: {enrollment.score}%</span>}
            {enrollment.completedAt && <span>· {new Date(enrollment.completedAt).toLocaleDateString()}</span>}
          </div>
        </div>
        <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border shrink-0 ${statusStyle.bg} ${statusStyle.text} ${statusStyle.border}`}>
          {enrollment.status.replace('-', ' ')}
        </span>
      </div>
      {/* Progress bar */}
      <div className="mt-3 flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              enrollment.status === 'completed'
                ? 'bg-emerald-400'
                : enrollment.status === 'in-progress'
                ? 'bg-amber-400'
                : 'bg-module-erp/50'
            }`}
            style={{ width: `${enrollment.progress}%` }}
          />
        </div>
        <span className="text-[10px] text-muted-foreground shrink-0">{enrollment.progress}%</span>
      </div>
    </div>
  );
}
