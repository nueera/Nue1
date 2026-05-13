'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { accounts } from '@/modules/crm/data/mock';
import { AccountList } from '@/modules/crm/domains/accounts/components/account-list';
import { formatCurrency } from '@/modules/crm/core/utils';

export default function AccountsPage() {
  const stats = useMemo(() => ({
    total: accounts.length,
    customers: accounts.filter(a => a.type === 'customer').length,
    enterprise: accounts.filter(a => a.tier === 'enterprise').length,
    totalRevenue: accounts.reduce((s, a) => s + a.annualRevenue, 0),
  }), []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1
          className="text-2xl font-bold text-foreground"
          style={{ letterSpacing: 'var(--tracking-tight)' }}
        >
          Accounts
        </h1>
        <p
          className="text-sm text-muted-foreground mt-1"
          style={{ letterSpacing: 'var(--tracking-normal)' }}
        >
          Manage your business accounts
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Accounts', value: stats.total, color: 'text-module-crm' },
          { label: 'Customers', value: stats.customers, color: 'text-status-success' },
          { label: 'Enterprise', value: stats.enterprise, color: 'text-status-accent' },
          { label: 'Total Revenue', value: formatCurrency(stats.totalRevenue), color: 'text-status-warning' },
        ].map((stat, i) => (
          <div key={i} className="glass-surface rounded-xl p-4 border border-glass-border">
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
        <AccountList data={accounts} onRowClick={(account) => console.log('Navigate to account:', account.id)} />
      </motion.div>
    </div>
  );
}
