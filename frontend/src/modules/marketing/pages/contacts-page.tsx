// @ts-nocheck
'use client';

import { Contact } from 'lucide-react';
import { MarketingPageShell } from '@/modules/marketing/components/shared/marketing-page-shell';
import { ContactList } from '@/modules/marketing/components/contacts';

export function ContactsPage() {
  return (
    <MarketingPageShell
      title="Contacts"
      description="Manage your marketing contacts"
      icon={<Contact className="h-6 w-6 text-blue-600" />}
      addLabel="New Contact"
    >
      <ContactList />
    </MarketingPageShell>
  );
}
