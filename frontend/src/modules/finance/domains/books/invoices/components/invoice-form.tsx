'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Invoice } from '../types';
import { createInvoiceSchema, type CreateInvoiceInput } from '../schema';

interface InvoiceFormProps { invoice?: Invoice; onSubmit: (data: CreateInvoiceInput) => void; onCancel: () => void; }

export function InvoiceForm({ invoice, onSubmit, onCancel }: InvoiceFormProps) {
  const { register, handleSubmit, control, formState: { errors } } = useForm<CreateInvoiceInput>({
    resolver: zodResolver(createInvoiceSchema),
    defaultValues: invoice ? { customerId: invoice.customerId, date: invoice.date, dueDate: invoice.dueDate, subject: invoice.subject, notes: invoice.notes, terms: invoice.terms, lineItems: invoice.lineItems.map(li => ({ item: li.item, description: li.description ?? '', quantity: li.quantity, rate: li.rate.amount })) } : { lineItems: [{ item: '', description: '', quantity: 1, rate: 0 }] },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'lineItems' });

  return (
    <div className="glass-surface border border-glass-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">{invoice ? 'Edit Invoice' : 'New Invoice'}</h2>
        <button onClick={onCancel} className="text-muted-foreground hover:text-foreground"><X className="h-5 w-5" /></button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div><label className="text-xs text-muted-foreground mb-1 block">Customer *</label><input {...register('customerId')} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" />{errors.customerId && <p className="text-xs text-destructive mt-1">{errors.customerId.message}</p>}</div>
          <div><label className="text-xs text-muted-foreground mb-1 block">Date *</label><input {...register('date')} type="date" className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" /></div>
          <div><label className="text-xs text-muted-foreground mb-1 block">Due Date *</label><input {...register('dueDate')} type="date" className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" /></div>
        </div>
        <div><label className="text-xs text-muted-foreground mb-1 block">Subject</label><input {...register('subject')} className="w-full px-3 py-2 rounded-lg border border-glass-border bg-glass-bg text-foreground text-sm outline-none focus:border-emerald-500/50" /></div>
        <div>
          <div className="flex items-center justify-between mb-2"><label className="text-xs text-muted-foreground font-medium">Line Items</label><Button type="button" variant="ghost" size="sm" onClick={() => append({ item: '', description: '', quantity: 1, rate: 0 })}><Plus className="h-4 w-4 mr-1" />Add Item</Button></div>
          {fields.map((field, i) => (
            <div key={field.id} className="grid grid-cols-12 gap-2 mb-2">
              <div className="col-span-4"><input {...register(`lineItems.${i}.item`)} placeholder="Item" className="w-full px-2 py-1.5 rounded-md border border-glass-border bg-glass-bg text-sm outline-none" /></div>
              <div className="col-span-3"><input {...register(`lineItems.${i}.description`)} placeholder="Description" className="w-full px-2 py-1.5 rounded-md border border-glass-border bg-glass-bg text-sm outline-none" /></div>
              <div className="col-span-2"><input {...register(`lineItems.${i}.quantity`, { valueAsNumber: true })} type="number" placeholder="Qty" className="w-full px-2 py-1.5 rounded-md border border-glass-border bg-glass-bg text-sm outline-none" /></div>
              <div className="col-span-2"><input {...register(`lineItems.${i}.rate`, { valueAsNumber: true })} type="number" step="0.01" placeholder="Rate" className="w-full px-2 py-1.5 rounded-md border border-glass-border bg-glass-bg text-sm outline-none" /></div>
              <div className="col-span-1 flex items-center justify-center">{fields.length > 1 && <button type="button" onClick={() => remove(i)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>}</div>
            </div>
          ))}
          {errors.lineItems && <p className="text-xs text-destructive mt-1">{errors.lineItems.message}</p>}
        </div>
        <div className="flex justify-end gap-2 pt-4"><Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button><Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">{invoice ? 'Update' : 'Create'} Invoice</Button></div>
      </form>
    </div>
  );
}
