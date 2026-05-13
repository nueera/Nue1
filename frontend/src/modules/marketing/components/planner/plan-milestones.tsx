'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Milestone, Plus, CheckCircle2, Circle, Clock, X } from 'lucide-react';
import { motion } from 'framer-motion';
import type { MarketingPlan, PlanMilestone } from '@/modules/marketing/types';
import { cn } from '@/lib/utils';

interface PlanMilestonesProps {
  plan: MarketingPlan;
  onToggleMilestone?: (milestoneId: string) => void;
  onAddMilestone?: (milestone: Omit<PlanMilestone, 'id'>) => void;
}

export function PlanMilestones({ plan, onToggleMilestone, onAddMilestone }: PlanMilestonesProps) {
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDueDate, setNewDueDate] = useState('');

  const completed = plan.milestones.filter((m) => m.completed).length;
  const total = plan.milestones.length;
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  const handleAdd = () => {
    if (newName && newDueDate) {
      onAddMilestone?.({
        name: newName,
        dueDate: newDueDate,
        completed: false,
      });
      setNewName('');
      setNewDueDate('');
      setShowAdd(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Progress overview */}
      <Card className="border-border/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Milestone className="h-5 w-5 text-emerald-600" />
              <span className="text-sm font-medium">Milestone Progress</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {completed}/{total} completed ({percent}%)
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percent}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="h-full bg-emerald-500 rounded-full"
            />
          </div>
        </CardContent>
      </Card>

      {/* Milestones list */}
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-semibold">Milestones</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowAdd(!showAdd)}>
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {showAdd && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-2 mb-4 p-3 bg-muted/30 rounded-lg"
            >
              <Input
                placeholder="Milestone name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="h-8 text-sm"
              />
              <Input
                type="date"
                value={newDueDate}
                onChange={(e) => setNewDueDate(e.target.value)}
                className="h-8 text-sm w-36"
              />
              <Button size="sm" onClick={handleAdd} disabled={!newName || !newDueDate}>
                Add
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowAdd(false)}>
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {plan.milestones.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No milestones defined yet.</p>
          ) : (
            <div className="space-y-2">
              {plan.milestones.map((milestone, idx) => {
                const isOverdue = !milestone.completed && new Date(milestone.dueDate) < new Date();

                return (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg transition-colors',
                      milestone.completed
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20'
                        : isOverdue
                        ? 'bg-red-50/50 dark:bg-red-950/20'
                        : 'hover:bg-muted/50'
                    )}
                  >
                    <Checkbox
                      checked={milestone.completed}
                      onCheckedChange={() => onToggleMilestone?.(milestone.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        'text-sm font-medium',
                        milestone.completed && 'line-through text-muted-foreground'
                      )}>
                        {milestone.name}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">
                          Due: {new Date(milestone.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        {milestone.completedAt && (
                          <span className="text-xs text-emerald-600">
                            Completed: {new Date(milestone.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        )}
                      </div>
                    </div>
                    {milestone.completed ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    ) : isOverdue ? (
                      <Badge variant="destructive" className="text-xs shrink-0">Overdue</Badge>
                    ) : (
                      <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
