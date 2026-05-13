'use client';

import { useMarketingStore } from '@/modules/marketing/stores/marketing-store';
import {
  MarketingOverview,
  CampaignDashboard,
  LeadDashboard,
  EcommerceDashboard,
  PlannerDashboard,
} from '@/modules/marketing/components/dashboards';
import type { MarketingProduct } from '@/modules/marketing/types';

const dashboardMap: Record<MarketingProduct, React.ComponentType> = {
  campaigns: CampaignDashboard,
  leads: LeadDashboard,
  audiences: MarketingOverview,
  journeys: PlannerDashboard,
  analytics: MarketingOverview,
  ecommerce: EcommerceDashboard,
  automation: PlannerDashboard,
};

export function MarketingDashboardPage() {
  const { activeProduct, isHydrated } = useMarketingStore();

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="animate-pulse text-muted-foreground text-sm">Loading dashboard...</div>
      </div>
    );
  }

  const DashboardComponent = dashboardMap[activeProduct] || MarketingOverview;
  return <DashboardComponent />;
}
