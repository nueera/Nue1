import type { Money, ExpenseStatus } from '../../../types';
export type { ExpenseStatus };

export type ExpenseCategory = 'travel' | 'meals' | 'office-supplies' | 'software' | 'marketing' | 'utilities' | 'rent' | 'insurance' | 'professional-services' | 'equipment' | 'other';

export interface Expense {
  id: string;
  number: string;
  employeeId: string;
  employeeName: string;
  categoryId: string;
  categoryName: string;
  category: ExpenseCategory;
  description: string;
  amount: Money;
  date: string;
  status: ExpenseStatus;
  vendorId?: string;
  vendorName?: string;
  projectId?: string;
  projectName?: string;
  isBillable: boolean;
  isReimbursable: boolean;
  receipt: ExpenseReceipt | null;
  notes: string;
  tags: string[];
  approvedBy?: string;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseReceipt {
  id: string;
  expenseId: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
}

export interface ExpenseList {
  expenses: Expense[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}
