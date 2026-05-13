'use client';

import dynamic from 'next/dynamic';
import { BarChart3 } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';

const AnalyticsOverview = dynamic(
  () => import('@/modules/marketing/components/analytics/analytics-overview').then(m => ({ default: m.AnalyticsOverview })),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">Loading Analytics...</div> }
);

export default function AnalyticsOverviewPage() {
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
