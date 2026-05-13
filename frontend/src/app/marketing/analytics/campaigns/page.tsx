'use client';

import { FileBarChart } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { CampaignReportList } from '@/modules/marketing/components/analytics';

export default function CampaignReportsPage() {
  return (
    <MarketingPageShell
      title="Campaign Reports"
      description="Detailed performance reports for your campaigns"
      icon={<FileBarChart className="h-6 w-6 text-cyan-600" />}
      addLabel="Generate Report"
    >
      <CampaignReportList />
    </MarketingPageShell>
  );
}
