'use client';

import dynamic from 'next/dynamic';
import { Workflow } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';

const WorkflowBuilder = dynamic(
  () => import('@/modules/marketing/components/workflows/workflow-builder').then(m => ({ default: m.WorkflowBuilder })),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">Loading Workflow Builder...</div> }
);

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
