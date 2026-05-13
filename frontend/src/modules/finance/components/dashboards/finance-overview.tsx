'use client';

import { motion } from 'framer-motion';
import {
  DollarSign,
  FileText,
  TrendingDown,
  TrendingUp,
  CreditCard,
  Wallet,
  Plus,
  Banknote,
  Receipt,
  ArrowRightLeft,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MoneyDisplay } from '../shared/money-display';
import { useCountUp } from '../../hooks/use-count-up';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const revenueTrendData = [
  { month: 'Jan', revenue: 42000, expenses: 28000 },
  { month: 'Feb', revenue: 48000, expenses: 31000 },
  { month: 'Mar', revenue: 52000, expenses: 29500 },
  { month: 'Apr', revenue: 47000, expenses: 32000 },
  { month: 'May', revenue: 55000, expenses: 30500 },
  { month: 'Jun', revenue: 61000, expenses: 33000 },
  { month: 'Jul', revenue: 58000, expenses: 31000 },
  { month: 'Aug', revenue: 64000, expenses: 34000 },
  { month: 'Sep', revenue: 69000, expenses: 32000 },
  { month: 'Oct', revenue: 72000, expenses: 36000 },
  { month: 'Nov', revenue: 78000, expenses: 35000 },
  { month: 'Dec', revenue: 84000, expenses: 38000 },
];

const recentTransactions = [
  { id: '1', description: 'Payment from Apex Industries', amount: 10844.47, type: 'income' as const, date: '2h ago', category: 'Invoice Payment' },
  { id: '2', description: 'Cloud infrastructure charges', amount: -4250.0, type: 'expense' as const, date: '4h ago', category: 'Cloud Services' },
  { id: '3', description: 'Payment from Pinnacle Logistics', amount: 9500.0, type: 'income' as const, date: '1d ago', category: 'Invoice Payment' },
  { id: '4', description: 'July mid-month payroll', amount: -67850.0, type: 'expense' as const, date: '2d ago', category: 'Payroll' },
  { id: '5', description: 'Subscription - Enterprise Suite', amount: 2499.0, type: 'income' as const, date: '3d ago', category: 'Subscription' },
  { id: '6', description: 'Server hardware purchase', amount: -16654.75, type: 'expense' as const, date: '4d ago', category: 'Equipment' },
];

// ---------------------------------------------------------------------------
// Stat Card Component
// ---------------------------------------------------------------------------

interface StatCardData {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: number;
  change: number;
  prefix?: string;
  accentColor: string;
  accentBg: string;
}

function StatCard({ icon: Icon, label, value, change, prefix = '$', accentColor, accentBg }: StatCardData) {
  const displayValue = useCountUp({ end: value, duration: 1400, decimals: value % 1 !== 0 ? 2 : 0, prefix });
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Card className="hover:shadow-md transition-shadow duration-200 border-border/50">
        <CardContent className="p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div className={cn('flex items-center justify-center w-10 h-10 rounded-xl', accentBg)}>
              <Icon className={cn('h-5 w-5', accentColor)} strokeWidth={1.8} />
            </div>
            <Badge
              variant="secondary"
              className={cn(
                'text-xs font-medium gap-0.5',
                isPositive ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' : 'text-red-600 bg-red-50 dark:bg-red-950/30'
              )}
            >
              {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {Math.abs(change)}%
            </Badge>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-bold text-foreground tracking-tight tabular-nums">
              {displayValue}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{label}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Finance Overview Dashboard
// ---------------------------------------------------------------------------

export function FinanceOverview() {
  const stats: StatCardData[] = [
    { icon: DollarSign, label: 'Total Revenue', value: 843200, change: 12.5, accentColor: 'text-emerald-600', accentBg: 'bg-emerald-50 dark:bg-emerald-950/30' },
    { icon: FileText, label: 'Outstanding Invoices', value: 42890, change: -3.2, accentColor: 'text-amber-600', accentBg: 'bg-amber-50 dark:bg-amber-950/30' },
    { icon: TrendingDown, label: 'Monthly Expenses', value: 32800, change: 2.1, accentColor: 'text-red-500', accentBg: 'bg-red-50 dark:bg-red-950/30' },
    { icon: TrendingUp, label: 'Net Profit', value: 51520, change: 8.7, accentColor: 'text-teal-600', accentBg: 'bg-teal-50 dark:bg-teal-950/30' },
    { icon: CreditCard, label: 'Active Subscriptions', value: 142, change: 5.3, prefix: '', accentColor: 'text-violet-600', accentBg: 'bg-violet-50 dark:bg-violet-950/30' },
    { icon: Wallet, label: 'Cash Balance', value: 284650, change: 4.1, accentColor: 'text-sky-600', accentBg: 'bg-sky-50 dark:bg-sky-950/30' },
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Finance Overview</h1>
          <p className="text-sm text-muted-foreground mt-1">Your complete financial picture at a glance</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <ArrowRightLeft className="h-4 w-4 mr-2" />
            Reconcile
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Charts + Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend Chart */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">Revenue vs Expenses</CardTitle>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    Revenue
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                    Expenses
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueTrendData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f87171" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--popover))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      fontSize: '12px',
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#revGradient)"
                    dot={false}
                    animationDuration={1000}
                    name="Revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#f87171"
                    strokeWidth={2}
                    fill="url(#expGradient)"
                    dot={false}
                    animationDuration={1000}
                    name="Expenses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Card className="border-border/50 h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: Receipt, label: 'Create Invoice', description: 'Send a new invoice to a customer', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
                { icon: DollarSign, label: 'Record Payment', description: 'Log a received payment', color: 'text-sky-600', bg: 'bg-sky-50 dark:bg-sky-950/30' },
                { icon: Banknote, label: 'Add Expense', description: 'Record a new expense', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
                { icon: ArrowRightLeft, label: 'Reconcile Bank', description: 'Match bank transactions', color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-950/30' },
              ].map((action) => (
                <button
                  key={action.label}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left group"
                >
                  <div className={cn('flex items-center justify-center w-9 h-9 rounded-lg shrink-0', action.bg)}>
                    <action.icon className={cn('h-4 w-4', action.color)} strokeWidth={1.8} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground group-hover:text-foreground/80">{action.label}</p>
                    <p className="text-xs text-muted-foreground truncate">{action.description}</p>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
              <Button variant="ghost" size="sm" className="text-xs">View All</Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-1">
              {recentTransactions.map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'flex items-center justify-center w-8 h-8 rounded-lg',
                      txn.type === 'income' ? 'bg-emerald-50 dark:bg-emerald-950/30' : 'bg-red-50 dark:bg-red-950/30'
                    )}>
                      {txn.type === 'income'
                        ? <ArrowUpRight className="h-4 w-4 text-emerald-600" />
                        : <ArrowDownRight className="h-4 w-4 text-red-500" />
                      }
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{txn.description}</p>
                      <p className="text-xs text-muted-foreground">{txn.category} · {txn.date}</p>
                    </div>
                  </div>
                  <MoneyDisplay
                    amount={txn.amount}
                    size="sm"
                    colorize={txn.type === 'income' ? 'positive' : 'negative'}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
