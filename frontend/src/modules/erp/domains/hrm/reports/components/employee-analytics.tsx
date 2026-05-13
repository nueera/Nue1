'use client';

import { Users, TrendingUp, TrendingDown, Building2 } from 'lucide-react';
import { ChartCard } from '../../../../shared/components/chart-card';

interface EmployeeAnalyticsProps {
  headcountData: Array<{ month: string; count: number }>;
  departmentDistribution: Array<{ department: string; count: number; color?: string }>;
  attritionData: Array<{ month: string; rate: number }>;
  isLoading?: boolean;
}

const DEFAULT_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#EC4899', '#06B6D4', '#F97316', '#84CC16', '#6366F1'];

export function EmployeeAnalytics({ headcountData, departmentDistribution, attritionData, isLoading }: EmployeeAnalyticsProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 animate-pulse">
              <div className="h-8 w-16 bg-white/10 rounded mb-2" />
              <div className="h-3 w-24 bg-white/10 rounded" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 animate-pulse h-64" />
          ))}
        </div>
      </div>
    );
  }

  const currentHeadcount = headcountData.length > 0 ? headcountData[headcountData.length - 1].count : 0;
  const prevHeadcount = headcountData.length > 1 ? headcountData[headcountData.length - 2].count : 0;
  const headcountChange = prevHeadcount > 0 ? ((currentHeadcount - prevHeadcount) / prevHeadcount) * 100 : 0;
  const avgAttrition = attritionData.length > 0
    ? attritionData.reduce((sum, d) => sum + d.rate, 0) / attritionData.length
    : 0;
  const totalDepartments = departmentDistribution.length;

  // SVG chart dimensions
  const chartW = 400;
  const chartH = 200;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };

  // Headcount line chart
  const renderHeadcountChart = () => {
    if (headcountData.length === 0) return <NoData />;
    const maxVal = Math.max(...headcountData.map((d) => d.count)) * 1.1;
    const minVal = Math.min(...headcountData.map((d) => d.count)) * 0.9;
    const range = maxVal - minVal || 1;
    const plotW = chartW - padding.left - padding.right;
    const plotH = chartH - padding.top - padding.bottom;

    const points = headcountData.map((d, i) => ({
      x: padding.left + (i / Math.max(headcountData.length - 1, 1)) * plotW,
      y: padding.top + plotH - ((d.count - minVal) / range) * plotH,
    }));

    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
    const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + plotH} L ${points[0].x} ${padding.top + plotH} Z`;

    return (
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto">
        <defs>
          <linearGradient id="headcountGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-module-erp, #3B82F6)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="var(--color-module-erp, #3B82F6)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Grid lines */}
        {Array.from({ length: 4 }).map((_, i) => {
          const y = padding.top + (plotH / 3) * i;
          return <line key={i} x1={padding.left} y1={y} x2={chartW - padding.right} y2={y} stroke="rgba(255,255,255,0.05)" />;
        })}
        {/* Area */}
        <path d={areaPath} fill="url(#headcountGrad)" />
        {/* Line */}
        <path d={linePath} fill="none" stroke="var(--color-module-erp, #3B82F6)" strokeWidth="2" />
        {/* Dots */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="var(--color-module-erp, #3B82F6)" />
        ))}
        {/* X-axis labels */}
        {headcountData.filter((_, i) => i % Math.ceil(headcountData.length / 6) === 0).map((d, i) => {
          const idx = headcountData.indexOf(d);
          const x = padding.left + (idx / Math.max(headcountData.length - 1, 1)) * plotW;
          return <text key={i} x={x} y={chartH - 5} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '9px' }}>{d.month.slice(0, 3)}</text>;
        })}
      </svg>
    );
  };

  // Department distribution (horizontal bar chart)
  const renderDeptChart = () => {
    if (departmentDistribution.length === 0) return <NoData />;
    const maxCount = Math.max(...departmentDistribution.map((d) => d.count));
    const barHeight = 24;
    const gap = 8;

    return (
      <div className="space-y-2">
        {departmentDistribution.map((dept, i) => {
          const pct = maxCount > 0 ? (dept.count / maxCount) * 100 : 0;
          const color = dept.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];
          return (
            <div key={dept.department} className="flex items-center gap-3">
              <span className="text-[10px] text-muted-foreground w-24 shrink-0 truncate text-right">{dept.department}</span>
              <div className="flex-1 h-6 bg-white/5 rounded-md overflow-hidden">
                <div
                  className="h-full rounded-md transition-all duration-700"
                  style={{ width: `${pct}%`, backgroundColor: color, opacity: 0.7 }}
                />
              </div>
              <span className="text-[10px] text-foreground font-medium w-8 shrink-0">{dept.count}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // Attrition bar chart
  const renderAttritionChart = () => {
    if (attritionData.length === 0) return <NoData />;
    const maxRate = Math.max(...attritionData.map((d) => d.rate)) * 1.2 || 10;
    const plotW = chartW - padding.left - padding.right;
    const plotH = chartH - padding.top - padding.bottom;
    const barW = Math.min(plotW / attritionData.length - 4, 30);

    return (
      <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full h-auto">
        {Array.from({ length: 4 }).map((_, i) => {
          const y = padding.top + (plotH / 3) * i;
          return <line key={i} x1={padding.left} y1={y} x2={chartW - padding.right} y2={y} stroke="rgba(255,255,255,0.05)" />;
        })}
        {attritionData.map((d, i) => {
          const x = padding.left + (i + 0.5) * (plotW / attritionData.length);
          const barH = (d.rate / maxRate) * plotH;
          const y = padding.top + plotH - barH;
          return (
            <g key={i}>
              <rect x={x - barW / 2} y={y} width={barW} height={barH} rx="3" fill="#EF4444" opacity="0.6" />
              <text x={x} y={chartH - 5} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '9px' }}>{d.month.slice(0, 3)}</text>
              <text x={x} y={y - 4} textAnchor="middle" className="fill-foreground" style={{ fontSize: '8px' }}>{d.rate}%</text>
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Users className="h-4 w-4 text-module-erp" />
            <span className="text-2xl font-bold text-foreground">{currentHeadcount}</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Headcount</p>
          {headcountChange !== 0 && (
            <div className={`flex items-center gap-1 mt-1 text-[10px] ${headcountChange > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {headcountChange > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(headcountChange).toFixed(1)}%
            </div>
          )}
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="h-4 w-4 text-violet-400" />
            <span className="text-2xl font-bold text-foreground">{totalDepartments}</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Departments</p>
        </div>
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <TrendingDown className="h-4 w-4 text-red-400" />
            <span className="text-2xl font-bold text-foreground">{avgAttrition.toFixed(1)}%</span>
          </div>
          <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Avg Attrition</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Headcount Trend" subtitle="Employee headcount over time">
          {renderHeadcountChart()}
        </ChartCard>
        <ChartCard title="Department Distribution" subtitle="Employees by department">
          {renderDeptChart()}
        </ChartCard>
      </div>

      <ChartCard title="Attrition Rate" subtitle="Monthly attrition rate %" period="Last 12 months">
        {renderAttritionChart()}
      </ChartCard>
    </div>
  );
}

function NoData() {
  return (
    <div className="flex items-center justify-center h-48 text-muted-foreground text-xs">
      No data available
    </div>
  );
}
