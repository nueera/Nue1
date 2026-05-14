'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Users,
  FolderKanban,
  DollarSign,
  Calendar,
  Banknote,
  BarChart3,
  FileText,
  Package,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/modules/erp/core/store/auth.store';
import { useStoreHydrated } from '@/modules/erp/core/hooks/use-store-hydrated';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { useRouter } from 'next/navigation';

const stats = [
  {
    id: 'employees',
    label: 'Total Employees',
    value: 248,
    prefix: '',
    change: '+12 this month',
    icon: Users,
  },
  {
    id: 'projects',
    label: 'Active Projects',
    value: 18,
    prefix: '',
    change: '3 deadlines this week',
    icon: FolderKanban,
  },
  {
    id: 'revenue',
    label: 'Monthly Revenue',
    value: 84320,
    prefix: '$',
    change: '+8.2% vs last month',
    icon: DollarSign,
  },
  {
    id: 'leaves',
    label: 'Pending Leaves',
    value: 7,
    prefix: '',
    change: '3 awaiting approval',
    icon: Calendar,
  },
];

const revenueData = [
  { month: 'Jan', revenue: 52000 },
  { month: 'Feb', revenue: 58000 },
  { month: 'Mar', revenue: 61000 },
  { month: 'Apr', revenue: 56000 },
  { month: 'May', revenue: 67000 },
  { month: 'Jun', revenue: 72000 },
  { month: 'Jul', revenue: 69000 },
  { month: 'Aug', revenue: 75000 },
  { month: 'Sep', revenue: 71000 },
  { month: 'Oct', revenue: 78000 },
  { month: 'Nov', revenue: 82000 },
  { month: 'Dec', revenue: 84320 },
];

const recentActivities = [
  {
    id: 1,
    icon: Calendar,
    text: 'John Smith submitted leave request',
    time: '2m ago',
    color: 'bg-amber-500',
  },
  {
    id: 2,
    icon: Banknote,
    text: 'Payroll processed for March',
    time: '1h ago',
    color: 'bg-green-500',
  },
  {
    id: 3,
    icon: Users,
    text: 'New employee Sarah Wilson onboarded',
    time: '3h ago',
    color: 'bg-module-erp',
  },
  {
    id: 4,
    icon: FolderKanban,
    text: 'Project Alpha milestone completed',
    time: '5h ago',
    color: 'bg-purple-500',
  },
  {
    id: 5,
    icon: Package,
    text: 'Inventory alert: Widget A low stock',
    time: '8h ago',
    color: 'bg-red-500',
  },
  {
    id: 6,
    icon: FileText,
    text: 'Quarterly report generated',
    time: '12h ago',
    color: 'bg-cyan-500',
  },
];

const quickActions = [
  {
    id: 'add-employee',
    label: 'Add Employee',
    icon: Users,
    route: '/erp/hrm/employees',
  },
  {
    id: 'process-payroll',
    label: 'Process Payroll',
    icon: Banknote,
    route: '/erp/hrm/payroll',
  },
  {
    id: 'submit-leave',
    label: 'Submit Leave',
    icon: Calendar,
    route: '/erp/hrm/leaves',
  },
  {
    id: 'view-reports',
    label: 'View Reports',
    icon: BarChart3,
    route: '/erp/reports',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

// Count-up animation hook
function useCountUp(target: number, duration: number = 600) {
  const [current, setCurrent] = useState(0);
  const startTime = useRef<number | null>(null);
  const rafId = useRef<number | undefined>(undefined);

  useEffect(() => {
    const startValue = 0;
    startTime.current = null;

    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(startValue + (target - startValue) * eased));

      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate);
      }
    };

    rafId.current = requestAnimationFrame(animate);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [target, duration]);

  return current;
}

function StatCard({ stat }: { stat: typeof stats[0] }) {
  const Icon = stat.icon;
  const count = useCountUp(stat.value, 500);

  const displayValue = stat.prefix
    ? `${stat.prefix}${count.toLocaleString()}`
    : count.toLocaleString();

  return (
    <motion.div
      variants={cardVariants}
      className="glass-surface rounded-xl p-5 sm:p-6 group cursor-default hover:border-module-erp/30 transition-colors duration-[var(--motion-fast)]"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-module-erp/8 text-module-erp transition-transform duration-[var(--motion-fast)] group-hover:scale-[1.02]">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </div>
      </div>

      <div className="mt-4">
        <p
          className="font-bold text-foreground count-up"
          style={{
            fontSize: 'var(--text-xl)',
            letterSpacing: 'var(--tracking-tight)',
            lineHeight: 'var(--leading-tight)',
          }}
        >
          {displayValue}
        </p>
        <p
          className="text-muted-foreground mt-1"
          style={{
            fontSize: 'var(--text-sm)',
            letterSpacing: 'var(--tracking-normal)',
            lineHeight: 'var(--leading-normal)',
          }}
        >
          {stat.label}
        </p>
      </div>

      <p
        className="mt-3 text-module-erp/70"
        style={{
          fontSize: 'var(--text-xs)',
          letterSpacing: 'var(--tracking-wide)',
          lineHeight: 'var(--leading-tight)',
        }}
      >
        {stat.change}
      </p>
    </motion.div>
  );
}

// Custom tooltip
function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-surface rounded-lg px-3 py-2 shadow-lg">
      <p
        className="text-muted-foreground"
        style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-normal)' }}
      >
        {label}
      </p>
      <p
        className="font-semibold text-foreground"
        style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-tight)' }}
      >
        ${payload[0].value.toLocaleString()}
      </p>
    </div>
  );
}

