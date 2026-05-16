'use client';

import { Layers } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { StagePipeline } from '@/modules/marketing/components/stages';

export function LeadStagesPage() {
  return (
    <MarketingPageShell
      title="Lead Stages"
      description="Manage your lead pipeline stages and transitions"
      icon={<Layers className="h-6 w-6 text-cyan-600" />}
      addLabel="New Stage"
    >
      <StagePipeline />
    </MarketingPageShell>
  );
}
