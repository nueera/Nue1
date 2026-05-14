// @ts-nocheck
'use client';

import { Flag } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { GoalList } from '@/modules/marketing/components/web-tracking';

export function GoalTrackingPage() {
  return (
    <MarketingPageShell
      title="Goal Tracking"
      description="Define and track conversion goals"
      icon={<Flag className="h-6 w-6 text-emerald-600" />}
      addLabel="New Goal"
    >
      <GoalList />
    </MarketingPageShell>
  );
}
