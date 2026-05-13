'use client';

import { lazy, Suspense } from 'react';
import { useMarketingStore } from '@/modules/marketing/stores/marketing-store';
import type { MarketingProduct } from '@/modules/marketing/types';

// Lazy-load dashboard components — only the active product's dashboard is loaded,
// reducing initial bundle size by ~80% (5 dashboards → 1 on first load).
const MarketingOverview = lazy(() =>
  import('@/modules/marketing/components/dashboards/marketing-overview').then(m => ({ default: m.MarketingOverview }))
);
const CampaignDashboard = lazy(() =>
  import('@/modules/marketing/components/dashboards/campaign-dashboard').then(m => ({ default: m.CampaignDashboard }))
);
const LeadDashboard = lazy(() =>
  import('@/modules/marketing/components/dashboards/lead-dashboard').then(m => ({ default: m.LeadDashboard }))
);
const EcommerceDashboard = lazy(() =>
  import('@/modules/marketing/components/dashboards/ecommerce-dashboard').then(m => ({ default: m.EcommerceDashboard }))
);
const PlannerDashboard = lazy(() =>
  import('@/modules/marketing/components/dashboards/planner-dashboard').then(m => ({ default: m.PlannerDashboard }))
);

const dashboardMap: Record<MarketingProduct, React.ComponentType> = {
  campaigns: CampaignDashboard,
  leads: LeadDashboard,
  audiences: MarketingOverview,
  journeys: PlannerDashboard,
  analytics: MarketingOverview,
  ecommerce: EcommerceDashboard,
  automation: PlannerDashboard,
};

function DashboardSkeleton() {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="animate-pulse text-muted-foreground text-sm">Loading dashboard...</div>
    </div>
  );
}

export default function MarketingDashboardPage() {
  const activeProduct = useMarketingStore((s) => s.activeProduct);
  const isHydrated = useMarketingStore((s) => s.isHydrated);

  if (!isHydrated) {
    return <DashboardSkeleton />;
  }

  const DashboardComponent = dashboardMap[activeProduct] || MarketingOverview;

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardComponent />
    </Suspense>
  );
}
