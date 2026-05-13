'use client';

import { Phone } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { WhatsappCampaignList } from '@/modules/marketing/components/whatsapp-campaigns';

export function WhatsappCampaignsPage() {
  return (
    <MarketingPageShell
      title="WhatsApp Campaigns"
      description="Create and manage WhatsApp messaging campaigns"
      icon={<Phone className="h-6 w-6 text-teal-600" />}
      addLabel="New WhatsApp Campaign"
    >
      <WhatsappCampaignList />
    </MarketingPageShell>
  );
}
