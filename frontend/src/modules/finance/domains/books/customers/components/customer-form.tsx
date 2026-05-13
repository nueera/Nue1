'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Customer } from '../types';
import { createCustomerSchema, type CreateCustomerInput } from '../schema';

interface CustomerFormProps {
  customer?: Customer;
  onSubmit: (data: CreateCustomerInput) => void;
  onCancel: () => void;
}

export function CustomerForm({ customer, onSubmit, onCancel }: CustomerFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateCustomerInput>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: customer
      ? {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          company: customer.company,
          displayName: customer.displayName,
          status: customer.status,
          currency: customer.currency,
          paymentTerms: customer.paymentTerms,
          notes: customer.notes,
          taxId: customer.taxId,
          taxExempt: customer.taxExempt,
          website: customer.website,
          tags: customer.tags,
        }
      : undefined,
  });

  return (
    <div className="glass-surface border border-glass-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">{customer ? 'Edit Customer' : 'New Customer'}</h2>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Customer Name *</label>
            <input
              {...register('name')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50"
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Email</label>
            <input
              {...register('email')}
              type="email"
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50"
            />
            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Phone</label>
            <input
              {...register('phone')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Company</label>
            <input
              {...register('company')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Display Name</label>
            <input
              {...register('displayName')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Currency</label>
            <select
              {...register('currency')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
              <option value="CAD">CAD</option>
              <option value="AUD">AUD</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Payment Terms</label>
            <select
              {...register('paymentTerms')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50"
            >
              <option value="due_on_receipt">Due on Receipt</option>
              <option value="net_7">Net 7</option>
              <option value="net_15">Net 15</option>
              <option value="net_30">Net 30</option>
              <option value="net_45">Net 45</option>
              <option value="net_60">Net 60</option>
              <option value="net_90">Net 90</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Tax ID</label>
            <input
              {...register('taxId')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Notes</label>
          <textarea
            {...register('notes')}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50 resize-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register('taxExempt')} className="rounded border-glass-border" />
          <label className="text-sm text-muted-foreground">Tax Exempt</label>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
            {customer ? 'Update' : 'Create'} Customer
          </Button>
        </div>
      </form>
    </div>
  );
}
