// @ts-nocheck
'use client';

import { motion } from 'framer-motion';
import { Building2, Globe, MapPin, Users } from 'lucide-react';
import type { Account } from '../types';
import { ACCOUNT_TIERS, ACCOUNT_TYPES } from '../constants';
import { getAccountTierColor, getHealthScoreColor, formatIndustry } from '../utils';

interface AccountCardProps {
  account: Account;
  onClick?: (account: Account) => void;
}

export function AccountCard({ account, onClick }: AccountCardProps) {
  const tierInfo = ACCOUNT_TIERS.find(t => t.value === account.tier);
  const typeInfo = ACCOUNT_TYPES.find(t => t.value === account.type);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(account)}
      className="glass-surface border border-glass-border rounded-2xl p-4 cursor-pointer hover:bg-glass-hover transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-module-crm/15 text-module-crm flex items-center justify-center text-sm font-semibold">
            {account.name[0]}
          </div>
          <div>
            <p className="font-medium text-foreground text-sm">{account.name}</p>
            <p className="text-xs text-muted-foreground">{typeInfo?.label ?? account.type}</p>
          </div>
        </div>
        <span className={`text-xs font-medium ${tierInfo?.color}`}>{tierInfo?.label}</span>
      </div>
      <div className="space-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5"><Building2 className="h-3 w-3" />{formatIndustry(account.industry)}</div>
        {account.website && <div className="flex items-center gap-1.5"><Globe className="h-3 w-3" />{account.website}</div>}
        {account.billingCity && (
          <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" />{account.billingCity}, {account.billingState}</div>
        )}
        {account.employees > 0 && (
          <div className="flex items-center gap-1.5"><Users className="h-3 w-3" />{account.employees.toLocaleString()} employees</div>
        )}
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-glass-border/50">
        <span className="text-xs text-muted-foreground">${(account.annualRevenue / 1000000).toFixed(1)}M</span>
        <span className={`text-sm font-semibold ${getHealthScoreColor(account.healthScore)}`}>{account.healthScore}</span>
      </div>
    </motion.div>
  );
}
