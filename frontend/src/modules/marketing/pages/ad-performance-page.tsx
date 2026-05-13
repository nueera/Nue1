'use client';

import { BarChart3 } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { ROIDashboard } from '@/modules/marketing/components/analytics';

export function AdPerformancePage() {
  return (
    <MarketingPageShell
      title="Ad Performance"
      description="Track advertising spend and ROI"
      icon={<BarChart3 className="h-6 w-6 text-cyan-600" />}
      addLabel="Connect Ad Account"
    >
      <ROIDashboard />
    </MarketingPageShell>
  );
}
