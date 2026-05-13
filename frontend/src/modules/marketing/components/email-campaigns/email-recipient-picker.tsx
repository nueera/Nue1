'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useAudiences, useSegments } from '@/modules/marketing/hooks';
import { Users, Filter, AlertCircle } from 'lucide-react';

interface EmailRecipientPickerProps {
  selectedAudienceIds: string[];
  selectedSegmentIds: string[];
  onAudienceChange: (ids: string[]) => void;
  onSegmentChange: (ids: string[]) => void;
  className?: string;
}

export function EmailRecipientPicker({
  selectedAudienceIds,
  selectedSegmentIds,
  onAudienceChange,
  onSegmentChange,
  className,
}: EmailRecipientPickerProps) {
  const { data: audiencesData } = useAudiences();
  const { data: segmentsData } = useSegments();

  const audiences = audiencesData?.data ?? [];
  const segments = segmentsData?.data ?? [];

  const totalRecipients = audiences
    .filter((a) => selectedAudienceIds.includes(a.id))
    .reduce((sum, a) => sum + a.activeCount, 0);

  const handleAudienceToggle = (id: string) => {
    if (selectedAudienceIds.includes(id)) {
      onAudienceChange(selectedAudienceIds.filter((i) => i !== id));
    } else {
      onAudienceChange([...selectedAudienceIds, id]);
    }
  };

  const handleSegmentToggle = (id: string) => {
    if (selectedSegmentIds.includes(id)) {
      onSegmentChange(selectedSegmentIds.filter((i) => i !== id));
    } else {
      onSegmentChange([...selectedSegmentIds, id]);
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Recipient Count */}
      <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
        <Users className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <div>
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
            {totalRecipients.toLocaleString()} recipients
          </p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400">
            Across {selectedAudienceIds.length} audience{selectedAudienceIds.length !== 1 ? 's' : ''}
            {selectedSegmentIds.length > 0 && ` and ${selectedSegmentIds.length} segment${selectedSegmentIds.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Audiences */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            Audiences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pb-4">
          {audiences.length === 0 ? (
            <p className="text-xs text-muted-foreground py-4 text-center">No audiences available</p>
          ) : (
            audiences.map((audience) => (
              <div
                key={audience.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <Checkbox
                  checked={selectedAudienceIds.includes(audience.id)}
                  onCheckedChange={() => handleAudienceToggle(audience.id)}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{audience.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {audience.activeCount.toLocaleString()} members
                  </p>
                </div>
                <Badge variant="outline" className="text-[10px] shrink-0">
                  {audience.activeCount.toLocaleString()}
                </Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Segments */}
      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            Segments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 pb-4">
          {segments.length === 0 ? (
            <p className="text-xs text-muted-foreground py-4 text-center">No segments available</p>
          ) : (
            segments.map((segment) => (
              <div
                key={segment.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <Checkbox
                  checked={selectedSegmentIds.includes(segment.id)}
                  onCheckedChange={() => handleSegmentToggle(segment.id)}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{segment.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {segment.memberCount.toLocaleString()} members
                    {segment.isDynamic && ' · Dynamic'}
                  </p>
                </div>
                <Badge variant="outline" className="text-[10px] shrink-0">
                  {segment.memberCount.toLocaleString()}
                </Badge>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Deduplication Notice */}
      {selectedAudienceIds.length > 1 && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
          <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 dark:text-amber-300">
            Duplicate contacts across selected audiences will be automatically deduplicated. Each contact will receive only one email.
          </p>
        </div>
      )}
    </div>
  );
}
