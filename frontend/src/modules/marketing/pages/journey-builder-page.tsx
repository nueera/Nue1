// @ts-nocheck
'use client';

import { GitBranchPlus } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { JourneyBuilder } from '@/modules/marketing/components/journeys';

export function JourneyBuilderPage() {
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
