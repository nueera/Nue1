export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  PROFILE: '/auth/profile',

  // Employees
  EMPLOYEES: '/employees',
  EMPLOYEE_DETAIL: (id: string) => `/employees/${id}`,

  // Attendance
  ATTENDANCE_DAILY: '/attendance/daily',
  ATTENDANCE_MONTHLY: '/attendance/monthly',
  ATTENDANCE_SUMMARY: '/attendance/summary',

  // Leaves
  LEAVES: '/leaves',
  LEAVE_BALANCES: (userId: string) => `/leaves/balances/${userId}`,
  LEAVE_APPROVE: (id: string) => `/leaves/${id}/approve`,
  LEAVE_REJECT: (id: string) => `/leaves/${id}/reject`,
  HOLIDAYS: '/holidays',

  // Payroll
  PAYROLL: '/payroll',
  PAYROLL_RUNS: '/payroll/runs',
  PAYSLIP: (id: string) => `/payroll/payslip/${id}`,
  SALARY_STRUCTURES: '/payroll/structures',

  // Performance
  PERFORMANCE_CYCLES: '/performance/cycles',
  PERFORMANCE_GOALS: (userId: string) => `/performance/goals/${userId}`,

  // Onboarding
  ONBOARDING_TEMPLATES: '/onboarding/templates',
  ONBOARDING_NEW_HIRES: '/onboarding/new-hires',
  ONBOARDING_DETAIL: (id: string) => `/onboarding/${id}`,

  // Dashboard
  DASHBOARD_STATS: '/dashboard/stats',
  DASHBOARD_ACTIVITY: '/dashboard/activity',

  // Departments & Designations
  DEPARTMENTS: '/departments',
  DESIGNATIONS: '/designations',

  // Settings
  SETTINGS: '/settings',

  // Shifts
  SHIFTS: '/shifts',
  SHIFT_TYPES: '/shifts/types',
  SHIFT_REQUESTS: '/shifts/requests',
  SHIFT_ASSIGNMENTS: '/shifts/assignments',

  // Expenses
  EXPENSES: '/expenses',
  EXPENSE_CLAIMS: '/expenses/claims',
  EXPENSE_CATEGORIES: '/expenses/categories',
  EMPLOYEE_ADVANCES: '/expenses/advances',
  TRAVEL_REQUESTS: '/expenses/travel',

  // Recruitment
  RECRUITMENT: '/recruitment',
  JOB_OPENINGS: '/recruitment/openings',
  CANDIDATES: '/recruitment/candidates',
  REFERRALS: '/recruitment/referrals',

  // Loans
  LOANS: '/loans',
  LOAN_TYPES: '/loans/types',
  LOAN_APPLICATIONS: '/loans/applications',
  LOAN_REPAYMENT: (id: string) => `/loans/${id}/repayment`,

  // Training
  TRAINING: '/training',
  TRAINING_PROGRAMS: '/training/programs',
  TRAINING_ENROLLMENTS: '/training/enrollments',
  TRAINING_FEEDBACK: '/training/feedback',

  // HRM Reports
  HRM_REPORTS: '/hrm-reports',
  HRM_REPORT_DATA: (id: string) => `/hrm-reports/${id}`,
  HRM_REPORT_SCHEDULE: '/hrm-reports/schedule',
} as const;
