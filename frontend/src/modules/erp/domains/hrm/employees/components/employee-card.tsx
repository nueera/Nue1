'use client';

import { Mail, Building2, Briefcase } from 'lucide-react';
import { EmployeeStatusBadge } from './employee-status-badge';
import type { Employee } from '../types';

interface EmployeeCardProps {
  employee: Employee;
  onClick?: (employee: Employee) => void;
}

export function EmployeeCard({ employee, onClick }: EmployeeCardProps) {
  const initials = `${employee.firstName[0]}${employee.lastName[0]}`;

  return (
    <div
      onClick={() => onClick?.(employee)}
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 transition-all duration-200 hover:bg-white/10 hover:border-white/20 ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-module-erp/15 text-module-erp text-sm font-bold shrink-0">
          {employee.avatar || initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-foreground truncate">
              {employee.firstName} {employee.lastName}
            </h3>
            <EmployeeStatusBadge status={employee.status} />
          </div>

          <div className="mt-2 space-y-1.5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{employee.department}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{employee.position}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{employee.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
