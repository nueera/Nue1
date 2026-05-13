'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Mail } from 'lucide-react';
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

export interface SenderAddress {
  id: string;
  name: string;
  email: string;
  isDefault?: boolean;
  verified?: boolean;
}

export interface SenderAddressPickerProps {
  value?: string;
  onChange: (value: string, sender: SenderAddress) => void;
  className?: string;
}

const MOCK_SENDERS: SenderAddress[] = [
  { id: 's1', name: 'Marketing Team', email: 'marketing@company.com', isDefault: true, verified: true },
  { id: 's2', name: 'Sales Team', email: 'sales@company.com', verified: true },
  { id: 's3', name: 'Support Team', email: 'support@company.com', verified: true },
  { id: 's4', name: 'CEO', email: 'ceo@company.com', verified: true },
  { id: 's5', name: 'Newsletter', email: 'newsletter@company.com', verified: false },
];

export function SenderAddressPicker({ value, onChange, className }: SenderAddressPickerProps) {
  const [open, setOpen] = React.useState(false);
  const selected = MOCK_SENDERS.find((s) => s.id === value);

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
              <Mail className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">
                {selected.name} &lt;{selected.email}&gt;
              </span>
            </span>
          ) : (
            <span className="text-muted-foreground">Select sender...</span>
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search senders..." />
          <CommandList>
            <CommandEmpty>No sender found.</CommandEmpty>
            <CommandGroup>
              {MOCK_SENDERS.map((sender) => (
                <CommandItem
                  key={sender.id}
                  value={`${sender.name} ${sender.email}`}
                  onSelect={() => {
                    onChange(sender.id, sender);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn('mr-2 size-4', value === sender.id ? 'opacity-100' : 'opacity-0')}
                  />
                  <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{sender.name}</span>
                      {sender.isDefault && (
                        <span className="text-[10px] px-1.5 py-0 rounded bg-primary/10 text-primary font-medium">
                          Default
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">{sender.email}</span>
                  </div>
                  {sender.verified === false && (
                    <span className="text-[10px] text-amber-600">Unverified</span>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
