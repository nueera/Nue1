'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Account } from '../types';
import { createAccountSchema, type CreateAccountInput } from '../schema';
import { ACCOUNT_TYPES, ACCOUNT_TIERS, ACCOUNT_INDUSTRIES } from '../constants';

interface AccountFormProps {
  account?: Account;
  onSubmit: (data: CreateAccountInput) => void;
  onCancel: () => void;
}

export function AccountForm({ account, onSubmit, onCancel }: AccountFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateAccountInput>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: account
      ? {
          name: account.name,
          type: account.type,
          tier: account.tier,
          industry: account.industry,
          annualRevenue: account.annualRevenue,
          employees: account.employees,
          phone: account.phone,
          website: account.website,
          billingCity: account.billingCity,
          billingState: account.billingState,
        }
      : undefined,
  });

  return (
    <div className="glass-surface border border-glass-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">{account ? 'Edit Account' : 'New Account'}</h2>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground mb-1 block">Account Name *</label>
            <input
              {...register('name')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Type</label>
            <select
              {...register('type')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none"
            >
              {ACCOUNT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Tier</label>
            <select
              {...register('tier')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none"
            >
              {ACCOUNT_TIERS.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Industry</label>
            <select
              {...register('industry')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none"
            >
              <option value="">Select industry...</option>
              {ACCOUNT_INDUSTRIES.map(i => <option key={i.value} value={i.value}>{i.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Annual Revenue</label>
            <input
              {...register('annualRevenue', { valueAsNumber: true })}
              type="number"
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Employees</label>
            <input
              {...register('employees', { valueAsNumber: true })}
              type="number"
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Phone</label>
            <input
              {...register('phone')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Website</label>
            <input
              {...register('website')}
              type="url"
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Billing City</label>
            <input
              {...register('billingCity')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Billing State</label>
            <input
              {...register('billingState')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button type="submit" className="bg-module-crm hover:bg-module-crm/80">
            {account ? 'Update' : 'Create'} Account
          </Button>
        </div>
      </form>
    </div>
  );
}
