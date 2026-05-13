'use client';

import { useMemo } from 'react';
import { Sun, Moon, Sunrise, Sunset } from 'lucide-react';

interface ShiftTimingPickerProps {
  startTime: string;
  endTime: string;
  onStartTimeChange: (time: string) => void;
  onEndTimeChange: (time: string) => void;
  graceMinutes?: number;
  onGraceMinutesChange?: (minutes: number) => void;
}

function getTimeOfDay(startTime: string, endTime: string): { period: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>; color: string } {
  const [startH] = startTime.split(':').map(Number);
  const [endH] = endTime.split(':').map(Number);

  if (startH >= 5 && startH < 12) return { period: 'Morning', icon: Sunrise, color: '#F59E0B' };
  if (startH >= 12 && startH < 17) return { period: 'Afternoon', icon: Sun, color: '#EF4444' };
  if (startH >= 17 && startH < 21) return { period: 'Evening', icon: Sunset, color: '#8B5CF6' };
  if (startH >= 21 || endH <= 6) return { period: 'Night', icon: Moon, color: '#3B82F6' };
  return { period: 'Day', icon: Sun, color: '#10B981' };
}

function calcShiftHours(startTime: string, endTime: string): number {
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);
  const startMin = startH * 60 + startM;
  const endMin = endH * 60 + endM;
  if (endMin > startMin) return (endMin - startMin) / 60;
  return (24 * 60 - startMin + endMin) / 60;
}

export function ShiftTimingPicker({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  graceMinutes = 15,
  onGraceMinutesChange,
}: ShiftTimingPickerProps) {
  const hours = calcShiftHours(startTime, endTime);
  const { period, icon: PeriodIcon, color } = useMemo(
    () => getTimeOfDay(startTime, endTime),
    [startTime, endTime]
  );

  // Generate a simple visual timeline
  const startHour = parseInt(startTime.split(':')[0]);
  const endHour = parseInt(endTime.split(':')[0]);
  const isOvernight = endHour <= startHour;

  const inputClass = 'bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200 w-full';

  return (
    <div className="space-y-5">
      {/* Visual indicator */}
      <div
        className="flex items-center gap-3 p-4 rounded-xl border"
        style={{
          backgroundColor: `${color}08`,
          borderColor: `${color}20`,
        }}
      >
        <PeriodIcon className="h-6 w-6 shrink-0" style={{ color }} />
        <div>
          <p className="text-sm font-medium text-foreground">{period} Shift</p>
          <p className="text-xs text-muted-foreground">
            {startTime} – {endTime} · {hours}h duration
          </p>
        </div>
      </div>

      {/* Timeline bar */}
      <div className="space-y-1">
        <div className="flex items-center gap-1">
          {Array.from({ length: 24 }).map((_, h) => {
            let isActive = false;
            if (isOvernight) {
              isActive = h >= startHour || h < endHour;
            } else {
              isActive = h >= startHour && h < endHour;
            }
            return (
              <div
                key={h}
                className="flex-1 h-6 rounded-sm transition-all duration-200"
                style={{
                  backgroundColor: isActive ? `${color}30` : 'rgba(255,255,255,0.03)',
                  border: isActive ? `1px solid ${color}40` : '1px solid transparent',
                }}
                title={`${h.toString().padStart(2, '0')}:00`}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-[9px] text-muted-foreground/50">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>23:59</span>
        </div>
      </div>

      {/* Time inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Start Time
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => onStartTimeChange(e.target.value)}
            className={inputClass}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            End Time
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => onEndTimeChange(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Grace minutes */}
      {onGraceMinutesChange && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Grace Period (minutes)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={30}
              step={5}
              value={graceMinutes}
              onChange={(e) => onGraceMinutesChange(Number(e.target.value))}
              className="flex-1 accent-module-erp"
            />
            <span className="text-sm font-medium text-foreground w-12 text-right">{graceMinutes}m</span>
          </div>
        </div>
      )}
    </div>
  );
}
