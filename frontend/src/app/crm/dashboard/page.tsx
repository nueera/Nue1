'use client';

import { motion } from 'framer-motion';
import {
  Users,
  UserPlus,
  Building2,
  Handshake,
  TrendingUp,
  DollarSign,
  Activity,
  BarChart3,
} from 'lucide-react';

const stats = [
  { label: 'Total Leads', value: '1,247', change: '+12.5%', icon: UserPlus, color: 'module-crm' },
  { label: 'Active Contacts', value: '3,891', change: '+8.2%', icon: Users, color: 'module-crm' },
  { label: 'Open Deals', value: '156', change: '+5.1%', icon: Handshake, color: 'module-crm' },
  { label: 'Revenue', value: '$2.4M', change: '+18.7%', icon: DollarSign, color: 'module-crm' },
];

const recentActivities = [
  { text: 'New lead: Sarah Johnson from TechCorp', time: '2m ago' },
  { text: 'Deal closed: Acme Corp — $45,000', time: '15m ago' },
  { text: 'Contact updated: Mike Chen', time: '30m ago' },
  { text: 'Follow-up scheduled: Global Industries', time: '1h ago' },
  { text: 'Quote sent: StartupXYZ — $12,500', time: '2h ago' },
];

const topDeals = [
  { name: 'Acme Corp', amount: '$125,000', stage: 'Negotiation', probability: 75 },
  { name: 'TechVentures', amount: '$89,000', stage: 'Proposal', probability: 50 },
  { name: 'Global Industries', amount: '$67,500', stage: 'Qualification', probability: 25 },
  { name: 'StartupXYZ', amount: '$45,000', stage: 'Closed Won', probability: 100 },
];

export default function CrmDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <h1
          className="text-xl font-bold text-foreground"
          style={{ letterSpacing: 'var(--tracking-tight)' }}
        >
          CRM Dashboard
        </h1>
        <p
          className="text-sm text-muted-foreground mt-1"
          style={{ letterSpacing: 'var(--tracking-normal)' }}
        >
          Your sales pipeline at a glance
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18, delay: i * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="glass-surface rounded-xl p-4 border border-glass-border"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-module-crm/10 text-module-crm">
                  <Icon className="h-4.5 w-4.5" strokeWidth={1.8} />
                </div>
                <span className="text-xs font-medium text-status-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {stat.change}
                </span>
              </div>
              <p
                className="text-2xl font-bold text-foreground"
                style={{ letterSpacing: 'var(--tracking-tight)' }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs text-muted-foreground mt-1"
                style={{ letterSpacing: 'var(--tracking-normal)' }}
              >
                {stat.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass-surface rounded-xl p-5 border border-glass-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <Activity className="h-4 w-4 text-module-crm" strokeWidth={1.8} />
            <h2
              className="text-sm font-semibold text-foreground"
              style={{ letterSpacing: 'var(--tracking-tight)' }}
            >
              Recent Activity
            </h2>
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-module-crm/50 mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm text-foreground truncate"
                    style={{ letterSpacing: 'var(--tracking-normal)' }}
                  >
                    {activity.text}
                  </p>
                  <p
                    className="text-xs text-muted-foreground/60"
                    style={{ letterSpacing: 'var(--tracking-normal)' }}
                  >
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Deals */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18, delay: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="glass-surface rounded-xl p-5 border border-glass-border"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4 text-module-crm" strokeWidth={1.8} />
            <h2
              className="text-sm font-semibold text-foreground"
              style={{ letterSpacing: 'var(--tracking-tight)' }}
            >
              Top Deals
            </h2>
          </div>
          <div className="space-y-3">
            {topDeals.map((deal, i) => (
              <div key={i} className="flex items-center gap-3">
                <div
                  className="flex-1 min-w-0"
                >
                  <p
                    className="text-sm font-medium text-foreground truncate"
                    style={{ letterSpacing: 'var(--tracking-normal)' }}
                  >
                    {deal.name}
                  </p>
                  <p
                    className="text-xs text-muted-foreground"
                    style={{ letterSpacing: 'var(--tracking-normal)' }}
                  >
                    {deal.stage}
                  </p>
                </div>
                <span
                  className="text-sm font-semibold text-foreground shrink-0"
                  style={{ letterSpacing: 'var(--tracking-normal)' }}
                >
                  {deal.amount}
                </span>
                <div className="w-12 h-1.5 rounded-full bg-glass-bg overflow-hidden shrink-0">
                  <div
                    className="h-full rounded-full bg-module-crm"
                    style={{ width: `${deal.probability}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
