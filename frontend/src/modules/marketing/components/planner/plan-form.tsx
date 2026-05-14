// @ts-nocheck
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCreatePlan, useUpdatePlan } from '@/modules/marketing/hooks/use-planner';
import type { MarketingPlan } from '@/modules/marketing/types';

interface PlanFormProps {
  plan?: MarketingPlan;
  onClose?: () => void;
  onSave?: (plan: MarketingPlan) => void;
}

export function PlanForm({ plan, onClose, onSave }: PlanFormProps) {
  const createPlan = useCreatePlan();
  const updatePlan = useUpdatePlan();
  const isEditing = !!plan;

  const [name, setName] = useState(plan?.name ?? '');
  const [description, setDescription] = useState(plan?.description ?? '');
  const [startDate, setStartDate] = useState(plan?.startDate?.split('T')[0] ?? '');
  const [endDate, setEndDate] = useState(plan?.endDate?.split('T')[0] ?? '');
  const [status, setStatus] = useState<string>(plan?.status ?? 'planning');
  const [budgetAllocated, setBudgetAllocated] = useState(plan?.budget?.allocated?.toString() ?? '0');
  const [budgetCurrency, setBudgetCurrency] = useState(plan?.budget?.currency ?? 'USD');

  const handleSubmit = () => {
    const payload = {
      name,
      description,
      startDate,
      endDate,
      status: status as MarketingPlan['status'],
      budget: {
        allocated: Number(budgetAllocated),
        spent: plan?.budget?.spent ?? 0,
        remaining: Number(budgetAllocated) - (plan?.budget?.spent ?? 0),
        currency: budgetCurrency,
      },
    };

    if (isEditing && plan) {
      updatePlan.mutate({ id: plan.id, ...payload } as any, {
        onSuccess: (data) => onSave?.(data as any),
      });
    } else {
      createPlan.mutate(payload as any, {
        onSuccess: (data) => onSave?.(data as any),
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {isEditing ? 'Edit Plan' : 'Create New Plan'}
            </CardTitle>
            {onClose && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="plan-name">Plan Name</Label>
            <Input
              id="plan-name"
              placeholder="e.g., Q2 Product Launch"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="plan-desc">Description</Label>
            <Textarea
              id="plan-desc"
              placeholder="Describe the marketing plan..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="plan-start">Start Date</Label>
              <Input
                id="plan-start"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan-end">End Date</Label>
              <Input
                id="plan-end"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget-allocated">Budget Allocated</Label>
              <Input
                id="budget-allocated"
                type="number"
                value={budgetAllocated}
                onChange={(e) => setBudgetAllocated(e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Currency</Label>
              <Select value={budgetCurrency} onValueChange={setBudgetCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="GBP">GBP</SelectItem>
                  <SelectItem value="INR">INR</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button onClick={handleSubmit} disabled={!name || !startDate || !endDate}>
              <Save className="h-4 w-4 mr-2" />
              {isEditing ? 'Update Plan' : 'Create Plan'}
            </Button>
            {onClose && (
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
