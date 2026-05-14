// @ts-nocheck
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Deal, DealPipelineStage } from '../types';
import { formatDealValue } from '../utils';
import { DealPipelineCard } from './deal-pipeline-card';

interface DealPipelineColumnProps {
  stage: DealPipelineStage;
  deals: Deal[];
  onDealClick?: (deal: Deal) => void;
  onDragStart?: (dealId: string) => void;
  onDrop?: () => void;
  isDragOver?: boolean;
}

export function DealPipelineColumn({ stage, deals, onDealClick, onDragStart, onDrop, isDragOver }: DealPipelineColumnProps) {
  const [isOver, setIsOver] = useState(false);
  const totalValue = deals.reduce((sum, d) => sum + d.amount, 0);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(true);
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsOver(false);
    onDrop?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`min-w-[280px] max-w-[300px] flex-shrink-0 flex flex-col rounded-2xl transition-colors ${
        isOver ? 'bg-glass-hover' : 'glass-surface'
      } border border-glass-border`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-3 border-b border-glass-border">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
            <span className="text-sm font-medium text-foreground">{stage.name}</span>
          </div>
          <span className="text-xs text-muted-foreground bg-glass-bg px-1.5 py-0.5 rounded-full">{deals.length}</span>
        </div>
        <p className="text-xs text-muted-foreground">{formatDealValue(totalValue)}</p>
      </div>
      <div className="p-2 space-y-2 flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
        {deals.map(deal => (
          <DealPipelineCard
            key={deal.id}
            deal={deal}
            stageColor={stage.color}
            onClick={() => onDealClick?.(deal)}
            onDragStart={() => onDragStart?.(deal.id)}
          />
        ))}
        {deals.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-xs text-muted-foreground">No deals</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
