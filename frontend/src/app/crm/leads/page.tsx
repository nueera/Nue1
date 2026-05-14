'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { leads, getLeadsByStatus } from '@/modules/crm/data/mock';
import { LeadList } from '@/modules/crm/domains/leads/components/lead-list';
import { LeadFilters } from '@/modules/crm/domains/leads/components/lead-filters';
import { LEAD_STATUS_FILTERS, LEAD_SOURCE_FILTERS, LEAD_RATING_FILTERS } from '@/modules/crm/domains/leads/constants';
import type { Lead } from '@/modules/crm/domains/leads/types';

export default function LeadsPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState('All');
  const [sourceFilter, setSourceFilter] = useState('All');
  const [ratingFilter, setRatingFilter] = useState('All');

  const filteredLeads = useMemo(() => {
    let result = leads;
    if (statusFilter !== 'All') result = result.filter(l => l.status === statusFilter);
    if (sourceFilter !== 'All') result = result.filter(l => l.leadSource === sourceFilter);
    if (ratingFilter !== 'All') result = result.filter(l => l.rating === ratingFilter);
    return result;
  }, [statusFilter, sourceFilter, ratingFilter]);

  const stats = useMemo(() => ({
    total: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    converted: leads.filter(l => l.status === 'converted').length,
  }), []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold text-foreground"
            style={{ letterSpacing: 'var(--tracking-tight)' }}
          >
            Leads
          </h1>
          <p
            className="text-sm text-muted-foreground mt-1"
            style={{ letterSpacing: 'var(--tracking-normal)' }}
          >
            Manage your sales leads and prospects
          </p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Leads', value: stats.total, color: 'text-module-crm' },
          { label: 'New', value: stats.new, color: 'text-status-attention' },
          { label: 'Qualified', value: stats.qualified, color: 'text-status-accent' },
          { label: 'Converted', value: stats.converted, color: 'text-status-success' },
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

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <LeadFilters statusFilter={statusFilter} sourceFilter={sourceFilter} ratingFilter={ratingFilter} onStatusChange={setStatusFilter} onSourceChange={setSourceFilter} onRatingChange={setRatingFilter} />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <LeadList data={filteredLeads} onRowClick={(lead) => router.push(`/crm/leads/${lead.id}`)} />
      </motion.div>
    </div>
  );
}
