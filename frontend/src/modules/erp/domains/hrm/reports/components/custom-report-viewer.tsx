'use client';

import { useState } from 'react';
import { RefreshCw, Download, Clock, MoreHorizontal } from 'lucide-react';
import type { CustomReport, SavedReport } from '../types';
import { REPORT_FORMATS } from '../constants';
import { EmptyState } from '../../../../shared/components/empty-state';

interface CustomReportViewerProps {
  report: CustomReport;
  savedData?: SavedReport;
  data?: Record<string, unknown>[];
  isLoading?: boolean;
  onRefresh?: () => void;
  onExport?: (format: 'pdf' | 'xlsx' | 'csv') => void;
}

export function CustomReportViewer({ report, savedData, data = [], isLoading, onRefresh, onExport }: CustomReportViewerProps) {
  const [showExport, setShowExport] = useState(false);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 animate-pulse">
          <div className="h-5 w-48 bg-white/10 rounded mb-2" />
          <div className="h-3 w-64 bg-white/10 rounded" />
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl h-64 animate-pulse" />
      </div>
    );
  }

  const displayData = savedData?.resultData || data;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-base font-semibold text-foreground">{report.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{report.description}</p>
            <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
              <span className="px-1.5 py-0.5 bg-white/5 border border-white/10 rounded-md">{report.category}</span>
              {report.chartType && <span>Chart: {report.chartType}</span>}
              {savedData?.lastRunAt && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last run: {new Date(savedData.lastRunAt).toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onRefresh && (
              <button onClick={onRefresh} className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground transition-all duration-200">
                <RefreshCw className="h-4 w-4" />
              </button>
            )}
            <div className="relative">
              <button onClick={() => setShowExport(!showExport)} className="p-2 rounded-lg hover:bg-white/10 text-muted-foreground transition-all duration-200">
                <Download className="h-4 w-4" />
              </button>
              {showExport && (
                <div className="absolute right-0 top-full mt-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl p-1 z-10 min-w-[120px]">
                  {REPORT_FORMATS.map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => { onExport?.(fmt); setShowExport(false); }}
                      className="w-full px-3 py-2 text-xs text-foreground hover:bg-white/10 rounded-lg transition-colors text-left uppercase"
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Data Display */}
      {displayData.length === 0 ? (
        <EmptyState icon={MoreHorizontal} title="No data" description="Run the report to see results" />
      ) : report.chartType && report.chartType !== 'table' ? (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <ChartPlaceholder type={report.chartType} data={displayData} fields={report.fields} />
        </div>
      ) : (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  {report.fields.map((field) => (
                    <th key={field} className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-5 py-3">
                      {field}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {displayData.slice(0, 50).map((row, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-all duration-200">
                    {report.fields.map((field) => (
                      <td key={field} className="px-5 py-2.5 text-sm text-foreground">
                        {String(row[field] ?? '—')}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {displayData.length > 50 && (
            <div className="px-5 py-3 border-t border-white/10 text-center">
              <p className="text-xs text-muted-foreground">Showing 50 of {displayData.length} rows</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ChartPlaceholder({ type, data, fields }: { type: string; data: Record<string, unknown>[]; fields: string[] }) {
  // Simple bar chart rendering
  if (type === 'bar' && fields.length >= 2) {
    const labelField = fields[0];
    const valueField = fields[1];
    const maxVal = Math.max(...data.map((d) => Number(d[valueField]) || 0), 1);

    return (
      <div className="space-y-3">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Bar Chart</h4>
        <div className="space-y-2">
          {data.slice(0, 15).map((row, i) => {
            const label = String(row[labelField] || `Item ${i + 1}`);
            const value = Number(row[valueField]) || 0;
            const pct = (value / maxVal) * 100;
            return (
              <div key={i} className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground w-24 shrink-0 truncate text-right">{label}</span>
                <div className="flex-1 h-5 bg-white/5 rounded-md overflow-hidden">
                  <div className="h-full rounded-md bg-module-erp/60 transition-all duration-500" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-[10px] text-foreground w-12 shrink-0">{value}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Simple pie chart (legend only)
  if (type === 'pie' && fields.length >= 2) {
    const labelField = fields[0];
    const valueField = fields[1];
    const total = data.reduce((sum, d) => sum + (Number(d[valueField]) || 0), 0) || 1;
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#EC4899', '#06B6D4', '#F97316'];

    return (
      <div className="space-y-3">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Distribution</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {data.slice(0, 9).map((row, i) => {
            const label = String(row[labelField] || `Item ${i + 1}`);
            const value = Number(row[valueField]) || 0;
            const pct = ((value / total) * 100).toFixed(1);
            return (
              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-white/[0.03] rounded-lg border border-white/5">
                <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: colors[i % colors.length] }} />
                <div className="min-w-0">
                  <p className="text-[10px] text-foreground truncate">{label}</p>
                  <p className="text-[9px] text-muted-foreground">{pct}%</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Line / metric fallback
  return (
    <div className="flex items-center justify-center h-32 text-xs text-muted-foreground">
      {type} visualization — {data.length} data points
    </div>
  );
}
