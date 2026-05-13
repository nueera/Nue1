'use client';

import dynamic from 'next/dynamic';
import { GitBranchPlus } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';

const JourneyBuilder = dynamic(
  () => import('@/modules/marketing/components/journeys/journey-builder').then(m => ({ default: m.JourneyBuilder })),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">Loading Journey Builder...</div> }
);

export default function JourneyBuilderPage() {
  return (
    <MarketingPageShell
      title="Journey Builder"
      description="Design your customer journey workflow"
      icon={<GitBranchPlus className="h-6 w-6 text-indigo-600" />}
      addLabel="Save Journey"
    >
      <JourneyBuilder />
    </MarketingPageShell>
  );
}
