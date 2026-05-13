'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { formatAmount } from '../../utils/currency';

export interface ItemOption {
  id: string;
  name: string;
  sku: string;
  price: number;
  currency: string;
  description?: string;
}

export interface ItemSelectorProps {
  value?: string;
  onChange: (value: string, item: ItemOption) => void;
  className?: string;
}

const MOCK_ITEMS: ItemOption[] = [
  { id: 'itm1', name: 'Consulting Service', sku: 'SRV-001', price: 150, currency: 'USD', description: 'Professional consulting per hour' },
  { id: 'itm2', name: 'Web Development', sku: 'SRV-002', price: 200, currency: 'USD', description: 'Full-stack web development' },
  { id: 'itm3', name: 'Design Package', sku: 'PKG-001', price: 2500, currency: 'USD', description: 'Complete UI/UX design package' },
  { id: 'itm4', name: 'Cloud Hosting (Monthly)', sku: 'HST-001', price: 99, currency: 'USD', description: 'Managed cloud hosting' },
  { id: 'itm5', name: 'Support Retainer', sku: 'SUP-001', price: 500, currency: 'USD', description: 'Monthly support retainer' },
  { id: 'itm6', name: 'License Fee', sku: 'LIC-001', price: 1200, currency: 'USD', description: 'Annual software license' },
  { id: 'itm7', name: 'Training Workshop', sku: 'TRN-001', price: 800, currency: 'USD', description: 'On-site training workshop' },
  { id: 'itm8', name: 'Hardware Setup', sku: 'HW-001', price: 3500, currency: 'USD', description: 'Server hardware and setup' },
];

export function ItemSelector({
  value,
  onChange,
  className,
}: ItemSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const selected = MOCK_ITEMS.find((i) => i.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between font-normal', className)}
        >
          {selected ? (
            <span className="flex items-center gap-2 truncate">
              <Package className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{selected.name}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">Select item...</span>
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search items..." />
          <CommandList>
            <CommandEmpty>No item found.</CommandEmpty>
            <CommandGroup>
              {MOCK_ITEMS.map((item) => (
                <CommandItem
                  key={item.id}
                  value={`${item.name} ${item.sku}`}
                  onSelect={() => {
                    onChange(item.id, item);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 size-4',
                      value === item.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-xs text-muted-foreground font-mono">{item.sku}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatAmount(item.price, item.currency)}
                    </span>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
