export const ROUTES = {
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',

  // ERP
  DASHBOARD: '/erp/dashboard',
  
  // HRM
  EMPLOYEES: '/erp/hrm/employees',
  EMPLOYEE_NEW: '/erp/hrm/employees/new',
  EMPLOYEE_DETAIL: (id: string) => `/erp/hrm/employees/${id}`,
  ATTENDANCE: '/erp/hrm/attendance',
  ATTENDANCE_DETAIL: (id: string) => `/erp/hrm/attendance/${id}`,
  LEAVES: '/erp/hrm/leaves',
  LEAVE_APPLY: '/erp/hrm/leaves/apply',
  LEAVE_BALANCE: '/erp/hrm/leaves/balance',
  PAYROLL: '/erp/hrm/payroll',
  PAYROLL_RUN: '/erp/hrm/payroll/run',
  PAYSLIP_DETAIL: (id: string) => `/erp/hrm/payroll/${id}`,
  PERFORMANCE: '/erp/hrm/performance',
  PERFORMANCE_DETAIL: (id: string) => `/erp/hrm/performance/${id}`,
  ONBOARDING: '/erp/hrm/onboarding',
  ONBOARDING_DETAIL: (id: string) => `/erp/hrm/onboarding/${id}`,

  // Shifts
  SHIFTS: '/erp/hrm/shifts',
  SHIFT_TYPES: '/erp/hrm/shifts/types',
  SHIFT_REQUESTS: '/erp/hrm/shifts/requests',
  SHIFT_ASSIGNMENTS: '/erp/hrm/shifts/assignments',

  // Expenses
  EXPENSES: '/erp/hrm/expenses',
  EXPENSE_CLAIMS: '/erp/hrm/expenses/claims',
  EMPLOYEE_ADVANCES: '/erp/hrm/expenses/advances',
  TRAVEL_REQUESTS: '/erp/hrm/expenses/travel',

  // Recruitment
  RECRUITMENT: '/erp/hrm/recruitment',
  RECRUITMENT_REFERRALS: '/erp/hrm/recruitment/referrals',
  RECRUITMENT_DETAIL: (id: string) => `/erp/hrm/recruitment/${id}`,

  // Loans
  LOANS: '/erp/hrm/loans',
  LOAN_APPLICATIONS: '/erp/hrm/loans/applications',
  LOAN_TYPES: '/erp/hrm/loans/types',

  // Training
  TRAINING: '/erp/hrm/training',
  TRAINING_DETAIL: (id: string) => `/erp/hrm/training/${id}`,

  // HRM Reports
  HRM_REPORTS: '/erp/hrm/reports',
  HRM_REPORTS_ANALYTICS: '/erp/hrm/reports/analytics',
  HRM_REPORTS_LEAVE_BALANCE: '/erp/hrm/reports/leave-balance',
  HRM_REPORTS_LEAVE_SUMMARY: '/erp/hrm/reports/leave-summary',
  HRM_REPORTS_ADVANCE_SUMMARY: '/erp/hrm/reports/advance-summary',
  HRM_REPORTS_BIRTHDAYS: '/erp/hrm/reports/birthdays',
  HRM_REPORTS_DAILY_WORK_SUMMARY: '/erp/hrm/reports/daily-work-summary',
  HRM_REPORTS_CUSTOM: '/erp/hrm/reports/custom',

  // ── Operations (ERP) ─────────────────────────────────────────────────
  OPERATIONS_DASHBOARD: '/erp/operations/dashboard',
  PRODUCTS: '/erp/operations/products',
  PRODUCT_DETAIL: (id: string) => `/erp/operations/products/${id}`,
  CATEGORIES: '/erp/operations/categories',
  SUPPLIERS: '/erp/operations/suppliers',
  SUPPLIER_DETAIL: (id: string) => `/erp/operations/suppliers/${id}`,
  WAREHOUSES: '/erp/operations/warehouses',
  WAREHOUSE_DETAIL: (id: string) => `/erp/operations/warehouses/${id}`,
  INVENTORY: '/erp/operations/inventory',
  PURCHASE_ORDERS: '/erp/operations/purchase-orders',
  PURCHASE_ORDER_DETAIL: (id: string) => `/erp/operations/purchase-orders/${id}`,
  SALES_ORDERS: '/erp/operations/sales-orders',
  SALES_ORDER_DETAIL: (id: string) => `/erp/operations/sales-orders/${id}`,

  // Other modules (legacy)
  PROJECTS: '/erp/projects',
  FINANCE: '/erp/finance',
  REPORTS: '/erp/reports',
  SETTINGS: '/erp/settings',
} as const;

export type RouteKey = keyof typeof ROUTES;
