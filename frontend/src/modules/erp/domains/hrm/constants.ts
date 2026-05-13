// ─────────────────────────────────────────────────────────────────────────────
// HRM Domain Constants – status colors, labels, and tab configs for all
// 12 sub-modules: employees, attendance, leaves, payroll, performance,
// onboarding, shifts, expenses, recruitment, loans, training, reports
// ─────────────────────────────────────────────────────────────────────────────

// ═══════════════════════════════════════════════════════════════════════════════
// EMPLOYEES
// ═══════════════════════════════════════════════════════════════════════════════

export const EMPLOYEE_STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  inactive: 'Inactive',
  'on-leave': 'On Leave',
  onboarding: 'Onboarding',
  notice: 'Notice Period',
  terminated: 'Terminated',
};

export const EMPLOYEE_STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  'on-leave': 'bg-amber-100 text-amber-800',
  onboarding: 'bg-sky-100 text-sky-800',
  notice: 'bg-orange-100 text-orange-800',
  terminated: 'bg-red-100 text-red-800',
};

export const EMPLOYMENT_TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full Time',
  'part-time': 'Part Time',
  contract: 'Contract',
  intern: 'Intern',
};

export const EMPLOYMENT_TYPE_COLORS: Record<string, string> = {
  'full-time': 'bg-green-100 text-green-800',
  'part-time': 'bg-blue-100 text-blue-800',
  contract: 'bg-purple-100 text-purple-800',
  intern: 'bg-teal-100 text-teal-800',
};

export const EMPLOYEE_TABS = [
  { value: 'personal', label: 'Personal' },
  { value: 'job', label: 'Job' },
  { value: 'documents', label: 'Documents' },
  { value: 'compensation', label: 'Compensation' },
  { value: 'timeline', label: 'Timeline' },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// ATTENDANCE
// ═══════════════════════════════════════════════════════════════════════════════

export const ATTENDANCE_STATUS_LABELS: Record<string, string> = {
  present: 'Present',
  absent: 'Absent',
  late: 'Late',
  'half-day': 'Half Day',
};

export const ATTENDANCE_STATUS_COLORS: Record<string, string> = {
  present: 'bg-green-100 text-green-800',
  absent: 'bg-red-100 text-red-800',
  late: 'bg-amber-100 text-amber-800',
  'half-day': 'bg-yellow-100 text-yellow-800',
};

export const ATTENDANCE_TABS = [
  { value: 'daily', label: 'Daily View' },
  { value: 'calendar', label: 'Calendar' },
  { value: 'summary', label: 'Summary' },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// LEAVES
// ═══════════════════════════════════════════════════════════════════════════════

export const LEAVE_TYPE_LABELS: Record<string, string> = {
  annual: 'Annual Leave',
  sick: 'Sick Leave',
  personal: 'Personal Leave',
  maternity: 'Maternity Leave',
  paternity: 'Paternity Leave',
  unpaid: 'Unpaid Leave',
};

export const LEAVE_TYPE_COLORS: Record<string, string> = {
  annual: 'bg-green-100 text-green-800',
  sick: 'bg-red-100 text-red-800',
  personal: 'bg-blue-100 text-blue-800',
  maternity: 'bg-purple-100 text-purple-800',
  paternity: 'bg-indigo-100 text-indigo-800',
  unpaid: 'bg-gray-100 text-gray-800',
};

export const LEAVE_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  cancelled: 'Cancelled',
};

export const LEAVE_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

export const LEAVE_TABS = [
  { value: 'requests', label: 'Requests' },
  { value: 'balances', label: 'Balances' },
  { value: 'calendar', label: 'Calendar' },
  { value: 'holidays', label: 'Holidays' },
  { value: 'policy', label: 'Policy' },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// PAYROLL
// ═══════════════════════════════════════════════════════════════════════════════

export const PAYROLL_STATUS_LABELS: Record<string, string> = {
  paid: 'Paid',
  pending: 'Pending',
  processing: 'Processing',
};

export const PAYROLL_STATUS_COLORS: Record<string, string> = {
  paid: 'bg-green-100 text-green-800',
  pending: 'bg-amber-100 text-amber-800',
  processing: 'bg-blue-100 text-blue-800',
};

export const PAYROLL_RUN_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  processing: 'Processing',
  completed: 'Completed',
  approved: 'Approved',
};

export const PAYROLL_RUN_STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  processing: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  approved: 'bg-emerald-100 text-emerald-800',
};

