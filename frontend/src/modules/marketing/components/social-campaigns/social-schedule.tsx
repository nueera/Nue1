// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SchedulePicker, type ScheduleConfig } from '../shared/schedule-picker';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Clock } from 'lucide-react';

interface SocialScheduleProps {
  value: ScheduleConfig;
  onChange: (config: ScheduleConfig) => void;
  className?: string;
}

export function SocialSchedule({ value, onChange, className }: SocialScheduleProps) {
  const bestTimes = [
    { day: 'Monday', time: '9:00 AM', confidence: 92 },
    { day: 'Wednesday', time: '12:00 PM', confidence: 88 },
    { day: 'Friday', time: '3:00 PM', confidence: 85 },
  ];

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          Schedule Post
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SchedulePicker value={value} onChange={onChange} />

        {/* Best Time Recommendations */}
        <div className="space-y-2 pt-2 border-t">
          <Label className="text-xs text-muted-foreground flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            Recommended Times
          </Label>
          {bestTimes.map((rec) => (
            <button
              key={rec.day}
              className="flex items-center justify-between w-full p-2 rounded-lg border border-border/50 hover:bg-muted/30 transition-colors text-left"
              onClick={() => {
                onChange({ ...value, date: new Date() });
              }}
            >
              <div>
                <p className="text-xs font-medium">{rec.day}</p>
                <p className="text-[10px] text-muted-foreground">{rec.time}</p>
              </div>
              <Badge variant="outline" className="text-[10px] px-1.5 py-0">
                {rec.confidence}% match
              </Badge>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
