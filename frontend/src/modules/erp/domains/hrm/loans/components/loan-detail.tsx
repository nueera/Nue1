'use client';

import {
  Landmark,
  DollarSign,
  Percent,
  Calendar,
  User,
  FileText,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import type { Loan, LoanApplication, RepaymentSchedule } from '../types';
import { LOAN_STATUS_LABELS } from '../constants';
import { RepaymentSchedule as RepaymentScheduleComponent } from './repayment-schedule';

interface LoanDetailProps {
  loan: Loan;
  application?: LoanApplication;
  schedule?: RepaymentSchedule[];
  onExportStatement?: () => void;
}

export function LoanDetail({ loan, application, schedule, onExportStatement }: LoanDetailProps) {
  const paidPct = loan.tenureMonths > 0
    ? Math.round((loan.paidInstallments / loan.tenureMonths) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-semibold text-foreground">{loan.loanTypeName}</h3>
              <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-medium rounded-md border ${
                loan.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15' :
                loan.status === 'completed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/15' :
                'bg-red-500/10 text-red-400 border-red-500/15'
              }`}>
                {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{loan.employeeName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Outstanding Balance</p>
            <p className="text-2xl font-bold text-foreground">₹{loan.outstandingBalance.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
            <span>{loan.paidInstallments} of {loan.tenureMonths} installments paid</span>
            <span>{paidPct}%</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${paidPct}%` }} />
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <DetailItem icon={DollarSign} label="Principal" value={`₹${loan.principal.toLocaleString('en-IN')}`} />
        <DetailItem icon={Percent} label="Interest Rate" value={`${loan.interestRate}% p.a.`} />
        <DetailItem icon={Calendar} label="EMI" value={`₹${loan.emi.toLocaleString('en-IN')}/mo`} />
        <DetailItem icon={Calendar} label="Next Due" value={loan.nextDueDate} />
        <DetailItem icon={Calendar} label="Disbursal" value={loan.disbursalDate} />
        <DetailItem icon={Calendar} label="Maturity" value={loan.maturityDate} />
        {application?.guarantorName && <DetailItem icon={User} label="Guarantor" value={application.guarantorName} />}
        {application?.rejectedReason && (
          <div className="col-span-2 border border-red-500/20 bg-red-500/5 rounded-xl p-3">
            <p className="text-[10px] text-red-400 uppercase tracking-wider mb-1">Rejection Reason</p>
            <p className="text-xs text-foreground">{application.rejectedReason}</p>
          </div>
        )}
      </div>

      {/* Repayment Schedule */}
      {schedule && schedule.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Repayment Schedule</h4>
            {onExportStatement && (
              <button onClick={onExportStatement} className="text-xs text-module-erp hover:underline">Export Statement</button>
            )}
          </div>
          <RepaymentScheduleComponent schedule={schedule} />
        </div>
      )}
    </div>
  );
}

function DetailItem({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-3">
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className="h-3 w-3 text-muted-foreground/50" />
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
