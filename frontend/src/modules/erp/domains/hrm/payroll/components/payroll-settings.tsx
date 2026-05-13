'use client';

import { useState } from 'react';
import { Settings, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { PF_RATE, ESI_RATE, PROFESSIONAL_TAX } from '../constants';

interface PayrollSettingsProps {
  settings: PayrollSettingsState;
  onSave: (settings: PayrollSettingsState) => void;
  isLoading?: boolean;
  className?: string;
}

export interface PayrollSettingsState {
  payDate: number;
  pfRate: number;
  esiRate: number;
  professionalTax: number;
  taxRegime: 'old' | 'new';
  ltaEligible: boolean;
  medicalAllowance: number;
}

const TAX_SLABS = [
  { regime: 'old', label: 'Old Tax Regime', description: 'With deductions under 80C, 80D, HRA, etc.' },
  { regime: 'new', label: 'New Tax Regime', description: 'Lower rates, no deductions' },
];

export function PayrollSettings({ settings: initialSettings, onSave, isLoading, className }: PayrollSettingsProps) {
  const [settings, setSettings] = useState<PayrollSettingsState>(initialSettings);

  const handleSave = () => {
    onSave(settings);
  };

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-5', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
          <h3 className="font-semibold text-foreground text-base">Payroll Configuration</h3>
        </div>
        <Button
          size="sm"
          onClick={handleSave}
          disabled={isLoading}
          className="bg-module-erp hover:bg-module-erp/90 text-white press-scale h-8"
        >
          <Save className="h-3.5 w-3.5 mr-1.5" strokeWidth={1.8} />
          Save Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Pay Date */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Pay Date (Day of Month)</label>
          <input
            type="number"
            value={settings.payDate}
            onChange={(e) => setSettings({ ...settings, payDate: Number(e.target.value) })}
            min={1}
            max={31}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
          />
          <p className="text-xs text-muted-foreground">Day of the month when salary is disbursed</p>
        </div>

        {/* PF Rate */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">PF Rate (%)</label>
          <input
            type="number"
            value={(settings.pfRate * 100).toFixed(1)}
            onChange={(e) => setSettings({ ...settings, pfRate: Number(e.target.value) / 100 })}
            min={0}
            max={50}
            step={0.1}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
          />
          <p className="text-xs text-muted-foreground">Current: {(PF_RATE * 100).toFixed(0)}% of basic</p>
        </div>

        {/* ESI Rate */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">ESI Rate (%)</label>
          <input
            type="number"
            value={(settings.esiRate * 100).toFixed(2)}
            onChange={(e) => setSettings({ ...settings, esiRate: Number(e.target.value) / 100 })}
            min={0}
            max={10}
            step={0.01}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
          />
          <p className="text-xs text-muted-foreground">Current: {(ESI_RATE * 100).toFixed(2)}% of gross</p>
        </div>

        {/* Professional Tax */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Professional Tax (Monthly)</label>
          <input
            type="number"
            value={settings.professionalTax}
            onChange={(e) => setSettings({ ...settings, professionalTax: Number(e.target.value) })}
            min={0}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
          />
          <p className="text-xs text-muted-foreground">Current: ₹{PROFESSIONAL_TAX}/month</p>
        </div>

        {/* Tax Regime */}
        <div className="space-y-1.5 sm:col-span-2">
          <label className="text-sm font-medium text-foreground">Tax Regime</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TAX_SLABS.map((slab) => (
              <button
                key={slab.regime}
                onClick={() => setSettings({ ...settings, taxRegime: slab.regime as 'old' | 'new' })}
                className={cn(
                  'rounded-xl border p-4 text-left transition-all duration-200',
                  settings.taxRegime === slab.regime
                    ? 'border-module-erp/50 bg-module-erp/5'
                    : 'border-white/10 bg-white/5 hover:bg-white/10',
                )}
              >
                <p className={cn(
                  'text-sm font-medium',
                  settings.taxRegime === slab.regime ? 'text-module-erp' : 'text-foreground',
                )}>
                  {slab.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{slab.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* LTA */}
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.ltaEligible}
              onChange={(e) => setSettings({ ...settings, ltaEligible: e.target.checked })}
              className="rounded border-white/20 bg-white/5 text-module-erp focus:ring-module-erp/50"
            />
            <span className="text-sm font-medium text-foreground">LTA Eligible</span>
          </label>
        </div>

        {/* Medical Allowance */}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground">Medical Allowance (Monthly)</label>
          <input
            type="number"
            value={settings.medicalAllowance}
            onChange={(e) => setSettings({ ...settings, medicalAllowance: Number(e.target.value) })}
            min={0}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors duration-200"
          />
        </div>
      </div>
    </div>
  );
}
