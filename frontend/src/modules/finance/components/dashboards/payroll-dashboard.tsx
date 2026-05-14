// @ts-nocheck
'use client';

import { motion } from 'framer-motion';
import {
  Banknote,
  Users,
  Landmark,
  Heart,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Briefcase,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCountUp } from '../../hooks/use-count-up';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const payrollTrendData = [
  { month: 'Jan', gross: 67500, net: 51200 },
  { month: 'Feb', gross: 67800, net: 51400 },
  { month: 'Mar', gross: 68200, net: 51700 },
  { month: 'Apr', gross: 67900, net: 51500 },
  { month: 'May', gross: 68500, net: 52000 },
  { month: 'Jun', gross: 67850, net: 51400 },
];

const compensationBreakdownData = [
  { name: 'Base Salary', value: 52, color: '#6366f1' },
  { name: 'Benefits', value: 18, color: '#10b981' },
  { name: 'Taxes', value: 22, color: '#f59e0b' },
  { name: 'Bonuses', value: 5, color: '#0ea5e9' },
  { name: 'Other', value: 3, color: '#94a3b8' },
];

const departmentCostsData = [
  { department: 'Engineering', cost: 28500 },
  { department: 'Sales', cost: 18200 },
  { department: 'Marketing', cost: 9800 },
  { department: 'Operations', cost: 7350 },
  { department: 'HR', cost: 4000 },
];

// ---------------------------------------------------------------------------
// KPI Card Component
// ---------------------------------------------------------------------------

function KPICard({ icon: Icon, label, value, change, prefix = '$', accentColor, accentBg }: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: number;
  change: number;
  prefix?: string;
  accentColor: string;
  accentBg: string;
}) {
  const displayValue = useCountUp({ end: value, duration: 1200, decimals: value % 1 !== 0 ? 2 : 0, prefix });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as const }}
    >
      <Card className="hover:shadow-md transition-shadow duration-200 border-border/50">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div className={cn('flex items-center justify-center w-10 h-10 rounded-xl', accentBg)}>
              <Icon className={cn('h-5 w-5', accentColor)} strokeWidth={1.8} />
            </div>
            <Badge
              variant="secondary"
              className={cn(
                'text-xs font-medium gap-0.5',
                change >= 0 ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' : 'text-red-600 bg-red-50 dark:bg-red-950/30'
              )}
            >
              {change >= 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(change)}%
            </Badge>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-foreground tracking-tight tabular-nums">{displayValue}</p>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Payroll Dashboard
// ---------------------------------------------------------------------------

export function PayrollDashboard() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Payroll Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Employee payroll, benefits, and tax overview</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={Banknote} label="Total Payroll (Month)" value={67850} change={-0.9} accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <KPICard icon={Users} label="Employees" value={42} change={4.8} prefix="" accentColor="text-sky-600" accentBg="bg-sky-50 dark:bg-sky-950/30" />
        <KPICard icon={Landmark} label="Tax Liabilities" value={14927} change={1.2} accentColor="text-amber-600" accentBg="bg-amber-50 dark:bg-amber-950/30" />
        <KPICard icon={Heart} label="Benefits Costs" value={12213} change={2.5} accentColor="text-violet-600" accentBg="bg-violet-50 dark:bg-violet-950/30" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payroll Trend */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Payroll Trend</CardTitle>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Gross
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                    Net
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={payrollTrendData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`$${value.toLocaleString()}`, '']} />
                  <Bar dataKey="gross" fill="#10b981" radius={[4, 4, 0, 0]} animationDuration={800} name="Gross" />
                  <Bar dataKey="net" fill="#0ea5e9" radius={[4, 4, 0, 0]} animationDuration={800} name="Net" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Compensation Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Compensation Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={compensationBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                    animationDuration={800}
                  >
                    {compensationBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`${value}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {compensationBreakdownData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground truncate">{item.name}</span>
                    <span className="text-xs font-medium text-foreground ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Department Costs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold">Payroll by Department</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={departmentCostsData} layout="vertical" margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="department" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} width={100} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`$${value.toLocaleString()}`, '']} />
                <Bar dataKey="cost" fill="#6366f1" radius={[0, 4, 4, 0]} animationDuration={800} name="Cost" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
