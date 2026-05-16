'use client';
// Employees Types — Zoho Payroll
import type { Money, Address } from '../../../types/finance-common';

export type EmploymentType = 'full_time' | 'part_time' | 'contractor' | 'intern';
export type EmployeeStatus = 'active' | 'on_leave' | 'terminated';
export interface SalaryComponent {
  name: string;
  type: 'earning' | 'deduction';
  amount: Money;
  isFixed: boolean;
}
export interface PayrollEmployee {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  designation: string;
  employmentType: EmploymentType;
  status: EmployeeStatus;
  joinDate: string;
  salaryStructure: SalaryComponent[];
  grossSalary: Money;
  netSalary: Money;
  address: Address;
  bankAccount: string;
  taxId: string;
  createdAt: string;
}
export type Employee = PayrollEmployee;
