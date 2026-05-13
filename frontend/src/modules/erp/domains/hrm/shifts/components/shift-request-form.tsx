'use client';

import { useState } from 'react';
import { Send, CalendarDays } from 'lucide-react';
import type { ShiftType } from '../types';
import { SHIFT_REQUEST_REASONS } from '../constants';

interface ShiftRequestFormProps {
  currentShiftId: string;
  availableShifts: ShiftType[];
  onSubmit: (data: {
    requestedShiftId: string;
    reason: string;
    startDate: string;
    endDate?: string;
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function ShiftRequestForm({
  currentShiftId,
  availableShifts,
  onSubmit,
  onCancel,
  isLoading,
}: ShiftRequestFormProps) {
  const [requestedShiftId, setRequestedShiftId] = useState('');
  const [reasonCategory, setReasonCategory] = useState('');
  const [reasonDetail, setReasonDetail] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredShifts = availableShifts.filter((s) => s.id !== currentShiftId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const reason = reasonCategory === 'Other'
      ? reasonDetail
      : `${reasonCategory}: ${reasonDetail}`;
    onSubmit({
      requestedShiftId,
      reason,
      startDate,
      endDate: endDate || undefined,
    });
  };

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  const isValid = requestedShiftId && reasonCategory && reasonDetail && startDate;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Select Shift */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Requested Shift <span className="text-red-400">*</span>
        </label>
        <select
          value={requestedShiftId}
          onChange={(e) => setRequestedShiftId(e.target.value)}
          className={inputClass}
          required
        >
          <option value="" disabled>Select a shift</option>
          {filteredShifts.map((shift) => (
            <option key={shift.id} value={shift.id}>
              {shift.name} ({shift.startTime} – {shift.endTime})
            </option>
          ))}
        </select>
      </div>

      {/* Reason Category */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Reason Category <span className="text-red-400">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {SHIFT_REQUEST_REASONS.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setReasonCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                reasonCategory === cat
                  ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                  : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Reason Detail */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Details <span className="text-red-400">*</span>
        </label>
        <textarea
          value={reasonDetail}
          onChange={(e) => setReasonDetail(e.target.value)}
          placeholder="Please explain why you need this shift change..."
          rows={3}
          className={`${inputClass} resize-none`}
          required
          maxLength={500}
        />
        <p className="text-[10px] text-muted-foreground/50 text-right">
          {reasonDetail.length}/500
        </p>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Effective From <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Until (Optional)
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            className={inputClass}
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          {isLoading ? 'Submitting...' : 'Submit Request'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 transition-all duration-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
