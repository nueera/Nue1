// @ts-nocheck
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AccessibleField } from '@/lib/form-helpers';
import type { Vendor } from '../types';
import { createVendorSchema, type CreateVendorInput } from '../schema';

interface VendorFormProps {
  vendor?: Vendor;
  onSubmit: (data: CreateVendorInput) => void;
  onCancel: () => void;
}

export function VendorForm({ vendor, onSubmit, onCancel }: VendorFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateVendorInput>({
    resolver: zodResolver(createVendorSchema),
    defaultValues: vendor
      ? { name: vendor.name, email: vendor.email, phone: vendor.phone, company: vendor.company, displayName: vendor.displayName, status: vendor.status, currency: vendor.currency, paymentTerms: vendor.paymentTerms, notes: vendor.notes, taxId: vendor.taxId, taxExempt: vendor.taxExempt, website: vendor.website, tags: vendor.tags }
      : undefined,
  });

  return (
    <div className="glass-surface border border-glass-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">{vendor ? 'Edit Vendor' : 'New Vendor'}</h2>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground" aria-label="Close form"><X className="h-5 w-5" /></button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AccessibleField label="Vendor Name" required error={errors.name?.message}>
            <input {...register('name')} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />
          </AccessibleField>
          <AccessibleField label="Email" error={errors.email?.message}>
            <input {...register('email')} type="email" className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />
          </AccessibleField>
          <AccessibleField label="Phone">
            <input {...register('phone')} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />
          </AccessibleField>
          <AccessibleField label="Company">
            <input {...register('company')} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />
          </AccessibleField>
          <AccessibleField label="Currency">
            <select {...register('currency')} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50">
              <option value="USD">USD</option><option value="EUR">EUR</option><option value="GBP">GBP</option><option value="INR">INR</option>
            </select>
          </AccessibleField>
          <AccessibleField label="Payment Terms">
            <select {...register('paymentTerms')} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50">
              <option value="due_on_receipt">Due on Receipt</option><option value="net_30">Net 30</option><option value="net_60">Net 60</option><option value="net_90">Net 90</option>
            </select>
          </AccessibleField>
        </div>
        <AccessibleField label="Notes">
          <textarea {...register('notes')} rows={3} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50 resize-none" />
        </AccessibleField>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="vendor-tax-exempt" {...register('taxExempt')} className="rounded border-glass-border" />
          <label htmlFor="vendor-tax-exempt" className="text-sm text-muted-foreground">Tax Exempt</label>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">{vendor ? 'Update' : 'Create'} Vendor</Button>
        </div>
      </form>
    </div>
  );
}
