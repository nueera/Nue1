'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { PageTransition } from '@/modules/erp/design-system/components/animations';
import { type ColumnDef } from '@tanstack/react-table';
import {
  ArrowLeft,
  Mail,
  Phone,
  CalendarDays,
  Hash,
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  getEmployeeById,
  getAttendanceByEmployeeId,
  getLeavesByEmployeeId,
  getPayrollByEmployeeId,
  type AttendanceRecord,
  type LeaveRequest,
  type PayrollRecord,
} from '@/modules/erp/data/mock';
import { SmartTable } from '@/modules/erp/shared/components/smart-table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const statusBadgeClass: Record<string, string> = {
  active: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  inactive: 'bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 border-zinc-500/15',
  'on-leave': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
};

const attendanceStatusBadge: Record<string, string> = {
  present: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  absent: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
  late: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  'half-day': 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/15',
};

const leaveStatusBadge: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  approved: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  rejected: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/15',
};

const payrollStatusBadge: Record<string, string> = {
  paid: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/15',
  pending: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/15',
  processing: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/15',
};

function calcHoursWorked(checkIn: string, checkOut: string): string {
  if (checkIn === '-' || checkOut === '-') return '-';
  const [h1, m1] = checkIn.split(':').map(Number);
  const [h2, m2] = checkOut.split(':').map(Number);
  const diff = (h2 * 60 + m2 - (h1 * 60 + m1)) / 60;
  return `${diff.toFixed(1)}h`;
}

const attendanceColumns: ColumnDef<AttendanceRecord>[] = [
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ getValue }) => {
      const date = getValue() as string;
      return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    },
  },
  { accessorKey: 'checkIn', header: 'Check In' },
  { accessorKey: 'checkOut', header: 'Check Out' },
  {
    id: 'hours',
    header: 'Hours',
    cell: ({ row }) => calcHoursWorked(row.original.checkIn, row.original.checkOut),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return (
        <Badge variant="outline" className={cn('capitalize', attendanceStatusBadge[status] || '')} style={{ fontSize: 'var(--text-xs)' }}>
          {status.replace('-', ' ')}
        </Badge>
      );
    },
  },
];

const leaveColumns: ColumnDef<LeaveRequest>[] = [
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ getValue }) => (
      <span className="capitalize" style={{ fontSize: 'var(--text-sm)' }}>{getValue() as string}</span>
    ),
  },
  {
    accessorKey: 'startDate',
    header: 'Start Date',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  },
  {
    accessorKey: 'endDate',
    header: 'End Date',
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  },
  { accessorKey: 'days', header: 'Days' },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return (
        <Badge variant="outline" className={cn('capitalize', leaveStatusBadge[status] || '')} style={{ fontSize: 'var(--text-xs)' }}>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'reason',
    header: 'Reason',
    cell: ({ getValue }) => (
      <span className="text-muted-foreground truncate max-w-[200px] block" style={{ fontSize: 'var(--text-sm)' }}>
        {getValue() as string}
      </span>
    ),
  },
];

const payrollColumns: ColumnDef<PayrollRecord>[] = [
  {
    accessorKey: 'month',
    header: 'Month',
    cell: ({ getValue }) => {
      const month = getValue() as string;
      const [y, m] = month.split('-');
      return new Date(Number(y), Number(m) - 1).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
    },
  },
  {
    accessorKey: 'basicSalary',
    header: 'Basic',
    cell: ({ getValue }) => `$${(getValue() as number).toLocaleString()}`,
  },
  {
    accessorKey: 'deductions',
    header: 'Deductions',
    cell: ({ getValue }) => <span className="text-red-500">-${(getValue() as number).toLocaleString()}</span>,
  },
  {
    accessorKey: 'bonus',
    header: 'Bonus',
    cell: ({ getValue }) => {
      const val = getValue() as number;
      return val > 0 ? <span className="text-green-500">+${val.toLocaleString()}</span> : <span className="text-muted-foreground">$0</span>;
    },
  },
  {
    accessorKey: 'netSalary',
    header: 'Net Salary',
    cell: ({ getValue }) => <span className="font-semibold">${(getValue() as number).toLocaleString()}</span>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => {
      const status = getValue() as string;
      return (
        <Badge variant="outline" className={cn('capitalize', payrollStatusBadge[status] || '')} style={{ fontSize: 'var(--text-xs)' }}>
          {status}
        </Badge>
      );
    },
  },
];

