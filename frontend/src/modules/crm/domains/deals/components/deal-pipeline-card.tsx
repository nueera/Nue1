'use client';

import { motion } from 'framer-motion';
import { Building2, User, Calendar } from 'lucide-react';
import type { Deal } from '../types';
import { formatDealValue } from '../utils';

interface DealPipelineCardProps {
  deal: Deal;
  stageColor: string;
  onClick?: () => void;
  onDragStart?: () => void;
}

export function DealPipelineCard({ deal, stageColor, onClick, onDragStart }: DealPipelineCardProps) {
  return (
    <motion.div
      layout
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      draggable
      onDragStart={e => {
        e.dataTransfer.effectAllowed = 'move';
        onDragStart?.();
      }}
      onClick={onClick}
      className="glass-surface border border-glass-border rounded-xl p-3 cursor-pointer hover:bg-glass-hover transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <p className="text-sm font-medium text-foreground leading-tight">{deal.dealName}</p>
      </div>
      <div className="space-y-1 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5"><Building2 className="h-3 w-3" />{deal.accountName}</div>
        {deal.contactName && <div className="flex items-center gap-1.5"><User className="h-3 w-3" />{deal.contactName}</div>}
        <div className="flex items-center gap-1.5"><Calendar className="h-3 w-3" />{new Date(deal.closingDate).toLocaleDateString()}</div>
      </div>
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-glass-border/50">
        <span className="text-sm font-semibold text-foreground">{formatDealValue(deal.amount)}</span>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stageColor }} />
          <span className="text-xs text-muted-foreground">{deal.probability}%</span>
        </div>
      </div>
    </motion.div>
  );
}
