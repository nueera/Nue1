'use client';

import { useState } from 'react';
import { CalendarDays, FileText, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompOffRequestProps {
  onSubmit: (data: {
    workedDate: string;
    reason: string;
    project: string;
    hoursWorked: number;
  }) => void;
  isLoading?: boolean;
  onCancel?: () => void;
  className?: string;
}

export function CompOffRequest({ onSubmit, isLoading, onCancel, className }: CompOffRequestProps) {
  const [workedDate, setWorkedDate] = useState('');
  const [reason, setReason] = useState('');
  const [project, setProject] = useState('');
  const [hoursWorked, setHoursWorked] = useState<number>(8);

  const isWeekend = workedDate
    ? [0, 6].includes(new Date(workedDate).getDay())
    : false;
  const isHoliday = false; // Would be computed from holiday list

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workedDate || !reason || !project) return;
    onSubmit({ workedDate, reason, project, hoursWorked });
  };

  return (
    <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-5 ${className || ''}`}>
      <div className="flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
        <h3 className="font-semibold text-foreground text-base">Compensatory Leave Request</h3>
      </div>

      <p className="text-sm text-muted-foreground">
        Request compensatory time off for working on weekends, holidays, or beyond regular hours.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Worked Date */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Date Worked</label>
          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
            <input
              type="date"
              value={workedDate}
              onChange={(e) => setWorkedDate(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
            />
          </div>
          {workedDate && isWeekend && (
            <p className="text-xs text-amber-400 flex items-center gap-1">
              <CalendarDays className="h-3 w-3" strokeWidth={1.8} />
              This date falls on a weekend
            </p>
          )}
        </div>

        {/* Project */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Project / Task</label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
            <input
              type="text"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="Enter project or task name"
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200"
            />
          </div>
        </div>

        {/* Hours Worked */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Hours Worked</label>
          <input
            type="number"
            value={hoursWorked}
            onChange={(e) => setHoursWorked(Number(e.target.value))}
            min={1}
            max={24}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
          />
          <p className="text-xs text-muted-foreground">
            Standard working day is 8 hours. Comp-off is typically 1 day per 8+ hours worked.
          </p>
        </div>

        {/* Reason */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Reason / Supporting Details</label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              placeholder="Describe why you worked on this day and what was accomplished..."
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200 resize-none"
            />
          </div>
        </div>

        {/* Estimated Comp-off */}
        {workedDate && hoursWorked >= 8 && (
          <div className="bg-module-erp/10 border border-module-erp/20 rounded-xl px-4 py-3">
            <p className="text-sm text-foreground">
              Estimated Comp-off: <span className="font-semibold text-module-erp">1 day</span>
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Subject to manager approval
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={isLoading || !workedDate || !reason || !project}
            className="bg-module-erp hover:bg-module-erp/90 text-white press-scale"
          >
            {isLoading ? 'Submitting...' : 'Request Comp-off'}
          </Button>
        </div>
      </form>
    </div>
  );
}
