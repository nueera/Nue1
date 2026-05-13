export const payrollKeys = {
  all: ['payroll'] as const,
  runs: (month: string) => [...payrollKeys.all, 'runs', month] as const,
  payslip: (id: string) => [...payrollKeys.all, 'payslip', id] as const,
  register: (month: string) => [...payrollKeys.all, 'register', month] as const,
} as const;
