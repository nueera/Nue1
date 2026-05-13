'use client';

import { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Employee } from '../types';

interface EmployeePromotionProps {
  employee: Employee;
  onSubmit: (data: PromotionData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export interface PromotionData {
  newPosition: string;
  newSalary: number;
  effectiveDate: string;
  reason: string;
}

export function EmployeePromotion({ employee, onSubmit, onCancel, isLoading }: EmployeePromotionProps) {
  const [form, setForm] = useState<PromotionData>({
    newPosition: '',
    newSalary: employee.salary,
    effectiveDate: '',
    reason: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.newPosition) newErrors.newPosition = 'New position is required';
    if (!form.newSalary || form.newSalary <= 0) newErrors.newSalary = 'Valid salary is required';
    if (!form.effectiveDate) newErrors.effectiveDate = 'Effective date is required';
    if (!form.reason) newErrors.reason = 'Reason is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  const salaryIncrease = form.newSalary - employee.salary;
  const salaryIncreasePct = employee.salary > 0 ? ((salaryIncrease / employee.salary) * 100).toFixed(1) : '0';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Current Info */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-module-erp" />
          Promote Employee
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Current Position</p>
            <p className="font-medium text-foreground">{employee.position}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Current CTC</p>
            <p className="font-medium text-foreground">₹{employee.salary.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </div>

      {/* Promotion Details */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Promotion Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">New Position *</Label>
            <Input
              value={form.newPosition}
              onChange={(e) => setForm((p) => ({ ...p, newPosition: e.target.value }))}
              className="bg-white/5 border-white/10"
              placeholder="Enter new position"
            />
            {errors.newPosition && <p className="text-xs text-red-500">{errors.newPosition}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">New CTC (Annual) *</Label>
            <Input
              type="number"
              value={form.newSalary || ''}
              onChange={(e) => setForm((p) => ({ ...p, newSalary: Number(e.target.value) }))}
              className="bg-white/5 border-white/10"
              placeholder="Enter new CTC"
            />
            {errors.newSalary && <p className="text-xs text-red-500">{errors.newSalary}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Effective Date *</Label>
            <Input
              type="date"
              value={form.effectiveDate}
              onChange={(e) => setForm((p) => ({ ...p, effectiveDate: e.target.value }))}
              className="bg-white/5 border-white/10"
            />
            {errors.effectiveDate && <p className="text-xs text-red-500">{errors.effectiveDate}</p>}
          </div>

          {/* Salary Increase Indicator */}
          <div className="flex items-end">
            {salaryIncrease > 0 ? (
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 w-full">
                <p className="text-xs text-green-500">Salary Increase</p>
                <p className="text-lg font-bold text-green-500">
                  +₹{salaryIncrease.toLocaleString('en-IN')}
                  <span className="text-xs font-normal ml-1">({salaryIncreasePct}%)</span>
                </p>
              </div>
            ) : salaryIncrease < 0 ? (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 w-full">
                <p className="text-xs text-red-500">Salary Decrease</p>
                <p className="text-lg font-bold text-red-500">
                  -₹{Math.abs(salaryIncrease).toLocaleString('en-IN')}
                  <span className="text-xs font-normal ml-1">({Math.abs(Number(salaryIncreasePct))}%)</span>
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 w-full">
                <p className="text-xs text-muted-foreground">No salary change</p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Reason *</Label>
          <Textarea
            value={form.reason}
            onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value }))}
            className="bg-white/5 border-white/10 min-h-[80px]"
            placeholder="Provide reason for promotion"
          />
          {errors.reason && <p className="text-xs text-red-500">{errors.reason}</p>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading} className="bg-module-erp hover:bg-module-erp/90 text-white">
          {isLoading ? 'Processing...' : 'Confirm Promotion'}
        </Button>
      </div>
    </form>
  );
}
