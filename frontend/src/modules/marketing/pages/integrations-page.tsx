'use client';

import { Plug } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { IntegrationMarketplace } from '@/modules/marketing/components/integrations';

export function IntegrationsPage() {
  return (
    <MarketingPageShell
      title="Integrations"
      description="Connect third-party tools and services"
      icon={<Plug className="h-6 w-6 text-orange-600" />}
      addLabel="Browse Integrations"
    >
      <IntegrationMarketplace />
    </MarketingPageShell>
  );
}
