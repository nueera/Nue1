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

export interface ContactOption {
  id: string;
  name: string;
  email: string;
  type?: 'lead' | 'contact';
}

export interface ContactSelectorProps {
  value?: string;
  onChange: (value: string, contact: ContactOption) => void;
  type?: 'lead' | 'contact';
  className?: string;
}

const MOCK_LEADS: ContactOption[] = [
  { id: 'l1', name: 'Sarah Chen', email: 'sarah@acmecorp.com', type: 'lead' },
  { id: 'l2', name: 'Marcus Johnson', email: 'marcus@techflow.io', type: 'lead' },
  { id: 'l3', name: 'Emily Rodriguez', email: 'emily@globalinsights.co', type: 'lead' },
  { id: 'l4', name: 'David Kim', email: 'david@innovatesolutions.com', type: 'lead' },
  { id: 'l5', name: 'Rachel Foster', email: 'rachel@peakventures.net', type: 'lead' },
];

const MOCK_CONTACTS: ContactOption[] = [
  { id: 'c1', name: 'Alex Thompson', email: 'alex@summitcorp.com', type: 'contact' },
  { id: 'c2', name: 'Jessica Wu', email: 'jessica@brightanalytics.io', type: 'contact' },
  { id: 'c3', name: 'Michael Brown', email: 'michael@nexusindustries.co', type: 'contact' },
  { id: 'c4', name: 'Lisa Park', email: 'lisa@vertexsolutions.com', type: 'contact' },
  { id: 'c5', name: 'James Wilson', email: 'james@coredynamic.net', type: 'contact' },
];

export function ContactSelector({ value, onChange, type = 'contact', className }: ContactSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const contacts = type === 'lead' ? MOCK_LEADS : MOCK_CONTACTS;
  const selected = contacts.find((c) => c.id === value);
  const label = type === 'lead' ? 'Lead' : 'Contact';

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
                  value={`${contact.name} ${contact.email}`}
                  onSelect={() => {
                    onChange(contact.id, contact);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn('mr-2 size-4', value === contact.id ? 'opacity-100' : 'opacity-0')}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{contact.name}</span>
                    <span className="text-xs text-muted-foreground">{contact.email}</span>
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
