// @ts-nocheck
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, Calendar, User, Clock, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Deal } from '../types';
import { DEAL_DETAIL_TABS, DEAL_STAGES, LOSS_REASONS } from '../constants';
import { formatDealValue, getStageLabel, getStageColor } from '../utils';

interface DealDetailProps {
  deal: Deal;
  onBack?: () => void;
}

export function DealDetail({ deal, onBack }: DealDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const stageInfo = DEAL_STAGES.find(s => s.value === deal.stage);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">{deal.dealName}</h2>
          <p className="text-sm text-muted-foreground">{deal.accountName} · {deal.contactName}</p>
        </div>
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full"
          style={{ backgroundColor: `${stageInfo?.color}20`, color: stageInfo?.color }}
        >
          {stageInfo?.label ?? deal.stage}
        </span>
      </div>

      <div className="flex gap-1 border-b border-glass-border">
        {DEAL_DETAIL_TABS.map(tab => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab.value
                ? 'text-foreground border-b-2 border-module-crm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-surface border border-glass-border rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Deal Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground"><Building2 className="h-4 w-4" />{deal.accountName}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><User className="h-4 w-4" />{deal.contactName || 'No contact'}</div>
              <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4" />Closing: {new Date(deal.closingDate).toLocaleDateString()}</div>
              {deal.nextStep && <div className="flex items-center gap-2 text-muted-foreground"><TrendingUp className="h-4 w-4" />Next: {deal.nextStep}</div>}
            </div>
          </div>
          <div className="glass-surface border border-glass-border rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Deal Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Amount</span><span className="text-foreground font-medium">{formatDealValue(deal.amount)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Stage</span><span className="text-foreground">{stageInfo?.label ?? deal.stage}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Probability</span><span className="text-foreground">{deal.probability}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Expected Revenue</span><span className="text-foreground">{formatDealValue(deal.expectedRevenue)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Pipeline</span><span className="text-foreground">{deal.pipelineName}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Forecast</span><span className="text-foreground capitalize">{deal.forecastCategory}</span></div>
              {deal.lossReason && (
                <div className="flex justify-between"><span className="text-muted-foreground">Loss Reason</span><span className="text-destructive">{LOSS_REASONS.find(r => r.value === deal.lossReason)?.label ?? deal.lossReason}</span></div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'products' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-surface border border-glass-border rounded-2xl p-4">
          {deal.productLineItems && deal.productLineItems.length > 0 ? (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-foreground mb-3">Product Line Items</h3>
              {deal.productLineItems.map(item => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-glass-border/50 text-sm">
                  <span className="text-foreground">{item.productName}</span>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span>Qty: {item.quantity}</span>
                    <span>{formatDealValue(item.total)}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">No products added yet</p>
          )}
        </motion.div>
      )}

      {activeTab === 'activities' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-surface border border-glass-border rounded-2xl p-4">
          <p className="text-sm text-muted-foreground text-center py-8">No activities recorded yet</p>
        </motion.div>
      )}

      {activeTab === 'related' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-surface border border-glass-border rounded-2xl p-4">
          <p className="text-sm text-muted-foreground text-center py-8">No related records</p>
        </motion.div>
      )}
    </div>
  );
}
