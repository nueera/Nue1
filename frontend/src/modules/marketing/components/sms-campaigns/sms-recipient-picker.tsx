// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useAudiences } from '@/modules/marketing/hooks/use-audiences';
import { useSegments } from '@/modules/marketing/hooks/use-segments';
import { Users, Filter, Phone } from 'lucide-react';

interface SmsRecipientPickerProps {
  selectedAudienceIds: string[];
  selectedSegmentIds: string[];
  onAudienceChange: (ids: string[]) => void;
  onSegmentChange: (ids: string[]) => void;
  className?: string;
}

export function SmsRecipientPicker({
  selectedAudienceIds,
  selectedSegmentIds,
  onAudienceChange,
  onSegmentChange,
  className,
}: SmsRecipientPickerProps) {
  const { data: audiencesData } = useAudiences();
  const { data: segmentsData } = useSegments();

  const audiences = audiencesData?.data ?? [];
  const segments = segmentsData?.data ?? [];

  const totalRecipients = audiences
    .filter((a) => selectedAudienceIds.includes(a.id))
    .reduce((sum, a) => sum + a.activeCount, 0);

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
        <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <div>
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            {totalRecipients.toLocaleString()} SMS recipients
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            Only contacts with phone numbers will receive SMS
          </p>
        </div>
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            Audiences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pb-4">
          {audiences.map((audience) => (
            <div key={audience.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30">
              <Checkbox
                checked={selectedAudienceIds.includes(audience.id)}
                onCheckedChange={() => {
                  if (selectedAudienceIds.includes(audience.id)) {
                    onAudienceChange(selectedAudienceIds.filter((i) => i !== audience.id));
                  } else {
                    onAudienceChange([...selectedAudienceIds, audience.id]);
                  }
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{audience.name}</p>
                <p className="text-xs text-muted-foreground">{audience.activeCount.toLocaleString()} members</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            Segments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pb-4">
          {segments.map((segment) => (
            <div key={segment.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30">
              <Checkbox
                checked={selectedSegmentIds.includes(segment.id)}
                onCheckedChange={() => {
                  if (selectedSegmentIds.includes(segment.id)) {
                    onSegmentChange(selectedSegmentIds.filter((i) => i !== segment.id));
                  } else {
                    onSegmentChange([...selectedSegmentIds, segment.id]);
                  }
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{segment.name}</p>
                <p className="text-xs text-muted-foreground">{segment.memberCount.toLocaleString()} members</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
