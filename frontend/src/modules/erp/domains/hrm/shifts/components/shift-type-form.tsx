'use client';

import { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import type { ShiftType } from '../types';
import { SHIFT_TIMING_PRESETS } from '../constants';

interface ShiftTypeFormProps {
  initialData?: ShiftType;
  onSubmit: (data: {
    name: string;
    startTime: string;
    endTime: string;
    graceMinutes: number;
    isNightShift: boolean;
    color?: string;
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function ShiftTypeForm({ initialData, onSubmit, onCancel, isLoading }: ShiftTypeFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [startTime, setStartTime] = useState(initialData?.startTime ?? '09:00');
  const [endTime, setEndTime] = useState(initialData?.endTime ?? '18:00');
  const [graceMinutes, setGraceMinutes] = useState(initialData?.graceMinutes ?? 15);
  const [isNightShift, setIsNightShift] = useState(initialData?.isNightShift ?? false);
  const [color, setColor] = useState(initialData?.color ?? '#3B82F6');

  const handlePresetSelect = (preset: typeof SHIFT_TIMING_PRESETS[number]) => {
    setName(preset.name.split(' (')[0]);
    setStartTime(preset.startTime);
    setEndTime(preset.endTime);
    setGraceMinutes(preset.graceMinutes);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, startTime, endTime, graceMinutes, isNightShift, color });
  };

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Presets */}
      {!initialData && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Quick Presets
          </label>
          <div className="flex flex-wrap gap-2">
            {SHIFT_TIMING_PRESETS.map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                className="px-3 py-1.5 text-xs font-medium bg-white/5 backdrop-blur-md border border-white/10 rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Name */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Shift Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., General Shift"
          className={inputClass}
          required
        />
      </div>

      {/* Time Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Start Time <span className="text-red-400">*</span>
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            End Time <span className="text-red-400">*</span>
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className={inputClass}
            required
          />
        </div>
      </div>

      {/* Grace Period */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Grace Period (minutes)
        </label>
        <input
          type="number"
          min={0}
          max={60}
          value={graceMinutes}
          onChange={(e) => setGraceMinutes(Number(e.target.value))}
          className={inputClass}
        />
        <p className="text-[10px] text-muted-foreground/50">
          Late arrivals within this window are not penalized
        </p>
      </div>

      {/* Night Shift & Color */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Night Shift
          </label>
          <div className="flex items-center gap-3 mt-1">
            <button
              type="button"
              onClick={() => setIsNightShift(!isNightShift)}
              className={`relative w-10 h-5 rounded-full transition-all duration-200 ${
                isNightShift ? 'bg-module-erp' : 'bg-white/10'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  isNightShift ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className="text-sm text-muted-foreground">
              {isNightShift ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="h-10 w-10 rounded-lg border border-white/10 bg-transparent cursor-pointer"
            />
            <span className="text-sm text-muted-foreground">{color}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isLoading ? 'Saving...' : initialData ? 'Update Shift Type' : 'Create Shift Type'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 transition-all duration-200"
          >
            <RotateCcw className="h-4 w-4" />
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
