'use client';

import { Split } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { SegmentList } from '@/modules/marketing/components/segments';

export default function SegmentsPage() {
  return (
    <MarketingPageShell
      title="Segments"
      description="Create and manage audience segments"
      icon={<Split className="h-6 w-6 text-amber-600" />}
      addLabel="New Segment"
    >
      <SegmentList />
    </MarketingPageShell>
  );
}