export const PAYROLL_TABS = [
  { value: 'records', label: 'Records' },
  { value: 'runs', label: 'Payroll Runs' },
  { value: 'structures', label: 'Salary Structures' },
  { value: 'settings', label: 'Settings' },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// PERFORMANCE
// ═══════════════════════════════════════════════════════════════════════════════

export const REVIEW_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  'in-progress': 'In Progress',
  completed: 'Completed',
};

export const REVIEW_STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

export const GOAL_STATUS_LABELS: Record<string, string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  completed: 'Completed',
  overdue: 'Overdue',
};

export const GOAL_STATUS_COLORS: Record<string, string> = {
  'not-started': 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800',
};

export const PERFORMANCE_TABS = [
  { value: 'cycles', label: 'Review Cycles' },
  { value: 'goals', label: 'Goals' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'skill-matrix', label: 'Skill Matrix' },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// ONBOARDING
// ═══════════════════════════════════════════════════════════════════════════════

export const ONBOARDING_STAGE_LABELS: Record<string, string> = {
  'pre-boarding': 'Pre-boarding',
  'day-one': 'Day One',
  'week-one': 'Week One',
  'month-one': 'Month One',
  completed: 'Completed',
};

export const ONBOARDING_STAGE_COLORS: Record<string, string> = {
  'pre-boarding': 'bg-purple-100 text-purple-800',
  'day-one': 'bg-blue-100 text-blue-800',
  'week-one': 'bg-sky-100 text-sky-800',
  'month-one': 'bg-teal-100 text-teal-800',
  completed: 'bg-green-100 text-green-800',
};

export const ONBOARDING_TABS = [
  { value: 'templates', label: 'Templates' },
  { value: 'new-hires', label: 'New Hires' },
  { value: 'checklist', label: 'Checklist' },
  { value: 'offboarding', label: 'Offboarding' },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SHIFTS
// ═══════════════════════════════════════════════════════════════════════════════

export const SHIFT_REQUEST_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
};

export const SHIFT_REQUEST_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export const SHIFT_COLORS: Record<string, string> = {
  General: '#22c55e',
  Morning: '#3b82f6',
  Evening: '#f59e0b',
  Night: '#8b5cf6',
};

export const ROTATION_FREQUENCY_LABELS: Record<string, string> = {
  weekly: 'Weekly',
  'bi-weekly': 'Bi-Weekly',
  monthly: 'Monthly',
};

export const SHIFT_TABS = [
  { value: 'types', label: 'Shift Types' },
  { value: 'requests', label: 'Shift Requests' },
  { value: 'assignments', label: 'Assignments' },
  { value: 'calendar', label: 'Calendar' },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// EXPENSES
// ═══════════════════════════════════════════════════════════════════════════════

export const EXPENSE_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  paid: 'Paid',
};

export const EXPENSE_STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  paid: 'bg-emerald-100 text-emerald-800',
};

export const ADVANCE_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  approved: 'Approved',
  disbursed: 'Disbursed',
  settled: 'Settled',
  rejected: 'Rejected',
};

export const ADVANCE_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-blue-100 text-blue-800',
  disbursed: 'bg-purple-100 text-purple-800',
  settled: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export const TRAVEL_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const TRAVEL_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-gray-100 text-gray-800',
};

export const EXPENSE_TABS = [
  { value: 'claims', label: 'Claims' },
  { value: 'advances', label: 'Advances' },
  { value: 'travel', label: 'Travel' },
  { value: 'categories', label: 'Categories' },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// RECRUITMENT
// ═══════════════════════════════════════════════════════════════════════════════

export const JOB_OPENING_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  open: 'Open',
  'on-hold': 'On Hold',
  closed: 'Closed',
  filled: 'Filled',
};

