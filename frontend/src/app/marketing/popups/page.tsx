'use client';

import { Bell } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { PopupList } from '@/modules/marketing/components/popups';

export default function PopupsPage() {
  return (
    <MarketingPageShell
      title="Popups"
      description="Create and manage popups and floating bars"
      icon={<Bell className="h-6 w-6 text-amber-600" />}
      addLabel="New Popup"
    >
      <PopupList />
    </MarketingPageShell>
  );
}
