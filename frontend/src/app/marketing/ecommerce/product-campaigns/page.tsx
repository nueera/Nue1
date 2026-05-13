'use client';

import { Package } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { ProductCampaignList } from '@/modules/marketing/components/ecommerce';

export default function ProductCampaignsPage() {
  return (
    <MarketingPageShell
      title="Product Campaigns"
      description="Create and manage product-specific campaigns"
      icon={<Package className="h-6 w-6 text-amber-600" />}
      addLabel="New Product Campaign"
    >
      <ProductCampaignList />
    </MarketingPageShell>
  );
}
