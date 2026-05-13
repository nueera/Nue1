import type { Role } from '../types';

export type Permission =
  | 'employees.view'
  | 'employees.create'
  | 'employees.edit'
  | 'employees.delete'
  | 'attendance.view'
  | 'attendance.manage'
  | 'leaves.view'
  | 'leaves.apply'
  | 'leaves.approve'
  | 'payroll.view'
  | 'payroll.process'
  | 'payroll.approve'
  | 'performance.view'
  | 'performance.manage'
  | 'onboarding.view'
  | 'onboarding.manage'
  | 'shifts.view'
  | 'shifts.manage'
  | 'expenses.view'
  | 'expenses.create'
  | 'expenses.approve'
  | 'recruitment.view'
  | 'recruitment.manage'
  | 'loans.view'
  | 'loans.apply'
  | 'loans.approve'
  | 'training.view'
  | 'training.manage'
  | 'reports.view'
  | 'reports.manage'
  | 'settings.manage';

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    'employees.view', 'employees.create', 'employees.edit', 'employees.delete',
    'attendance.view', 'attendance.manage',
    'leaves.view', 'leaves.apply', 'leaves.approve',
    'payroll.view', 'payroll.process', 'payroll.approve',
    'performance.view', 'performance.manage',
    'onboarding.view', 'onboarding.manage',
    'shifts.view', 'shifts.manage',
    'expenses.view', 'expenses.create', 'expenses.approve',
    'recruitment.view', 'recruitment.manage',
    'loans.view', 'loans.apply', 'loans.approve',
    'training.view', 'training.manage',
    'reports.view', 'reports.manage',
    'settings.manage',
  ],
  manager: [
    'employees.view', 'employees.create', 'employees.edit',
    'attendance.view',
    'leaves.view', 'leaves.apply', 'leaves.approve',
    'payroll.view',
    'performance.view', 'performance.manage',
    'onboarding.view',
    'shifts.view', 'shifts.manage',
    'expenses.view', 'expenses.create', 'expenses.approve',
    'recruitment.view', 'recruitment.manage',
    'loans.view', 'loans.apply',
    'training.view',
    'reports.view',
  ],
  hr: [
    'employees.view', 'employees.create', 'employees.edit', 'employees.delete',
    'attendance.view', 'attendance.manage',
    'leaves.view', 'leaves.apply', 'leaves.approve',
    'payroll.view', 'payroll.process',
    'performance.view', 'performance.manage',
    'onboarding.view', 'onboarding.manage',
    'shifts.view', 'shifts.manage',
    'expenses.view', 'expenses.create', 'expenses.approve',
    'recruitment.view', 'recruitment.manage',
    'loans.view', 'loans.apply', 'loans.approve',
    'training.view', 'training.manage',
    'reports.view', 'reports.manage',
    'settings.manage',
  ],
  employee: [
    'employees.view',
    'attendance.view',
    'leaves.view', 'leaves.apply',
    'payroll.view',
    'performance.view',
    'shifts.view',
    'expenses.view', 'expenses.create',
    'loans.view', 'loans.apply',
    'training.view',
    'reports.view',
  ],
};

export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function getPermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}
