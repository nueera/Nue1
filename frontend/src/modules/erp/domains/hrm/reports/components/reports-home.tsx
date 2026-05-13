'use client';

import { Users, Calendar, DollarSign, BarChart3, FileText, TrendingUp, ArrowRight } from 'lucide-react';
import { REPORT_CATEGORIES, REPORT_CATEGORY_LABELS, BUILTIN_REPORTS } from '../constants';

interface ReportsHomeProps {
  onCategoryClick?: (category: string) => void;
  onReportClick?: (reportId: string) => void;
}

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Employee: Users,
  Attendance: Calendar,
  Leave: Calendar,
  Payroll: DollarSign,
  Performance: TrendingUp,
  Recruitment: Users,
  Training: FileText,
  Expense: DollarSign,
  Shift: ClockIcon,
  Loan: DollarSign,
};

const CATEGORY_ACCENTS: Record<string, string> = {
  Employee: 'from-emerald-500/20 to-emerald-500/5',
  Attendance: 'from-blue-500/20 to-blue-500/5',
  Leave: 'from-violet-500/20 to-violet-500/5',
  Payroll: 'from-amber-500/20 to-amber-500/5',
  Performance: 'from-rose-500/20 to-rose-500/5',
  Recruitment: 'from-cyan-500/20 to-cyan-500/5',
  Training: 'from-module-erp/20 to-module-erp/5',
  Expense: 'from-orange-500/20 to-orange-500/5',
  Shift: 'from-teal-500/20 to-teal-500/5',
  Loan: 'from-pink-500/20 to-pink-500/5',
};

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12,6 12,12 16,14" />
    </svg>
  );
}

const DISPLAY_CATEGORIES = ['Employee', 'Leave', 'Payroll'] as const;

export function ReportsHome({ onCategoryClick, onReportClick }: ReportsHomeProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-foreground">Reports Center</h2>
        <p className="text-sm text-muted-foreground mt-1">Access analytics and generate reports across all HR modules</p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DISPLAY_CATEGORIES.map((category) => {
          const Icon = CATEGORY_ICONS[category] || BarChart3;
          const reports = BUILTIN_REPORTS.filter((r) => r.category === category);
          const accent = CATEGORY_ACCENTS[category] || 'from-module-erp/20 to-module-erp/5';

          return (
            <button
              key={category}
              onClick={() => onCategoryClick?.(category)}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-left hover:bg-white/[0.07] transition-all duration-200 group"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center mb-4`}>
                <Icon className="h-5 w-5 text-foreground" />
              </div>
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {REPORT_CATEGORY_LABELS[category] || category}
              </h3>
              <p className="text-[10px] text-muted-foreground">
                {reports.length} built-in report{reports.length !== 1 ? 's' : ''}
              </p>

              {/* Quick links */}
              {reports.length > 0 && (
                <div className="mt-3 space-y-1">
                  {reports.slice(0, 3).map((report) => (
                    <button
                      key={report.id}
                      onClick={(e) => { e.stopPropagation(); onReportClick?.(report.id); }}
                      className="flex items-center gap-1.5 text-[10px] text-muted-foreground hover:text-module-erp transition-colors w-full"
                    >
                      <FileText className="h-3 w-3 shrink-0" />
                      <span className="truncate">{report.name}</span>
                      <ArrowRight className="h-2.5 w-2.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              )}
            </button>
          );
        })}

        {/* Custom Reports Card */}
        <button
          onClick={() => onCategoryClick?.('custom')}
          className="bg-white/5 backdrop-blur-xl border border-white/10 border-dashed rounded-2xl p-5 text-left hover:bg-white/[0.07] transition-all duration-200 group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-module-erp/20 to-module-erp/5 flex items-center justify-center mb-4">
            <BarChart3 className="h-5 w-5 text-module-erp" />
          </div>
          <h3 className="text-sm font-semibold text-foreground mb-1">Custom Reports</h3>
          <p className="text-[10px] text-muted-foreground">Build and save your own custom reports</p>
        </button>
      </div>

      {/* All Reports Quick Access */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">All Built-in Reports</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {BUILTIN_REPORTS.map((report) => {
            const Icon = CATEGORY_ICONS[report.category] || FileText;
            return (
              <button
                key={report.id}
                onClick={() => onReportClick?.(report.id)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all duration-200 text-left"
              >
                <Icon className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-foreground truncate">{report.name}</p>
                  <p className="text-[9px] text-muted-foreground">{report.category}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
