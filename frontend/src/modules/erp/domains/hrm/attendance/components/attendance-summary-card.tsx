'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Clock, Hourglass, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AttendanceSummaryCardProps {
  totalPresent: number;
  totalAbsent: number;
  totalLate: number;
  totalHalfDay: number;
  averageWorkHours: number;
  className?: string;
}

export function AttendanceSummaryCard({
  totalPresent,
  totalAbsent,
  totalLate,
  totalHalfDay,
  averageWorkHours,
  className,
}: AttendanceSummaryCardProps) {
  const stats = [
    {
      icon: CheckCircle2,
      label: 'Present',
      value: totalPresent,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      icon: XCircle,
      label: 'Absent',
      value: totalAbsent,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      icon: Clock,
      label: 'Late',
      value: totalLate,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      icon: Hourglass,
      label: 'Half Day',
      value: totalHalfDay,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      icon: Timer,
      label: 'Avg Work Hours',
      value: `${averageWorkHours.toFixed(1)}h`,
      color: 'text-module-erp',
      bgColor: 'bg-module-erp/10',
    },
  ];

  return (
    <div className={cn('grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3', className)}>
      {stats.map((stat, idx) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: idx * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition-colors duration-200"
        >
          <div className={cn('flex items-center justify-center w-9 h-9 rounded-xl mb-3', stat.bgColor, stat.color)}>
            <stat.icon className="h-4.5 w-4.5" strokeWidth={1.8} />
          </div>
          <p className="text-xl font-bold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{stat.label}</p>
        </motion.div>
      ))}
    </div>
  );
}
