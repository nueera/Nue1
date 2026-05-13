'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Target, Plus, CheckCircle2, Circle, DollarSign, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface GoalTrackingProps {
  onAddGoal?: () => void;
}

export function GoalTracking({ onAddGoal }: GoalTrackingProps) {
  const goals = [
    { id: '1', name: 'Newsletter Signups', target: 5000, current: 3850, value: 5, type: 'form_submit' },
    { id: '2', name: 'Product Purchases', target: 2000, current: 1450, value: 50, type: 'purchase' },
    { id: '3', name: 'Demo Requests', target: 500, current: 320, value: 100, type: 'form_submit' },
    { id: '4', name: 'Ebook Downloads', target: 3000, current: 2800, value: 10, type: 'custom_event' },
  ];

  const chartData = goals.map((g) => ({ name: g.name.split(' ')[0], current: g.current, target: g.target }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-emerald-600" />
          <h3 className="text-lg font-semibold">Goal Tracking</h3>
        </div>
        <Button variant="outline" size="sm" onClick={onAddGoal}>
          <Plus className="h-4 w-4 mr-1" />Add Goal
        </Button>
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Progress Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="target" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Target" />
                <Bar dataKey="current" fill="#10b981" radius={[4, 4, 0, 0]} name="Current" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {goals.map((goal, idx) => {
          const percent = Math.round((goal.current / goal.target) * 100);
          const isComplete = percent >= 100;

          return (
            <motion.div key={goal.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
              <Card className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {isComplete ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      ) : (
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="text-sm font-medium">{goal.name}</span>
                    </div>
                    <Badge variant={isComplete ? 'default' : 'secondary'} className="text-xs">
                      {percent}%
                    </Badge>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, percent)}%` }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className={`h-full rounded-full ${isComplete ? 'bg-emerald-500' : percent > 70 ? 'bg-amber-500' : 'bg-blue-500'}`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{goal.current.toLocaleString()} / {goal.target.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{goal.value} per conversion</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
