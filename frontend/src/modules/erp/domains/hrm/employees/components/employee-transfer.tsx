'use client';

import { useState } from 'react';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DEPARTMENTS } from '../../../../core/utils/constants';
import type { Employee } from '../types';

interface EmployeeTransferProps {
  employee: Employee;
  onSubmit: (data: TransferData) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export interface TransferData {
  newDepartment: string;
  newPosition: string;
  newReportingManager: string;
  effectiveDate: string;
  reason: string;
}

export function EmployeeTransfer({ employee, onSubmit, onCancel, isLoading }: EmployeeTransferProps) {
  const [form, setForm] = useState<TransferData>({
    newDepartment: '',
    newPosition: '',
    newReportingManager: '',
    effectiveDate: '',
    reason: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.newDepartment) newErrors.newDepartment = 'New department is required';
    if (!form.newPosition) newErrors.newPosition = 'New position is required';
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Current Info */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <ArrowRightLeft className="h-4 w-4 text-module-erp" />
          Transfer Employee
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-xs text-muted-foreground">Current Department</p>
            <p className="font-medium text-foreground">{employee.department}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Current Position</p>
            <p className="font-medium text-foreground">{employee.position}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Current Manager</p>
            <p className="font-medium text-foreground">{employee.reportingManager || '-'}</p>
          </div>
        </div>
      </div>

      {/* Transfer Details */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">New Assignment</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">New Department *</Label>
            <Select value={form.newDepartment} onValueChange={(v) => setForm((p) => ({ ...p, newDepartment: v }))}>
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.filter((d) => d !== employee.department).map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.newDepartment && <p className="text-xs text-red-500">{errors.newDepartment}</p>}
          </div>

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
            <Label className="text-xs text-muted-foreground">New Reporting Manager</Label>
            <Input
              value={form.newReportingManager}
              onChange={(e) => setForm((p) => ({ ...p, newReportingManager: e.target.value }))}
              className="bg-white/5 border-white/10"
              placeholder="Manager name"
            />
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
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Reason *</Label>
          <Textarea
            value={form.reason}
            onChange={(e) => setForm((p) => ({ ...p, reason: e.target.value }))}
            className="bg-white/5 border-white/10 min-h-[80px]"
            placeholder="Provide reason for transfer"
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
          {isLoading ? 'Processing...' : 'Initiate Transfer'}
        </Button>
      </div>
    </form>
  );
}
