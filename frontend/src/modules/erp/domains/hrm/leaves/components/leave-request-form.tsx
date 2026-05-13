'use client';

import { useState, useMemo } from 'react';
import { CalendarDays, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { calcLeaveDuration } from '../leave.utils';
import { LEAVE_TYPES } from '../constants';
import type { LeaveType, LeaveBalance } from '../types';

interface LeaveRequestFormProps {
  balances: LeaveBalance[];
  onSubmit: (data: {
    type: LeaveType;
    startDate: string;
    endDate: string;
    reason: string;
  }) => void;
  isLoading?: boolean;
  onCancel?: () => void;
}

export function LeaveRequestForm({ balances, onSubmit, isLoading, onCancel }: LeaveRequestFormProps) {
  const [type, setType] = useState<LeaveType>('annual');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const calculatedDays = useMemo(() => {
    if (!startDate || !endDate) return 0;
    if (new Date(endDate) < new Date(startDate)) return 0;
    return calcLeaveDuration(startDate, endDate);
  }, [startDate, endDate]);

  const currentBalance = balances.find((b) => b.leaveType === type);

  const filteredLeaveTypes = LEAVE_TYPES.filter((t) => t !== 'All') as LeaveType[];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !startDate || !endDate || !reason) return;
    onSubmit({ type, startDate, endDate, reason });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-5">
      {/* Balance Info */}
      {currentBalance && (
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center gap-4">
          <Clock className="h-5 w-5 text-module-erp shrink-0" strokeWidth={1.8} />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground capitalize">{type} Leave Balance</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-muted-foreground">Total: <span className="text-foreground font-medium">{currentBalance.total}</span></span>
              <span className="text-xs text-muted-foreground">Used: <span className="text-foreground font-medium">{currentBalance.used}</span></span>
              <span className="text-xs text-muted-foreground">Pending: <span className="text-orange-400 font-medium">{currentBalance.pending}</span></span>
              <span className="text-xs text-muted-foreground">Available: <span className="text-module-erp font-medium">{currentBalance.available}</span></span>
            </div>
          </div>
        </div>
      )}

      {/* Leave Type */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Leave Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as LeaveType)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
        >
          {filteredLeaveTypes.map((t) => (
            <option key={t} value={t} className="bg-zinc-900 capitalize">
              {t}
            </option>
          ))}
          <option value="paternity" className="bg-zinc-900">Paternity</option>
          <option value="unpaid" className="bg-zinc-900">Unpaid</option>
        </select>
      </div>

      {/* Date Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Start Date</label>
          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">End Date</label>
          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
            />
          </div>
        </div>
      </div>

      {/* Auto-calculated Days */}
      {calculatedDays > 0 && (
        <div className="bg-module-erp/10 border border-module-erp/20 rounded-xl px-4 py-3 flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-module-erp" strokeWidth={1.8} />
          <span className="text-sm text-foreground">
            Duration: <span className="font-semibold text-module-erp">{calculatedDays} day{calculatedDays > 1 ? 's' : ''}</span>
          </span>
        </div>
      )}

      {/* Reason */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Reason</label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" strokeWidth={1.8} />
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={3}
            placeholder="Provide a reason for your leave request..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200 resize-none"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading || !type || !startDate || !endDate || !reason}
          className="bg-module-erp hover:bg-module-erp/90 text-white press-scale"
        >
          {isLoading ? 'Submitting...' : 'Apply Leave'}
        </Button>
      </div>
    </form>
  );
}
