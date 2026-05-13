'use client';

import dynamic from 'next/dynamic';
import { Globe } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';

const LandingPageBuilder = dynamic(
  () => import('@/modules/marketing/components/landing-pages/landing-page-builder').then(m => ({ default: m.LandingPageBuilder })),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">Loading Landing Page Builder...</div> }
);

export default function LandingPageBuilderPage() {
  return (
    <MarketingPageShell
      title="Landing Page Builder"
      description="Design and build your landing page"
      icon={<Globe className="h-6 w-6 text-indigo-600" />}
      addLabel="Publish"
    >
      <LandingPageBuilder />
    </MarketingPageShell>
  );
}
