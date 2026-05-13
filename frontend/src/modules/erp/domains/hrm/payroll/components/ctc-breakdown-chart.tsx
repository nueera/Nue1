'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { ChartCard } from '../../../../shared/components/chart-card/chart-card';
import { fmtCurrency } from '../payroll.utils';
import type { SalaryStructure } from '../types';
import { cn } from '@/lib/utils';

interface CTCBreakdownChartProps {
  structure: SalaryStructure;
  chartType?: 'pie' | 'bar';
  className?: string;
}

const COLORS = [
  '#10B981', // emerald - basic
  '#3B82F6', // blue - HRA
  '#F59E0B', // amber - DA
  '#8B5CF6', // violet - special allowance
  '#EF4444', // red - PF
  '#EC4899', // pink - ESI
  '#6366F1', // indigo - tax
];

const DEDUCTION_COLORS = [
  '#EF4444', // red - PF
  '#EC4899', // pink - ESI
  '#6366F1', // indigo - tax
];

export function CTCBreakdownChart({ structure, chartType = 'pie', className }: CTCBreakdownChartProps) {
  const earningsData = useMemo(() => [
    { name: 'Basic', value: structure.basic, color: COLORS[0] },
    { name: 'HRA', value: structure.hra, color: COLORS[1] },
    { name: 'DA', value: structure.da, color: COLORS[2] },
    { name: 'Special Allowance', value: structure.specialAllowance, color: COLORS[3] },
  ], [structure]);

  const deductionsData = useMemo(() => [
    { name: 'PF', value: structure.pf, color: DEDUCTION_COLORS[0] },
    { name: 'ESI', value: structure.esi, color: DEDUCTION_COLORS[1] },
    { name: 'Tax', value: structure.tax, color: DEDUCTION_COLORS[2] },
  ], [structure]);

  const barData = useMemo(() => [
    ...earningsData.map((d) => ({ ...d, type: 'Earnings' })),
    ...deductionsData.map((d) => ({ ...d, type: 'Deductions' })),
  ], [earningsData, deductionsData]);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; payload: { color: string } }> }) => {
    if (!active || !payload?.length) return null;
    const item = payload[0];
    return (
      <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-lg px-3 py-2 text-xs">
        <p className="font-medium text-foreground">{item.name}</p>
        <p className="text-module-erp font-semibold">{fmtCurrency(item.value)}</p>
      </div>
    );
  };

  return (
    <div className={cn('space-y-4', className)}>
      <ChartCard title="CTC Breakdown" subtitle={`Total CTC: ${fmtCurrency(structure.ctc)}`}>
        {chartType === 'pie' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Earnings Pie */}
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-2 text-center">Earnings</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={earningsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {earningsData.map((entry, index) => (
                      <Cell key={`earn-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {earningsData.map((item) => (
                  <span key={item.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Deductions Pie */}
            <div>
              <p className="text-xs text-muted-foreground font-medium mb-2 text-center">Deductions</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={deductionsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {deductionsData.map((entry, index) => (
                      <Cell key={`ded-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {deductionsData.map((item) => (
                  <span key={item.name} className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Bar chart */
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={barData} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}
