'use client';

import { Split } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { SegmentBuilder } from '@/modules/marketing/components/segments';

export function SegmentBuilderPage() {
  return (
    <MarketingPageShell
      title="Segment Builder"
      description="Build dynamic audience segments with conditions"
      icon={<Split className="h-6 w-6 text-amber-600" />}
      addLabel="Save Segment"
    >
      <SegmentBuilder />
    </MarketingPageShell>
  );
}
