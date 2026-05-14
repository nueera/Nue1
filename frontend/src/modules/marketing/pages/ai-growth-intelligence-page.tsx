// @ts-nocheck
'use client';

import { TrendingUp } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { AIGrowthInsight } from '@/modules/marketing/components/ai-growth-insight';

export function AiGrowthIntelligencePage() {
  return (
    <MarketingPageShell
      title="AI Growth Intelligence"
      description="AI-powered insights and recommendations for growth"
      icon={<TrendingUp className="h-6 w-6 text-violet-600" />}
      addLabel="Generate Insights"
    >
      <AIGrowthInsight />
    </MarketingPageShell>
  );
}
