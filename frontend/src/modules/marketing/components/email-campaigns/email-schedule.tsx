// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { SchedulePicker, type ScheduleConfig } from '../shared/schedule-picker';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface EmailScheduleProps {
  value: ScheduleConfig;
  onChange: (config: ScheduleConfig) => void;
  className?: string;
}

export function EmailSchedule({ value, onChange, className }: EmailScheduleProps) {
  const recurrence = 'once';

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          Schedule
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SchedulePicker value={value} onChange={onChange} />

        <div className="space-y-2">
          <Label className="text-sm font-medium">Recurrence</Label>
          <Select
            value={recurrence}
            onValueChange={(val) => {
              // Handle recurrence change
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select recurrence" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="once">One-time</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
