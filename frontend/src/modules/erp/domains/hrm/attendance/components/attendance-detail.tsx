'use client';

import { ArrowLeft, Clock, LogIn, LogOut, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { StatusBadge } from '../../../../shared/components/status-badge';
import { DataCard } from '../../../../shared/components/data-card/data-card';
import type { AttendanceRecord, SwipeLog } from '../types';
import { calcWorkHours, fmtDuration } from '../attendance.utils';

interface AttendanceDetailProps {
  record: AttendanceRecord;
  swipeLogs?: SwipeLog[];
  onBack?: () => void;
}

export function AttendanceDetail({ record, swipeLogs = [], onBack }: AttendanceDetailProps) {
  const workHours = calcWorkHours(record.checkIn, record.checkOut);

  return (
    <div className="space-y-5">
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      )}

      {/* Day Summary */}
      <DataCard title={new Date(record.date).toLocaleDateString('en-IN', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-green-500/10 text-green-500 shrink-0">
              <LogIn className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Check In</p>
              <p className="text-sm font-medium text-foreground font-mono">{record.checkIn}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-red-500/10 text-red-500 shrink-0">
              <LogOut className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Check Out</p>
              <p className="text-sm font-medium text-foreground font-mono">{record.checkOut}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-module-erp/10 text-module-erp shrink-0">
              <Clock className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Work Hours</p>
              <p className="text-sm font-medium text-foreground">{fmtDuration(workHours)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0">
              <StatusBadge status={record.status} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-sm font-medium text-foreground capitalize">{record.status.replace('-', ' ')}</p>
            </div>
          </div>
        </div>
      </DataCard>

      {/* Swipe Logs */}
      <DataCard title="Swipe Logs">
        {swipeLogs.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">No swipe logs available for this day.</p>
        ) : (
          <div className="space-y-2">
            {swipeLogs.map((log) => (
              <SwipeLogEntry key={log.id} log={log} />
            ))}
          </div>
        )}
      </DataCard>
    </div>
  );
}

function SwipeLogEntry({ log }: { log: SwipeLog }) {
  const isIn = log.direction === 'in';

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
      <div className={`flex items-center justify-center w-8 h-8 rounded-lg shrink-0 ${isIn ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
        {isIn ? <LogIn className="h-4 w-4" /> : <LogOut className="h-4 w-4" />}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground capitalize">{log.direction}</span>
          <span className="text-xs text-muted-foreground font-mono">
            {new Date(log.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
          </span>
        </div>
        <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span className="capitalize">{log.source}</span>
        </div>
      </div>
    </div>
  );
}
