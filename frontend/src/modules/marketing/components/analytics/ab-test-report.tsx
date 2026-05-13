'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FlaskConical, Trophy, Users, TrendingUp, Percent } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { ABTest } from '@/modules/marketing/types';

interface ABTestReportProps {
  test?: ABTest;
}

export function ABTestReport({ test }: ABTestReportProps) {
  const mockTest: ABTest = test ?? {
    id: '1',
    name: 'Subject Line Test',
    type: 'subject_line',
    status: 'completed',
    confidenceLevel: 95,
    startDate: '2024-03-01',
    variants: [
      { id: 'v1', name: 'Control', description: 'Original subject line', trafficPercent: 50, impressions: 5000, conversions: 250, conversionRate: 5.0, isControl: true, isWinner: false },
      { id: 'v2', name: 'Variant A', description: 'Emoji in subject', trafficPercent: 50, impressions: 5000, conversions: 325, conversionRate: 6.5, isControl: false, isWinner: true },
    ],
    winningVariantId: 'v2',
    createdAt: '2024-03-01',
  };

  const chartData = mockTest.variants.map((v) => ({
    name: v.name,
    impressions: v.impressions,
    conversions: v.conversions,
    rate: v.conversionRate,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <FlaskConical className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">A/B Test Report</h3>
        <Badge variant={mockTest.status === 'completed' ? 'default' : 'secondary'}>{mockTest.status}</Badge>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: Users, label: 'Total Impressions', value: mockTest.variants.reduce((s, v) => s + v.impressions, 0).toLocaleString() },
          { icon: TrendingUp, label: 'Best Conversion', value: `${Math.max(...mockTest.variants.map((v) => v.conversionRate))}%` },
          { icon: Percent, label: 'Confidence', value: `${mockTest.confidenceLevel}%` },
          { icon: Trophy, label: 'Winner', value: mockTest.variants.find((v) => v.isWinner)?.name ?? '—' },
        ].map((m, idx) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="border-border/50">
              <CardContent className="p-3">
                <m.icon className="h-4 w-4 text-emerald-600 mb-1" />
                <p className="text-sm font-bold tabular-nums">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Variant Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="conversions" fill="#10b981" radius={[4, 4, 0, 0]} name="Conversions" />
                <Bar dataKey="rate" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Rate %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {mockTest.variants.map((variant, idx) => (
          <motion.div
            key={variant.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className={`flex items-center gap-3 p-3 rounded-lg border ${variant.isWinner ? 'border-emerald-300 bg-emerald-50/50 dark:bg-emerald-950/20' : 'border-border/50'}`}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{variant.name}</span>
                {variant.isControl && <Badge variant="secondary" className="text-xs">Control</Badge>}
                {variant.isWinner && <Badge className="text-xs bg-emerald-600 gap-1"><Trophy className="h-3 w-3" />Winner</Badge>}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{variant.description}</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="text-right">
                <p className="font-medium">{variant.impressions.toLocaleString()}</p>
                <p className="text-muted-foreground">impressions</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{variant.conversions.toLocaleString()}</p>
                <p className="text-muted-foreground">conversions</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-emerald-600">{variant.conversionRate}%</p>
                <p className="text-muted-foreground">conv. rate</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
