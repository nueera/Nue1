'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Target,
  Users,
  BarChart3,
  Activity,
  Milestone,
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { MarketingPlan } from '@/modules/marketing/types';
import { PlanBudgetTracker } from './plan-budget-tracker';
import { PlanMilestones } from './plan-milestones';
import { PlanROI } from './plan-roi';
import { PlanCollaborators } from './plan-collaborators';
import { PlanTouchpoints } from './plan-touchpoints';

interface PlanDetailProps {
  plan: MarketingPlan;
  onBack?: () => void;
  onEdit?: (plan: MarketingPlan) => void;
}

export function PlanDetail({ plan, onBack, onEdit }: PlanDetailProps) {
  const budgetPercent = plan.budget.allocated > 0
    ? Math.round((plan.budget.spent / plan.budget.allocated) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">{plan.name}</h1>
            {plan.description && (
              <p className="text-sm text-muted-foreground mt-0.5">{plan.description}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={plan.status === 'active' ? 'default' : 'secondary'}>
            {plan.status.replace('_', ' ')}
          </Badge>
          <Button variant="outline" size="sm" onClick={() => onEdit?.(plan)}>
            Edit Plan
          </Button>
        </div>
      </motion.div>

      {/* Overview cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Calendar, label: 'Duration', value: `${new Date(plan.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – ${new Date(plan.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` },
          { icon: DollarSign, label: 'Budget', value: `${plan.budget.currency} ${plan.budget.allocated.toLocaleString()}` },
          { icon: Activity, label: 'Activities', value: plan.activities.length.toString() },
          { icon: Target, label: 'Budget Used', value: `${budgetPercent}%` },
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <item.icon className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
                <p className="text-sm font-semibold text-foreground">{item.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="budget" className="w-full">
        <TabsList>
          <TabsTrigger value="budget" className="gap-1.5">
            <DollarSign className="h-3.5 w-3.5" />
            Budget
          </TabsTrigger>
          <TabsTrigger value="milestones" className="gap-1.5">
            <Milestone className="h-3.5 w-3.5" />
            Milestones
          </TabsTrigger>
          <TabsTrigger value="roi" className="gap-1.5">
            <BarChart3 className="h-3.5 w-3.5" />
            ROI
          </TabsTrigger>
          <TabsTrigger value="collaborators" className="gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Team
          </TabsTrigger>
          <TabsTrigger value="touchpoints" className="gap-1.5">
            <Activity className="h-3.5 w-3.5" />
            Touchpoints
          </TabsTrigger>
        </TabsList>

        <TabsContent value="budget" className="mt-4">
          <PlanBudgetTracker plan={plan} />
        </TabsContent>
        <TabsContent value="milestones" className="mt-4">
          <PlanMilestones plan={plan} />
        </TabsContent>
        <TabsContent value="roi" className="mt-4">
          <PlanROI plan={plan} />
        </TabsContent>
        <TabsContent value="collaborators" className="mt-4">
          <PlanCollaborators plan={plan} />
        </TabsContent>
        <TabsContent value="touchpoints" className="mt-4">
          <PlanTouchpoints plan={plan} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
