'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import type { LeadStageDefinition } from '@/modules/marketing/types';
import { Plus, Trash2, GripVertical, ArrowUp, ArrowDown, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StageConfigProps {
  stages?: LeadStageDefinition[];
  onSave?: (stages: LeadStageDefinition[]) => void;
}

export function StageConfig({ stages: externalStages, onSave }: StageConfigProps) {
  const [stages, setStages] = useState<LeadStageDefinition[]>(
    externalStages ?? [
      { id: 'new', name: 'New', order: 0, color: '#6b7280', probability: 10, isDefault: true },
      { id: 'contacted', name: 'Contacted', order: 1, color: '#3b82f6', probability: 20, isDefault: false },
      { id: 'qualified', name: 'Qualified', order: 2, color: '#8b5cf6', probability: 40, isDefault: false },
      { id: 'proposal', name: 'Proposal', order: 3, color: '#f59e0b', probability: 60, isDefault: false },
      { id: 'negotiation', name: 'Negotiation', order: 4, color: '#ef4444', probability: 80, isDefault: false },
      { id: 'closed_won', name: 'Closed Won', order: 5, color: '#10b981', probability: 100, isDefault: false },
      { id: 'closed_lost', name: 'Closed Lost', order: 6, color: '#9ca3af', probability: 0, isDefault: false },
    ]
  );

  const handleAdd = () => {
    const newStage: LeadStageDefinition = {
      id: `stage-${Date.now()}`,
      name: 'New Stage',
      order: stages.length,
      color: '#6b7280',
      probability: 0,
      isDefault: false,
    };
    setStages([...stages, newStage]);
  };

  const handleUpdate = (id: string, partial: Partial<LeadStageDefinition>) => {
    setStages(stages.map((s) => (s.id === id ? { ...s, ...partial } : s)));
  };

  const handleRemove = (id: string) => {
    if (stages.length <= 1) return;
    setStages(stages.filter((s) => s.id !== id).map((s, i) => ({ ...s, order: i })));
  };

  const handleMove = (id: string, direction: 'up' | 'down') => {
    const idx = stages.findIndex((s) => s.id === id);
    if (idx === -1) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= stages.length) return;
    const arr = [...stages];
    [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]];
    setStages(arr.map((s, i) => ({ ...s, order: i })));
  };

  const handleSave = () => {
    onSave?.(stages);
  };

  const colorOptions = [
    '#6b7280', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444',
    '#10b981', '#ec4899', '#06b6d4', '#84cc16', '#f97316',
  ];

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Stage Configuration</h3>
        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSave}>
          <Save className="h-4 w-4 mr-1" />Save
        </Button>
      </div>

      <div className="space-y-2">
        <AnimatePresence>
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              <Card className="border-border/50">
                <CardContent className="p-3">
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col gap-0.5">
                      <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => handleMove(stage.id, 'up')} disabled={index === 0}>
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => handleMove(stage.id, 'down')} disabled={index === stages.length - 1}>
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stage.color }} />
                      <Input
                        value={stage.name}
                        onChange={(e) => handleUpdate(stage.id, { name: e.target.value })}
                        className="h-7 text-sm w-32"
                      />
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Label className="text-[10px] text-muted-foreground shrink-0">Color</Label>
                      <div className="flex items-center gap-1">
                        {colorOptions.map((color) => (
                          <button
                            key={color}
                            className={cn('w-4 h-4 rounded-full border-2 transition-all', stage.color === color ? 'border-foreground scale-110' : 'border-transparent hover:scale-105')}
                            style={{ backgroundColor: color }}
                            onClick={() => handleUpdate(stage.id, { color })}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Label className="text-[10px] text-muted-foreground shrink-0">Prob.</Label>
                      <Input
                        type="number"
                        value={stage.probability}
                        onChange={(e) => handleUpdate(stage.id, { probability: parseInt(e.target.value) || 0 })}
                        className="h-7 text-xs w-16"
                        min={0}
                        max={100}
                      />
                      <span className="text-[10px] text-muted-foreground">%</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Label className="text-[10px] text-muted-foreground shrink-0">Default</Label>
                      <Switch
                        checked={stage.isDefault}
                        onCheckedChange={(v) => handleUpdate(stage.id, { isDefault: v })}
                        className="scale-75"
                      />
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive shrink-0"
                      onClick={() => handleRemove(stage.id)}
                      disabled={stages.length <= 1}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <Button variant="outline" size="sm" className="w-full" onClick={handleAdd}>
        <Plus className="h-4 w-4 mr-1" />Add Stage
      </Button>
    </div>
  );
}
