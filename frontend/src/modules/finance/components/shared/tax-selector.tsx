// @ts-nocheck
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Percent } from 'lucide-react';
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
import type { TaxRate } from '../../types/finance-common';
import { DEFAULT_TAX_RATES } from '../../constants/finance-common';
import { formatTaxRate } from '../../utils/currency';

export interface TaxSelectorProps {
  value?: string;
  onChange: (value: string, taxRate: TaxRate) => void;
  className?: string;
}

export function TaxSelector({
  value,
  onChange,
  className,
}: TaxSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const selected = DEFAULT_TAX_RATES.find((t) => t.id === value);

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
              <Percent className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{selected.name} ({selected.rate}%)</span>
            </span>
          ) : (
            <span className="text-muted-foreground">Select tax rate...</span>
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search tax rates..." />
          <CommandList>
            <CommandEmpty>No tax rate found.</CommandEmpty>
            <CommandGroup>
              {DEFAULT_TAX_RATES.map((taxRate) => (
                <CommandItem
                  key={taxRate.id}
                  value={`${taxRate.name} ${taxRate.rate}`}
                  onSelect={() => {
                    onChange(taxRate.id, taxRate);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 size-4',
                      value === taxRate.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{taxRate.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {formatTaxRate(taxRate)}
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
