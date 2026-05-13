'use client';

import { Pencil, ArrowRightLeft, TrendingUp } from 'lucide-react';
import { EmployeeStatusBadge } from './employee-status-badge';
import type { Employee } from '../types';
import { getInitials, getYearsOfService } from '../employee.utils';

interface EmployeeProfileHeaderProps {
  employee: Employee;
  onEdit?: () => void;
  onTransfer?: () => void;
  onPromote?: () => void;
}

export function EmployeeProfileHeader({ employee, onEdit, onTransfer, onPromote }: EmployeeProfileHeaderProps) {
  const initials = getInitials(employee.firstName, employee.lastName);
  const yearsOfService = getYearsOfService(employee.joinDate);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Avatar */}
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-module-erp/15 text-module-erp text-xl font-bold shrink-0">
          {employee.avatar || initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-lg font-bold text-foreground">
              {employee.firstName} {employee.lastName}
            </h2>
            <EmployeeStatusBadge status={employee.status} />
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {employee.position} · {employee.department}
          </p>
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span>{employee.employmentType.replace('-', ' ')}</span>
            <span>·</span>
            <span>{yearsOfService} yr{yearsOfService !== 1 ? 's' : ''} of service</span>
            <span>·</span>
            <span>Joined {new Date(employee.joinDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-module-erp/15 text-module-erp text-sm font-medium hover:bg-module-erp/25 transition-colors"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </button>
          )}
          {onTransfer && (
            <button
              onClick={onTransfer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-foreground text-sm hover:bg-white/10 transition-colors"
            >
              <ArrowRightLeft className="h-3.5 w-3.5" />
              Transfer
            </button>
          )}
          {onPromote && (
            <button
              onClick={onPromote}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-foreground text-sm hover:bg-white/10 transition-colors"
            >
              <TrendingUp className="h-3.5 w-3.5" />
              Promote
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
