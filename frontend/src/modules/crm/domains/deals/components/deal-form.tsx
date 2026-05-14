// @ts-nocheck
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Deal } from '../types';
import { createDealSchema, type CreateDealInput } from '../schema';
import { DEAL_STAGES, FORECAST_CATEGORIES } from '../constants';

interface DealFormProps {
  deal?: Deal;
  onSubmit: (data: CreateDealInput) => void;
  onCancel: () => void;
}

export function DealForm({ deal, onSubmit, onCancel }: DealFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateDealInput>({
    resolver: zodResolver(createDealSchema),
    defaultValues: deal
      ? {
          dealName: deal.dealName,
          amount: deal.amount,
          stage: deal.stage,
          probability: deal.probability,
          closingDate: deal.closingDate,
          accountId: deal.accountId,
          contactId: deal.contactId,
          pipelineId: deal.pipelineId,
          type: deal.type,
          leadSource: deal.leadSource,
          nextStep: deal.nextStep,
          description: deal.description,
          forecastCategory: deal.forecastCategory,
        }
      : undefined,
  });

  return (
    <div className="glass-surface border border-glass-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">{deal ? 'Edit Deal' : 'New Deal'}</h2>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground">
          <X className="h-5 w-5" />
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs text-muted-foreground mb-1 block">Deal Name *</label>
            <input
              {...register('dealName')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
            {errors.dealName && <p className="text-xs text-destructive mt-1">{errors.dealName.message}</p>}
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Amount *</label>
            <input
              {...register('amount', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
            {errors.amount && <p className="text-xs text-destructive mt-1">{errors.amount.message}</p>}
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Stage</label>
            <select
              {...register('stage')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none"
            >
              {DEAL_STAGES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Probability (%)</label>
            <input
              {...register('probability', { valueAsNumber: true })}
              type="number"
              min="0"
              max="100"
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Closing Date *</label>
            <input
              {...register('closingDate')}
              type="date"
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
            {errors.closingDate && <p className="text-xs text-destructive mt-1">{errors.closingDate.message}</p>}
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Account ID *</label>
            <input
              {...register('accountId')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
            {errors.accountId && <p className="text-xs text-destructive mt-1">{errors.accountId.message}</p>}
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Contact ID</label>
            <input
              {...register('contactId')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Forecast Category</label>
            <select
              {...register('forecastCategory')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none"
            >
              {FORECAST_CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Next Step</label>
            <input
              {...register('nextStep')}
              className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Description</label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-module-crm/50 resize-none"
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button type="submit" className="bg-module-crm hover:bg-module-crm/80">
            {deal ? 'Update' : 'Create'} Deal
          </Button>
        </div>
      </form>
    </div>
  );
}
