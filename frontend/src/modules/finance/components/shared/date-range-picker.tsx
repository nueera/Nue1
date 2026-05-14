// @ts-nocheck
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';

export interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export interface DateRangePickerProps {
  from?: Date;
  to?: Date;
  onChange: (range: DateRange) => void;
  className?: string;
}

interface PresetRange {
  label: string;
  getRange: () => DateRange;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

function startOfQuarter(date: Date): Date {
  const quarter = Math.floor(date.getMonth() / 3);
  return new Date(date.getFullYear(), quarter * 3, 1);
}

function endOfQuarter(date: Date): Date {
  const quarter = Math.floor(date.getMonth() / 3);
  return new Date(date.getFullYear(), quarter * 3 + 3, 0);
}

function startOfYear(date: Date): Date {
  return new Date(date.getFullYear(), 0, 1);
}

function endOfYear(date: Date): Date {
  return new Date(date.getFullYear(), 11, 31);
}

const PRESET_RANGES: PresetRange[] = [
  {
    label: 'This Month',
    getRange: () => {
      const now = new Date();
      return { from: startOfMonth(now), to: endOfMonth(now) };
    },
  },
  {
    label: 'Last Month',
    getRange: () => {
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return { from: startOfMonth(lastMonth), to: endOfMonth(lastMonth) };
    },
  },
  {
    label: 'This Quarter',
    getRange: () => {
      const now = new Date();
      return { from: startOfQuarter(now), to: endOfQuarter(now) };
    },
  },
  {
    label: 'Last Quarter',
    getRange: () => {
      const now = new Date();
      const lastQuarterDate = new Date(now.getFullYear(), now.getMonth() - 3, 1);
      return { from: startOfQuarter(lastQuarterDate), to: endOfQuarter(lastQuarterDate) };
    },
  },
  {
    label: 'This Year',
    getRange: () => {
      const now = new Date();
      return { from: startOfYear(now), to: endOfYear(now) };
    },
  },
];

export function DateRangePicker({
  from,
  to,
  onChange,
  className,
}: DateRangePickerProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, 'MMM dd, yyyy') : '';
  };

  const displayValue = (() => {
    if (from && to) return `${formatDate(from)} – ${formatDate(to)}`;
    if (from) return `${formatDate(from)} – ...`;
    return 'Pick a date range';
  })();

  return (
    <div className={cn('flex gap-2', className)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !from && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 size-4" />
            <span className="truncate">{displayValue}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex flex-col sm:flex-row">
            {/* Presets */}
            <div className="flex sm:flex-col gap-1 p-3 border-b sm:border-b-0 sm:border-r">
              {PRESET_RANGES.map((preset) => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  size="sm"
                  className="justify-start text-sm"
                  onClick={() => {
                    const range = preset.getRange();
                    onChange(range);
                    setIsOpen(false);
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </div>
            {/* Calendar */}
            <Calendar
              mode="range"
              selected={{ from, to }}
              onSelect={(range) => {
                if (range) {
                  onChange({ from: range.from, to: range.to ?? undefined });
                }
              }}
              numberOfMonths={2}
              defaultMonth={from}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
