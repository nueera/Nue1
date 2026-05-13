import type { PayrollRecord } from '../data/mock/payroll.mock';
import { payrollRecords, getPayrollByEmployeeId } from '../data/mock/payroll.mock';

export const payrollApi = {
  getAll: async (): Promise<PayrollRecord[]> => payrollRecords,
  getByEmployeeId: async (employeeId: string): Promise<PayrollRecord[]> => getPayrollByEmployeeId(employeeId),
};
