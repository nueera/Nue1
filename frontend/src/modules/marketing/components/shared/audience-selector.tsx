// @ts-nocheck
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, Users } from 'lucide-react';
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

export interface AudienceOption {
  id: string;
  name: string;
  memberCount: number;
  type?: 'audience' | 'segment';
}

export interface AudienceSelectorProps {
  value?: string;
  onChange: (value: string, audience: AudienceOption) => void;
  type?: 'audience' | 'segment';
  className?: string;
}

const MOCK_AUDIENCES: AudienceOption[] = [
  { id: 'a1', name: 'All Subscribers', memberCount: 24850, type: 'audience' },
  { id: 'a2', name: 'Active Customers', memberCount: 8420, type: 'audience' },
  { id: 'a3', name: 'Newsletter Readers', memberCount: 12300, type: 'audience' },
  { id: 'a4', name: 'Trial Users', memberCount: 3200, type: 'audience' },
  { id: 'a5', name: 'VIP Customers', memberCount: 890, type: 'audience' },
];

const MOCK_SEGMENTS: AudienceOption[] = [
  { id: 's1', name: 'High Engagement', memberCount: 5600, type: 'segment' },
  { id: 's2', name: 'Recent Purchasers', memberCount: 2300, type: 'segment' },
  { id: 's3', name: 'At-Risk Subscribers', memberCount: 1800, type: 'segment' },
  { id: 's4', name: 'New Signups (30d)', memberCount: 940, type: 'segment' },
  { id: 's5', name: 'Enterprise Leads', memberCount: 420, type: 'segment' },
];

export function AudienceSelector({ value, onChange, type = 'audience', className }: AudienceSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const items = type === 'audience' ? MOCK_AUDIENCES : MOCK_SEGMENTS;
  const selected = items.find((i) => i.id === value);
  const label = type === 'audience' ? 'Audience' : 'Segment';

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
              <Users className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{selected.name}</span>
              <span className="text-xs text-muted-foreground">({selected.memberCount.toLocaleString()})</span>
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
              {items.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.name}
                  onSelect={() => {
                    onChange(item.id, item);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn('mr-2 size-4', value === item.id ? 'opacity-100' : 'opacity-0')}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {item.memberCount.toLocaleString()} members
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
