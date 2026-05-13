'use client';
// Benefits Types — Zoho Payroll
import type { Money } from '../../../types/finance-common';

export type BenefitType = 'health' | 'dental' | 'vision' | 'life_insurance' | 'retirement' | 'fsa' | 'hsa';
export type BenefitStatus = 'active' | 'waived' | 'cancelled';
export interface BenefitEnrollment {
  employeeId: string;
  employeeName: string;
  status: BenefitStatus;
  enrolledAt: string;
  dependents: number;
  employeeContribution: Money;
  employerContribution: Money;
}
export interface Benefit {
  id: string;
  name: string;
  provider: string;
  type: BenefitType;
  description: string;
  employeeCost: Money;
  employerCost: Money;
  totalCost: Money;
  enrollments: BenefitEnrollment[];
  enrollmentCount: number;
  openEnrollment: string;
  isActive: boolean;
  createdAt: string;
}
