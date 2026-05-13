'use client';

import { useState } from 'react';
import { CheckCircle2, Play, Users, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FY_MONTHS } from '../constants';
import { fmtCurrency } from '../payroll.utils';
import type { PayrollRecord } from '../types';

interface PayrollRunProps {
  employees: PayrollRecord[];
  onRun: (month: string) => void;
  isLoading?: boolean;
  className?: string;
}

type Step = 1 | 2 | 3;

const STEPS = [
  { num: 1, label: 'Select Month', icon: Play },
  { num: 2, label: 'Review Employees', icon: Users },
  { num: 3, label: 'Process Payroll', icon: FileCheck },
] as const;

export function PayrollRun({ employees, onRun, isLoading, className }: PayrollRunProps) {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [selectedMonth, setSelectedMonth] = useState('');

  const totalGross = employees.reduce((sum, e) => sum + e.basicSalary, 0);
  const totalDeductions = employees.reduce((sum, e) => sum + e.deductions, 0);
  const totalNet = employees.reduce((sum, e) => sum + e.netSalary, 0);

  const handleRun = () => {
    if (selectedMonth) {
      onRun(selectedMonth);
    }
  };

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-6', className)}>
      {/* Progress Indicator */}
      <div className="flex items-center justify-between">
        {STEPS.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = currentStep === step.num;
          const isDone = currentStep > step.num;

          return (
            <div key={step.num} className="flex items-center flex-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (isDone || (step.num === 1) || (step.num === 2 && selectedMonth)) {
                      setCurrentStep(step.num as Step);
                    }
                  }}
                  className={cn(
                    'flex items-center justify-center h-8 w-8 rounded-full transition-all duration-200',
                    isActive && 'bg-module-erp text-white',
                    isDone && 'bg-emerald-500 text-white',
                    !isActive && !isDone && 'bg-white/10 text-muted-foreground',
                  )}
                >
                  {isDone ? (
                    <CheckCircle2 className="h-4 w-4" strokeWidth={1.8} />
                  ) : (
                    <StepIcon className="h-4 w-4" strokeWidth={1.8} />
                  )}
                </button>
                <span className={cn('text-xs font-medium hidden sm:block', isActive ? 'text-foreground' : 'text-muted-foreground')}>
                  {step.label}
                </span>
              </div>
              {idx < STEPS.length - 1 && (
                <div className={cn('flex-1 h-px mx-3', isDone ? 'bg-emerald-500/50' : 'bg-white/10')} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step 1: Select Month */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground text-sm">Select Payroll Month</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {FY_MONTHS.map((month, idx) => {
              const year = idx < 9 ? new Date().getFullYear() : new Date().getFullYear() + 1;
              const monthYear = `${month} ${year}`;
              return (
                <button
                  key={month}
                  onClick={() => setSelectedMonth(monthYear)}
                  className={cn(
                    'px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200',
                    selectedMonth === monthYear
                      ? 'bg-module-erp text-white'
                      : 'bg-white/5 border border-white/10 text-foreground/80 hover:bg-white/10',
                  )}
                >
                  {month}
                </button>
              );
            })}
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => setCurrentStep(2)}
              disabled={!selectedMonth}
              className="bg-module-erp hover:bg-module-erp/90 text-white press-scale"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Review Employees */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground text-sm">Review Employees for {selectedMonth}</h4>
          <div className="bg-white/5 border border-white/10 rounded-xl max-h-64 overflow-y-auto custom-scrollbar">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-2.5 text-xs text-muted-foreground font-medium">Employee</th>
                  <th className="text-right px-4 py-2.5 text-xs text-muted-foreground font-medium">Basic</th>
                  <th className="text-right px-4 py-2.5 text-xs text-muted-foreground font-medium">Deductions</th>
                  <th className="text-right px-4 py-2.5 text-xs text-muted-foreground font-medium">Net</th>
                </tr>
              </thead>
              <tbody>
                {employees.slice(0, 10).map((emp) => (
                  <tr key={emp.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="px-4 py-2 text-foreground">{emp.employeeName}</td>
                    <td className="px-4 py-2 text-right text-foreground/80">{fmtCurrency(emp.basicSalary)}</td>
                    <td className="px-4 py-2 text-right text-red-400">{fmtCurrency(emp.deductions)}</td>
                    <td className="px-4 py-2 text-right font-medium text-module-erp">{fmtCurrency(emp.netSalary)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {employees.length > 10 && (
            <p className="text-xs text-muted-foreground">Showing 10 of {employees.length} employees</p>
          )}
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(1)} className="press-scale">
              Back
            </Button>
            <Button
              onClick={() => setCurrentStep(3)}
              className="bg-module-erp hover:bg-module-erp/90 text-white press-scale"
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Confirm and Process */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground text-sm">Confirm Payroll Run</h4>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Month</span>
              <span className="font-medium text-foreground">{selectedMonth}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Employees</span>
              <span className="font-medium text-foreground">{employees.length}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Gross</span>
              <span className="font-medium text-foreground">{fmtCurrency(totalGross)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total Deductions</span>
              <span className="font-medium text-red-400">{fmtCurrency(totalDeductions)}</span>
            </div>
            <div className="border-t border-white/10 pt-2 flex items-center justify-between text-sm">
              <span className="font-semibold text-foreground">Total Net Pay</span>
              <span className="font-bold text-module-erp">{fmtCurrency(totalNet)}</span>
            </div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
            <p className="text-xs text-amber-400">
              This will process payroll for {employees.length} employees. This action cannot be undone.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => setCurrentStep(2)} className="press-scale">
              Back
            </Button>
            <Button
              onClick={handleRun}
              disabled={isLoading}
              className="bg-module-erp hover:bg-module-erp/90 text-white press-scale"
            >
              {isLoading ? 'Processing...' : 'Run Payroll'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
