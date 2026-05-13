'use client';

import { useState, useMemo } from 'react';
import { Banknote, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { fmtCurrency } from '../../payroll/payroll.utils';
import type { LeaveBalance, LeaveType } from '../types';

interface LeaveEncashmentProps {
  balances: LeaveBalance[];
  perDayRate: number;
  onSubmit: (data: { leaveType: LeaveType; days: number; amount: number }) => void;
  isLoading?: boolean;
  className?: string;
}

const ENCASHABLE_TYPES: LeaveType[] = ['annual', 'personal'];

export function LeaveEncashment({ balances, perDayRate, onSubmit, isLoading, className }: LeaveEncashmentProps) {
  const [selectedType, setSelectedType] = useState<LeaveType>('annual');
  const [days, setDays] = useState<number>(0);

  const currentBalance = balances.find((b) => b.leaveType === selectedType);
  const maxEncashable = currentBalance ? Math.max(0, currentBalance.available - 5) : 0; // keep minimum 5 days
  const encashmentAmount = useMemo(() => days * perDayRate, [days, perDayRate]);

  const availableBalances = balances.filter((b) =>
    ENCASHABLE_TYPES.includes(b.leaveType) && b.available > 5,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (days > 0 && selectedType) {
      onSubmit({ leaveType: selectedType, days, amount: encashmentAmount });
    }
  };

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-5', className)}>
      <div className="flex items-center gap-2">
        <Banknote className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
        <h3 className="font-semibold text-foreground text-base">Leave Encashment</h3>
      </div>

      {availableBalances.length === 0 ? (
        <div className="py-6 text-center">
          <Banknote className="h-8 w-8 text-muted-foreground/20 mx-auto mb-2" strokeWidth={1.5} />
          <p className="text-sm text-muted-foreground">No leave types available for encashment</p>
          <p className="text-xs text-muted-foreground/60 mt-1">You need at least 6 days available balance</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Leave Type */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Leave Type</label>
            <select
              value={selectedType}
              onChange={(e) => {
                setSelectedType(e.target.value as LeaveType);
                setDays(0);
              }}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
            >
              {availableBalances.map((b) => (
                <option key={b.leaveType} value={b.leaveType} className="bg-zinc-900 capitalize">
                  {b.leaveType} ({b.available} days available)
                </option>
              ))}
            </select>
          </div>

          {/* Balance Info */}
          {currentBalance && (
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span>Total: <span className="text-foreground font-medium">{currentBalance.total}</span></span>
              <span>Used: <span className="text-foreground font-medium">{currentBalance.used}</span></span>
              <span>Available: <span className="text-module-erp font-medium">{currentBalance.available}</span></span>
              <span>Max Encashable: <span className="text-amber-400 font-medium">{maxEncashable}</span></span>
            </div>
          )}

          {/* Days to Encash */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-foreground">Days to Encash</label>
            <input
              type="number"
              value={days || ''}
              onChange={(e) => setDays(Math.min(Number(e.target.value), maxEncashable))}
              min={1}
              max={maxEncashable}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
              placeholder={`Enter days (max ${maxEncashable})`}
            />
          </div>

          {/* Calculation */}
          {days > 0 && (
            <div className="bg-module-erp/10 border border-module-erp/20 rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-2">
                <Calculator className="h-4 w-4 text-module-erp" strokeWidth={1.8} />
                <span className="text-sm font-medium text-foreground">Encashment Calculation</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-foreground/80">
                  <span>Days</span>
                  <span className="font-medium">{days}</span>
                </div>
                <div className="flex justify-between text-foreground/80">
                  <span>Per Day Rate</span>
                  <span className="font-medium">{fmtCurrency(perDayRate)}</span>
                </div>
                <div className="border-t border-module-erp/20 pt-1 mt-1 flex justify-between text-foreground">
                  <span className="font-semibold">Total Encashment</span>
                  <span className="font-bold text-module-erp">{fmtCurrency(encashmentAmount)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isLoading || days <= 0}
              className="bg-module-erp hover:bg-module-erp/90 text-white press-scale"
            >
              {isLoading ? 'Processing...' : 'Request Encashment'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
