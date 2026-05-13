'use client';

import type { ReviewCycle, Review, Goal } from '../types';
import { REVIEW_STATUS_LABELS } from '../constants';
import { calcAvgRating } from '../performance.utils';
import { StatCard } from '../../../../design-system/components/card/stat-card';
import { ChartCard } from '../../../../shared/components/chart-card/chart-card';
import { StatChart } from '../../../../shared/components/stat-chart/stat-chart';
import { ClipboardCheck, Users, Star, Clock, TrendingUp, AlertCircle } from 'lucide-react';

interface ReviewDashboardProps {
  cycles: ReviewCycle[];
  reviews: Review[];
  goals: Goal[];
  isLoading?: boolean;
}

export function ReviewDashboard({ cycles, reviews, goals, isLoading }: ReviewDashboardProps) {
  const activeCycle = cycles.find((c) => c.status === 'in-progress');
  const completedReviews = reviews.filter((r) => r.status === 'completed');
  const pendingReviews = reviews.filter((r) => r.status !== 'completed');
  const avgRating = completedReviews.length > 0 ? calcAvgRating(completedReviews.map((r) => r.rating)) : 0;
  const completedGoals = goals.filter((g) => g.status === 'completed').length;
  const overdueGoals = goals.filter((g) => g.status === 'overdue').length;

  // Chart data: ratings distribution
  const ratingDistribution = Array.from({ length: 5 }).map((_, i) => ({
    name: `${i + 1}`,
    count: completedReviews.filter((r) => Math.round(r.rating) === i + 1).length,
  }));

  // Chart data: reviews over time (mock weeks)
  const reviewTrend = ['W1', 'W2', 'W3', 'W4'].map((w, i) => ({
    name: w,
    reviews: Math.min(completedReviews.length, (i + 1) * Math.ceil(completedReviews.length / 4)),
  }));

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 animate-pulse">
              <div className="h-4 bg-white/10 rounded w-1/2 mb-3" />
              <div className="h-8 bg-white/10 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Cycle Banner */}
      {activeCycle && (
        <div className="bg-module-erp/5 backdrop-blur-xl border border-module-erp/20 rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-module-erp font-medium mb-1">Active Cycle</p>
              <h3 className="font-bold text-foreground" style={{ fontSize: 'var(--text-lg)' }}>{activeCycle.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {activeCycle.startDate} — {activeCycle.endDate} · {activeCycle.reviewers.length} reviewers
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-module-erp/10 text-module-erp">
              <Clock className="h-4 w-4" strokeWidth={1.8} />
              <span className="text-sm font-medium">In Progress</span>
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={ClipboardCheck}
          label="Total Reviews"
          value={reviews.length}
          change={`${completedReviews.length} completed`}
        />
        <StatCard
          icon={AlertCircle}
          label="Pending Reviews"
          value={pendingReviews.length}
          change={pendingReviews.length > 0 ? 'Requires attention' : 'All done'}
        />
        <StatCard
          icon={Star}
          label="Average Rating"
          value={avgRating.toFixed(1)}
          change={`out of 5.0`}
        />
        <StatCard
          icon={TrendingUp}
          label="Goals Completed"
          value={`${completedGoals}/${goals.length}`}
          change={overdueGoals > 0 ? `${overdueGoals} overdue` : 'On track'}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Rating Distribution" subtitle="Number of reviews per rating">
          <StatChart data={ratingDistribution} dataKey="count" xKey="name" color="#f59e0b" height={180} />
        </ChartCard>
        <ChartCard title="Review Completion Trend" subtitle="Reviews submitted over time">
          <StatChart data={reviewTrend} dataKey="reviews" xKey="name" height={180} />
        </ChartCard>
      </div>

      {/* Cycle Summary */}
      {cycles.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <h3 className="font-semibold text-foreground mb-4" style={{ fontSize: 'var(--text-base)' }}>All Cycles</h3>
          <div className="space-y-2">
            {cycles.map((cycle) => {
              const cycleReviews = reviews.filter((r) => r.cycleId === cycle.id);
              const cycleCompleted = cycleReviews.filter((r) => r.status === 'completed').length;
              const completionRate = cycleReviews.length > 0 ? Math.round((cycleCompleted / cycleReviews.length) * 100) : 0;

              return (
                <div key={cycle.id} className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors duration-200">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{cycle.name}</p>
                    <p className="text-xs text-muted-foreground">{cycle.startDate} — {cycle.endDate}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full rounded-full bg-module-erp transition-all duration-500" style={{ width: `${completionRate}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-10 text-right">{completionRate}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
