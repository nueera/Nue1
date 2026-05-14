// @ts-nocheck
// ============================================================================
// Budget Utils — Calculate budget utilization, ROI, ROAS, status
// ============================================================================

export interface BudgetInfo {
  allocated: number;
  spent: number;
  remaining: number;
  currency: string;
}

type BudgetStatus = 'under_budget' | 'on_track' | 'over_budget' | 'exhausted';

const BUDGET_STATUS_COLORS: Record<BudgetStatus, string> = {
  under_budget: 'text-green-600',
  on_track: 'text-blue-600',
  over_budget: 'text-amber-600',
  exhausted: 'text-red-600',
};

const BUDGET_STATUS_BG_COLORS: Record<BudgetStatus, string> = {
  under_budget: 'bg-green-100',
  on_track: 'bg-blue-100',
  over_budget: 'bg-amber-100',
  exhausted: 'bg-red-100',
};

export function calculateBudgetUtilization(budget: BudgetInfo): number {
  if (budget.allocated === 0) return 0;
  return Math.round((budget.spent / budget.allocated) * 100);
}

export function calculateROI(revenue: number, spend: number): number {
  if (spend === 0) return 0;
  return Math.round(((revenue - spend) / spend) * 100);
}

export function calculateROAS(revenue: number, spend: number): number {
  if (spend === 0) return 0;
  return Math.round((revenue / spend) * 100) / 100;
}

export function getBudgetStatus(budget: BudgetInfo): BudgetStatus {
  const utilization = calculateBudgetUtilization(budget);

  if (budget.allocated === 0 && budget.spent === 0) return 'under_budget';
  if (utilization >= 100) return 'exhausted';
  if (utilization >= 90) return 'over_budget';
  if (utilization >= 60) return 'on_track';
  return 'under_budget';
}

export function getBudgetStatusColor(status: BudgetStatus): string {
  return BUDGET_STATUS_COLORS[status];
}

export function getBudgetStatusBgColor(status: BudgetStatus): string {
  return BUDGET_STATUS_BG_COLORS[status];
}

export function getBudgetStatusLabel(status: BudgetStatus): string {
  const labels: Record<BudgetStatus, string> = {
    under_budget: 'Under Budget',
    on_track: 'On Track',
    over_budget: 'Over Budget',
    exhausted: 'Exhausted',
  };
  return labels[status];
}

export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
