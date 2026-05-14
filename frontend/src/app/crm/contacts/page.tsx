'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { contacts } from '@/modules/crm/data/mock';
import { ContactList } from '@/modules/crm/domains/contacts/components/contact-list';

export default function ContactsPage() {
  const router = useRouter();
  const stats = useMemo(() => ({
    total: contacts.length,
    active: contacts.filter(c => c.status === 'active').length,
    customers: contacts.filter(c => c.type === 'customer').length,
  }), []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1
          className="text-2xl font-bold text-foreground"
          style={{ letterSpacing: 'var(--tracking-tight)' }}
        >
          Contacts
        </h1>
        <p
          className="text-sm text-muted-foreground mt-1"
          style={{ letterSpacing: 'var(--tracking-normal)' }}
        >
          Manage your business contacts
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Contacts', value: stats.total, color: 'text-module-crm' },
          { label: 'Active', value: stats.active, color: 'text-status-success' },
          { label: 'Customers', value: stats.customers, color: 'text-status-accent' },
        ].map((stat, i) => (
          <div key={stat.label} className="glass-surface rounded-xl p-4 border border-glass-border">
            <p
              className="text-xs text-muted-foreground uppercase tracking-wider"
              style={{ letterSpacing: 'var(--tracking-wide)' }}
            >
              {stat.label}
            </p>
            <p className={`text-2xl font-bold mt-1 ${stat.color}`} style={{ letterSpacing: 'var(--tracking-tight)' }}>
              {stat.value}
            </p>
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <ContactList data={contacts} onRowClick={(contact) => router.push(`/crm/contacts/${contact.id}`)} />
      </motion.div>
    </div>
  );
}
