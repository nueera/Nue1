// @ts-nocheck
'use client';

import { Target } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { ScoringRuleList } from '@/modules/marketing/components/scoring';

export function LeadScoringPage() {
  return (
    <MarketingPageShell
      title="Lead Scoring"
      description="Configure lead scoring rules and criteria"
      icon={<Target className="h-6 w-6 text-amber-600" />}
      addLabel="New Scoring Rule"
    >
      <ScoringRuleList />
    </MarketingPageShell>
  );
}
