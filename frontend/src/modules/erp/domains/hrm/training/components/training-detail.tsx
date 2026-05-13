'use client';

import { GraduationCap, Users, Clock, Star, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import type { TrainingProgram, Enrollment, TrainingFeedback, TrainingSession } from '../types';
import { PROGRAM_STATUS_LABELS, DELIVERY_MODE_LABELS } from '../constants';
import { calcCompletionRate, getAvgFeedbackScore } from '../training.utils';

interface TrainingDetailProps {
  program: TrainingProgram;
  enrollments?: Enrollment[];
  sessions?: TrainingSession[];
  feedback?: TrainingFeedback[];
  onEdit?: () => void;
  onEnroll?: () => void;
}

export function TrainingDetail({ program, enrollments = [], sessions = [], feedback = [], onEdit, onEnroll }: TrainingDetailProps) {
  const completionRate = calcCompletionRate(program.enrolledCount, program.completedCount);
  const avgRating = getAvgFeedbackScore(feedback.map((f) => f.rating));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-foreground">{program.title}</h3>
              {program.isMandatory && (
                <span className="px-1.5 py-0.5 text-[9px] font-medium bg-red-500/10 text-red-400 rounded border border-red-500/15">Mandatory</span>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>{program.category}</span>
              <span>·</span>
              <span>{DELIVERY_MODE_LABELS[program.deliveryMode]}</span>
              {program.location && <><span>·</span><span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{program.location}</span></>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onEdit && <button onClick={onEdit} className="px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 rounded-lg text-foreground hover:bg-white/10 transition-all duration-200">Edit</button>}
            {onEnroll && <button onClick={onEnroll} className="px-3 py-1.5 text-xs font-medium bg-module-erp/10 border border-module-erp/20 text-module-erp rounded-lg hover:bg-module-erp/20 transition-all duration-200">Enroll</button>}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <StatItem icon={Users} label="Enrolled" value={`${program.enrolledCount}/${program.maxParticipants}`} />
        <StatItem icon={CheckCircle2} label="Completed" value={`${program.completedCount} (${completionRate}%)`} />
        <StatItem icon={Clock} label="Duration" value={`${program.durationHours}h`} />
        <StatItem icon={Calendar} label="Dates" value={`${program.startDate} → ${program.endDate}`} />
        <StatItem icon={Star} label="Rating" value={avgRating > 0 ? `${avgRating}/5` : 'N/A'} />
      </div>

      {/* Description */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Description</h4>
        <p className="text-sm text-foreground whitespace-pre-wrap">{program.description}</p>
        {program.skills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {program.skills.map((skill) => (
              <span key={skill} className="px-2 py-0.5 text-[10px] bg-module-erp/10 text-module-erp rounded-md border border-module-erp/20">{skill}</span>
            ))}
          </div>
        )}
      </div>

      {/* Enrollments */}
      {enrollments.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Enrolled Participants ({enrollments.length})</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {enrollments.map((enr) => (
              <div key={enr.id} className="flex items-center justify-between px-3 py-2 bg-white/[0.03] rounded-lg border border-white/5">
                <span className="text-sm text-foreground">{enr.employeeName}</span>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-module-erp rounded-full" style={{ width: `${enr.progress}%` }} />
                  </div>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                    enr.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15' :
                    enr.status === 'in-progress' ? 'bg-amber-500/10 text-amber-400 border-amber-500/15' :
                    'bg-zinc-500/10 text-zinc-400 border-zinc-500/15'
                  }`}>{enr.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Feedback Summary */}
      {feedback.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Feedback Summary</h4>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-foreground">{avgRating}</p>
              <div className="flex items-center justify-center gap-0.5 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < Math.round(avgRating) ? 'text-amber-400 fill-amber-400' : 'text-white/10'}`} />
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground mt-1">{feedback.length} reviews</p>
            </div>
            <div className="flex-1 space-y-1">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = feedback.filter((f) => Math.round(f.rating) === stars).length;
                const pct = feedback.length > 0 ? (count / feedback.length) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground w-3">{stars}</span>
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="text-[10px] text-muted-foreground w-6 text-right">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatItem({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="h-3 w-3 text-muted-foreground/50" />
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-xs font-medium text-foreground">{value}</p>
    </div>
  );
}
