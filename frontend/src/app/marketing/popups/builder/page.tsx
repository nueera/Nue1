'use client';

import dynamic from 'next/dynamic';
import { Bell } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';

const PopupBuilder = dynamic(
  () => import('@/modules/marketing/components/popups/popup-builder').then(m => ({ default: m.PopupBuilder })),
  { ssr: false, loading: () => <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">Loading Popup Builder...</div> }
);

export default function PopupBuilderPage() {
  return (
    <MarketingPageShell
      title="Popup Builder"
      description="Design and configure your popup"
      icon={<Bell className="h-6 w-6 text-amber-600" />}
      addLabel="Save Popup"
    >
      <PopupBuilder />
    </MarketingPageShell>
  );
}
