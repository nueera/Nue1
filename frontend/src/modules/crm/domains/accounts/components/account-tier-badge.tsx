'use client';

import { motion } from 'framer-motion';
import { Shield, Crown, Building2, Rocket, Gift } from 'lucide-react';
import type { AccountTier } from '../types';
import { ACCOUNT_TIERS } from '../constants';
import { getAccountTierColor } from '../utils';

interface AccountTierBadgeProps {
  tier: AccountTier;
  size?: 'sm' | 'md';
}

const tierIcons: Record<AccountTier, typeof Shield> = {
  enterprise: Crown,
  'mid-market': Shield,
  smb: Building2,
  startup: Rocket,
  freemium: Gift,
};

export function AccountTierBadge({ tier, size = 'md' }: AccountTierBadgeProps) {
  const tierInfo = ACCOUNT_TIERS.find(t => t.value === tier);
  const color = getAccountTierColor(tier);
  const Icon = tierIcons[tier] || Building2;

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-glass-bg ${
        size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1'
      } ${color}`}
    >
      <Icon className={size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'} />
      {tierInfo?.label ?? tier}
    </motion.span>
  );
}
