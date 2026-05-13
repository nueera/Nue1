'use client';

import { PieChart } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { AttributionReport } from '@/modules/marketing/components/analytics';

export default function AttributionPage() {
  return (
    <MarketingPageShell
      title="Attribution"
      description="Understand which channels drive conversions"
      icon={<PieChart className="h-6 w-6 text-violet-600" />}
      addLabel="New Attribution Report"
    >
      <AttributionReport />
    </MarketingPageShell>
  );
}
