'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useStages } from '@/modules/marketing/hooks/use-lead-stages';
import type { LeadStageDefinition, Lead } from '@/modules/marketing/types';
import {
  Plus,
  GripVertical,
  ChevronRight,
  UserPlus,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';

interface StagePipelineProps {
  stages?: LeadStageDefinition[];
  leads?: Record<string, Lead[]>;
  onStageClick?: (stage: LeadStageDefinition) => void;
  onLeadClick?: (lead: Lead) => void;
  onMoveLead?: (leadId: string, toStage: string) => void;
  onAddStage?: () => void;
}

const defaultStages: LeadStageDefinition[] = [
  { id: 'new', name: 'New', order: 0, color: '#6b7280', probability: 10, isDefault: true },
  { id: 'contacted', name: 'Contacted', order: 1, color: '#3b82f6', probability: 20, isDefault: false },
  { id: 'qualified', name: 'Qualified', order: 2, color: '#8b5cf6', probability: 40, isDefault: false },
  { id: 'proposal', name: 'Proposal', order: 3, color: '#f59e0b', probability: 60, isDefault: false },
  { id: 'negotiation', name: 'Negotiation', order: 4, color: '#ef4444', probability: 80, isDefault: false },
  { id: 'closed_won', name: 'Closed Won', order: 5, color: '#10b981', probability: 100, isDefault: false },
  { id: 'closed_lost', name: 'Closed Lost', order: 6, color: '#9ca3af', probability: 0, isDefault: false },
];

const mockLeadsByStage: Record<string, Array<{ id: string; name: string; company: string; score: number }>> = {
  new: [
    { id: '1', name: 'Alice Johnson', company: 'Acme Corp', score: 45 },
    { id: '2', name: 'Bob Smith', company: 'TechIO', score: 32 },
    { id: '3', name: 'Carol White', company: 'DataTech', score: 28 },
  ],
  contacted: [
    { id: '4', name: 'Dave Brown', company: 'Solutions', score: 58 },
    { id: '5', name: 'Eve Davis', company: 'Creative', score: 62 },
  ],
  qualified: [
    { id: '6', name: 'Frank Miller', company: 'Enterprise', score: 75 },
    { id: '7', name: 'Grace Lee', company: 'GlobalCo', score: 71 },
    { id: '8', name: 'Henry Chen', company: 'CorpNet', score: 68 },
    { id: '9', name: 'Ivy Wang', company: 'StartupDev', score: 65 },
  ],
  proposal: [
    { id: '10', name: 'Jack Kim', company: 'DigitalCo', score: 82 },
  ],
  negotiation: [
    { id: '11', name: 'Karen Park', company: 'MegaCorp', score: 88 },
  ],
  closed_won: [
    { id: '12', name: 'Leo Garcia', company: 'BigTech', score: 95 },
    { id: '13', name: 'Mia Taylor', company: 'Innovate', score: 91 },
  ],
  closed_lost: [],
};

export function StagePipeline({
  stages: externalStages,
  leads: externalLeads,
  onStageClick,
  onLeadClick,
  onMoveLead,
  onAddStage,
}: StagePipelineProps) {
  const { data: stagesData } = useStages();
  const stages = externalStages ?? stagesData?.data ?? defaultStages;
  const leads = externalLeads ?? mockLeadsByStage;

  const [draggingLeadId, setDraggingLeadId] = useState<string | null>(null);
  const [dragOverStage, setDragOverStage] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Lead Pipeline</h3>
        {onAddStage && (
          <Button variant="outline" size="sm" onClick={onAddStage}>
            <Plus className="h-4 w-4 mr-1" />Add Stage
          </Button>
        )}
      </div>

      {/* Kanban Board */}
      <div className="flex gap-3 overflow-x-auto pb-4">
        {stages.map((stage, index) => {
          const stageLeads = leads[stage.id] ?? [];
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className={cn(
                'flex-shrink-0 w-64 rounded-xl border-2 transition-all',
                dragOverStage === stage.id ? 'border-emerald-400 bg-emerald-50/30 dark:bg-emerald-950/10' : 'border-border/50'
              )}
              onDragOver={(e) => { e.preventDefault(); setDragOverStage(stage.id); }}
              onDragLeave={() => setDragOverStage(null)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOverStage(null);
                const leadId = e.dataTransfer.getData('leadId');
                if (leadId && onMoveLead) onMoveLead(leadId, stage.id);
              }}
            >
              {/* Stage Header */}
              <div className="p-3 border-b" style={{ borderLeftColor: stage.color, borderLeftWidth: 4 }}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: stage.color }} />
                    <h4 className="text-sm font-semibold text-foreground">{stage.name}</h4>
                    <Badge variant="secondary" className="text-[10px] h-5">{stageLeads.length}</Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <MoreHorizontal className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onStageClick?.(stage)}>View Details</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <p className="text-[10px] text-muted-foreground mt-0.5">Probability: {stage.probability}%</p>
              </div>

              {/* Lead Cards */}
              <ScrollArea className="h-72">
                <div className="p-2 space-y-2">
                  <AnimatePresence>
                    {stageLeads.map((lead) => (
                      <motion.div
                        key={lead.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        whileHover={{ scale: 1.02 }}
                        className="p-2.5 bg-card rounded-lg border border-border/50 cursor-grab active:cursor-grabbing hover:shadow-sm transition-shadow"
                        draggable
                        onDragStart={(e) => {
                          e.dataTransfer.setData('leadId', lead.id);
                          setDraggingLeadId(lead.id);
                        }}
                        onDragEnd={() => setDraggingLeadId(null)}
                        onClick={() => onLeadClick?.({ id: lead.id } as Lead)}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-medium text-foreground truncate">{lead.name}</p>
                          <Badge variant="secondary" className={cn(
                            'text-[9px] h-4',
                            lead.score >= 80 ? 'bg-red-50 text-red-600' :
                            lead.score >= 60 ? 'bg-amber-50 text-amber-600' :
                            'bg-blue-50 text-blue-600'
                          )}>
                            {lead.score}
                          </Badge>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{lead.company}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {stageLeads.length === 0 && (
                    <div className="py-6 text-center text-muted-foreground">
                      <p className="text-[10px]">No leads</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
