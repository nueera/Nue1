'use client';

import { Workflow } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { WorkflowList } from '@/modules/marketing/components/workflows';

export function WorkflowsPage() {
  return (
    <MarketingPageShell
      title="Workflows"
      description="Manage your automation workflows"
      icon={<Workflow className="h-6 w-6 text-orange-600" />}
      addLabel="New Workflow"
    >
      <WorkflowList />
    </MarketingPageShell>
  );
}
