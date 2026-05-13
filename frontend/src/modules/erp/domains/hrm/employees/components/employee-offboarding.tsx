'use client';

import { useState } from 'react';
import { LogOut, Calendar, FileText, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Employee } from '../types';

interface EmployeeOffboardingProps {
  employee: Employee;
  onSubmit: (data: OffboardingData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export interface OffboardingData {
  resignationDate: string;
  lastWorkingDate: string;
  noticePeriodDays: number;
  reason: string;
  scheduleExitInterview: boolean;
}

export function EmployeeOffboarding({ employee, onSubmit, onCancel, isLoading }: EmployeeOffboardingProps) {
  const [form, setForm] = useState<OffboardingData>({
    resignationDate: '',
    lastWorkingDate: '',
    noticePeriodDays: 30,
    reason: '',
    scheduleExitInterview: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.resignationDate) newErrors.resignationDate = 'Resignation date is required';
    if (!form.lastWorkingDate) newErrors.lastWorkingDate = 'Last working date is required';
    if (!form.reason) newErrors.reason = 'Reason is required';
    if (form.resignationDate && form.lastWorkingDate) {
      const resDate = new Date(form.resignationDate);
      const lwdDate = new Date(form.lastWorkingDate);
      if (lwdDate <= resDate) {
        newErrors.lastWorkingDate = 'Last working date must be after resignation date';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  const autoCalculateLWD = (resignationDate: string) => {
    if (!resignationDate) return;
    const resDate = new Date(resignationDate);
    const lwd = new Date(resDate);
    lwd.setDate(lwd.getDate() + form.noticePeriodDays);
    setForm((p) => ({ ...p, resignationDate, lastWorkingDate: lwd.toISOString().split('T')[0] }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Employee Info */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <LogOut className="h-4 w-4 text-red-500" />
          Initiate Offboarding
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Employee</p>
            <p className="font-medium text-foreground">{employee.firstName} {employee.lastName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Department</p>
            <p className="font-medium text-foreground">{employee.department}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Status</p>
            <p className="font-medium text-foreground capitalize">{employee.status.replace('-', ' ')}</p>
          </div>
        </div>
      </div>

      {/* Offboarding Details */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">Offboarding Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Resignation Date *</Label>
            <Input
              type="date"
              value={form.resignationDate}
              onChange={(e) => autoCalculateLWD(e.target.value)}
              className="bg-white/5 border-white/10"
            />
            {errors.resignationDate && <p className="text-xs text-red-500">{errors.resignationDate}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Last Working Date *</Label>
            <Input
              type="date"
              value={form.lastWorkingDate}
              onChange={(e) => setForm((p) => ({ ...p, lastWorkingDate: e.target.value }))}
              className="bg-white/5 border-white/10"
            />
            {errors.lastWorkingDate && <p className="text-xs text-red-500">{errors.lastWorkingDate}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Notice Period (Days)
            </Label>
            <Input
              type="number"
              value={form.noticePeriodDays}
              onChange={(e) => setForm((p) => ({ ...p, noticePeriodDays: Number(e.target.value) }))}
              className="bg-white/5 border-white/10"
              min={0}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Schedule Exit Interview
            </Label>
            <div className="flex items-center gap-3 h-9">
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, scheduleExitInterview: true }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  form.scheduleExitInterview
                    ? 'bg-module-erp/15 text-module-erp border border-module-erp/30'
                    : 'bg-white/5 border border-white/10 text-muted-foreground'
                }`}
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setForm((p) => ({ ...p, scheduleExitInterview: false }))}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  !form.scheduleExitInterview
                    ? 'bg-module-erp/15 text-module-erp border border-module-erp/30'
                    : 'bg-white/5 border border-white/10 text-muted-foreground'
                }`}
              >
                No
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground flex items-center gap-1">
            <FileText className="h-3 w-3" />
            Reason *
          </Label>
          <Textarea
            value={form.reason}
            onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value }))}
            className="bg-white/5 border-white/10 min-h-[80px]"
            placeholder="Provide reason for offboarding"
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
        <Button type="submit" disabled={isLoading} className="bg-red-500 hover:bg-red-600 text-white">
          {isLoading ? 'Processing...' : 'Initiate Offboarding'}
        </Button>
      </div>
    </form>
  );
}
