'use client';

import type { Review, Goal } from '../types';
import { RATING_SCALE } from '../constants';
import { calcAvgRating, getRatingColor } from '../performance.utils';
import { ChartCard } from '../../../../shared/components/chart-card/chart-card';
import { StatChart } from '../../../../shared/components/stat-chart/stat-chart';
import { StatCard } from '../../../../design-system/components/card/stat-card';
import { BarChart3, Trophy, AlertTriangle, Users } from 'lucide-react';

interface PerformanceReportProps {
  reviews: Review[];
  goals: Goal[];
  employees: Array<{ id: string; name: string; department: string }>;
  isLoading?: boolean;
}

export function PerformanceReport({ reviews, goals, employees, isLoading }: PerformanceReportProps) {
  const completedReviews = reviews.filter((r) => r.status === 'completed');

  // Top performers: employees with highest average rating
  const employeeRatings: Record<string, number[]> = {};
  completedReviews.forEach((r) => {
    if (!employeeRatings[r.employeeId]) employeeRatings[r.employeeId] = [];
    employeeRatings[r.employeeId].push(r.rating);
  });

  const avgRatings = Object.entries(employeeRatings)
    .map(([id, ratings]) => ({
      id,
      name: employees.find((e) => e.id === id)?.name ?? id,
      department: employees.find((e) => e.id === id)?.department ?? '',
      avgRating: calcAvgRating(ratings),
      reviewCount: ratings.length,
    }))
    .sort((a, b) => b.avgRating - a.avgRating);

  const topPerformers = avgRatings.slice(0, 5);
  const improvementAreas = avgRatings.filter((e) => e.avgRating < 3).slice(0, 5);

  // Rating distribution
  const ratingDistribution = Array.from({ length: 5 }).map((_, i) => ({
    name: `${i + 1} — ${RATING_SCALE.labels[i]}`,
    count: completedReviews.filter((r) => Math.round(r.rating) === i + 1).length,
  }));

  // Team comparison (by department)
  const deptRatings: Record<string, number[]> = {};
  avgRatings.forEach((e) => {
    if (!deptRatings[e.department]) deptRatings[e.department] = [];
    deptRatings[e.department].push(e.avgRating);
  });
  const teamComparison = Object.entries(deptRatings).map(([dept, ratings]) => ({
    name: dept,
    avg: Math.round(calcAvgRating(ratings) * 10) / 10,
  }));

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse">
              <div className="h-4 bg-white/10 rounded w-1/3 mb-4" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-8 bg-white/10 rounded" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={BarChart3}
          label="Overall Avg Rating"
          value={completedReviews.length > 0 ? calcAvgRating(completedReviews.map((r) => r.rating)).toFixed(1) : 'N/A'}
          change="out of 5.0"
        />
        <StatCard
          icon={Trophy}
          label="Top Performers"
          value={topPerformers.length}
          change="rated 4+ overall"
        />
        <StatCard
          icon={AlertTriangle}
          label="Needs Improvement"
          value={improvementAreas.length}
          change="rated below 3"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Rating Distribution" subtitle="Number of employees per rating band">
          <StatChart data={ratingDistribution} dataKey="count" xKey="name" color="#f59e0b" height={200} />
        </ChartCard>
        <ChartCard title="Team Comparison" subtitle="Average rating by department">
          <StatChart data={teamComparison} dataKey="avg" xKey="name" color="#10b981" height={200} />
        </ChartCard>
      </div>

      {/* Top Performers */}
      {topPerformers.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="h-5 w-5 text-amber-400" strokeWidth={1.8} />
            <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-base)' }}>Top Performers</h3>
          </div>
          <div className="space-y-2">
            {topPerformers.map((emp, i) => (
              <div key={emp.id} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors duration-200">
                <span className="text-sm font-bold text-module-erp w-6">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{emp.name}</p>
                  <p className="text-xs text-muted-foreground">{emp.department}</p>
                </div>
                <span className={`text-sm font-semibold ${getRatingColor(emp.avgRating)}`}>
                  {emp.avgRating.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">{emp.reviewCount} reviews</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Improvement Areas */}
      {improvementAreas.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-500" strokeWidth={1.8} />
            <h3 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-base)' }}>Areas for Improvement</h3>
          </div>
          <div className="space-y-2">
            {improvementAreas.map((emp) => (
              <div key={emp.id} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors duration-200">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{emp.name}</p>
                  <p className="text-xs text-muted-foreground">{emp.department}</p>
                </div>
                <span className={`text-sm font-semibold ${getRatingColor(emp.avgRating)}`}>
                  {emp.avgRating.toFixed(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
