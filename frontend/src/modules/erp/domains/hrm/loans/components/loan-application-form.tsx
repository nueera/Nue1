'use client';

import { useState, useMemo } from 'react';
import { Landmark, Send, Calculator, DollarSign } from 'lucide-react';
import type { LoanType } from '../types';
import { calcEMI, calcInterest } from '../loan.utils';

interface LoanApplicationFormProps {
  loanTypes: LoanType[];
  onSubmit: (data: {
    loanTypeId: string;
    amount: number;
    tenureMonths: number;
    purpose: string;
    guarantorId?: string;
    supportingDocUrl?: string;
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function LoanApplicationForm({ loanTypes, onSubmit, onCancel, isLoading }: LoanApplicationFormProps) {
  const [loanTypeId, setLoanTypeId] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [tenureMonths, setTenureMonths] = useState<number>(12);
  const [purpose, setPurpose] = useState('');
  const [guarantorId, setGuarantorId] = useState('');
  const [supportingDocUrl, setSupportingDocUrl] = useState('');

  const selectedType = loanTypes.find((lt) => lt.id === loanTypeId);

  const emi = useMemo(() => {
    if (!selectedType || amount <= 0 || tenureMonths <= 0) return 0;
    return calcEMI(amount, selectedType.interestRate, tenureMonths);
  }, [selectedType, amount, tenureMonths]);

  const totalInterest = useMemo(() => {
    if (!selectedType || amount <= 0 || tenureMonths <= 0) return 0;
    return calcInterest(amount, selectedType.interestRate, tenureMonths);
  }, [selectedType, amount, tenureMonths]);

  const exceedsMax = selectedType ? amount > selectedType.maxAmount : false;
  const exceedsTenure = selectedType ? tenureMonths > selectedType.maxTenureMonths : false;

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  const isValid = loanTypeId && amount > 0 && tenureMonths > 0 && purpose && !exceedsMax && !exceedsTenure;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      loanTypeId,
      amount,
      tenureMonths,
      purpose,
      guarantorId: guarantorId || undefined,
      supportingDocUrl: supportingDocUrl || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Loan Type */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Loan Type <span className="text-red-400">*</span></label>
        <select value={loanTypeId} onChange={(e) => setLoanTypeId(e.target.value)} className={inputClass} required>
          <option value="" disabled>Select a loan type</option>
          {loanTypes.filter((lt) => lt.isActive).map((lt) => (
            <option key={lt.id} value={lt.id}>{lt.name} — {lt.interestRate}% p.a.</option>
          ))}
        </select>
        {selectedType && (
          <p className="text-[10px] text-muted-foreground/50">
            Max: ₹{selectedType.maxAmount.toLocaleString('en-IN')} · Tenure: up to {selectedType.maxTenureMonths} months · {selectedType.repaymentFrequency} repayment
          </p>
        )}
      </div>

      {/* Amount & Tenure */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Amount (₹) <span className="text-red-400">*</span></label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
            <input type="number" min={1} value={amount || ''} onChange={(e) => setAmount(Number(e.target.value))} className={`${inputClass} pl-7`} required />
          </div>
          {exceedsMax && <p className="text-xs text-red-400">Exceeds max amount of ₹{selectedType!.maxAmount.toLocaleString('en-IN')}</p>}
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tenure (months) <span className="text-red-400">*</span></label>
          <input type="number" min={1} max={selectedType?.maxTenureMonths || 360} value={tenureMonths} onChange={(e) => setTenureMonths(Number(e.target.value))} className={inputClass} required />
          {exceedsTenure && <p className="text-xs text-red-400">Exceeds max tenure of {selectedType!.maxTenureMonths} months</p>}
        </div>
      </div>

      {/* EMI Preview */}
      {emi > 0 && (
        <div className="bg-module-erp/5 border border-module-erp/20 rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Calculator className="h-4 w-4 text-module-erp" />
            <h4 className="text-xs font-medium text-module-erp uppercase tracking-wider">EMI Preview</h4>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-[10px] text-muted-foreground">Monthly EMI</p>
              <p className="text-sm font-bold text-foreground">₹{emi.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Total Interest</p>
              <p className="text-sm font-bold text-amber-400">₹{totalInterest.toLocaleString('en-IN')}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">Total Payment</p>
              <p className="text-sm font-bold text-foreground">₹{(emi * tenureMonths).toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      )}

      {/* Purpose */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Purpose <span className="text-red-400">*</span></label>
        <textarea value={purpose} onChange={(e) => setPurpose(e.target.value)} placeholder="Explain the purpose of this loan..." rows={3} className={`${inputClass} resize-none`} required maxLength={1000} />
      </div>

      {/* Optional fields */}
      {selectedType?.requiresGuarantor && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Guarantor Employee ID</label>
          <input type="text" value={guarantorId} onChange={(e) => setGuarantorId(e.target.value)} placeholder="Employee ID of guarantor" className={inputClass} />
        </div>
      )}

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Supporting Document URL</label>
        <input type="url" value={supportingDocUrl} onChange={(e) => setSupportingDocUrl(e.target.value)} placeholder="https://..." className={inputClass} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={!isValid || isLoading} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50">
          <Landmark className="h-4 w-4" />
          {isLoading ? 'Submitting...' : 'Apply for Loan'}
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
