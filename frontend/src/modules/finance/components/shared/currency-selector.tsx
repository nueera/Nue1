// @ts-nocheck
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, DollarSign } from 'lucide-react';
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
import { CURRENCIES } from '../../constants/finance-common';
import type { Currency } from '../../types/finance-common';

export interface CurrencySelectorProps {
  value?: string;
  onChange: (value: string, currency: Currency) => void;
  className?: string;
}

export function CurrencySelector({
  value,
  onChange,
  className,
}: CurrencySelectorProps) {
  const [open, setOpen] = React.useState(false);
  const selected = CURRENCIES.find((c) => c.code === value);

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
              <DollarSign className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">
                {selected.code} — {selected.symbol} {selected.name}
              </span>
            </span>
          ) : (
            <span className="text-muted-foreground">Select currency...</span>
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search currencies..." />
          <CommandList>
            <CommandEmpty>No currency found.</CommandEmpty>
            <CommandGroup>
              {CURRENCIES.map((currency) => (
                <CommandItem
                  key={currency.code}
                  value={`${currency.code} ${currency.name} ${currency.symbol}`}
                  onSelect={() => {
                    onChange(currency.code, currency);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 size-4',
                      value === currency.code ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold text-sm w-8">{currency.symbol}</span>
                    <div className="flex flex-col">
                      <span className="font-medium">{currency.code}</span>
                      <span className="text-xs text-muted-foreground">{currency.name}</span>
                    </div>
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
