'use client';

import { useState } from 'react';
import { Clock, Mail, Calendar, Play, Pause, Trash2, Plus, Bell } from 'lucide-react';
import type { SavedReport } from '../types';
import { SCHEDULE_FREQUENCIES, SCHEDULE_FREQUENCY_LABELS, REPORT_FORMATS } from '../constants';
import { EmptyState } from '../../../../shared/components/empty-state';

interface ReportSchedulerProps {
  schedules: SavedReport[];
  onToggleSchedule?: (scheduleId: string, isActive: boolean) => void;
  onDeleteSchedule?: (scheduleId: string) => void;
  onAddSchedule?: () => void;
  isLoading?: boolean;
}

export function ReportScheduler({ schedules, onToggleSchedule, onDeleteSchedule, onAddSchedule, isLoading }: ReportSchedulerProps) {
  const scheduledItems = schedules.filter((s) => s.scheduleFrequency);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 animate-pulse">
            <div className="h-4 w-48 bg-white/10 rounded mb-2" />
            <div className="h-3 w-32 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-module-erp" />
          <h3 className="text-sm font-semibold text-foreground">Scheduled Reports</h3>
          <span className="px-1.5 py-0.5 text-[10px] bg-module-erp/10 text-module-erp rounded-md border border-module-erp/20">{scheduledItems.length}</span>
        </div>
        {onAddSchedule && (
          <button onClick={onAddSchedule} className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-module-erp text-white rounded-lg hover:bg-module-erp/90 press-scale transition-all duration-200">
            <Plus className="h-3.5 w-3.5" />
            New Schedule
          </button>
        )}
      </div>

      {scheduledItems.length === 0 ? (
        <EmptyState icon={Clock} title="No scheduled reports" description="Schedule reports to be generated and sent automatically" action={onAddSchedule ? { label: 'Create Schedule', onClick: onAddSchedule } : undefined} />
      ) : (
        <div className="space-y-3">
          {scheduledItems.map((schedule) => (
            <ScheduleCard
              key={schedule.id}
              schedule={schedule}
              onToggle={onToggleSchedule}
              onDelete={onDeleteSchedule}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ScheduleCard({
  schedule,
  onToggle,
  onDelete,
}: {
  schedule: SavedReport;
  onToggle?: (id: string, isActive: boolean) => void;
  onDelete?: (id: string) => void;
}) {
  const isActive = schedule.scheduleIsActive;
  const frequency = schedule.scheduleFrequency ? SCHEDULE_FREQUENCY_LABELS[schedule.scheduleFrequency] || schedule.scheduleFrequency : 'N/A';

  return (
    <div className={`bg-white/5 backdrop-blur-xl border rounded-2xl p-4 transition-all duration-200 ${isActive ? 'border-module-erp/20' : 'border-white/10 opacity-60'}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-semibold text-foreground truncate">{schedule.name}</h4>
            <span className={`px-1.5 py-0.5 text-[9px] font-medium rounded-md border ${isActive ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15' : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/15'}`}>
              {isActive ? 'Active' : 'Paused'}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {frequency}
            </span>
            {schedule.scheduleTime && <span>at {schedule.scheduleTime}</span>}
            <span className="uppercase">{schedule.format}</span>
          </div>

          {/* Recipients */}
          {schedule.scheduleRecipients.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              <Mail className="h-3 w-3 text-muted-foreground/50 shrink-0" />
              <div className="flex items-center gap-1 flex-wrap">
                {schedule.scheduleRecipients.slice(0, 3).map((email, i) => (
                  <span key={i} className="px-1.5 py-0.5 text-[9px] bg-white/5 border border-white/10 rounded-md text-muted-foreground truncate max-w-[140px]">
                    {email}
                  </span>
                ))}
                {schedule.scheduleRecipients.length > 3 && (
                  <span className="text-[9px] text-muted-foreground">+{schedule.scheduleRecipients.length - 3} more</span>
                )}
              </div>
            </div>
          )}

          {/* Next run */}
          {schedule.nextRunAt && isActive && (
            <div className="flex items-center gap-1.5 mt-2 text-[10px] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              Next: {new Date(schedule.nextRunAt).toLocaleString()}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => onToggle?.(schedule.id, !isActive)}
            className={`p-2 rounded-lg transition-all duration-200 ${isActive ? 'hover:bg-amber-500/10 text-amber-400' : 'hover:bg-emerald-500/10 text-emerald-400'}`}
            title={isActive ? 'Pause' : 'Resume'}
          >
            {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(schedule.id)}
              className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-all duration-200"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
