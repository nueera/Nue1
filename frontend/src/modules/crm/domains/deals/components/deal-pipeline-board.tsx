// @ts-nocheck
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Deal, DealPipeline } from '../types';
import { DEFAULT_PIPELINE } from '../constants';
import { DealPipelineColumn } from './deal-pipeline-column';

interface DealPipelineBoardProps {
  deals: Deal[];
  pipeline?: DealPipeline;
  onDealClick?: (deal: Deal) => void;
  onStageChange?: (dealId: string, newStage: string) => void;
  onCreateDeal?: () => void;
}

export function DealPipelineBoard({ deals, pipeline, onDealClick, onStageChange, onCreateDeal }: DealPipelineBoardProps) {
  const activePipeline = pipeline ?? DEFAULT_PIPELINE;
  const [draggedDealId, setDraggedDealId] = useState<string | null>(null);

  const dealsByStage = activePipeline.stages.reduce<Record<string, Deal[]>>((acc, stage) => {
    acc[stage.id] = deals.filter(deal => deal.stage === stage.name || deal.stage === stage.id);
    return acc;
  }, {});

  const handleDragStart = (dealId: string) => {
    setDraggedDealId(dealId);
  };

  const handleDrop = (stageId: string) => {
    if (draggedDealId) {
      const stage = activePipeline.stages.find(s => s.id === stageId);
      if (stage) {
        onStageChange?.(draggedDealId, stage.name);
      }
      setDraggedDealId(null);
    }
  };

  const totalValue = deals.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{activePipeline.name}</h3>
          <p className="text-xs text-muted-foreground">{deals.length} deals · ${(totalValue / 1000).toFixed(0)}K total</p>
        </div>
        {onCreateDeal && (
          <Button onClick={onCreateDeal} size="sm" className="bg-module-crm hover:bg-module-crm/80">
            <Plus className="h-4 w-4 mr-1" />Deal
          </Button>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        <AnimatePresence>
          {activePipeline.stages.map(stage => (
            <DealPipelineColumn
              key={stage.id}
              stage={stage}
              deals={dealsByStage[stage.id] || []}
              onDealClick={onDealClick}
              onDragStart={handleDragStart}
              onDrop={() => handleDrop(stage.id)}
              isDragOver={draggedDealId !== null}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
