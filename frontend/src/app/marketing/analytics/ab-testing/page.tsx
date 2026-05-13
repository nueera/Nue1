'use client';

import { FlaskConical } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { ABTestReport } from '@/modules/marketing/components/analytics';

export default function ABTestingPage() {
  return (
    <MarketingPageShell
      title="A/B Testing"
      description="Run and analyze A/B tests for your campaigns"
      icon={<FlaskConical className="h-6 w-6 text-purple-600" />}
      addLabel="New A/B Test"
    >
      <ABTestReport />
    </MarketingPageShell>
  );
}
