'use client';

import { DetailPageLayout } from '../../../../shared/components/detail-page-layout';
import { DataCard } from '../../../../shared/components/data-card/data-card';
import { EmployeeStatusBadge } from './employee-status-badge';
import { EmployeeProfileHeader } from './employee-profile-header';
import type { Employee } from '../types';
import { getFullName, getInitials, getYearsOfService, calcAge } from '../employee.utils';

interface EmployeeDetailProps {
  employee: Employee;
  onEdit?: () => void;
  onTransfer?: () => void;
  onPromote?: () => void;
  onOffboard?: () => void;
}

export function EmployeeDetail({ employee, onEdit, onTransfer, onPromote, onOffboard }: EmployeeDetailProps) {
  const fullName = getFullName(employee.firstName, employee.lastName);
  const initials = getInitials(employee.firstName, employee.lastName);
  const yearsOfService = getYearsOfService(employee.joinDate);

  return (
    <DetailPageLayout
      title={fullName}
      subtitle={`${employee.position} · ${employee.department}`}
      backLabel="Back to Employees"
      actions={
        <div className="flex items-center gap-2">
          {onEdit && (
            <button onClick={onEdit} className="px-3 py-1.5 rounded-lg bg-module-erp/15 text-module-erp text-sm font-medium hover:bg-module-erp/25 transition-colors">
              Edit
            </button>
          )}
          {onTransfer && (
            <button onClick={onTransfer} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-foreground text-sm hover:bg-white/10 transition-colors">
              Transfer
            </button>
          )}
          {onPromote && (
            <button onClick={onPromote} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-foreground text-sm hover:bg-white/10 transition-colors">
              Promote
            </button>
          )}
        </div>
      }
    >
      <div className="space-y-6">
        {/* Profile Header */}
        <EmployeeProfileHeader
          employee={employee}
          onEdit={onEdit}
          onTransfer={onTransfer}
          onPromote={onPromote}
        />

        {/* Personal Information */}
        <DataCard title="Personal Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DetailField label="Full Name" value={fullName} />
            <DetailField label="Email" value={employee.email} />
            <DetailField label="Phone" value={employee.phone} />
            <DetailField label="Gender" value={employee.gender ? employee.gender.charAt(0).toUpperCase() + employee.gender.slice(1) : '-'} />
            <DetailField label="Date of Birth" value={employee.dateOfBirth ? `${new Date(employee.dateOfBirth).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} (${calcAge(employee.dateOfBirth)} yrs)` : '-'} />
            <DetailField label="Years of Service" value={`${yearsOfService} year${yearsOfService !== 1 ? 's' : ''}`} />
          </div>
        </DataCard>

        {/* Employment Details */}
        <DataCard title="Employment Details">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <DetailField label="Department" value={employee.department} />
            <DetailField label="Position" value={employee.position} />
            <DetailField label="Employment Type" value={employee.employmentType.replace('-', ' ')} />
            <DetailField label="Join Date" value={new Date(employee.joinDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} />
            <DetailField label="Status" value={<EmployeeStatusBadge status={employee.status} />} />
            <DetailField label="Reporting Manager" value={employee.reportingManager || '-'} />
          </div>
        </DataCard>

        {/* Compensation */}
        <DataCard title="Compensation">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailField label="Annual CTC" value={`₹${employee.salary.toLocaleString('en-IN')}`} />
            <DetailField label="Monthly Gross" value={`₹${Math.round(employee.salary / 12).toLocaleString('en-IN')}`} />
          </div>
        </DataCard>

        {/* Offboard button */}
        {employee.status === 'active' && onOffboard && (
          <div className="flex justify-end">
            <button
              onClick={onOffboard}
              className="px-4 py-2 rounded-lg border border-red-500/30 text-red-500 text-sm hover:bg-red-500/10 transition-colors"
            >
              Initiate Offboarding
            </button>
          </div>
        )}
      </div>
    </DetailPageLayout>
  );
}

function DetailField({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <div className="text-sm font-medium text-foreground">
        {value}
      </div>
    </div>
  );
}
