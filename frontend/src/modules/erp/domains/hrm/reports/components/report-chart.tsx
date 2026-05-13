'use client';

import { useMemo } from 'react';

type ChartType = 'bar' | 'line' | 'pie' | 'area';

interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ReportChartProps {
  type: ChartType;
  data: ChartDataPoint[];
  height?: number;
  showLabels?: boolean;
  showValues?: boolean;
  title?: string;
  className?: string;
}

const DEFAULT_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#EC4899', '#06B6D4', '#F97316', '#84CC16', '#6366F1'];

export function ReportChart({ type, data, height = 250, showLabels = true, showValues = true, title, className }: ReportChartProps) {
  const chartContent = useMemo(() => {
    if (data.length === 0) {
      return <NoData />;
    }

    switch (type) {
      case 'bar':
        return <BarChart data={data} showLabels={showLabels} showValues={showValues} />;
      case 'line':
        return <LineChart data={data} height={height} showLabels={showLabels} showValues={showValues} />;
      case 'pie':
        return <PieChart data={data} showValues={showValues} />;
      case 'area':
        return <AreaChart data={data} height={height} showLabels={showLabels} showValues={showValues} />;
      default:
        return <BarChart data={data} showLabels={showLabels} showValues={showValues} />;
    }
  }, [type, data, height, showLabels, showValues]);

  return (
    <div className={className}>
      {title && (
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">{title}</h4>
      )}
      {chartContent}
    </div>
  );
}

