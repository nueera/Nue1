'use client';

import { useState } from 'react';
import { Wallet, Calendar, Send } from 'lucide-react';

interface EmployeeAdvanceFormProps {
  onSubmit: (data: {
    amount: number;
    reason: string;
    expectedSettlementDate: string;
    projectId?: string;
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function EmployeeAdvanceForm({ onSubmit, onCancel, isLoading }: EmployeeAdvanceFormProps) {
  const [amount, setAmount] = useState<number>(0);
  const [reason, setReason] = useState('');
  const [expectedSettlementDate, setExpectedSettlementDate] = useState('');
  const [projectId, setProjectId] = useState('');

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  const isValid = amount > 0 && reason && expectedSettlementDate;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          amount,
          reason,
          expectedSettlementDate,
          projectId: projectId || undefined,
        });
      }}
      className="space-y-6"
    >
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Amount <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
          <input
            type="number"
            min={1}
            step={0.01}
            value={amount || ''}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="0.00"
            className={`${inputClass} pl-7`}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Purpose <span className="text-red-400">*</span>
        </label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Describe why you need this advance..."
          rows={3}
          className={`${inputClass} resize-none`}
          required
          maxLength={500}
        />
        <p className="text-[10px] text-muted-foreground/50 text-right">{reason.length}/500</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Expected Settlement Date <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            value={expectedSettlementDate}
            onChange={(e) => setExpectedSettlementDate(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Project (Optional)
          </label>
          <input
            type="text"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            placeholder="Project ID or name"
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          {isLoading ? 'Submitting...' : 'Request Advance'}
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
