'use client';

import { Heart } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { ROIDashboard } from '@/modules/marketing/components/analytics';

export function RetentionPage() {
  return (
    <MarketingPageShell
      title="Retention"
      description="Monitor customer retention and engagement trends"
      icon={<Heart className="h-6 w-6 text-pink-600" />}
      addLabel="New Retention Report"
    >
      <ROIDashboard />
    </MarketingPageShell>
  );
}
