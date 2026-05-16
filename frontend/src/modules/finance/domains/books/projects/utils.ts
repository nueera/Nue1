// ============================================================================
// Projects — Utils
// ============================================================================

import type { Project, ProjectStatus } from './types';
import { PROJECT_STATUSES } from './constants';

export function getProjectStatusLabel(status: ProjectStatus): string {
  return PROJECT_STATUSES.find(s => s.value === status)?.label ?? status;
}

export function getProjectStatusColor(status: ProjectStatus): string {
  const map: Record<ProjectStatus, string> = {
    'not-started': 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800/50 dark:text-gray-300 dark:border-gray-600',
    'in-progress': 'bg-sky-100 text-sky-800 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800',
    'on-hold': 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800',
    completed: 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800',
    cancelled: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
  };
  return map[status] ?? '';
}

export function getProjectProfitMargin(project: Project): number {
  if (project.budget.amount === 0) return 0;
  return (project.profit.amount / project.budget.amount) * 100;
}

export function isProjectOverBudget(project: Project): boolean {
  return project.cost.amount > project.budget.amount;
}
