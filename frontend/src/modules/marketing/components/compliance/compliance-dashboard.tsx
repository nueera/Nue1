'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, CheckCircle2, AlertTriangle, XCircle, FileText, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#94a3b8'];

export function ComplianceDashboard() {
  const regulations = [
    { name: 'GDPR', status: 'compliant' as const, score: 95 },
    { name: 'CCPA', status: 'compliant' as const, score: 92 },
    { name: 'CAN-SPAM', status: 'warning' as const, score: 78 },
    { name: 'CASL', status: 'compliant' as const, score: 88 },
    { name: 'LGPD', status: 'not_assessed' as const, score: 0 },
  ];

  const STATUS_CONFIG: Record<string, { icon: typeof CheckCircle2; color: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
    compliant: { icon: CheckCircle2, color: 'text-emerald-600', variant: 'default' },
    warning: { icon: AlertTriangle, color: 'text-amber-600', variant: 'secondary' },
    non_compliant: { icon: XCircle, color: 'text-red-600', variant: 'destructive' },
    not_assessed: { icon: FileText, color: 'text-muted-foreground', variant: 'outline' },
  };

  const pieData = [
    { name: 'Compliant', value: regulations.filter((r) => r.status === 'compliant').length },
    { name: 'Warning', value: regulations.filter((r) => r.status === 'warning').length },
    { name: 'Non-Compliant', value: regulations.filter((r) => r.status === 'non_compliant').length },
    { name: 'Not Assessed', value: regulations.filter((r) => r.status === 'not_assessed').length },
  ].filter((d) => d.value > 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Compliance Dashboard</h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: CheckCircle2, label: 'Compliant', value: regulations.filter((r) => r.status === 'compliant').length, color: 'text-emerald-600' },
          { icon: AlertTriangle, label: 'Warnings', value: regulations.filter((r) => r.status === 'warning').length, color: 'text-amber-600' },
          { icon: XCircle, label: 'Non-Compliant', value: regulations.filter((r) => r.status === 'non_compliant').length, color: 'text-red-600' },
          { icon: Users, label: 'Consent Records', value: '24,500', color: 'text-blue-600' },
        ].map((m, idx) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="border-border/50">
              <CardContent className="p-3">
                <m.icon className={`h-4 w-4 ${m.color} mb-1`} />
                <p className="text-lg font-bold tabular-nums">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="space-y-2">
        {regulations.map((reg, idx) => {
          const config = STATUS_CONFIG[reg.status];
          const StatusIcon = config.icon;
          return (
            <motion.div key={reg.name} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}
              className="flex items-center gap-3 p-3 rounded-lg border border-border/50"
            >
              <StatusIcon className={`h-4 w-4 ${config.color}`} />
              <span className="text-sm font-medium flex-1">{reg.name}</span>
              {reg.score > 0 && <span className="text-sm text-muted-foreground">{reg.score}%</span>}
              <Badge variant={config.variant} className="text-xs">{reg.status.replace('_', ' ')}</Badge>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
