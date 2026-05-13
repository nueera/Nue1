'use client';

import { useState } from 'react';
import { FileText, Save, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SalarySlipTemplateProps {
  template: SlipTemplate;
  onSave: (template: SlipTemplate) => void;
  onPreview?: () => void;
  isLoading?: boolean;
  className?: string;
}

export interface SlipTemplate {
  id: string;
  name: string;
  showLogo: boolean;
  companyName: string;
  companyAddress: string;
  showEarnings: boolean;
  showDeductions: boolean;
  showBankDetails: boolean;
  showLeaveBalance: boolean;
  footerText: string;
  fontSize: 'small' | 'medium' | 'large';
  orientation: 'portrait' | 'landscape';
}

export function SalarySlipTemplate({ template: initialTemplate, onSave, onPreview, isLoading, className }: SalarySlipTemplateProps) {
  const [template, setTemplate] = useState<SlipTemplate>(initialTemplate);

  const handleSave = () => {
    onSave(template);
  };

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-5', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
          <h3 className="font-semibold text-foreground text-base">Salary Slip Template</h3>
        </div>
        <div className="flex items-center gap-2">
          {onPreview && (
            <Button variant="outline" size="sm" onClick={onPreview} className="press-scale h-8">
              <Eye className="h-3.5 w-3.5 mr-1.5" strokeWidth={1.8} />
              Preview
            </Button>
          )}
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

      {/* Company Details */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Company Details</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Company Name</label>
            <input
              type="text"
              value={template.companyName}
              onChange={(e) => setTemplate({ ...template, companyName: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-foreground">Company Address</label>
            <input
              type="text"
              value={template.companyAddress}
              onChange={(e) => setTemplate({ ...template, companyAddress: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Display Options */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Display Sections</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { key: 'showLogo' as const, label: 'Company Logo' },
            { key: 'showEarnings' as const, label: 'Earnings Breakdown' },
            { key: 'showDeductions' as const, label: 'Deductions Breakdown' },
            { key: 'showBankDetails' as const, label: 'Bank Details' },
            { key: 'showLeaveBalance' as const, label: 'Leave Balance' },
          ].map((option) => (
            <label key={option.key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={template[option.key]}
                onChange={(e) => setTemplate({ ...template, [option.key]: e.target.checked })}
                className="rounded border-white/20 bg-white/5 text-module-erp focus:ring-module-erp/50"
              />
              <span className="text-xs text-foreground">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Formatting */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Font Size</label>
          <select
            value={template.fontSize}
            onChange={(e) => setTemplate({ ...template, fontSize: e.target.value as 'small' | 'medium' | 'large' })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors"
          >
            <option value="small" className="bg-zinc-900">Small</option>
            <option value="medium" className="bg-zinc-900">Medium</option>
            <option value="large" className="bg-zinc-900">Large</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-foreground">Orientation</label>
          <select
            value={template.orientation}
            onChange={(e) => setTemplate({ ...template, orientation: e.target.value as 'portrait' | 'landscape' })}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground outline-none focus:border-module-erp/50 transition-colors"
          >
            <option value="portrait" className="bg-zinc-900">Portrait</option>
            <option value="landscape" className="bg-zinc-900">Landscape</option>
          </select>
        </div>
      </div>

      {/* Footer Text */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-foreground">Footer Text</label>
        <textarea
          value={template.footerText}
          onChange={(e) => setTemplate({ ...template, footerText: e.target.value })}
          rows={2}
          placeholder="Footer text to display on salary slip..."
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors resize-none"
        />
      </div>
    </div>
  );
}