export default function EmployeeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const employee = getEmployeeById(id);

  if (!employee) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="border border-glass-border/30 rounded-lg bg-glass-bg/20 p-12 text-center">
          <p className="text-muted-foreground" style={{ fontSize: 'var(--text-base)' }}>Employee not found</p>
          <button
            onClick={() => router.push('/erp/hrm/employees')}
            className="mt-4 text-module-erp hover:underline"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            Back to Employees
          </button>
        </div>
      </div>
    );
  }

  const attendance = getAttendanceByEmployeeId(id);
  const leaves = getLeavesByEmployeeId(id);
  const payroll = getPayrollByEmployeeId(id);

  const daysPresent = attendance.filter((a) => a.status === 'present').length;
  const leavesTaken = leaves.filter((l) => l.status === 'approved').reduce((acc, l) => acc + l.days, 0);

  return (
    <PageTransition>
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={() => router.push('/erp/hrm/employees')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-[var(--motion-fast)] mb-6 press-scale"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={1.8} />
        <span style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}>
          Back to Employees
        </span>
      </motion.button>

      {/* Employee header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.24, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="border border-glass-border/40 bg-glass-bg/20 rounded-xl p-6 sm:p-8 mb-6"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-module-erp/10 text-module-erp text-xl font-bold shrink-0">
            {employee.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1
                className="font-bold text-foreground"
                style={{
                  fontSize: 'var(--text-xl)',
                  letterSpacing: 'var(--tracking-tight)',
                  lineHeight: 'var(--leading-tight)',
                }}
              >
                {employee.firstName} {employee.lastName}
              </h1>
              <Badge
                variant="outline"
                className={cn('capitalize', statusBadgeClass[employee.status], 'badge-transition')}
                style={{ fontSize: 'var(--text-xs)' }}
              >
                {employee.status.replace('-', ' ')}
              </Badge>
            </div>
            <p
              className="text-muted-foreground mt-1"
              style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}
            >
              {employee.position} &middot; {employee.department}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="leaves">Leaves</TabsTrigger>
            <TabsTrigger value="payroll">Payroll</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="tab-content-fade">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Personal info */}
              <div className="lg:col-span-2 border border-glass-border/40 bg-glass-bg/20 rounded-lg p-6">
                <h2
                  className="font-semibold text-foreground mb-4"
                  style={{ fontSize: 'var(--text-base)', letterSpacing: 'var(--tracking-tight)' }}
                >
                  Personal Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoItem icon={Mail} label="Email" value={employee.email} />
                  <InfoItem icon={Phone} label="Phone" value={employee.phone} />
                  <InfoItem icon={CalendarDays} label="Join Date" value={new Date(employee.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
                  <InfoItem icon={Hash} label="Employee ID" value={employee.id} />
                </div>
              </div>

              {/* Quick stats */}
              <div className="space-y-4">
                <QuickStat icon={CheckCircle2} label="Days Present" value={String(daysPresent)} color="text-green-500" />
                <QuickStat icon={XCircle} label="Leaves Taken" value={`${leavesTaken} days`} color="text-amber-500" />
                <QuickStat icon={TrendingUp} label="Projects Active" value="3" color="text-module-erp" />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="tab-content-fade">
            <SmartTable
              data={attendance as unknown as Record<string, unknown>[]}
              columns={attendanceColumns}
              searchable={false}
              emptyMessage="No attendance records found"
              pageSize={10}
            />
          </TabsContent>

          <TabsContent value="leaves" className="tab-content-fade">
            <SmartTable
              data={leaves as unknown as Record<string, unknown>[]}
              columns={leaveColumns}
              searchable={false}
              emptyMessage="No leave requests found"
              pageSize={10}
            />
          </TabsContent>

          <TabsContent value="payroll" className="tab-content-fade">
            <SmartTable
              data={payroll as unknown as Record<string, unknown>[]}
              columns={payrollColumns}
              searchable={false}
              emptyMessage="No payroll records found"
              pageSize={10}
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
    </PageTransition>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-glass-hover text-muted-foreground shrink-0 mt-0.5">
        <Icon className="h-4 w-4" strokeWidth={1.8} />
      </div>
      <div>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}>
          {label}
        </p>
        <p className="text-foreground font-medium" style={{ fontSize: 'var(--text-sm)', letterSpacing: 'var(--tracking-normal)' }}>
          {value}
        </p>
      </div>
    </div>
  );
}

function QuickStat({ icon: Icon, label, value, color }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; label: string; value: string; color: string }) {
  return (
    <div className="border border-glass-border/40 bg-glass-bg/20 rounded-lg p-4 flex items-center gap-3">
      <div className={cn('flex items-center justify-center w-10 h-10 rounded-xl shrink-0', `${color}/10`)}>
        <Icon className={cn('h-5 w-5', color)} strokeWidth={1.8} />
      </div>
      <div>
        <p className="font-bold text-foreground" style={{ fontSize: 'var(--text-lg)', letterSpacing: 'var(--tracking-tight)' }}>
          {value}
        </p>
        <p className="text-muted-foreground" style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wide)' }}>
          {label}
        </p>
      </div>
    </div>
  );
}