// === Bar Chart ===
function BarChart({ data, showLabels, showValues }: { data: ChartDataPoint[]; showLabels: boolean; showValues: boolean }) {
  const maxVal = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="space-y-2">
      {data.map((item, i) => {
        const color = item.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length];
        const pct = (item.value / maxVal) * 100;
        return (
          <div key={i} className="flex items-center gap-3">
            {showLabels && (
              <span className="text-[10px] text-muted-foreground w-24 shrink-0 truncate text-right">{item.label}</span>
            )}
            <div className="flex-1 h-6 bg-white/5 rounded-md overflow-hidden">
              <div
                className="h-full rounded-md transition-all duration-700 ease-out"
                style={{ width: `${pct}%`, backgroundColor: color, opacity: 0.75 }}
              />
            </div>
            {showValues && (
              <span className="text-[10px] text-foreground font-medium w-12 shrink-0 text-right">{formatNumber(item.value)}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// === Line Chart ===
function LineChart({ data, height, showLabels, showValues }: { data: ChartDataPoint[]; height: number; showLabels: boolean; showValues: boolean }) {
  const w = 400;
  const h = height;
  const pad = { top: 20, right: 20, bottom: 30, left: 40 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  const maxVal = Math.max(...data.map((d) => d.value)) * 1.15 || 1;
  const minVal = Math.min(...data.map((d) => d.value)) * 0.85;
  const range = maxVal - minVal || 1;

  const points = data.map((d, i) => ({
    x: pad.left + (i / Math.max(data.length - 1, 1)) * plotW,
    y: pad.top + plotH - ((d.value - minVal) / range) * plotH,
    ...d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: `${height}px` }}>
      {/* Grid */}
      {Array.from({ length: 5 }).map((_, i) => {
        const y = pad.top + (plotH / 4) * i;
        return <line key={i} x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke="rgba(255,255,255,0.05)" />;
      })}

      {/* Line */}
      <path d={linePath} fill="none" stroke="var(--color-module-erp, #3B82F6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Points */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="4" fill="var(--color-module-erp, #3B82F6)" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
          {showValues && <text x={p.x} y={p.y - 8} textAnchor="middle" className="fill-foreground" style={{ fontSize: '8px' }}>{formatNumber(p.value)}</text>}
        </g>
      ))}

      {/* X Labels */}
      {showLabels && points.filter((_, i) => i % Math.ceil(data.length / 8) === 0 || i === data.length - 1).map((p) => (
        <text key={p.label} x={p.x} y={h - 5} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>
          {p.label.length > 6 ? p.label.slice(0, 6) + '…' : p.label}
        </text>
      ))}
    </svg>
  );
}

// === Area Chart ===
function AreaChart({ data, height, showLabels, showValues }: { data: ChartDataPoint[]; height: number; showLabels: boolean; showValues: boolean }) {
  const w = 400;
  const h = height;
  const pad = { top: 20, right: 20, bottom: 30, left: 40 };
  const plotW = w - pad.left - pad.right;
  const plotH = h - pad.top - pad.bottom;

  const maxVal = Math.max(...data.map((d) => d.value)) * 1.15 || 1;
  const minVal = 0;
  const range = maxVal - minVal || 1;

  const points = data.map((d, i) => ({
    x: pad.left + (i / Math.max(data.length - 1, 1)) * plotW,
    y: pad.top + plotH - ((d.value - minVal) / range) * plotH,
    ...d,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${pad.top + plotH} L ${points[0].x} ${pad.top + plotH} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ maxHeight: `${height}px` }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-module-erp, #3B82F6)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-module-erp, #3B82F6)" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Grid */}
      {Array.from({ length: 5 }).map((_, i) => {
        const y = pad.top + (plotH / 4) * i;
        return <line key={i} x1={pad.left} y1={y} x2={w - pad.right} y2={y} stroke="rgba(255,255,255,0.05)" />;
      })}

      {/* Area */}
      <path d={areaPath} fill="url(#areaGrad)" />

      {/* Line */}
      <path d={linePath} fill="none" stroke="var(--color-module-erp, #3B82F6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Points */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3" fill="var(--color-module-erp, #3B82F6)" />
          {showValues && <text x={p.x} y={p.y - 8} textAnchor="middle" className="fill-foreground" style={{ fontSize: '8px' }}>{formatNumber(p.value)}</text>}
        </g>
      ))}

      {/* X Labels */}
      {showLabels && points.filter((_, i) => i % Math.ceil(data.length / 8) === 0 || i === data.length - 1).map((p) => (
        <text key={p.label} x={p.x} y={h - 5} textAnchor="middle" className="fill-muted-foreground" style={{ fontSize: '8px' }}>
          {p.label.length > 6 ? p.label.slice(0, 6) + '…' : p.label}
        </text>
      ))}
    </svg>
  );
}

// === Pie Chart ===
function PieChart({ data, showValues }: { data: ChartDataPoint[]; showValues: boolean }) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const r = 70;

  const slices = data.reduce<Array<{
    label: string;
    value: number;
    color: string;
    pct: string;
    path: string;
  }>>((acc, item, i) => {
    const cumulativeAngle = acc.reduce((sum, _, j) => sum + (data[j].value / total) * 360, 0);
    const angle = (item.value / total) * 360;
    const startAngle = -90 + cumulativeAngle;
    const endAngle = startAngle + angle;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + r * Math.cos(startRad);
    const y1 = cy + r * Math.sin(startRad);
    const x2 = cx + r * Math.cos(endRad);
    const y2 = cy + r * Math.sin(endRad);

    const largeArcFlag = angle > 180 ? 1 : 0;

    const path = angle >= 360
      ? `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`
      : `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

    acc.push({
      label: item.label,
      value: item.value,
      color: item.color || DEFAULT_COLORS[i % DEFAULT_COLORS.length],
      pct: ((item.value / total) * 100).toFixed(1),
      path,
    });
    return acc;
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <svg viewBox={`0 0 ${size} ${size}`} className="w-40 h-40 shrink-0">
        {slices.map((slice, i) => (
          <path key={i} d={slice.path} fill={slice.color} opacity="0.75" stroke="rgba(0,0,0,0.1)" strokeWidth="1" />
        ))}
        {/* Center hole (donut) */}
        <circle cx={cx} cy={cy} r={r * 0.55} fill="var(--glass-bg, rgba(0,0,0,0.3))" />
      </svg>

      {/* Legend */}
      <div className="space-y-1.5 flex-1">
        {slices.map((slice, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: slice.color }} />
            <span className="text-[10px] text-foreground truncate flex-1">{slice.label}</span>
            {showValues && (
              <>
                <span className="text-[10px] text-muted-foreground">{slice.pct}%</span>
                <span className="text-[10px] text-foreground font-medium">{formatNumber(slice.value)}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// === Helpers ===
function NoData() {
  return (
    <div className="flex items-center justify-center h-32 text-xs text-muted-foreground">
      No data to display
    </div>
  );
}

function formatNumber(value: number): string {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
  return value.toFixed(value % 1 === 0 ? 0 : 1);
}
