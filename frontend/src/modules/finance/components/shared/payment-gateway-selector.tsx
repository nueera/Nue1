'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, CreditCard } from 'lucide-react';
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

export type PaymentGateway = 'stripe' | 'paypal' | 'razorpay' | 'square' | 'bank_transfer' | 'cash' | 'check';

export interface PaymentGatewayOption {
  id: PaymentGateway;
  name: string;
  description: string;
}

export interface PaymentGatewaySelectorProps {
  value?: PaymentGateway;
  onChange: (value: PaymentGateway) => void;
  className?: string;
}

const PAYMENT_GATEWAYS: PaymentGatewayOption[] = [
  { id: 'stripe', name: 'Stripe', description: 'Online card payments' },
  { id: 'paypal', name: 'PayPal', description: 'PayPal checkout' },
  { id: 'razorpay', name: 'Razorpay', description: 'Indian payment gateway' },
  { id: 'square', name: 'Square', description: 'Point of sale & online' },
  { id: 'bank_transfer', name: 'Bank Transfer', description: 'Direct bank transfer / wire' },
  { id: 'cash', name: 'Cash', description: 'Cash payment' },
  { id: 'check', name: 'Check', description: 'Paper check payment' },
];

export function PaymentGatewaySelector({
  value,
  onChange,
  className,
}: PaymentGatewaySelectorProps) {
  const [open, setOpen] = React.useState(false);
  const selected = PAYMENT_GATEWAYS.find((g) => g.id === value);

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
              <CreditCard className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{selected.name}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">Select payment gateway...</span>
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search gateways..." />
          <CommandList>
            <CommandEmpty>No gateway found.</CommandEmpty>
            <CommandGroup>
              {PAYMENT_GATEWAYS.map((gateway) => (
                <CommandItem
                  key={gateway.id}
                  value={`${gateway.name} ${gateway.description}`}
                  onSelect={() => {
                    onChange(gateway.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 size-4',
                      value === gateway.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{gateway.name}</span>
                    <span className="text-xs text-muted-foreground">{gateway.description}</span>
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
