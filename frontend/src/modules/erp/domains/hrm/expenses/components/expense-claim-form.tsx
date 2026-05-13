'use client';

import { useState } from 'react';
import { Save, Receipt, DollarSign, Car } from 'lucide-react';
import type { ExpenseCategory } from '../types';
import { EXPENSE_CATEGORIES } from '../constants';
import { calcMileage, fmtExpenseAmount } from '../expense.utils';
import { MILEAGE_RATE_PER_KM } from '../constants';

interface ExpenseClaimFormProps {
  categories: ExpenseCategory[];
  onSubmit: (data: {
    category: string;
    amount: number;
    date: string;
    description: string;
    receiptUrl?: string;
    projectId?: string;
    isBillable: boolean;
    mileageKm?: number;
    travelFrom?: string;
    travelTo?: string;
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function ExpenseClaimForm({ categories, onSubmit, onCancel, isLoading }: ExpenseClaimFormProps) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState('');
  const [isBillable, setIsBillable] = useState(false);
  const [projectId, setProjectId] = useState('');
  const [mileageKm, setMileageKm] = useState<number>(0);
  const [travelFrom, setTravelFrom] = useState('');
  const [travelTo, setTravelTo] = useState('');

  const selectedCategory = categories.find((c) => c.name === category);
  const mileageAmount = category === 'Transport' && mileageKm > 0 ? calcMileage(mileageKm) : 0;
  const effectiveAmount = mileageAmount > 0 ? mileageAmount : amount;
  const exceedsLimit = selectedCategory?.maxAmount ? effectiveAmount > selectedCategory.maxAmount : false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      category,
      amount: effectiveAmount,
      date,
      description,
      isBillable,
      projectId: projectId || undefined,
      mileageKm: mileageKm > 0 ? mileageKm : undefined,
      travelFrom: travelFrom || undefined,
      travelTo: travelTo || undefined,
    });
  };

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  const isValid = category && effectiveAmount > 0 && date && description;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Category */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Category <span className="text-red-400">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {EXPENSE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                category === cat
                  ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                  : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        {selectedCategory?.maxAmount && (
          <p className="text-[10px] text-muted-foreground/50">
            Limit: {fmtExpenseAmount(selectedCategory.maxAmount)}
            {selectedCategory.requiresReceipt && ' · Receipt required'}
          </p>
        )}
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Amount <span className="text-red-400">*</span>
        </label>
        {category === 'Transport' ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4 text-muted-foreground shrink-0" />
              <input
                type="number"
                min={0}
                value={mileageKm || ''}
                onChange={(e) => setMileageKm(Number(e.target.value))}
                placeholder="Distance (km)"
                className={inputClass}
              />
            </div>
            {mileageKm > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 bg-module-erp/5 border border-module-erp/20 rounded-lg">
                <DollarSign className="h-3.5 w-3.5 text-module-erp" />
                <span className="text-xs text-module-erp">
                  Auto-calculated: {fmtExpenseAmount(mileageAmount)} ({MILEAGE_RATE_PER_KM}/km × {mileageKm}km)
                </span>
              </div>
            )}
            <div className="space-y-2">
              <input
                type="text"
                value={travelFrom}
                onChange={(e) => setTravelFrom(e.target.value)}
                placeholder="Travel from"
                className={inputClass}
              />
              <input
                type="text"
                value={travelTo}
                onChange={(e) => setTravelTo(e.target.value)}
                placeholder="Travel to"
                className={inputClass}
              />
            </div>
          </div>
        ) : (
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
            <input
              type="number"
              min={0.01}
              step={0.01}
              value={amount || ''}
              onChange={(e) => setAmount(Number(e.target.value))}
              placeholder="0.00"
              className={`${inputClass} pl-7`}
            />
          </div>
        )}
        {exceedsLimit && (
          <p className="text-xs text-red-400">
            Amount exceeds category limit of {fmtExpenseAmount(selectedCategory!.maxAmount!)}
          </p>
        )}
      </div>

      {/* Date & Billable */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Date <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Billable
          </label>
          <div className="flex items-center gap-3 mt-2">
            <button
              type="button"
              onClick={() => setIsBillable(!isBillable)}
              className={`relative w-10 h-5 rounded-full transition-all duration-200 ${
                isBillable ? 'bg-emerald-500' : 'bg-white/10'
              }`}
            >
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                isBillable ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
            <span className="text-sm text-muted-foreground">{isBillable ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Description <span className="text-red-400">*</span>
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the expense..."
          rows={3}
          className={`${inputClass} resize-none`}
          required
          maxLength={1000}
        />
      </div>

      {/* Project (optional) */}
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

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={!isValid || isLoading || exceedsLimit}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {isLoading ? 'Submitting...' : 'Submit Claim'}
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
