'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { deals, getDealsByStage } from '@/modules/crm/data/mock';
import { DealList } from '@/modules/crm/domains/deals/components/deal-list';
import { DealPipelineBoard } from '@/modules/crm/domains/deals/components/deal-pipeline-board';
import { formatCurrency } from '@/modules/crm/core/utils';
import { DEAL_STAGES } from '@/modules/crm/domains/deals/constants';

export default function DealsPage() {
  const [viewMode, setViewMode] = useState<'list' | 'pipeline'>('pipeline');

  const stats = useMemo(() => ({
    total: deals.length,
    open: deals.filter(d => !d.stage.startsWith('closed')).length,
    won: deals.filter(d => d.stage === 'closed-won').length,
    totalValue: deals.filter(d => !d.stage.startsWith('closed')).reduce((s, d) => s + d.amount, 0),
    weightedPipeline: deals.filter(d => !d.stage.startsWith('closed')).reduce((s, d) => s + d.amount * (d.probability / 100), 0),
  }), []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold text-foreground"
            style={{ letterSpacing: 'var(--tracking-tight)' }}
          >
            Deals
          </h1>
          <p
            className="text-sm text-muted-foreground mt-1"
            style={{ letterSpacing: 'var(--tracking-normal)' }}
          >
            Track your sales pipeline
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={viewMode === 'list' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('list')}><List className="h-4 w-4" /></Button>
          <Button variant={viewMode === 'pipeline' ? 'default' : 'ghost'} size="sm" onClick={() => setViewMode('pipeline')}><LayoutGrid className="h-4 w-4" /></Button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Open Deals', value: stats.open, color: 'text-module-crm' },
          { label: 'Won', value: stats.won, color: 'text-status-success' },
          { label: 'Pipeline Value', value: formatCurrency(stats.totalValue), color: 'text-status-accent' },
          { label: 'Weighted', value: formatCurrency(stats.weightedPipeline), color: 'text-status-warning' },
          { label: 'Win Rate', value: `${stats.total > 0 ? Math.round((stats.won / stats.total) * 100) : 0}%`, color: 'text-status-attention' },
        ].map((stat, i) => (
          <div key={i} className="glass-surface rounded-xl p-4 border border-glass-border">
            <p
              className="text-xs text-muted-foreground uppercase tracking-wider"
              style={{ letterSpacing: 'var(--tracking-wide)' }}
            >
              {stat.label}
            </p>
            <p className={`text-xl font-bold mt-1 ${stat.color}`} style={{ letterSpacing: 'var(--tracking-tight)' }}>
              {stat.value}
            </p>
          </div>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        {viewMode === 'pipeline' ? (
          <DealPipelineBoard deals={deals} />
        ) : (
          <DealList data={deals} onRowClick={(deal) => console.log('Navigate to deal:', deal.id)} />
        )}
      </motion.div>
    </div>
  );
}
