'use client';

import { motion } from 'framer-motion';
import {
  Package,
  AlertTriangle,
  Warehouse,
  Truck,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle2,
  BarChart3,
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
import { Progress } from '@/components/ui/progress';
import { useCountUp } from '../../hooks/use-count-up';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const stockByWarehouseData = [
  { warehouse: 'Main Warehouse', value: 245000, items: 342 },
  { warehouse: 'East Coast Hub', value: 128000, items: 186 },
  { warehouse: 'West Coast Depot', value: 97000, items: 124 },
];

const stockDistributionData = [
  { name: 'Electronics', value: 145000, color: '#6366f1' },
  { name: 'Furniture', value: 89000, color: '#10b981' },
  { name: 'Software', value: 52000, color: '#f59e0b' },
  { name: 'Accessories', value: 34000, color: '#0ea5e9' },
  { name: 'Other', value: 40000, color: '#94a3b8' },
];

const lowStockAlerts = [
  { id: '1', name: 'USB-C Docking Station', current: 8, minimum: 25, warehouse: 'Main Warehouse' },
  { id: '2', name: 'Wireless Keyboard Combo', current: 5, minimum: 30, warehouse: 'East Coast Hub' },
  { id: '3', name: '27" 4K Monitor', current: 3, minimum: 15, warehouse: 'West Coast Depot' },
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
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
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
// Inventory Dashboard
// ---------------------------------------------------------------------------

export function InventoryDashboard() {
  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Inventory Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Stock levels, warehouses, and fulfillment tracking</p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={Package} label="Total Stock Value" value={470000} change={8.2} accentColor="text-emerald-600" accentBg="bg-emerald-50 dark:bg-emerald-950/30" />
        <KPICard icon={AlertTriangle} label="Low Stock Alerts" value={3} change={50} prefix="" accentColor="text-amber-600" accentBg="bg-amber-50 dark:bg-amber-950/30" />
        <KPICard icon={Warehouse} label="Warehouses" value={3} change={0} prefix="" accentColor="text-sky-600" accentBg="bg-sky-50 dark:bg-sky-950/30" />
        <KPICard icon={CheckCircle2} label="Fulfillment Rate" value={96} change={1.5} prefix="" accentColor="text-violet-600" accentBg="bg-violet-50 dark:bg-violet-950/30" />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Stock by Warehouse */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Stock Value by Warehouse</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={stockByWarehouseData} layout="vertical" margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="warehouse" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} width={130} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`$${value.toLocaleString()}`, 'Value']} />
                  <Bar dataKey="value" fill="#0ea5e9" radius={[0, 4, 4, 0]} animationDuration={800} name="Value" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stock Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold">Stock Distribution by Category</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={stockDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                    nameKey="name"
                    animationDuration={800}
                  >
                    {stockDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--popover))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} formatter={(value: number) => [`$${value.toLocaleString()}`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {stockDistributionData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-muted-foreground truncate">{item.name}</span>
                    <span className="text-xs font-medium text-foreground ml-auto">${(item.value / 1000).toFixed(0)}k</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Low Stock Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">Low Stock Alerts</CardTitle>
              <Badge variant="destructive" className="text-xs">{lowStockAlerts.length} items</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              {lowStockAlerts.map((item) => {
                const percentage = (item.current / item.minimum) * 100;
                return (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/30">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-foreground truncate">{item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.warehouse}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Progress value={percentage} className="h-1.5 flex-1" />
                        <span className="text-xs font-medium text-foreground tabular-nums">{item.current}/{item.minimum}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
