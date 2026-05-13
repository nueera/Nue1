'use client';

import { useState } from 'react';
import { Landmark, Save, Percent, DollarSign, Calendar } from 'lucide-react';
import { REPAYMENT_FREQUENCIES } from '../constants';

interface LoanTypeFormProps {
  initialData?: {
    name?: string;
    description?: string;
    interestRate?: number;
    maxAmount?: number;
    maxTenureMonths?: number;
    repaymentFrequency?: string;
    processingFee?: number;
    requiresGuarantor?: boolean;
    maxLoanToSalaryRatio?: number;
  };
  onSubmit: (data: {
    name: string;
    description: string;
    interestRate: number;
    maxAmount: number;
    maxTenureMonths: number;
    repaymentFrequency: 'monthly' | 'quarterly';
    processingFee?: number;
    requiresGuarantor: boolean;
    maxLoanToSalaryRatio?: number;
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function LoanTypeForm({ initialData, onSubmit, onCancel, isLoading }: LoanTypeFormProps) {
  const [name, setName] = useState(initialData?.name ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [interestRate, setInterestRate] = useState(initialData?.interestRate ?? 8.5);
  const [maxAmount, setMaxAmount] = useState(initialData?.maxAmount ?? 0);
  const [maxTenureMonths, setMaxTenureMonths] = useState(initialData?.maxTenureMonths ?? 12);
  const [repaymentFrequency, setRepaymentFrequency] = useState<string>(initialData?.repaymentFrequency ?? 'monthly');
  const [processingFee, setProcessingFee] = useState(initialData?.processingFee ?? 0);
  const [requiresGuarantor, setRequiresGuarantor] = useState(initialData?.requiresGuarantor ?? false);
  const [maxLoanToSalaryRatio, setMaxLoanToSalaryRatio] = useState(initialData?.maxLoanToSalaryRatio ?? 6);

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  const isValid = name && description && interestRate >= 0 && maxAmount > 0 && maxTenureMonths > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description,
      interestRate,
      maxAmount,
      maxTenureMonths,
      repaymentFrequency: repaymentFrequency as 'monthly' | 'quarterly',
      processingFee: processingFee > 0 ? processingFee : undefined,
      requiresGuarantor,
      maxLoanToSalaryRatio: maxLoanToSalaryRatio > 0 ? maxLoanToSalaryRatio : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Name <span className="text-red-400">*</span></label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Personal Loan" className={inputClass} required />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description <span className="text-red-400">*</span></label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" className={inputClass} required />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Percent className="h-3 w-3" />Interest Rate (%)</label>
          <input type="number" min={0} max={50} step={0.1} value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className={inputClass} required />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1"><DollarSign className="h-3 w-3" />Max Amount (₹)</label>
          <input type="number" min={0} value={maxAmount || ''} onChange={(e) => setMaxAmount(Number(e.target.value))} className={inputClass} required />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1"><Calendar className="h-3 w-3" />Max Tenure (months)</label>
          <input type="number" min={1} value={maxTenureMonths} onChange={(e) => setMaxTenureMonths(Number(e.target.value))} className={inputClass} required />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Repayment</label>
          <select value={repaymentFrequency} onChange={(e) => setRepaymentFrequency(e.target.value)} className={inputClass}>
            {REPAYMENT_FREQUENCIES.map((f) => (
              <option key={f} value={f}>{f.charAt(0).toUpperCase() + f.slice(1)}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Processing Fee (₹)</label>
          <input type="number" min={0} value={processingFee || ''} onChange={(e) => setProcessingFee(Number(e.target.value))} className={inputClass} />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Max Loan-to-Salary Ratio</label>
          <input type="number" min={0} max={20} step={0.5} value={maxLoanToSalaryRatio} onChange={(e) => setMaxLoanToSalaryRatio(Number(e.target.value))} className={inputClass} />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Requires Guarantor</label>
          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              onClick={() => setRequiresGuarantor(!requiresGuarantor)}
              className={`relative w-10 h-5 rounded-full transition-all duration-200 ${requiresGuarantor ? 'bg-module-erp' : 'bg-white/10'}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${requiresGuarantor ? 'translate-x-5' : ''}`} />
            </button>
            <span className="text-sm text-muted-foreground">{requiresGuarantor ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={!isValid || isLoading} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50">
          <Landmark className="h-4 w-4" />
          {isLoading ? 'Saving...' : initialData ? 'Update Loan Type' : 'Create Loan Type'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 transition-all duration-200">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
