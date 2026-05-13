'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, UserCircle } from 'lucide-react';
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
import type { FinanceContact } from '../../types/finance-common';

export interface ContactSelectorProps {
  value?: string;
  onChange: (value: string, contact: FinanceContact) => void;
  type?: 'customer' | 'vendor';
  className?: string;
}

const MOCK_CUSTOMERS: FinanceContact[] = [
  { id: 'c1', name: 'Acme Corporation', email: 'billing@acme.com', phone: '+1-555-0100', type: 'customer' },
  { id: 'c2', name: 'Globex Industries', email: 'accounts@globex.io', phone: '+1-555-0200', type: 'customer' },
  { id: 'c3', name: 'Wayne Enterprises', email: 'finance@wayne.co', phone: '+1-555-0300', type: 'customer' },
  { id: 'c4', name: 'Stark Industries', email: 'ap@stark.com', phone: '+1-555-0400', type: 'customer' },
  { id: 'c5', name: 'Umbrella Corp', email: 'billing@umbrella.net', phone: '+1-555-0500', type: 'customer' },
];

const MOCK_VENDORS: FinanceContact[] = [
  { id: 'v1', name: 'Office Depot Pro', email: 'orders@officedepot.com', phone: '+1-555-1000', type: 'vendor' },
  { id: 'v2', name: 'CloudHost Solutions', email: 'billing@cloudhost.io', phone: '+1-555-1100', type: 'vendor' },
  { id: 'v3', name: 'DataSync Labs', email: 'sales@datasync.dev', phone: '+1-555-1200', type: 'vendor' },
  { id: 'v4', name: 'PrintMaster Co', email: 'info@printmaster.com', phone: '+1-555-1300', type: 'vendor' },
  { id: 'v5', name: 'SecureIT Services', email: 'contracts@secureit.net', phone: '+1-555-1400', type: 'vendor' },
];

export function ContactSelector({
  value,
  onChange,
  type = 'customer',
  className,
}: ContactSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const contacts = type === 'customer' ? MOCK_CUSTOMERS : MOCK_VENDORS;
  const selected = contacts.find((c) => c.id === value);
  const label = type === 'customer' ? 'Customer' : 'Vendor';

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
              <UserCircle className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{selected.name}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">Select {label}...</span>
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder={`Search ${label.toLowerCase()}s...`} />
          <CommandList>
            <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              {contacts.map((contact) => (
                <CommandItem
                  key={contact.id}
                  value={`${contact.name} ${contact.email ?? ''}`}
                  onSelect={() => {
                    onChange(contact.id, contact);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 size-4',
                      value === contact.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{contact.name}</span>
                    {contact.email && (
                      <span className="text-xs text-muted-foreground">{contact.email}</span>
                    )}
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
