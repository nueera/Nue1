import type { ExpenseClaim, EmployeeAdvance, TravelRequest } from '../data/mock/expenses.mock';
import {
  expenseClaims,
  getExpenseClaimById,
  employeeAdvances,
  getEmployeeAdvanceById,
  travelRequests,
  getTravelRequestById,
} from '../data/mock/expenses.mock';

export const expenseApi = {
  getAll: async (): Promise<ExpenseClaim[]> => expenseClaims,
  getById: async (id: string): Promise<ExpenseClaim | undefined> => getExpenseClaimById(id),
  create: async (data: Partial<ExpenseClaim>): Promise<ExpenseClaim> => {
    const newClaim: ExpenseClaim = {
      id: `EXP${String(expenseClaims.length + 1).padStart(3, '0')}`,
      employeeId: data.employeeId || '',
      employeeName: data.employeeName || '',
      category: data.category || '',
      amount: data.amount || 0,
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      status: 'pending',
      receiptUrl: data.receiptUrl || '',
      approvedBy: null,
      approvedAt: null,
    };
    return newClaim;
  },
  approve: async (id: string, approvedBy: string): Promise<ExpenseClaim | undefined> => {
    const claim = getExpenseClaimById(id);
    if (claim) {
      return { ...claim, status: 'approved', approvedBy, approvedAt: new Date().toISOString().split('T')[0] };
    }
    return undefined;
  },
  reject: async (id: string, approvedBy: string): Promise<ExpenseClaim | undefined> => {
    const claim = getExpenseClaimById(id);
    if (claim) {
      return { ...claim, status: 'rejected', approvedBy, approvedAt: new Date().toISOString().split('T')[0] };
    }
    return undefined;
  },
};

export const advanceApi = {
  getAll: async (): Promise<EmployeeAdvance[]> => employeeAdvances,
  create: async (data: Partial<EmployeeAdvance>): Promise<EmployeeAdvance> => {
    const newAdvance: EmployeeAdvance = {
      id: `ADV${String(employeeAdvances.length + 1).padStart(3, '0')}`,
      employeeId: data.employeeId || '',
      employeeName: data.employeeName || '',
      amount: data.amount || 0,
      purpose: data.purpose || '',
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0],
      settleDate: null,
    };
    return newAdvance;
  },
  settle: async (id: string): Promise<EmployeeAdvance | undefined> => {
    const advance = getEmployeeAdvanceById(id);
    if (advance) {
      return { ...advance, status: 'settled', settleDate: new Date().toISOString().split('T')[0] };
    }
    return undefined;
  },
};

export const travelApi = {
  getAll: async (): Promise<TravelRequest[]> => travelRequests,
  create: async (data: Partial<TravelRequest>): Promise<TravelRequest> => {
    const newRequest: TravelRequest = {
      id: `TRV${String(travelRequests.length + 1).padStart(3, '0')}`,
      employeeId: data.employeeId || '',
      employeeName: data.employeeName || '',
      destination: data.destination || '',
      purpose: data.purpose || '',
      startDate: data.startDate || '',
      endDate: data.endDate || '',
      estimatedCost: data.estimatedCost || 0,
      status: 'pending',
      approvedBy: null,
    };
    return newRequest;
  },
  approve: async (id: string, approvedBy: string): Promise<TravelRequest | undefined> => {
    const request = getTravelRequestById(id);
    if (request) {
      return { ...request, status: 'approved', approvedBy };
    }
    return undefined;
  },
};
