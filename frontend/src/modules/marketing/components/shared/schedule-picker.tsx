'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Clock, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export interface ScheduleConfig {
  date?: Date;
  time?: string;
  timezone: string;
}

export interface SchedulePickerProps {
  value?: ScheduleConfig;
  onChange: (config: ScheduleConfig) => void;
  className?: string;
}

const TIMEZONES = [
  { value: 'UTC', label: 'UTC (Coordinated Universal Time)' },
  { value: 'America/New_York', label: 'Eastern Time (US & Canada)' },
  { value: 'America/Chicago', label: 'Central Time (US & Canada)' },
  { value: 'America/Denver', label: 'Mountain Time (US & Canada)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Asia/Shanghai', label: 'Shanghai (CST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST)' },
];

const TIME_SLOTS = Array.from({ length: 48 }, (_, i) => {
  const hour = Math.floor(i / 2);
  const minute = i % 2 === 0 ? '00' : '30';
  const h12 = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const ampm = hour < 12 ? 'AM' : 'PM';
  return { value: `${String(hour).padStart(2, '0')}:${minute}`, label: `${h12}:${minute} ${ampm}` };
});

export function SchedulePicker({ value, onChange, className }: SchedulePickerProps) {
  const [calendarOpen, setCalendarOpen] = React.useState(false);
  const selectedDate = value?.date;
  const selectedTime = value?.time ?? '09:00';
  const selectedTimezone = value?.timezone ?? 'America/New_York';

  const handleDateSelect = (date: Date | undefined) => {
    setCalendarOpen(false);
    onChange({
      date,
      time: selectedTime,
      timezone: selectedTimezone,
    });
  };

  const handleTimeChange = (time: string) => {
    onChange({
      date: selectedDate,
      time,
      timezone: selectedTimezone,
    });
  };

  const handleTimezoneChange = (timezone: string) => {
    onChange({
      date: selectedDate,
      time: selectedTime,
      timezone,
    });
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Pick a date';
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Date Picker */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Date</Label>
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !selectedDate && 'text-muted-foreground'
              )}
            >
              <Calendar className="mr-2 size-4" />
              {formatDate(selectedDate)}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Picker */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Time</Label>
        <div className="flex gap-2">
          <Select value={selectedTime} onValueChange={handleTimeChange}>
            <SelectTrigger className="flex-1">
              <Clock className="mr-2 size-4 text-muted-foreground" />
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {TIME_SLOTS.map((slot) => (
                <SelectItem key={slot.value} value={slot.value}>
                  {slot.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Timezone Picker */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Timezone</Label>
        <Select value={selectedTimezone} onValueChange={handleTimezoneChange}>
          <SelectTrigger>
            <Globe className="mr-2 size-4 text-muted-foreground" />
            <SelectValue placeholder="Select timezone" />
          </SelectTrigger>
          <SelectContent className="max-h-64">
            {TIMEZONES.map((tz) => (
              <SelectItem key={tz.value} value={tz.value}>
                {tz.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
