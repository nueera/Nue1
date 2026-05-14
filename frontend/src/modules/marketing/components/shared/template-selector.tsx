// @ts-nocheck
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, FileText } from 'lucide-react';
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

export interface TemplateOption {
  id: string;
  name: string;
  subject: string;
  category: string;
}

export interface TemplateSelectorProps {
  value?: string;
  onChange: (value: string, template: TemplateOption) => void;
  className?: string;
}

const MOCK_TEMPLATES: TemplateOption[] = [
  { id: 't1', name: 'Welcome Series', subject: 'Welcome to {{company}}!', category: 'Onboarding' },
  { id: 't2', name: 'Monthly Newsletter', subject: 'Your {{month}} Update', category: 'Newsletter' },
  { id: 't3', name: 'Product Launch', subject: 'Introducing {{product_name}}', category: 'Promotion' },
  { id: 't4', name: 'Re-engagement', subject: 'We miss you, {{first_name}}!', category: 'Retention' },
  { id: 't5', name: 'Event Invitation', subject: 'You\'re Invited: {{event_name}}', category: 'Events' },
  { id: 't6', name: 'Cart Recovery', subject: 'Your cart is waiting...', category: 'E-Commerce' },
  { id: 't7', name: 'Thank You', subject: 'Thanks for your purchase!', category: 'Post-Purchase' },
];

export function TemplateSelector({ value, onChange, className }: TemplateSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const selected = MOCK_TEMPLATES.find((t) => t.id === value);

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
              <FileText className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">{selected.name}</span>
            </span>
          ) : (
            <span className="text-muted-foreground">Select template...</span>
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search templates..." />
          <CommandList>
            <CommandEmpty>No template found.</CommandEmpty>
            <CommandGroup>
              {MOCK_TEMPLATES.map((template) => (
                <CommandItem
                  key={template.id}
                  value={`${template.name} ${template.subject} ${template.category}`}
                  onSelect={() => {
                    onChange(template.id, template);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn('mr-2 size-4', value === template.id ? 'opacity-100' : 'opacity-0')}
                  />
                  <div className="flex flex-col">
                    <span className="font-medium">{template.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {template.category} · {template.subject}
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
