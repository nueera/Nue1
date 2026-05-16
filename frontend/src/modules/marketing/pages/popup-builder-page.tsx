'use client';

import { Bell } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { PopupBuilder } from '@/modules/marketing/components/popups';

export function PopupBuilderPage() {
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
