'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AccessibleField } from '@/lib/form-helpers';
import type { SalesOrder } from '../types';
import { createSalesOrderSchema, type CreateSalesOrderInput } from '../schema';

interface SalesOrderFormProps { salesOrder?: SalesOrder; onSubmit: (data: CreateSalesOrderInput) => void; onCancel: () => void; }

export function SalesOrderForm({ salesOrder, onSubmit, onCancel }: SalesOrderFormProps) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<CreateSalesOrderInput>({
    resolver: zodResolver(createSalesOrderSchema),
    defaultValues: salesOrder ? { customerId: salesOrder.customerId, date: salesOrder.date, shipmentDate: salesOrder.shipmentDate, notes: salesOrder.notes, terms: salesOrder.terms, lineItems: salesOrder.lineItems.map(li => ({ item: li.item, description: li.description ?? '', quantity: li.quantity, rate: li.rate.amount })) } : { lineItems: [{ item: '', description: '', quantity: 1, rate: 0 }] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'lineItems' });

  return (
    <div className="glass-surface border border-glass-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">{salesOrder ? 'Edit Sales Order' : 'New Sales Order'}</h2>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground" aria-label="Close form"><X className="h-5 w-5" /></button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <AccessibleField label="Customer" required error={errors.customerId?.message}>
            <input {...register('customerId')} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />
          </AccessibleField>
          <AccessibleField label="Date" required>
            <input {...register('date')} type="date" className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />
          </AccessibleField>
          <AccessibleField label="Shipment Date">
            <input {...register('shipmentDate')} type="date" className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />
          </AccessibleField>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2"><span className="text-xs text-muted-foreground font-medium">Line Items</span><Button type="button" variant="ghost" size="sm" onClick={() => append({ item: '', description: '', quantity: 1, rate: 0 })}><Plus className="h-4 w-4 mr-1" />Add</Button></div>
          {fields.map((field, i) => <div key={field.id} className="grid grid-cols-12 gap-2 mb-2"><div className="col-span-4"><input {...register(`lineItems.${i}.item`)} placeholder="Item" aria-label={`Line item ${i + 1} name`} className="w-full px-2 py-1.5 rounded-md border border-glass-border bg-glass-bg text-sm outline-none" /></div><div className="col-span-3"><input {...register(`lineItems.${i}.description`)} placeholder="Desc" aria-label={`Line item ${i + 1} description`} className="w-full px-2 py-1.5 rounded-md border border-glass-border bg-glass-bg text-sm outline-none" /></div><div className="col-span-2"><input {...register(`lineItems.${i}.quantity`, { valueAsNumber: true })} type="number" placeholder="Qty" aria-label={`Line item ${i + 1} quantity`} className="w-full px-2 py-1.5 rounded-md border border-glass-border bg-glass-bg text-sm outline-none" /></div><div className="col-span-2"><input {...register(`lineItems.${i}.rate`, { valueAsNumber: true })} type="number" step="0.01" placeholder="Rate" aria-label={`Line item ${i + 1} rate`} className="w-full px-2 py-1.5 rounded-md border border-glass-border bg-glass-bg text-sm outline-none" /></div><div className="col-span-1 flex items-center justify-center">{fields.length > 1 && <button type="button" onClick={() => remove(i)} className="text-muted-foreground hover:text-destructive" aria-label={`Remove line item ${i + 1}`}><Trash2 className="h-4 w-4" /></button>}</div></div>)}
        </div>
        <div className="flex justify-end gap-2 pt-4"><Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button><Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">{salesOrder ? 'Update' : 'Create'} Sales Order</Button></div>
      </form>
    </div>
  );
}
