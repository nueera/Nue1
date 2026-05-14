// @ts-nocheck
'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, CheckCircle2, Circle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useGoals } from '@/modules/marketing/hooks/use-web-tracking';
import type { TrackingGoal } from '@/modules/marketing/types';

interface GoalListProps {
  onCreateGoal?: () => void;
  onEditGoal?: (goal: TrackingGoal) => void;
}

export function GoalList({ onCreateGoal, onEditGoal }: GoalListProps) {
  const { data: goalsData } = useGoals();
  const goals = goalsData?.data ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-emerald-600" />
          <h3 className="text-lg font-semibold">Tracking Goals</h3>
        </div>
        <Button variant="outline" size="sm" onClick={onCreateGoal}><Plus className="h-4 w-4 mr-1" />Add Goal</Button>
      </div>

      {goals.length === 0 ? (
        <Card className="border-border/50">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Target className="h-12 w-12 text-muted-foreground/30 mb-3" />
            <h3 className="text-lg font-semibold">No goals</h3>
            <p className="text-sm text-muted-foreground mt-1">Define goals to track conversions.</p>
            <Button className="mt-4" size="sm" onClick={onCreateGoal}><Plus className="h-4 w-4 mr-2" />Add Goal</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {goals.map((goal, idx) => {
            const rate = goal.conversionRate;
            return (
              <motion.div key={goal.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }}
                className="flex items-center gap-3 p-3 rounded-lg border border-border/50 hover:bg-muted/30 cursor-pointer transition-colors"
                onClick={() => onEditGoal?.(goal)}
              >
                <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/30">
                  <Target className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{goal.name}</p>
                  <Badge variant="secondary" className="text-xs mt-0.5">{goal.type.replace(/_/g, ' ')}</Badge>
                </div>
                <div className="text-right text-xs">
                  <p className="font-medium">{goal.conversions} conversions</p>
                  <p className="text-muted-foreground">{rate}% rate</p>
                </div>
                {goal.conversions > 0 ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground shrink-0" />
                )}
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
