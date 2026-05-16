'use client';

import { BarChart3 } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { AnalyticsOverview } from '@/modules/marketing/components/analytics';

export function AnalyticsOverviewPage() {
  return (
    <MarketingPageShell
      title="Analytics Overview"
      description="Your marketing analytics at a glance"
      icon={<BarChart3 className="h-6 w-6 text-cyan-600" />}
      addLabel="Export Report"
    >
      <AnalyticsOverview />
    </MarketingPageShell>
  );
}
