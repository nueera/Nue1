export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  basicSalary: number;
  deductions: number;
  bonus: number;
  netSalary: number;
  status: 'paid' | 'pending' | 'processing';
}

export const payrollRecords: PayrollRecord[] = [
  { id: 'PAY001', employeeId: 'EMP001', employeeName: 'Sarah Chen', month: '2025-02', basicSalary: 10417, deductions: 2083, bonus: 500, netSalary: 8834, status: 'paid' },
  { id: 'PAY002', employeeId: 'EMP002', employeeName: 'Marcus Johnson', month: '2025-02', basicSalary: 9833, deductions: 1967, bonus: 0, netSalary: 7866, status: 'paid' },
  { id: 'PAY003', employeeId: 'EMP003', employeeName: 'Priya Patel', month: '2025-02', basicSalary: 8167, deductions: 1633, bonus: 300, netSalary: 6834, status: 'paid' },
  { id: 'PAY004', employeeId: 'EMP004', employeeName: 'James Wilson', month: '2025-02', basicSalary: 11250, deductions: 2250, bonus: 1000, netSalary: 10000, status: 'paid' },
  { id: 'PAY005', employeeId: 'EMP005', employeeName: 'Aisha Rahman', month: '2025-02', basicSalary: 6500, deductions: 1300, bonus: 0, netSalary: 5200, status: 'paid' },
  { id: 'PAY006', employeeId: 'EMP006', employeeName: 'David Kim', month: '2025-02', basicSalary: 7667, deductions: 1533, bonus: 200, netSalary: 6334, status: 'paid' },
  { id: 'PAY007', employeeId: 'EMP007', employeeName: 'Elena Rodriguez', month: '2025-02', basicSalary: 8750, deductions: 1750, bonus: 0, netSalary: 7000, status: 'processing' },
  { id: 'PAY008', employeeId: 'EMP008', employeeName: 'Tyler Brooks', month: '2025-02', basicSalary: 9583, deductions: 1917, bonus: 400, netSalary: 8066, status: 'paid' },
  { id: 'PAY009', employeeId: 'EMP009', employeeName: 'Mei Zhang', month: '2025-02', basicSalary: 9167, deductions: 1833, bonus: 0, netSalary: 7334, status: 'paid' },
  { id: 'PAY010', employeeId: 'EMP010', employeeName: 'Robert Taylor', month: '2025-02', basicSalary: 7083, deductions: 1417, bonus: 0, netSalary: 5666, status: 'pending' },
  { id: 'PAY011', employeeId: 'EMP011', employeeName: 'Fatima Al-Hassan', month: '2025-02', basicSalary: 6833, deductions: 1367, bonus: 150, netSalary: 5616, status: 'paid' },
  { id: 'PAY012', employeeId: 'EMP012', employeeName: 'Lucas Anderson', month: '2025-02', basicSalary: 7917, deductions: 1583, bonus: 300, netSalary: 6634, status: 'paid' },
  { id: 'PAY013', employeeId: 'EMP013', employeeName: 'Sofia Martinez', month: '2025-02', basicSalary: 7333, deductions: 1467, bonus: 0, netSalary: 5866, status: 'processing' },
  { id: 'PAY014', employeeId: 'EMP014', employeeName: 'Nathan Clark', month: '2025-02', basicSalary: 6583, deductions: 1317, bonus: 0, netSalary: 5266, status: 'paid' },
  { id: 'PAY015', employeeId: 'EMP015', employeeName: 'Yuki Tanaka', month: '2025-02', basicSalary: 7917, deductions: 1583, bonus: 0, netSalary: 6334, status: 'pending' },
  { id: 'PAY016', employeeId: 'EMP019', employeeName: 'Andrew Thompson', month: '2025-02', basicSalary: 15417, deductions: 3083, bonus: 2000, netSalary: 14334, status: 'paid' },
  { id: 'PAY017', employeeId: 'EMP025', employeeName: "Michael O'Brien", month: '2025-02', basicSalary: 12917, deductions: 2583, bonus: 1500, netSalary: 11834, status: 'paid' },
  { id: 'PAY018', employeeId: 'EMP001', employeeName: 'Sarah Chen', month: '2025-01', basicSalary: 10417, deductions: 2083, bonus: 750, netSalary: 9084, status: 'paid' },
  { id: 'PAY019', employeeId: 'EMP002', employeeName: 'Marcus Johnson', month: '2025-01', basicSalary: 9833, deductions: 1967, bonus: 200, netSalary: 8066, status: 'paid' },
  { id: 'PAY020', employeeId: 'EMP004', employeeName: 'James Wilson', month: '2025-01', basicSalary: 11250, deductions: 2250, bonus: 800, netSalary: 9800, status: 'paid' },
];

export function getPayrollByEmployeeId(employeeId: string): PayrollRecord[] {
  return payrollRecords.filter((p) => p.employeeId === employeeId);
}
