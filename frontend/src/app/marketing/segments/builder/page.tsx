'use client';

import dynamic from 'next/dynamic';
import { Split } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';

const SegmentBuilder = dynamic(
  () => import('@/modules/marketing/components/segments/segment-builder').then(m => ({ default: m.SegmentBuilder })),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">Loading Segment Builder...</div> }
);

export default function SegmentBuilderPage() {
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
