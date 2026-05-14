// @ts-nocheck
'use client';

import { Megaphone } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { EmailComposer } from '@/modules/marketing/components/email-campaigns';

export function CampaignBuilderPage() {
  return (
    <MarketingPageShell
      title="Campaign Builder"
      description="Build and configure your campaign"
      icon={<Megaphone className="h-6 w-6 text-emerald-600" />}
      addLabel="Save Campaign"
    >
      <EmailComposer />
    </MarketingPageShell>
  );
}
