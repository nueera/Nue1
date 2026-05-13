'use client';

import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DateRangePickerProps {
  from?: Date;
  to?: Date;
  onChange?: (range: { from?: Date; to?: Date }) => void;
}

export function DateRangePicker({ from, to, onChange }: DateRangePickerProps) {
  const label = from && to
    ? `${from.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${to.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    : 'Select date range';

  return (
    <Button variant="outline" className="gap-2" style={{ fontSize: 'var(--text-sm)' }}>
      <CalendarIcon className="h-4 w-4" strokeWidth={1.8} />
      {label}
    </Button>
  );
}
