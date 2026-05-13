'use client';

import { useState } from 'react';
import { Clock, CheckCircle2, Calendar, Briefcase, Coffee } from 'lucide-react';
import { EmptyState } from '../../../../shared/components/empty-state';

interface WorkSummaryRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  checkIn: string;
  checkOut: string;
  hoursWorked: number;
  tasksCompleted: number;
  status: 'present' | 'absent' | 'late' | 'half-day';
}

interface DailyWorkSummaryProps {
  data: WorkSummaryRecord[];
  isLoading?: boolean;
  selectedDate?: string;
  onDateChange?: (date: string) => void;
}

export function DailyWorkSummary({ data, isLoading, selectedDate, onDateChange }: DailyWorkSummaryProps) {
  const [date, setDate] = useState(selectedDate || new Date().toISOString().split('T')[0]);

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    onDateChange?.(newDate);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-48 bg-white/10 rounded animate-pulse" />
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 animate-pulse">
              <div className="h-6 w-12 bg-white/10 rounded mb-2" />
              <div className="h-3 w-20 bg-white/10 rounded" />
            </div>
          ))}
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl h-64 animate-pulse" />
      </div>
    );
  }

  const presentCount = data.filter((d) => d.status === 'present').length;
  const lateCount = data.filter((d) => d.status === 'late').length;
  const totalHours = data.reduce((sum, d) => sum + d.hoursWorked, 0);
  const totalTasks = data.reduce((sum, d) => sum + d.tasksCompleted, 0);

  return (
    <div className="space-y-6">
      {/* Date Picker */}
      <div className="flex items-center gap-3">
        <Calendar className="h-4 w-4 text-muted-foreground" />
        <input
          type="date"
          value={date}
          onChange={(e) => handleDateChange(e.target.value)}
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2 text-sm text-foreground outline-none focus:border-module-erp/50 transition-all duration-200"
        />
        <span className="text-xs text-muted-foreground">
          {new Date(date).toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span className="text-xl font-bold text-foreground">{presentCount}</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Present</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Coffee className="h-4 w-4 text-amber-400" />
            <span className="text-xl font-bold text-amber-400">{lateCount}</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Late</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="h-4 w-4 text-module-erp" />
            <span className="text-xl font-bold text-foreground">{totalHours.toFixed(1)}h</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Hours</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Briefcase className="h-4 w-4 text-violet-400" />
            <span className="text-xl font-bold text-foreground">{totalTasks}</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Tasks Done</p>
        </div>
      </div>

      {/* Table */}
      {data.length === 0 ? (
        <EmptyState icon={Calendar} title="No work data" description={`No records found for ${new Date(date).toLocaleDateString()}`} />
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Employee</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Department</th>
                  <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Check In</th>
                  <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Check Out</th>
                  <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Hours</th>
                  <th className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Tasks</th>
                  <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((record) => (
                  <tr key={record.id} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-module-erp/10 flex items-center justify-center shrink-0">
                          <span className="text-[9px] font-semibold text-module-erp">{record.employeeName.charAt(0)}</span>
                        </div>
                        <span className="text-sm text-foreground font-medium">{record.employeeName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-sm text-muted-foreground">{record.department}</td>
                    <td className="px-5 py-3 text-sm text-foreground text-center">{record.checkIn || '—'}</td>
                    <td className="px-5 py-3 text-sm text-foreground text-center">{record.checkOut || '—'}</td>
                    <td className="px-5 py-3 text-center">
                      <span className="text-sm text-foreground">{record.hoursWorked > 0 ? `${record.hoursWorked}h` : '—'}</span>
                    </td>
                    <td className="px-5 py-3 text-center">
                      <span className="text-sm text-foreground">{record.tasksCompleted > 0 ? record.tasksCompleted : '—'}</span>
                    </td>
                    <td className="px-5 py-3">
                      <AttendanceStatusBadge status={record.status} />
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

function AttendanceStatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    present: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15',
    absent: 'bg-red-500/10 text-red-400 border-red-500/15',
    late: 'bg-amber-500/10 text-amber-400 border-amber-500/15',
    'half-day': 'bg-violet-500/10 text-violet-400 border-violet-500/15',
  };
  const style = styles[status] || styles.absent;
  return (
    <span className={`inline-flex px-2 py-0.5 text-[10px] font-medium rounded-md border capitalize ${style}`}>
      {status.replace('-', ' ')}
    </span>
  );
}
