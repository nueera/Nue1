// @ts-nocheck
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import { Plus, Trash2 } from 'lucide-react';
import type { LineItem } from '../../types/finance-common';
import { formatAmount } from '../../utils/currency';
import { MoneyDisplay } from './money-display';
import { calculateTaxAmount } from '../../utils/tax';

export interface LineItemsTableProps {
  items: LineItem[];
  onChange: (items: LineItem[]) => void;
  readOnly?: boolean;
  currency?: string;
  className?: string;
}

function generateId(): string {
  return `li_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function createEmptyLineItem(currency: string): LineItem {
  return {
    id: generateId(),
    item: '',
    description: '',
    quantity: 1,
    rate: { amount: 0, currency },
    total: { amount: 0, currency },
  };
}

function computeLineTotal(item: LineItem): number {
  const base = item.rate.amount * item.quantity;
  const taxAmt = item.tax ? calculateTaxAmount(base, item.tax) : 0;
  return item.tax?.type === 'exclusive' ? base + taxAmt : base;
}

export function LineItemsTable({
  items,
  onChange,
  readOnly = false,
  currency = 'USD',
  className,
}: LineItemsTableProps) {
  const subtotal = items.reduce((sum, item) => sum + item.rate.amount * item.quantity, 0);
  const taxTotal = items.reduce((sum, item) => {
    if (!item.tax) return sum;
    const base = item.rate.amount * item.quantity;
    return sum + calculateTaxAmount(base, item.tax);
  }, 0);
  const grandTotal = subtotal + taxTotal;

  const handleAddItem = () => {
    onChange([...items, createEmptyLineItem(currency)]);
  };

  const handleRemoveItem = (index: number) => {
    const next = [...items];
    next.splice(index, 1);
    onChange(next);
  };

  const handleItemChange = (index: number, field: keyof LineItem, value: unknown) => {
    const next = [...items];
    const item = { ...next[index] };

    if (field === 'item') {
      item.item = value as string;
    } else if (field === 'description') {
      item.description = value as string;
    } else if (field === 'quantity') {
      const qty = Number(value) || 0;
      item.quantity = qty;
    } else if (field === 'rate') {
      const amt = Number(value) || 0;
      item.rate = { amount: amt, currency: item.rate.currency };
    }

    item.total = { amount: computeLineTotal(item), currency: item.rate.currency };
    next[index] = item;
    onChange(next);
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 text-center">#</TableHead>
              <TableHead>Item</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="w-20 text-right">Qty</TableHead>
              <TableHead className="w-28 text-right">Rate</TableHead>
              <TableHead className="w-20 text-right hidden sm:table-cell">Tax</TableHead>
              <TableHead className="w-28 text-right">Total</TableHead>
              {!readOnly && <TableHead className="w-10" />}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={readOnly ? 7 : 8} className="text-center text-muted-foreground py-8">
                  No line items yet. {!readOnly && 'Click "Add Item" to get started.'}
                </TableCell>
              </TableRow>
            ) : (
              items.map((item, idx) => (
                <TableRow key={item.id}>
                  <TableCell className="text-center text-muted-foreground">{idx + 1}</TableCell>
                  <TableCell>
                    {readOnly ? (
                      <span className="font-medium">{item.item || '—'}</span>
                    ) : (
                      <Input
                        value={item.item}
                        onChange={(e) => handleItemChange(idx, 'item', e.target.value)}
                        placeholder="Item name"
                        className="h-8 text-sm"
                      />
                    )}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {readOnly ? (
                      <span className="text-muted-foreground">{item.description || '—'}</span>
                    ) : (
                      <Input
                        value={item.description ?? ''}
                        onChange={(e) => handleItemChange(idx, 'description', e.target.value)}
                        placeholder="Description"
                        className="h-8 text-sm"
                      />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {readOnly ? (
                      <span>{item.quantity}</span>
                    ) : (
                      <Input
                        type="number"
                        min={0}
                        value={item.quantity}
                        onChange={(e) => handleItemChange(idx, 'quantity', e.target.value)}
                        className="h-8 text-sm text-right w-20"
                      />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    {readOnly ? (
                      <MoneyDisplay amount={item.rate.amount} currency={item.rate.currency} size="sm" />
                    ) : (
                      <Input
                        type="number"
                        min={0}
                        step="0.01"
                        value={item.rate.amount}
                        onChange={(e) => handleItemChange(idx, 'rate', e.target.value)}
                        className="h-8 text-sm text-right w-28"
                      />
                    )}
                  </TableCell>
                  <TableCell className="text-right hidden sm:table-cell">
                    {item.tax ? `${item.tax.rate}%` : '—'}
                  </TableCell>
                  <TableCell className="text-right">
                    <MoneyDisplay amount={item.total.amount} currency={item.total.currency} size="sm" />
                  </TableCell>
                  {!readOnly && (
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-muted-foreground hover:text-destructive"
                        onClick={() => handleRemoveItem(idx)}
                        aria-label="Remove item"
                      >
                        <Trash2 className="size-3.5" />
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
          {!readOnly && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={8} className="py-2">
                  <Button variant="outline" size="sm" onClick={handleAddItem} className="gap-1.5">
                    <Plus className="size-3.5" />
                    Add Item
                  </Button>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>

      {/* Summary */}
      <div className="flex justify-end">
        <div className="w-64 space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <MoneyDisplay amount={subtotal} currency={currency} size="sm" />
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Tax</span>
            <MoneyDisplay amount={taxTotal} currency={currency} size="sm" />
          </div>
          <div className="flex justify-between border-t pt-1 font-semibold">
            <span>Total</span>
            <MoneyDisplay amount={grandTotal} currency={currency} size="md" colorize="neutral" />
          </div>
        </div>
      </div>
    </div>
  );
}
