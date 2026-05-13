'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Send, CheckCircle2, MessageCircle, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface WhatsappReportProps {
  campaignId?: string;
}

export function WhatsappReport({ campaignId }: WhatsappReportProps) {
  const metrics = [
    { icon: Send, label: 'Sent', value: '8,500', color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
    { icon: CheckCircle2, label: 'Delivered', value: '8,075 (95%)', color: 'text-blue-600', bg: 'bg-blue-50 dark:bg-blue-950/30' },
    { icon: MessageCircle, label: 'Read', value: '6,460 (76%)', color: 'text-amber-600', bg: 'bg-amber-50 dark:bg-amber-950/30' },
    { icon: TrendingUp, label: 'Response Rate', value: '18.5%', color: 'text-purple-600', bg: 'bg-purple-50 dark:bg-purple-950/30' },
  ];

  const trendData = [
    { day: 'Mon', sent: 1200, delivered: 1140, read: 912, responded: 216 },
    { day: 'Tue', sent: 1350, delivered: 1283, read: 1026, responded: 243 },
    { day: 'Wed', sent: 1100, delivered: 1045, read: 836, responded: 198 },
    { day: 'Thu', sent: 1400, delivered: 1330, read: 1064, responded: 252 },
    { day: 'Fri', sent: 1300, delivered: 1235, read: 988, responded: 234 },
    { day: 'Sat', sent: 900, delivered: 855, read: 684, responded: 162 },
    { day: 'Sun', sent: 250, delivered: 238, read: 190, responded: 45 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <Phone className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">WhatsApp Report</h3>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {metrics.map((m, idx) => (
          <motion.div key={m.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="border-border/50">
              <CardContent className="p-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${m.bg} mb-2`}>
                  <m.icon className={`h-4 w-4 ${m.color}`} />
                </div>
                <p className="text-sm font-bold tabular-nums">{m.value}</p>
                <p className="text-xs text-muted-foreground">{m.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Message Funnel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 11 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Line type="monotone" dataKey="sent" stroke="#10b981" strokeWidth={2} name="Sent" />
                <Line type="monotone" dataKey="delivered" stroke="#3b82f6" strokeWidth={2} name="Delivered" />
                <Line type="monotone" dataKey="read" stroke="#f59e0b" strokeWidth={2} name="Read" />
                <Line type="monotone" dataKey="responded" stroke="#8b5cf6" strokeWidth={2} name="Responded" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
