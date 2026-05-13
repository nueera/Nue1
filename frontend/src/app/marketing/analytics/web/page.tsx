'use client';

import { Globe } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { WebAnalyticsDashboard } from '@/modules/marketing/components/analytics';

export default function WebAnalyticsPage() {
  return (
    <MarketingPageShell
      title="Web Analytics"
      description="Track website visitors, pages, and traffic sources"
      icon={<Globe className="h-6 w-6 text-blue-600" />}
      addLabel="Add Tracking"
    >
      <WebAnalyticsDashboard />
    </MarketingPageShell>
  );
}
