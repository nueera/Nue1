'use client';

import { AlertTriangle, X, Clock, Users } from 'lucide-react';

interface ShiftConflict {
  employeeId: string;
  employeeName: string;
  shiftA: string;
  shiftATiming: string;
  shiftB: string;
  shiftBTiming: string;
  overlapHours: number;
  date: string;
}

interface ShiftConflictWarningProps {
  conflicts: ShiftConflict[];
  onDismiss?: () => void;
  onResolve?: (conflict: ShiftConflict) => void;
}

export function ShiftConflictWarning({ conflicts, onDismiss, onResolve }: ShiftConflictWarningProps) {
  if (conflicts.length === 0) return null;

  return (
    <div className="border border-amber-500/20 bg-amber-500/5 backdrop-blur-xl rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-amber-500/10 bg-amber-500/5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-400" />
          <h4 className="text-sm font-semibold text-amber-300">
            Shift Conflict{conflicts.length > 1 ? 's' : ''} Detected
          </h4>
          <span className="px-2 py-0.5 text-[10px] font-medium bg-amber-500/20 text-amber-300 rounded-full">
            {conflicts.length}
          </span>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1 rounded-lg hover:bg-amber-500/10 text-amber-400/60 hover:text-amber-300 transition-all duration-200"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Conflicts list */}
      <div className="divide-y divide-amber-500/10">
        {conflicts.map((conflict, i) => (
          <div
            key={`${conflict.employeeId}-${i}`}
            className="px-5 py-3.5 hover:bg-amber-500/5 transition-all duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-3.5 w-3.5 text-amber-400/60 shrink-0" />
                  <span className="text-sm font-medium text-foreground truncate">
                    {conflict.employeeName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 bg-white/5 rounded-md border border-white/10 text-foreground">
                    {conflict.shiftA}
                  </span>
                  <span className="text-muted-foreground">+</span>
                  <span className="px-2 py-0.5 bg-white/5 rounded-md border border-white/10 text-foreground">
                    {conflict.shiftB}
                  </span>
                  <span className="text-amber-400/80 ml-1">
                    ({conflict.overlapHours}h overlap)
                  </span>
                </div>
                <div className="flex items-center gap-3 mt-1.5 text-[10px] text-muted-foreground/60">
                  <span className="flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    {conflict.shiftATiming}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-2.5 w-2.5" />
                    {conflict.shiftBTiming}
                  </span>
                  <span>Date: {conflict.date}</span>
                </div>
              </div>

              {onResolve && (
                <button
                  onClick={() => onResolve(conflict)}
                  className="shrink-0 px-3 py-1.5 text-xs font-medium bg-amber-500/10 border border-amber-500/20 text-amber-300 rounded-lg hover:bg-amber-500/20 transition-all duration-200"
                >
                  Resolve
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="px-5 py-2.5 bg-amber-500/5 border-t border-amber-500/10">
        <p className="text-[10px] text-amber-400/60">
          Overlapping shifts may cause attendance tracking issues. Consider adjusting shift timings or reassigning employees.
        </p>
      </div>
    </div>
  );
}
