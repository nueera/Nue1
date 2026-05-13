'use client';

import { Users } from 'lucide-react';
import { FinancePageShell } from '@/modules/finance/components/shared/finance-page-shell';

export default function PayrollEmployeesPage() {
  return (
    <FinancePageShell
      title="Employees"
      description="Manage employee payroll information"
      icon={<Users className="h-6 w-6 text-emerald-600" />}
      addLabel="Add Employee"
    />
  );
}
