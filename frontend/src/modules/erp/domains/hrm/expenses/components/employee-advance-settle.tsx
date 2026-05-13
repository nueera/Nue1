'use client';

import { useState } from 'react';
import { CheckCircle2, DollarSign, FileText } from 'lucide-react';
import type { EmployeeAdvance } from '../types';
import { fmtExpenseAmount } from '../expense.utils';

interface EmployeeAdvanceSettleProps {
  advance: EmployeeAdvance;
  onSettle: (data: { settledAmount: number; notes?: string }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function EmployeeAdvanceSettle({ advance, onSettle, onCancel, isLoading }: EmployeeAdvanceSettleProps) {
  const remaining = advance.amount - (advance.settledAmount || 0);
  const [settledAmount, setSettledAmount] = useState<number>(remaining);
  const [notes, setNotes] = useState('');

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  const isOverSettling = settledAmount > remaining;
  const isFullySettled = settledAmount >= remaining;

  return (
    <div className="space-y-6">
      {/* Advance Summary */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="h-4 w-4 text-module-erp" />
          <h4 className="text-sm font-semibold text-foreground">Advance Summary</h4>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Total Advance</p>
            <p className="text-sm font-semibold text-foreground">{fmtExpenseAmount(advance.amount)}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Already Settled</p>
            <p className="text-sm font-semibold text-emerald-400">{fmtExpenseAmount(advance.settledAmount || 0)}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Remaining</p>
            <p className="text-sm font-semibold text-amber-400">{fmtExpenseAmount(remaining)}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Settle By</p>
            <p className="text-sm text-muted-foreground">{advance.expectedSettlementDate}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, ((advance.settledAmount || 0) / advance.amount) * 100)}%` }}
            />
          </div>
          <p className="text-[10px] text-muted-foreground/50 mt-1">
            {Math.round(((advance.settledAmount || 0) / advance.amount) * 100)}% settled
          </p>
        </div>
      </div>

      {/* Settlement Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSettle({ settledAmount, notes: notes || undefined });
        }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Settlement Amount <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
            <input
              type="number"
              min={0.01}
              max={remaining}
              step={0.01}
              value={settledAmount || ''}
              onChange={(e) => setSettledAmount(Number(e.target.value))}
              className={`${inputClass} pl-7`}
              required
            />
          </div>
          {isOverSettling && (
            <p className="text-xs text-red-400">Amount exceeds remaining balance</p>
          )}
          {isFullySettled && !isOverSettling && (
            <p className="text-xs text-emerald-400">This will fully settle the advance</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Settlement details or proof reference..."
            rows={2}
            className={`${inputClass} resize-none`}
            maxLength={500}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={settledAmount <= 0 || isOverSettling || isLoading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 press-scale transition-all duration-200 disabled:opacity-50"
          >
            <CheckCircle2 className="h-4 w-4" />
            {isLoading ? 'Processing...' : isFullySettled ? 'Fully Settle' : 'Partial Settle'}
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
    </div>
  );
}
