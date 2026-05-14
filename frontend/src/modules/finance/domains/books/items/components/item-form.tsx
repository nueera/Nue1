// @ts-nocheck
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Item } from '../types';
import { createItemSchema, type CreateItemInput } from '../schema';

interface ItemFormProps {
  item?: Item;
  onSubmit: (data: CreateItemInput) => void;
  onCancel: () => void;
}

export function ItemForm({ item, onSubmit, onCancel }: ItemFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateItemInput>({
    resolver: zodResolver(createItemSchema),
    defaultValues: item
      ? { name: item.name, sku: item.sku, description: item.description, type: item.type, status: item.status, category: item.category, unit: item.unit, rate: item.rate.amount, cost: item.cost.amount, trackInventory: item.trackInventory, stockOnHand: item.stockOnHand, reorderPoint: item.reorderPoint, preferredVendor: item.preferredVendor, tags: item.tags }
      : undefined,
  });

  return (
    <div className="glass-surface border border-glass-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">{item ? 'Edit Item' : 'New Item'}</h2>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Item Name *</label>
            <input {...register('name')} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">SKU *</label>
            <input {...register('sku')} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />
            {errors.sku && <p className="text-xs text-destructive mt-1">{errors.sku.message}</p>}
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Type</label>
            <select {...register('type')} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50">
              <option value="inventory">Inventory</option>
              <option value="service">Service</option>
              <option value="non-inventory">Non-Inventory</option>
              <option value="bundle">Bundle</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Rate *</label>
            <input {...register('rate', { valueAsNumber: true })} type="number" step="0.01" className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />
            {errors.rate && <p className="text-xs text-destructive mt-1">{errors.rate.message}</p>}
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Category</label>
            <input {...register('category')} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Cost</label>
            <input {...register('cost', { valueAsNumber: true })} type="number" step="0.01" className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />
          </div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Description</label>
          <textarea {...register('description')} rows={3} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50 resize-none" />
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register('trackInventory')} className="rounded border-glass-border" />
          <label className="text-sm text-muted-foreground">Track Inventory</label>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
          <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">{item ? 'Update' : 'Create'} Item</Button>
        </div>
      </form>
    </div>
  );
}
