'use client';

import { Send } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function InventoryShipmentsPage() {
  return (
    <FinancePageShell
      title="Shipments"
      description="Track shipments and delivery status"
      icon={<Send className="h-6 w-6 text-violet-600" />}
      addLabel="New Shipment"
    />
  );
}
