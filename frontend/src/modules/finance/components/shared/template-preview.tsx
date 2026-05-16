'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { MoneyDisplay } from './money-display';
import type { LineItem, Address } from '../../types/finance-common';

export interface TemplatePreviewData {
  invoiceNumber?: string;
  date?: string;
  dueDate?: string;
  from?: {
    name: string;
    address?: Address;
  };
  to?: {
    name: string;
    address?: Address;
  };
  items?: LineItem[];
  notes?: string;
  currency?: string;
}

export interface TemplatePreviewProps {
  templateId?: string;
  data?: TemplatePreviewData;
  className?: string;
}

const SAMPLE_DATA: TemplatePreviewData = {
  invoiceNumber: 'INV-2026-001',
  date: 'May 06, 2026',
  dueDate: 'Jun 05, 2026',
  from: {
    name: 'Acme Corporation',
    address: { street: '123 Business Ave', city: 'San Francisco', state: 'CA', zip: '94102', country: 'United States' },
  },
  to: {
    name: 'Globex Industries',
    address: { street: '456 Commerce Blvd', city: 'New York', state: 'NY', zip: '10001', country: 'United States' },
  },
  items: [
    { id: '1', item: 'Consulting Service', description: 'Professional consulting', quantity: 10, rate: { amount: 150, currency: 'USD' }, total: { amount: 1500, currency: 'USD' } },
    { id: '2', item: 'Design Package', description: 'UI/UX design package', quantity: 1, rate: { amount: 2500, currency: 'USD' }, total: { amount: 2500, currency: 'USD' } },
    { id: '3', item: 'Support Retainer', description: 'Monthly support', quantity: 1, rate: { amount: 500, currency: 'USD' }, total: { amount: 500, currency: 'USD' } },
  ],
  notes: 'Thank you for your business!',
  currency: 'USD',
};

function formatAddress(address?: Address): string {
  if (!address) return '';
  const parts = [address.street, address.city, address.state, address.zip, address.country].filter(Boolean);
  return parts.join(', ');
}

export function TemplatePreview({
  templateId,
  data,
  className,
}: TemplatePreviewProps) {
  const preview = data ?? SAMPLE_DATA;
  const currency = preview.currency ?? 'USD';

  const subtotal = preview.items?.reduce((sum, item) => sum + item.rate.amount * item.quantity, 0) ?? 0;
  const total = preview.items?.reduce((sum, item) => sum + item.total.amount, 0) ?? subtotal;

  const accentColor = (() => {
    switch (templateId) {
      case 'modern': return 'bg-emerald-600';
      case 'classic': return 'bg-slate-700';
      case 'minimal': return 'bg-gray-900';
      default: return 'bg-emerald-600';
    }
  })();

  return (
    <div
      className={cn(
        'rounded-md border bg-white text-gray-900 shadow-sm overflow-hidden',
        className
      )}
    >
      {/* Header accent bar */}
      <div className={cn('h-2', accentColor)} />

      <div className="p-6 space-y-5">
        {/* Invoice header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold tracking-tight">INVOICE</h2>
            {preview.invoiceNumber && (
              <p className="text-sm text-gray-500 mt-0.5">{preview.invoiceNumber}</p>
            )}
          </div>
          <div className="text-right text-sm text-gray-500 space-y-0.5">
            {preview.date && <p>Date: {preview.date}</p>}
            {preview.dueDate && <p>Due: {preview.dueDate}</p>}
          </div>
        </div>

        {/* From / To */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">From</p>
            <p className="text-sm font-medium">{preview.from?.name ?? '—'}</p>
            <p className="text-xs text-gray-500">{formatAddress(preview.from?.address)}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Bill To</p>
            <p className="text-sm font-medium">{preview.to?.name ?? '—'}</p>
            <p className="text-xs text-gray-500">{formatAddress(preview.to?.address)}</p>
          </div>
        </div>

        <Separator />

        {/* Line items */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs text-gray-500 uppercase tracking-wider">
                <th className="text-left pb-2 font-medium">Item</th>
                <th className="text-center pb-2 font-medium">Qty</th>
                <th className="text-right pb-2 font-medium">Rate</th>
                <th className="text-right pb-2 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {preview.items?.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-2">
                    <div className="font-medium">{item.item}</div>
                    {item.description && (
                      <div className="text-xs text-gray-400">{item.description}</div>
                    )}
                  </td>
                  <td className="py-2 text-center">{item.quantity}</td>
                  <td className="py-2 text-right">
                    <MoneyDisplay amount={item.rate.amount} currency={item.rate.currency} size="sm" />
                  </td>
                  <td className="py-2 text-right font-medium">
                    <MoneyDisplay amount={item.total.amount} currency={item.total.currency} size="sm" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-56 space-y-1 text-sm">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <MoneyDisplay amount={subtotal} currency={currency} size="sm" />
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <MoneyDisplay amount={total} currency={currency} size="md" />
            </div>
          </div>
        </div>

        {/* Notes */}
        {preview.notes && (
          <div className="text-xs text-gray-400 border-t pt-3">
            <p className="font-medium text-gray-500 mb-0.5">Notes</p>
            {preview.notes}
          </div>
        )}
      </div>
    </div>
  );
}
