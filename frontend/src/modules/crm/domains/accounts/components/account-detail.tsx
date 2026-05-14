// @ts-nocheck
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, MapPin, Phone, Building2, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Account } from '../types';
import { ACCOUNT_DETAIL_TABS, ACCOUNT_TYPES, ACCOUNT_TIERS, ACCOUNT_INDUSTRIES } from '../constants';
import { getAccountTierColor, getHealthScoreColor, formatIndustry } from '../utils';

interface AccountDetailProps {
  account: Account;
  onBack?: () => void;
}

export function AccountDetail({ account, onBack }: AccountDetailProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const tierInfo = ACCOUNT_TIERS.find(t => t.value === account.tier);
  const typeInfo = ACCOUNT_TYPES.find(t => t.value === account.type);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-foreground">{account.name}</h2>
          <p className="text-sm text-muted-foreground">
            {typeInfo?.label ?? account.type} · {formatIndustry(account.industry)}
          </p>
        </div>
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tierInfo?.color}`}>
          {tierInfo?.label}
        </span>
      </div>

      <div className="flex gap-1 border-b border-glass-border">
        {ACCOUNT_DETAIL_TABS.map(tab => (
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
            <h3 className="text-sm font-semibold text-foreground">Company Information</h3>
            <div className="space-y-2 text-sm">
              {account.website && <div className="flex items-center gap-2 text-muted-foreground"><Globe className="h-4 w-4" />{account.website}</div>}
              <div className="flex items-center gap-2 text-muted-foreground"><Phone className="h-4 w-4" />{account.phone || '—'}</div>
              {account.billingCity && (
                <div className="flex items-center gap-2 text-muted-foreground"><MapPin className="h-4 w-4" />{account.billingCity}, {account.billingState} {account.billingZip}</div>
              )}
              {account.employees > 0 && (
                <div className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4" />{account.employees.toLocaleString()} employees</div>
              )}
            </div>
          </div>
          <div className="glass-surface border border-glass-border rounded-2xl p-4 space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Account Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Type</span><span className="text-foreground">{typeInfo?.label ?? account.type}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tier</span><span className={tierInfo?.color ?? 'text-foreground'}>{tierInfo?.label ?? account.tier}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Industry</span><span className="text-foreground">{formatIndustry(account.industry)}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Revenue</span><span className="text-foreground">${(account.annualRevenue / 1000000).toFixed(1)}M</span></div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Health Score</span>
                <span className={`font-medium ${getHealthScoreColor(account.healthScore)}`}>{account.healthScore}/100</span>
              </div>
              {account.tickerSymbol && (
                <div className="flex justify-between"><span className="text-muted-foreground">Ticker</span><span className="text-foreground">{account.tickerSymbol}</span></div>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'contacts' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-surface border border-glass-border rounded-2xl p-4">
          <p className="text-sm text-muted-foreground text-center py-8">No contacts associated yet</p>
        </motion.div>
      )}

      {activeTab === 'deals' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-surface border border-glass-border rounded-2xl p-4">
          <p className="text-sm text-muted-foreground text-center py-8">No deals associated yet</p>
        </motion.div>
      )}

      {activeTab === 'cases' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-surface border border-glass-border rounded-2xl p-4">
          <p className="text-sm text-muted-foreground text-center py-8">No cases associated yet</p>
        </motion.div>
      )}
    </div>
  );
}
