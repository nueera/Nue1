'use client';

import { Workflow } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { WorkflowBuilder } from '@/modules/marketing/components/workflows';

export default function WorkflowBuilderPage() {
  return (
    <MarketingPageShell
      title="Workflow Builder"
      description="Design your automation workflow"
      icon={<Workflow className="h-6 w-6 text-orange-600" />}
      addLabel="Save Workflow"
    >
      <WorkflowBuilder />
    </MarketingPageShell>
  );
}
