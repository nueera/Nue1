'use client';

import { TabLayout } from '../../../../shared/components/tab-layout/tab-layout';
import type { Employee } from '../types';
import type { Document } from '../types';
import type { Compensation } from '../types';

interface EmployeeTabsProps {
  employee: Employee;
  documents?: Document[];
  compensations?: Compensation[];
  overviewContent?: React.ReactNode;
  documentsContent?: React.ReactNode;
  compensationContent?: React.ReactNode;
  timelineContent?: React.ReactNode;
  bankDetailsContent?: React.ReactNode;
  emergencyContactsContent?: React.ReactNode;
}

export function EmployeeTabs({
  employee,
  overviewContent,
  documentsContent,
  compensationContent,
  timelineContent,
  bankDetailsContent,
  emergencyContactsContent,
}: EmployeeTabsProps) {
  const tabs = [
    {
      value: 'overview',
      label: 'Overview',
      content: overviewContent ?? (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <p className="text-sm text-muted-foreground">Employee overview will appear here.</p>
        </div>
      ),
    },
    {
      value: 'documents',
      label: 'Documents',
      content: documentsContent ?? (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <p className="text-sm text-muted-foreground">Documents will appear here.</p>
        </div>
      ),
    },
    {
      value: 'compensation',
      label: 'Compensation',
      content: compensationContent ?? (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <p className="text-sm text-muted-foreground">Compensation details will appear here.</p>
        </div>
      ),
    },
    {
      value: 'timeline',
      label: 'Timeline',
      content: timelineContent ?? (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <p className="text-sm text-muted-foreground">Timeline events will appear here.</p>
        </div>
      ),
    },
    {
      value: 'bank-details',
      label: 'Bank Details',
      content: bankDetailsContent ?? (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <p className="text-sm text-muted-foreground">Bank details will appear here.</p>
        </div>
      ),
    },
    {
      value: 'emergency-contacts',
      label: 'Emergency Contacts',
      content: emergencyContactsContent ?? (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <p className="text-sm text-muted-foreground">Emergency contacts will appear here.</p>
        </div>
      ),
    },
  ];

  return <TabLayout tabs={tabs} defaultValue="overview" />;
}
