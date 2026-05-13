'use client';

import { Zap } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { WorkflowList } from '@/modules/marketing/components/workflows';

export default function AutomationOverviewPage() {
  return (
    <MarketingPageShell
      title="Automation"
      description="Manage your marketing automation and workflows"
      icon={<Zap className="h-6 w-6 text-yellow-600" />}
      addLabel="New Automation"
    >
      <WorkflowList />
    </MarketingPageShell>
  );
}
