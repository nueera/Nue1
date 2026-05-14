'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AccessibleField } from '@/lib/form-helpers';
import { createPaymentSchema, type CreatePaymentInput } from '../schema';

interface PaymentFormProps { onSubmit: (data: CreatePaymentInput) => void; onCancel: () => void; }

export function PaymentForm({ onSubmit, onCancel }: PaymentFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreatePaymentInput>({
    resolver: zodResolver(createPaymentSchema),
  });
  return (
    <div className="glass-surface border border-glass-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Record Payment</h2>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground" aria-label="Close form"><X className="h-5 w-5" /></button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AccessibleField label="Customer" required error={errors.customerId?.message}>
            <input {...register('customerId')} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />
          </AccessibleField>
          <AccessibleField label="Amount" required error={errors.amount?.message}>
            <input {...register('amount', { valueAsNumber: true })} type="number" step="0.01" className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />
          </AccessibleField>
          <AccessibleField label="Date" required>
            <input {...register('date')} type="date" className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />
          </AccessibleField>
          <AccessibleField label="Payment Method" required>
            <select {...register('paymentMethod')} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50"><option value="cash">Cash</option><option value="check">Check</option><option value="bank-transfer">Bank Transfer</option><option value="credit-card">Credit Card</option><option value="online">Online</option><option value="other">Other</option></select>
          </AccessibleField>
          <AccessibleField label="Reference">
            <input {...register('reference')} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />
          </AccessibleField>
        </div>
        <AccessibleField label="Notes">
          <textarea {...register('notes')} rows={3} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50 resize-none" />
        </AccessibleField>
        <div className="flex justify-end gap-2 pt-4"><Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button><Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">Record Payment</Button></div>
      </form>
    </div>
  );
}