export const JOB_OPENING_STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  open: 'bg-green-100 text-green-800',
  'on-hold': 'bg-amber-100 text-amber-800',
  closed: 'bg-red-100 text-red-800',
  filled: 'bg-blue-100 text-blue-800',
};

export const APPLICATION_STAGE_LABELS: Record<string, string> = {
  applied: 'Applied',
  screening: 'Screening',
  'phone-screen': 'Phone Screen',
  technical: 'Technical',
  managerial: 'Managerial',
  'hr-round': 'HR Round',
  offer: 'Offer',
  hired: 'Hired',
  rejected: 'Rejected',
};

export const APPLICATION_STAGE_COLORS: Record<string, string> = {
  applied: 'bg-gray-100 text-gray-800',
  screening: 'bg-blue-100 text-blue-800',
  'phone-screen': 'bg-sky-100 text-sky-800',
  technical: 'bg-indigo-100 text-indigo-800',
  managerial: 'bg-purple-100 text-purple-800',
  'hr-round': 'bg-violet-100 text-violet-800',
  offer: 'bg-amber-100 text-amber-800',
  hired: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export const REFERRAL_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  contacted: 'Contacted',
  interviewed: 'Interviewed',
  hired: 'Hired',
  rejected: 'Rejected',
};

export const REFERRAL_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  contacted: 'bg-blue-100 text-blue-800',
  interviewed: 'bg-purple-100 text-purple-800',
  hired: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

export const RECRUITMENT_TABS = [
  { value: 'openings', label: 'Job Openings' },
  { value: 'candidates', label: 'Candidates' },
  { value: 'interviews', label: 'Interviews' },
  { value: 'referrals', label: 'Referrals' },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// LOANS
// ═══════════════════════════════════════════════════════════════════════════════

export const LOAN_APPLICATION_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  approved: 'Approved',
  disbursed: 'Disbursed',
  rejected: 'Rejected',
  closed: 'Closed',
  'in-repayment': 'In Repayment',
  defaulted: 'Defaulted',
};

export const LOAN_APPLICATION_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-amber-100 text-amber-800',
  approved: 'bg-blue-100 text-blue-800',
  disbursed: 'bg-purple-100 text-purple-800',
  rejected: 'bg-red-100 text-red-800',
  closed: 'bg-gray-100 text-gray-800',
  'in-repayment': 'bg-teal-100 text-teal-800',
  defaulted: 'bg-red-200 text-red-900',
};

export const LOAN_STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  completed: 'Completed',
  defaulted: 'Defaulted',
};

export const LOAN_STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
  defaulted: 'bg-red-100 text-red-800',
};

export const REPAYMENT_STATUS_LABELS: Record<string, string> = {
  paid: 'Paid',
  upcoming: 'Upcoming',
  overdue: 'Overdue',
};

export const REPAYMENT_STATUS_COLORS: Record<string, string> = {
  paid: 'bg-green-100 text-green-800',
  upcoming: 'bg-blue-100 text-blue-800',
  overdue: 'bg-red-100 text-red-800',
};

export const REPAYMENT_FREQUENCY_LABELS: Record<string, string> = {
  monthly: 'Monthly',
  quarterly: 'Quarterly',
  'semi-annual': 'Semi-Annual',
};

export const LOAN_TABS = [
  { value: 'applications', label: 'Applications' },
  { value: 'types', label: 'Loan Types' },
  { value: 'active', label: 'Active Loans' },
  { value: 'repayment', label: 'Repayment' },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// TRAINING
// ═══════════════════════════════════════════════════════════════════════════════

export const TRAINING_PROGRAM_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  upcoming: 'Upcoming',
  'in-progress': 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const TRAINING_PROGRAM_STATUS_COLORS: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-800',
  upcoming: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-amber-100 text-amber-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export const ENROLLMENT_STATUS_LABELS: Record<string, string> = {
  enrolled: 'Enrolled',
  'in-progress': 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  'no-show': 'No Show',
  waitlisted: 'Waitlisted',
  dropped: 'Dropped',
};

export const ENROLLMENT_STATUS_COLORS: Record<string, string> = {
  enrolled: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-amber-100 text-amber-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-gray-100 text-gray-800',
  'no-show': 'bg-red-100 text-red-800',
  waitlisted: 'bg-purple-100 text-purple-800',
  dropped: 'bg-orange-100 text-orange-800',
};

export const CERTIFICATE_STATUS_LABELS: Record<string, string> = {
  active: 'Active',
  expired: 'Expired',
  expiring: 'Expiring Soon',
};

export const CERTIFICATE_STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-100 text-green-800',
  expired: 'bg-red-100 text-red-800',
  expiring: 'bg-amber-100 text-amber-800',
};

