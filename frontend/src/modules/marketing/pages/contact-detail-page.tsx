// @ts-nocheck
'use client';

import { use } from 'react';
import { Contact } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { ContactDetails } from '@/modules/marketing/components/contacts';

export function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <MarketingPageShell
      title="Contact Details"
      description={`Viewing contact ${id}`}
      icon={<Contact className="h-6 w-6 text-blue-600" />}
      addLabel="Edit Contact"
    >
      <ContactDetails contactId={id} />
    </MarketingPageShell>
  );
}
