// @ts-nocheck
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, FlaskConical } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import type { ABTest, ABVariant } from '@/modules/marketing/types';

export interface ABTestSelectorProps {
  value?: string;
  onChange: (value: string, variant: ABVariant, test: ABTest) => void;
  className?: string;
}

const MOCK_TESTS: Array<ABTest & { variants: ABVariant[] }> = [
  {
    id: 'ab1',
    name: 'Subject Line Test',
    type: 'subject_line',
    variants: [
      { id: 'v1a', name: 'Control: Standard', description: 'Current subject line', trafficPercent: 50, impressions: 1200, conversions: 85, conversionRate: 7.08, isControl: true, isWinner: false },
      { id: 'v1b', name: 'Variant: Urgency', description: 'Urgency-based subject', trafficPercent: 50, impressions: 1180, conversions: 102, conversionRate: 8.64, isControl: false, isWinner: true },
    ],
    status: 'completed',
    confidenceLevel: 95,
    startDate: '2024-01-15',
    createdAt: '2024-01-15',
  },
  {
    id: 'ab2',
    name: 'CTA Button Color',
    type: 'cta',
    variants: [
      { id: 'v2a', name: 'Control: Green CTA', description: 'Standard green button', trafficPercent: 50, impressions: 2400, conversions: 168, conversionRate: 7.0, isControl: true, isWinner: false },
      { id: 'v2b', name: 'Variant: Orange CTA', description: 'Orange button', trafficPercent: 50, impressions: 2350, conversions: 188, conversionRate: 8.0, isControl: false, isWinner: false },
    ],
    status: 'running',
    confidenceLevel: 78,
    startDate: '2024-02-01',
    createdAt: '2024-02-01',
  },
  {
    id: 'ab3',
    name: 'Send Time Optimization',
    type: 'send_time',
    variants: [
      { id: 'v3a', name: 'Control: 9AM', description: 'Morning send', trafficPercent: 33, impressions: 800, conversions: 48, conversionRate: 6.0, isControl: true, isWinner: false },
      { id: 'v3b', name: 'Variant: 1PM', description: 'Afternoon send', trafficPercent: 33, impressions: 790, conversions: 55, conversionRate: 6.96, isControl: false, isWinner: false },
      { id: 'v3c', name: 'Variant: 6PM', description: 'Evening send', trafficPercent: 34, impressions: 810, conversions: 62, conversionRate: 7.65, isControl: false, isWinner: false },
    ],
    status: 'running',
    confidenceLevel: 62,
    startDate: '2024-02-10',
    createdAt: '2024-02-10',
  },
];

const STATUS_STYLES: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  running: 'bg-blue-100 text-blue-700',
  completed: 'bg-emerald-100 text-emerald-700',
  paused: 'bg-amber-100 text-amber-700',
};

export function ABTestSelector({ value, onChange, className }: ABTestSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedTestId, setSelectedTestId] = React.useState<string | undefined>(undefined);
  const [selectedVariantId, setSelectedVariantId] = React.useState<string | undefined>(value);

  const selectedTest = MOCK_TESTS.find((t) => t.id === selectedTestId);

  const handleTestSelect = (testId: string) => {
    setSelectedTestId(testId);
    setSelectedVariantId(undefined);
  };

  const handleVariantSelect = (variantId: string) => {
    const test = MOCK_TESTS.find((t) => t.id === selectedTestId);
    const variant = test?.variants.find((v) => v.id === variantId);
    if (test && variant) {
      setSelectedVariantId(variantId);
      onChange(variantId, variant, test);
      setOpen(false);
    }
  };

  const selectedVariant = selectedTest?.variants.find((v) => v.id === selectedVariantId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('w-full justify-between font-normal', className)}
        >
          {selectedVariant && selectedTest ? (
            <span className="flex items-center gap-2 truncate">
              <FlaskConical className="size-4 shrink-0 text-muted-foreground" />
              <span className="truncate">
                {selectedTest.name} → {selectedVariant.name}
              </span>
            </span>
          ) : (
            <span className="text-muted-foreground">Select A/B test variant...</span>
          )}
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search A/B tests..." />
          <CommandList>
            <CommandEmpty>No A/B test found.</CommandEmpty>
            {!selectedTestId ? (
              <CommandGroup heading="Tests">
                {MOCK_TESTS.map((test) => (
                  <CommandItem
                    key={test.id}
                    value={test.name}
                    onSelect={() => handleTestSelect(test.id)}
                  >
                    <FlaskConical className="mr-2 size-4 text-muted-foreground" />
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{test.name}</span>
                        <Badge variant="secondary" className={cn('text-[10px] px-1.5 py-0', STATUS_STYLES[test.status])}>
                          {test.status}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {test.type.replace('_', ' ')} · {test.variants.length} variants
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandGroup heading={selectedTest?.name}>
                <CommandItem
                  value="← Back to tests"
                  onSelect={() => {
                    setSelectedTestId(undefined);
                    setSelectedVariantId(undefined);
                  }}
                  className="text-muted-foreground"
                >
                  ← Back to tests
                </CommandItem>
                {selectedTest?.variants.map((variant) => (
                  <CommandItem
                    key={variant.id}
                    value={variant.name}
                    onSelect={() => handleVariantSelect(variant.id)}
                  >
                    <Check
                      className={cn('mr-2 size-4', selectedVariantId === variant.id ? 'opacity-100' : 'opacity-0')}
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{variant.name}</span>
                        {variant.isControl && (
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0">Control</Badge>
                        )}
                        {variant.isWinner && (
                          <Badge className="text-[10px] px-1.5 py-0 bg-emerald-100 text-emerald-700">Winner</Badge>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {variant.conversionRate}% conversion · {variant.trafficPercent}% traffic
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