export const TRAINING_DELIVERY_MODE_LABELS: Record<string, string> = {
  classroom: 'Classroom',
  online: 'Online',
  hybrid: 'Hybrid',
  'self-paced': 'Self-Paced',
};

export const TRAINING_TABS = [
  { value: 'programs', label: 'Programs' },
  { value: 'enrollments', label: 'Enrollments' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'certificates', label: 'Certificates' },
  { value: 'calendar', label: 'Calendar' },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// REPORTS
// ═══════════════════════════════════════════════════════════════════════════════

export const REPORT_CATEGORY_LABELS: Record<string, string> = {
  Workforce: 'Workforce',
  Leave: 'Leave',
  Attendance: 'Attendance',
  Finance: 'Finance',
  Performance: 'Performance',
  Recruitment: 'Recruitment',
  Training: 'Training',
  Expense: 'Expense',
  Custom: 'Custom',
};

export const REPORT_CATEGORY_COLORS: Record<string, string> = {
  Workforce: 'bg-blue-100 text-blue-800',
  Leave: 'bg-green-100 text-green-800',
  Attendance: 'bg-amber-100 text-amber-800',
  Finance: 'bg-purple-100 text-purple-800',
  Performance: 'bg-teal-100 text-teal-800',
  Recruitment: 'bg-pink-100 text-pink-800',
  Training: 'bg-indigo-100 text-indigo-800',
  Expense: 'bg-orange-100 text-orange-800',
  Custom: 'bg-gray-100 text-gray-800',
};

export const REPORT_CHART_TYPE_LABELS: Record<string, string> = {
  bar: 'Bar Chart',
  line: 'Line Chart',
  pie: 'Pie Chart',
  table: 'Table',
  area: 'Area Chart',
  mixed: 'Mixed',
};

export const SCHEDULE_FREQUENCY_LABELS: Record<string, string> = {
  daily: 'Daily',
  weekly: 'Weekly',
  monthly: 'Monthly',
  quarterly: 'Quarterly',
};

export const REPORT_TABS = [
  { value: 'home', label: 'Reports Home' },
  { value: 'custom', label: 'Custom Reports' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'builder', label: 'Report Builder' },
] as const;

// ═══════════════════════════════════════════════════════════════════════════════
// SHARED / CROSS-CUTTING
// ═══════════════════════════════════════════════════════════════════════════════

export const HOLIDAY_TYPE_LABELS: Record<string, string> = {
  public: 'Public Holiday',
  company: 'Company Holiday',
  optional: 'Optional Holiday',
};

export const HOLIDAY_TYPE_COLORS: Record<string, string> = {
  public: 'bg-red-100 text-red-800',
  company: 'bg-blue-100 text-blue-800',
  optional: 'bg-amber-100 text-amber-800',
};

/** Top-level HRM navigation tabs (maps to the 12 sub-modules) */
export const HRM_MODULE_TABS = [
  { value: 'dashboard', label: 'Dashboard' },
  { value: 'employees', label: 'Employees' },
  { value: 'attendance', label: 'Attendance' },
  { value: 'leaves', label: 'Leaves' },
  { value: 'payroll', label: 'Payroll' },
  { value: 'performance', label: 'Performance' },
  { value: 'onboarding', label: 'Onboarding' },
  { value: 'shifts', label: 'Shifts' },
  { value: 'expenses', label: 'Expenses' },
  { value: 'recruitment', label: 'Recruitment' },
  { value: 'loans', label: 'Loans' },
  { value: 'training', label: 'Training' },
  { value: 'reports', label: 'Reports' },
] as const;