export default function ErpDashboardPage() {
  const router = useRouter();
  const { user } = useAuthStore();
  const hydrated = useStoreHydrated();

  const userName = hydrated && user ? user.name : 'User';

  return (
    <PageTransition>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="mb-10"
        >
          <h1
            className="font-bold text-foreground"
            style={{
              fontSize: 'var(--text-xl)',
              letterSpacing: 'var(--tracking-tight)',
              lineHeight: 'var(--leading-tight)',
            }}
          >
            Dashboard
          </h1>
          <p
            className="text-muted-foreground mt-1"
            style={{
              fontSize: 'var(--text-sm)',
              letterSpacing: 'var(--tracking-normal)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            Overview of your ERP system
          </p>
        </motion.div>

        {/* Welcome message */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, delay: 0.03, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          className="mb-10 glass-surface rounded-xl p-5 sm:p-6"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-module-erp/15 text-module-erp">
              <Users className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <div>
              <h2
                className="font-semibold text-foreground"
                style={{
                  fontSize: 'var(--text-lg)',
                  letterSpacing: 'var(--tracking-tight)',
                  lineHeight: 'var(--leading-tight)',
                }}
              >
                Welcome back, {userName}
              </h2>
              <p
                className="text-muted-foreground mt-0.5"
                style={{
                  fontSize: 'var(--text-sm)',
                  letterSpacing: 'var(--tracking-normal)',
                  lineHeight: 'var(--leading-normal)',
                }}
              >
                Here&apos;s what&apos;s happening across your organization today.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </motion.div>

        {/* Chart + Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-10">
          {/* Revenue Chart */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.28, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="lg:col-span-2 border border-glass-border/40 rounded-lg bg-glass-bg/30 p-5 sm:p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2
                  className="font-semibold text-foreground"
                  style={{
                    fontSize: 'var(--text-base)',
                    letterSpacing: 'var(--tracking-tight)',
                    lineHeight: 'var(--leading-tight)',
                  }}
                >
                  Revenue Overview
                </h2>
                <p
                  className="text-muted-foreground mt-0.5"
                  style={{
                    fontSize: 'var(--text-xs)',
                    letterSpacing: 'var(--tracking-normal)',
                  }}
                >
                  Monthly revenue for the past 12 months
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-module-erp" />
                  <span
                    className="text-muted-foreground"
                    style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-normal)' }}
                  >
                    Revenue
                  </span>
                </div>
              </div>
            </div>

            <div className="h-[260px] sm:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={revenueData}
                  margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="erpGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="var(--glass-border)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 11,
                      fill: 'var(--muted-foreground)',
                    }}
                    dy={8}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fontSize: 11,
                      fill: 'var(--muted-foreground)',
                    }}
                    tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    fill="url(#erpGradient)"
                    dot={false}
                    animationDuration={800}
                    animationEasing="ease-out"
                    activeDot={{
                      r: 5,
                      stroke: '#3B82F6',
                      strokeWidth: 2,
                      fill: 'var(--background)',
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Activity Feed */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.28, delay: 0.18, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="border border-glass-border/40 rounded-lg bg-glass-bg/30 p-5 sm:p-6"
          >
            <h2
              className="font-semibold text-foreground mb-4"
              style={{
                fontSize: 'var(--text-base)',
                letterSpacing: 'var(--tracking-tight)',
                lineHeight: 'var(--leading-tight)',
              }}
            >
              Recent Activity
            </h2>

            <div className="space-y-1 max-h-[300px] overflow-y-auto custom-scrollbar">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.18,
                      delay: 0.2 + index * 0.03,
                      ease: [0.25, 0.46, 0.45, 0.94] as const,
                    }}
                    className="flex items-start gap-3 p-2 -mx-2 rounded-lg hover:bg-glass-hover transition-colors duration-[var(--motion-fast)]"
                  >
                    <div className={cn('flex items-center justify-center w-7 h-7 rounded-lg shrink-0 mt-0.5', `${activity.color}/15`)}>
                      <Icon className="h-3.5 w-3.5" style={{ color: activity.color === 'bg-module-erp' ? '#3B82F6' : undefined }} strokeWidth={1.8} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-foreground"
                        style={{
                          fontSize: 'var(--text-sm)',
                          letterSpacing: 'var(--tracking-normal)',
                          lineHeight: 'var(--leading-normal)',
                        }}
                      >
                        {activity.text}
                      </p>
                      <p
                        className="text-muted-foreground/35 mt-0.5"
                        style={{
                          fontSize: 'var(--text-xs)',
                          letterSpacing: 'var(--tracking-normal)',
                        }}
                      >
                        {activity.time}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.28, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        >
          <h2
            className="font-semibold text-foreground mb-4"
            style={{
              fontSize: 'var(--text-base)',
              letterSpacing: 'var(--tracking-tight)',
              lineHeight: 'var(--leading-tight)',
            }}
          >
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.id}
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(action.route)}
                  className="glass-surface rounded-xl p-4 sm:p-5 flex flex-col items-center gap-3 group cursor-pointer hover:border-module-erp/30 transition-colors duration-[var(--motion-fast)] press-scale"
                  aria-label={action.label}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-module-erp/6 text-module-erp transition-transform duration-[var(--motion-fast)] group-hover:scale-[1.02]">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <span
                    className="text-foreground font-medium text-center"
                    style={{
                      fontSize: 'var(--text-sm)',
                      letterSpacing: 'var(--tracking-normal)',
                      lineHeight: 'var(--leading-tight)',
                    }}
                  >
                    {action.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
