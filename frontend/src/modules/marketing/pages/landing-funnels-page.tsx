// @ts-nocheck
'use client';

import { GitBranchPlus } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { LandingPageList } from '@/modules/marketing/components/landing-pages';

export function LandingFunnelsPage() {
  return (
    <MarketingPageShell
      title="Landing Funnels"
      description="Manage your landing page funnels and conversions"
      icon={<GitBranchPlus className="h-6 w-6 text-indigo-600" />}
      addLabel="New Funnel"
    >
      <LandingPageList />
    </MarketingPageShell>
  );
}
