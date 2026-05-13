'use client';

import { useState } from 'react';
import { CalendarDays, Clock, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createRegularizationSchema } from '../attendance.schema';

interface RegularizationFormProps {
  onSubmit: (data: { date: string; checkIn: string; checkOut: string; reason: string }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function RegularizationForm({ onSubmit, onCancel, isLoading }: RegularizationFormProps) {
  const [form, setForm] = useState({
    date: '',
    checkIn: '',
    checkOut: '',
    reason: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const result = createRegularizationSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const path = err.path.join('.');
        if (!fieldErrors[path]) fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-module-erp" />
          Attendance Regularization
        </h3>
        <p className="text-xs text-muted-foreground">
          Submit a request to regularize your attendance for a date where check-in/check-out was missed.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              Date *
            </Label>
            <Input
              type="date"
              value={form.date}
              onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              className="bg-white/5 border-white/10"
            />
            {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Check In *
            </Label>
            <Input
              type="time"
              value={form.checkIn}
              onChange={(e) => setForm((p) => ({ ...p, checkIn: e.target.value }))}
              className="bg-white/5 border-white/10"
            />
            {errors.checkIn && <p className="text-xs text-red-500">{errors.checkIn}</p>}
          </div>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Check Out *
            </Label>
            <Input
              type="time"
              value={form.checkOut}
              onChange={(e) => setForm((p) => ({ ...p, checkOut: e.target.value }))}
              className="bg-white/5 border-white/10"
            />
            {errors.checkOut && <p className="text-xs text-red-500">{errors.checkOut}</p>}
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
            placeholder="Provide a reason for regularization"
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
          {isLoading ? 'Submitting...' : 'Submit Request'}
        </Button>
      </div>
    </form>
  );
}
