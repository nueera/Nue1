'use client';

import { TrendingUp, IndianRupee } from 'lucide-react';
import { DataCard } from '../../../../shared/components/data-card/data-card';
import type { Compensation } from '../types';

interface EmployeeCompensationProps {
  compensations: Compensation[];
  isLoading?: boolean;
}

export function EmployeeCompensation({ compensations, isLoading }: EmployeeCompensationProps) {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="h-32 bg-white/5 rounded-xl animate-pulse" />
        ))}
      </div>
    );
  }

  if (compensations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <IndianRupee className="h-10 w-10 text-muted-foreground/20 mb-4" />
        <p className="text-sm font-medium text-muted-foreground">No compensation history</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Compensation records will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {compensations.map((comp, idx) => {
        const totalAllowances = comp.hra + comp.da + comp.specialAllowance;
        const isLatest = idx === 0;

        return (
          <DataCard
            key={comp.id}
            title={isLatest ? 'Current Compensation' : `Compensation (Effective: ${formatDate(comp.effectiveDate)})`}
            action={
              isLatest ? (
                <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-500 text-xs font-medium">
                  Active
                </span>
              ) : null
            }
          >
            {/* CTC */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/10">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-module-erp/15 text-module-erp shrink-0">
                <IndianRupee className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Annual CTC</p>
                <p className="text-xl font-bold text-foreground">
                  ₹{comp.ctc.toLocaleString('en-IN')}
                </p>
              </div>
              {idx > 0 && compensations[idx - 1] && (
                <div className="ml-auto flex items-center gap-1 text-green-500 text-xs font-medium">
                  <TrendingUp className="h-3.5 w-3.5" />
                  {((comp.ctc - compensations[idx - 1].ctc) / compensations[idx - 1].ctc * 100).toFixed(1)}%
                </div>
              )}
            </div>

            {/* Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <BreakdownItem label="Basic Salary" value={comp.basicSalary} />
              <BreakdownItem label="HRA" value={comp.hra} />
              <BreakdownItem label="DA" value={comp.da} />
              <BreakdownItem label="Special Allowance" value={comp.specialAllowance} />
            </div>

            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-muted-foreground">
              <span>Total Monthly: ₹{Math.round(comp.ctc / 12).toLocaleString('en-IN')}</span>
              <span>Effective: {formatDate(comp.effectiveDate)}</span>
            </div>
          </DataCard>
        );
      })}
    </div>
  );
}

function BreakdownItem({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium text-foreground mt-0.5">₹{value.toLocaleString('en-IN')}</p>
      <p className="text-xs text-muted-foreground/60">₹{Math.round(value / 12).toLocaleString('en-IN')}/mo</p>
    </div>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
