// @ts-nocheck
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Braces, Check, ChevronsUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export interface MergeField {
  key: string;
  label: string;
  category: string;
  example: string;
}

export interface MergeFieldPickerProps {
  onSelect: (field: MergeField) => void;
  className?: string;
}

const MERGE_FIELDS: MergeField[] = [
  // Contact fields
  { key: 'first_name', label: 'First Name', category: 'Contact', example: 'John' },
  { key: 'last_name', label: 'Last Name', category: 'Contact', example: 'Doe' },
  { key: 'email', label: 'Email', category: 'Contact', example: 'john@example.com' },
  { key: 'phone', label: 'Phone', category: 'Contact', example: '+1-555-0100' },
  { key: 'company', label: 'Company', category: 'Contact', example: 'Acme Corp' },
  { key: 'job_title', label: 'Job Title', category: 'Contact', example: 'CEO' },

  // Campaign fields
  { key: 'unsubscribe_url', label: 'Unsubscribe URL', category: 'Campaign', example: 'https://...' },
  { key: 'preferences_url', label: 'Preferences URL', category: 'Campaign', example: 'https://...' },
  { key: 'campaign_name', label: 'Campaign Name', category: 'Campaign', example: 'Welcome Series' },
  { key: 'sender_name', label: 'Sender Name', category: 'Campaign', example: 'Acme Team' },

  // Custom fields
  { key: 'custom_field_1', label: 'Custom Field 1', category: 'Custom', example: 'Value' },
  { key: 'custom_field_2', label: 'Custom Field 2', category: 'Custom', example: 'Value' },
];

const CATEGORY_ORDER = ['Contact', 'Campaign', 'Custom'];

export function MergeFieldPicker({ onSelect, className }: MergeFieldPickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (field: MergeField) => {
    onSelect(field);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('gap-1.5 font-normal', className)}
        >
          <Braces className="size-4" />
          Merge Fields
          <ChevronsUpDown className="ml-1 size-3.5 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <Command>
          <CommandInput placeholder="Search merge fields..." />
          <CommandList>
            <CommandEmpty>No field found.</CommandEmpty>
            {CATEGORY_ORDER.map((category) => {
              const fields = MERGE_FIELDS.filter((f) => f.category === category);
              if (fields.length === 0) return null;
              return (
                <CommandGroup key={category} heading={category}>
                  {fields.map((field) => (
                    <CommandItem
                      key={field.key}
                      value={`${field.label} ${field.key}`}
                      onSelect={() => handleSelect(field)}
                      className="cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-sm">
                          {`{{${field.key}}}`}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {field.label} · e.g. {field.example}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              );
            })}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
