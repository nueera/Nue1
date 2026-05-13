'use client';

import { useState, useMemo } from 'react';
import { Calculator, Save, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { calcGross, calcPF, calcESI, calcNet, fmtCurrency } from '../payroll.utils';
import type { SalaryStructure as SalaryStructureType } from '../types';

interface SalaryStructureProps {
  structure: SalaryStructureType | null;
  onSave: (structure: SalaryStructureType) => void;
  isLoading?: boolean;
  className?: string;
}

export function SalaryStructure({ structure, onSave, isLoading, className }: SalaryStructureProps) {
  const [ctc, setCtc] = useState(structure?.ctc || 0);
  const [basic, setBasic] = useState(structure?.basic || 0);
  const [hra, setHra] = useState(structure?.hra || 0);
  const [da, setDa] = useState(structure?.da || 0);
  const [specialAllowance, setSpecialAllowance] = useState(structure?.specialAllowance || 0);
  const [pf, setPf] = useState(structure?.pf || 0);
  const [esi, setEsi] = useState(structure?.esi || 0);
  const [tax, setTax] = useState(structure?.tax || 0);

  const gross = useMemo(() => calcGross(basic, hra, da, specialAllowance), [basic, hra, da, specialAllowance]);
  const totalDeductions = useMemo(() => pf + esi + tax, [pf, esi, tax]);
  const net = useMemo(() => calcNet(gross, totalDeductions), [gross, totalDeductions]);

  const autoCalculate = () => {
    const newBasic = ctc * 0.4;
    const newHra = newBasic * 0.5;
    const newDa = newBasic * 0.1;
    const newSpecial = ctc - newBasic - newHra - newDa;
    const newPf = calcPF(newBasic);
    const newEsi = calcESI(gross || ctc);
    const newGross = calcGross(newBasic, newHra, newDa, newSpecial);
    const newTax = (newGross * 0.1); // simplified

    setBasic(Math.round(newBasic));
    setHra(Math.round(newHra));
    setDa(Math.round(newDa));
    setSpecialAllowance(Math.round(Math.max(0, newSpecial)));
    setPf(Math.round(newPf));
    setEsi(Math.round(newEsi));
    setTax(Math.round(newTax));
  };

  const handleSave = () => {
    onSave({
      id: structure?.id || `sal-${Date.now()}`,
      employeeId: structure?.employeeId || '',
      ctc,
      basic,
      hra,
      da,
      specialAllowance,
      pf,
      esi,
      tax,
    });
  };

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-5', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
          <h3 className="font-semibold text-foreground text-base">Salary Structure</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={autoCalculate} className="press-scale h-8">
            <RefreshCw className="h-3.5 w-3.5 mr-1.5" strokeWidth={1.8} />
            Auto Calculate
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isLoading}
            className="bg-module-erp hover:bg-module-erp/90 text-white press-scale h-8"
          >
            <Save className="h-3.5 w-3.5 mr-1.5" strokeWidth={1.8} />
            Save
          </Button>
        </div>
      </div>

      {/* CTC Input */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">CTC (Annual)</label>
        <input
          type="number"
          value={ctc || ''}
          onChange={(e) => setCtc(Number(e.target.value))}
          className="w-full bg-white/5 border border-module-erp/30 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200 font-semibold"
          placeholder="Enter CTC"
        />
      </div>

      {/* Earnings */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-emerald-500">Earnings</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { label: 'Basic Salary', value: basic, setter: setBasic, pct: ctc ? ((basic / ctc) * 100).toFixed(1) : null },
            { label: 'HRA', value: hra, setter: setHra, pct: ctc ? ((hra / ctc) * 100).toFixed(1) : null },
            { label: 'DA', value: da, setter: setDa, pct: ctc ? ((da / ctc) * 100).toFixed(1) : null },
            { label: 'Special Allowance', value: specialAllowance, setter: setSpecialAllowance, pct: ctc ? ((specialAllowance / ctc) * 100).toFixed(1) : null },
          ].map((field) => (
            <div key={field.label} className="space-y-1">
              <label className="text-xs font-medium text-foreground">{field.label}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">₹</span>
                <input
                  type="number"
                  value={field.value || ''}
                  onChange={(e) => field.setter(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-7 pr-4 py-2 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
                />
                {field.pct && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">{field.pct}%</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-2 flex justify-between text-sm">
          <span className="text-emerald-500 font-medium">Gross</span>
          <span className="font-bold text-emerald-500">{fmtCurrency(gross)}</span>
        </div>
      </div>

      {/* Deductions */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-red-400">Deductions</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'PF', value: pf, setter: setPf },
            { label: 'ESI', value: esi, setter: setEsi },
            { label: 'Tax', value: tax, setter: setTax },
          ].map((field) => (
            <div key={field.label} className="space-y-1">
              <label className="text-xs font-medium text-foreground">{field.label}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">₹</span>
                <input
                  type="number"
                  value={field.value || ''}
                  onChange={(e) => field.setter(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-7 pr-4 py-2 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="bg-red-400/10 border border-red-400/20 rounded-lg px-4 py-2 flex justify-between text-sm">
          <span className="text-red-400 font-medium">Total Deductions</span>
          <span className="font-bold text-red-400">{fmtCurrency(totalDeductions)}</span>
        </div>
      </div>

      {/* Net */}
      <div className="bg-module-erp/10 border border-module-erp/20 rounded-xl p-4 flex items-center justify-between">
        <span className="text-base font-bold text-foreground">Net Monthly Salary</span>
        <span className="text-xl font-bold text-module-erp">{fmtCurrency(Math.round(net / 12))}</span>
      </div>
    </div>
  );
}
