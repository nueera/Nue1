'use client';

import { GitBranchPlus } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { JourneyList } from '@/modules/marketing/components/journeys';

export function JourneysPage() {
  return (
    <MarketingPageShell
      title="Journeys"
      description="Manage your customer journeys and automations"
      icon={<GitBranchPlus className="h-6 w-6 text-indigo-600" />}
      addLabel="New Journey"
    >
      <JourneyList />
    </MarketingPageShell>
  );
}
