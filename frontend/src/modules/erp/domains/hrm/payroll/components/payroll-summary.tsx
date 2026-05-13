'use client';

import { TrendingUp, TrendingDown, DollarSign, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { StatCard } from '../../../../design-system/components/card/stat-card';
import { cn } from '@/lib/utils';
import { fmtCurrency } from '../payroll.utils';

interface PayrollSummaryProps {
  totalPayroll: number;
  totalDeductions: number;
  totalBonuses: number;
  employeeCount: number;
  payrollChange?: number;
  deductionsChange?: number;
  bonusesChange?: number;
  className?: string;
}

export function PayrollSummary({
  totalPayroll,
  totalDeductions,
  totalBonuses,
  employeeCount,
  payrollChange,
  deductionsChange,
  bonusesChange,
  className,
}: PayrollSummaryProps) {
  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4', className)}>
      <StatCard
        icon={DollarSign}
        label="Total Payroll"
        value={fmtCurrency(totalPayroll)}
        change={payrollChange !== undefined ? `${payrollChange >= 0 ? '+' : ''}${payrollChange}% vs last month` : undefined}
      />
      <StatCard
        icon={TrendingDown}
        label="Total Deductions"
        value={fmtCurrency(totalDeductions)}
        change={deductionsChange !== undefined ? `${deductionsChange >= 0 ? '+' : ''}${deductionsChange}% vs last month` : undefined}
      />
      <StatCard
        icon={TrendingUp}
        label="Total Bonuses"
        value={fmtCurrency(totalBonuses)}
        change={bonusesChange !== undefined ? `${bonusesChange >= 0 ? '+' : ''}${bonusesChange}% vs last month` : undefined}
      />
      <StatCard
        icon={Users}
        label="Employees"
        value={employeeCount}
        change="Active payroll"
      />
    </div>
  );
}
