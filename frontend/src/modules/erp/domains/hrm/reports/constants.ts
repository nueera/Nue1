export const REPORT_CATEGORIES = [
  'Employee',
  'Attendance',
  'Leave',
  'Payroll',
  'Performance',
  'Recruitment',
  'Training',
  'Expense',
  'Shift',
  'Loan',
] as const;

export const REPORT_CATEGORY_LABELS: Record<string, string> = {
  Employee: 'Employee Reports',
  Attendance: 'Attendance Reports',
  Leave: 'Leave Reports',
  Payroll: 'Payroll Reports',
  Performance: 'Performance Reports',
  Recruitment: 'Recruitment Reports',
  Training: 'Training Reports',
  Expense: 'Expense Reports',
  Shift: 'Shift Reports',
  Loan: 'Loan Reports',
};

export const SCHEDULE_FREQUENCIES = ['daily', 'weekly', 'monthly', 'quarterly'] as const;

export const SCHEDULE_FREQUENCY_LABELS: Record<string, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
};

export const REPORT_FORMATS = ['pdf', 'xlsx', 'csv'] as const;

export const CHART_TYPES = ['bar', 'line', 'pie', 'table', 'metric'] as const;

export const BUILTIN_REPORTS = [
  { id: 'headcount', name: 'Employee Headcount', category: 'Employee' },
  { id: 'turnover', name: 'Employee Turnover', category: 'Employee' },
  { id: 'attendance-summary', name: 'Attendance Summary', category: 'Attendance' },
  { id: 'leave-balance', name: 'Leave Balance Report', category: 'Leave' },
  { id: 'payroll-register', name: 'Payroll Register', category: 'Payroll' },
  { id: 'performance-review', name: 'Performance Review Summary', category: 'Performance' },
  { id: 'hiring-funnel', name: 'Hiring Funnel', category: 'Recruitment' },
  { id: 'training-completion', name: 'Training Completion', category: 'Training' },
  { id: 'expense-summary', name: 'Expense Summary', category: 'Expense' },
] as const;
