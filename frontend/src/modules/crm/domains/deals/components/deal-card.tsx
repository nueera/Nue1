'use client';

import { motion } from 'framer-motion';
import { Building2, Calendar, User } from 'lucide-react';
import type { Deal } from '../types';
import { DEAL_STAGES } from '../constants';
import { formatDealValue, getStageLabel, getStageColor } from '../utils';

interface DealCardProps {
  deal: Deal;
  onClick?: (deal: Deal) => void;
}

export function DealCard({ deal, onClick }: DealCardProps) {
  const stageInfo = DEAL_STAGES.find(s => s.value === deal.stage);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick?.(deal)}
      className="glass-surface border border-glass-border rounded-2xl p-4 cursor-pointer hover:bg-glass-hover transition-colors"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="font-medium text-foreground text-sm">{deal.dealName}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{deal.accountName}</p>
        </div>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0"
          style={{ backgroundColor: `${stageInfo?.color}20`, color: stageInfo?.color }}
        >
          {stageInfo?.label ?? deal.stage}
        </span>
      </div>
      <div className="space-y-1.5 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5"><Building2 className="h-3 w-3" />{deal.accountName}</div>
        <div className="flex items-center gap-1.5"><User className="h-3 w-3" />{deal.contactName || 'No contact'}</div>
        <div className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{new Date(deal.closingDate).toLocaleDateString()}</div>
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-glass-border/50">
        <span className="text-sm font-semibold text-foreground">{formatDealValue(deal.amount)}</span>
        <span className="text-xs text-muted-foreground">{deal.probability}%</span>
      </div>
    </motion.div>
  );
}
