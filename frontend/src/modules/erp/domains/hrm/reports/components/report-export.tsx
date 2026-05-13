'use client';

import { useState } from 'react';
import { Download, FileText, Calendar, Loader2 } from 'lucide-react';
import { REPORT_FORMATS } from '../constants';

interface ReportExportProps {
  reportName?: string;
  onExport: (format: 'pdf' | 'xlsx' | 'csv', dateRange?: { start: string; end: string }) => void;
  isExporting?: boolean;
  showDateRange?: boolean;
}

const FORMAT_INFO: Record<string, { label: string; description: string; icon: string }> = {
  pdf: { label: 'PDF', description: 'Portable document format, best for printing', icon: '📄' },
  xlsx: { label: 'Excel', description: 'Spreadsheet format, best for data analysis', icon: '📊' },
  csv: { label: 'CSV', description: 'Comma-separated values, best for data import', icon: '📋' },
};

export function ReportExport({ reportName, onExport, isExporting, showDateRange = true }: ReportExportProps) {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'xlsx' | 'csv'>('pdf');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleExport = () => {
    const dateRange = showDateRange && startDate && endDate ? { start: startDate, end: endDate } : undefined;
    onExport(selectedFormat, dateRange);
  };

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground outline-none focus:border-module-erp/50 transition-all duration-200';

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 space-y-5">
      {/* Title */}
      <div>
        <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Download className="h-4 w-4 text-module-erp" />
          Export Report
        </h3>
        {reportName && <p className="text-xs text-muted-foreground mt-1">{reportName}</p>}
      </div>

      {/* Date Range */}
      {showDateRange && (
        <div className="space-y-3">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Calendar className="h-3 w-3" />
            Date Range (optional)
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <span className="text-[9px] text-muted-foreground/50">From</span>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} />
            </div>
            <div className="space-y-1">
              <span className="text-[9px] text-muted-foreground/50">To</span>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate} className={inputClass} />
            </div>
          </div>
        </div>
      )}

      {/* Format Selection */}
      <div className="space-y-3">
        <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Export Format</label>
        <div className="grid grid-cols-3 gap-3">
          {REPORT_FORMATS.map((fmt) => {
            const info = FORMAT_INFO[fmt];
            const isSelected = selectedFormat === fmt;
            return (
              <button
                key={fmt}
                type="button"
                onClick={() => setSelectedFormat(fmt)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 ${
                  isSelected
                    ? 'bg-module-erp/10 border-module-erp/30'
                    : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                }`}
              >
                <span className="text-lg">{info.icon}</span>
                <p className={`text-xs font-semibold mt-1 ${isSelected ? 'text-module-erp' : 'text-foreground'}`}>{info.label}</p>
                <p className="text-[9px] text-muted-foreground mt-0.5 leading-tight">{info.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50"
      >
        {isExporting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Exporting...
          </>
        ) : (
          <>
            <Download className="h-4 w-4" />
            Export as {FORMAT_INFO[selectedFormat].label}
          </>
        )}
      </button>
    </div>
  );
}
