export interface ExpenseClaim {
  id: string;
  employeeId: string;
  employeeName: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected' | 'paid';
  receiptUrl: string;
  approvedBy: string | null;
  approvedAt: string | null;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  limit: number;
  requiresReceipt: boolean;
}

export interface EmployeeAdvance {
  id: string;
  employeeId: string;
  employeeName: string;
  amount: number;
  purpose: string;
  status: 'pending' | 'approved' | 'disbursed' | 'settled' | 'rejected';
  requestDate: string;
  settleDate: string | null;
}

export interface TravelRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  destination: string;
  purpose: string;
  startDate: string;
  endDate: string;
  estimatedCost: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
  approvedBy: string | null;
}

export const expenseClaims: ExpenseClaim[] = [
  {
    id: 'EXP001',
    employeeId: 'EMP001',
    employeeName: 'Sarah Chen',
    category: 'Travel',
    amount: 450.00,
    description: 'Flight to San Francisco for client meeting',
    date: '2025-02-10',
    status: 'approved',
    receiptUrl: '/receipts/exp001.pdf',
    approvedBy: 'EMP025',
    approvedAt: '2025-02-12',
  },
  {
    id: 'EXP002',
    employeeId: 'EMP003',
    employeeName: 'Priya Patel',
    category: 'Meals',
    amount: 85.50,
    description: 'Team lunch for marketing campaign kickoff',
    date: '2025-02-14',
    status: 'approved',
    receiptUrl: '/receipts/exp002.pdf',
    approvedBy: 'EMP025',
    approvedAt: '2025-02-15',
  },
  {
    id: 'EXP003',
    employeeId: 'EMP004',
    employeeName: 'James Wilson',
    category: 'Travel',
    amount: 1250.00,
    description: 'Flight and hotel for annual sales conference in Chicago',
    date: '2025-02-18',
    status: 'pending',
    receiptUrl: '/receipts/exp003.pdf',
    approvedBy: null,
    approvedAt: null,
  },
  {
    id: 'EXP004',
    employeeId: 'EMP006',
    employeeName: 'David Kim',
    category: 'Office Supplies',
    amount: 234.99,
    description: 'Ergonomic keyboard and mouse for home office setup',
    date: '2025-01-28',
    status: 'paid',
    receiptUrl: '/receipts/exp004.pdf',
    approvedBy: 'EMP019',
    approvedAt: '2025-01-30',
  },
  {
    id: 'EXP005',
    employeeId: 'EMP002',
    employeeName: 'Marcus Johnson',
    category: 'Software',
    amount: 599.00,
    description: 'JetBrains All Products Pack annual subscription',
    date: '2025-02-01',
    status: 'approved',
    receiptUrl: '/receipts/exp005.pdf',
    approvedBy: 'EMP025',
    approvedAt: '2025-02-03',
  },
  {
    id: 'EXP006',
    employeeId: 'EMP007',
    employeeName: 'Elena Rodriguez',
    category: 'Travel',
    amount: 780.00,
    description: 'Train tickets and accommodation for warehouse audit in Dallas',
    date: '2025-01-15',
    status: 'rejected',
    receiptUrl: '/receipts/exp006.pdf',
    approvedBy: 'EMP019',
    approvedAt: '2025-01-17',
  },
  {
    id: 'EXP007',
    employeeId: 'EMP009',
    employeeName: 'Mei Zhang',
    category: 'Training',
    amount: 1200.00,
    description: 'AWS Solutions Architect certification exam and prep course',
    date: '2025-02-20',
    status: 'pending',
    receiptUrl: '/receipts/exp007.pdf',
    approvedBy: null,
    approvedAt: null,
  },
  {
    id: 'EXP008',
    employeeId: 'EMP011',
    employeeName: 'Fatima Al-Hassan',
    category: 'Meals',
    amount: 142.75,
    description: 'Client dinner at The Capital Grille',
    date: '2025-02-22',
    status: 'pending',
    receiptUrl: '/receipts/exp008.pdf',
    approvedBy: null,
    approvedAt: null,
  },
  {
    id: 'EXP009',
    employeeId: 'EMP013',
    employeeName: 'Sofia Martinez',
    category: 'Office Supplies',
    amount: 67.50,
    description: 'Printing and binding for recruitment brochures',
    date: '2025-02-08',
    status: 'approved',
    receiptUrl: '/receipts/exp009.pdf',
    approvedBy: 'EMP005',
    approvedAt: '2025-02-09',
  },
  {
    id: 'EXP010',
    employeeId: 'EMP008',
    employeeName: 'Tyler Brooks',
    category: 'Software',
    amount: 149.00,
    description: 'Datadog monitoring subscription - monthly',
    date: '2025-02-15',
    status: 'paid',
    receiptUrl: '/receipts/exp010.pdf',
    approvedBy: 'EMP025',
    approvedAt: '2025-02-16',
  },
  {
    id: 'EXP011',
    employeeId: 'EMP017',
    employeeName: 'Raj Krishnan',
    category: 'Training',
    amount: 899.00,
    description: 'Data Engineering on Google Cloud specialization',
    date: '2025-01-22',
    status: 'approved',
    receiptUrl: '/receipts/exp011.pdf',
    approvedBy: 'EMP025',
    approvedAt: '2025-01-24',
  },
  {
    id: 'EXP012',
    employeeId: 'EMP016',
    employeeName: 'Olivia Brown',
    category: 'Travel',
    amount: 520.00,
    description: 'Rental car and gas for client visits in Boston',
    date: '2025-02-25',
    status: 'pending',
    receiptUrl: '/receipts/exp012.pdf',
    approvedBy: null,
    approvedAt: null,
  },
  {
    id: 'EXP013',
    employeeId: 'EMP018',
    employeeName: 'Isabella Costa',
    category: 'Office Supplies',
    amount: 389.00,
    description: 'Wacom drawing tablet for design work',
    date: '2025-02-05',
    status: 'approved',
    receiptUrl: '/receipts/exp013.pdf',
    approvedBy: 'EMP005',
    approvedAt: '2025-02-06',
  },
  {
    id: 'EXP014',
    employeeId: 'EMP014',
    employeeName: 'Nathan Clark',
    category: 'Meals',
    amount: 56.25,
    description: 'Working lunch with logistics vendor',
    date: '2025-02-12',
    status: 'rejected',
    receiptUrl: '',
    approvedBy: 'EMP019',
    approvedAt: '2025-02-13',
  },
  {
    id: 'EXP015',
    employeeId: 'EMP023',
    employeeName: 'Carlos Mendez',
    category: 'Travel',
    amount: 1875.00,
    description: 'International flight and hotel for partnership meeting in London',
    date: '2025-02-28',
    status: 'pending',
    receiptUrl: '/receipts/exp015.pdf',
    approvedBy: null,
    approvedAt: null,
  },
];

export const expenseCategories: ExpenseCategory[] = [
  { id: 'CAT001', name: 'Travel', limit: 5000, requiresReceipt: true },
  { id: 'CAT002', name: 'Meals', limit: 200, requiresReceipt: true },
  { id: 'CAT003', name: 'Office Supplies', limit: 500, requiresReceipt: true },
  { id: 'CAT004', name: 'Software', limit: 2000, requiresReceipt: true },
  { id: 'CAT005', name: 'Training', limit: 3000, requiresReceipt: true },
];

export const employeeAdvances: EmployeeAdvance[] = [
  {
    id: 'ADV001',
    employeeId: 'EMP004',
    employeeName: 'James Wilson',
    amount: 2000.00,
    purpose: 'Client entertainment fund for Q1',
    status: 'disbursed',
    requestDate: '2025-01-05',
    settleDate: null,
  },
  {
    id: 'ADV002',
    employeeId: 'EMP001',
    employeeName: 'Sarah Chen',
    amount: 1500.00,
    purpose: 'Conference travel advance for React Summit',
    status: 'settled',
    requestDate: '2025-01-10',
    settleDate: '2025-02-15',
  },
  {
    id: 'ADV003',
    employeeId: 'EMP023',
    employeeName: 'Carlos Mendez',
    amount: 3000.00,
    purpose: 'International travel advance for London trip',
    status: 'approved',
    requestDate: '2025-02-18',
    settleDate: null,
  },
  {
    id: 'ADV004',
    employeeId: 'EMP011',
    employeeName: 'Fatima Al-Hassan',
    amount: 500.00,
    purpose: 'Content creation supplies and stock photos',
    status: 'pending',
    requestDate: '2025-02-25',
    settleDate: null,
  },
  {
    id: 'ADV005',
    employeeId: 'EMP007',
    employeeName: 'Elena Rodriguez',
    amount: 1200.00,
    purpose: 'Warehouse inspection travel advance',
    status: 'rejected',
    requestDate: '2025-01-20',
    settleDate: null,
  },
  {
    id: 'ADV006',
    employeeId: 'EMP017',
    employeeName: 'Raj Krishnan',
    amount: 800.00,
    purpose: 'Cloud conference registration and travel',
    status: 'disbursed',
    requestDate: '2025-02-01',
    settleDate: null,
  },
  {
    id: 'ADV007',
    employeeId: 'EMP014',
    employeeName: 'Nathan Clark',
    amount: 600.00,
    purpose: 'Vendor site visit travel expenses',
    status: 'settled',
    requestDate: '2025-01-15',
    settleDate: '2025-02-10',
  },
  {
    id: 'ADV008',
    employeeId: 'EMP008',
    employeeName: 'Tyler Brooks',
    amount: 1000.00,
    purpose: 'DevOps summit registration and accommodation',
    status: 'pending',
    requestDate: '2025-02-27',
    settleDate: null,
  },
];

export const travelRequests: TravelRequest[] = [
  {
    id: 'TRV001',
    employeeId: 'EMP001',
    employeeName: 'Sarah Chen',
    destination: 'San Francisco, CA',
    purpose: 'Client meeting with TechCorp for project kickoff',
    startDate: '2025-03-10',
    endDate: '2025-03-12',
    estimatedCost: 2500.00,
    status: 'approved',
    approvedBy: 'EMP025',
  },
  {
    id: 'TRV002',
    employeeId: 'EMP023',
    employeeName: 'Carlos Mendez',
    destination: 'London, UK',
    purpose: 'Partnership meeting with BritSystems Ltd',
    startDate: '2025-03-20',
    endDate: '2025-03-25',
    estimatedCost: 4500.00,
    status: 'pending',
    approvedBy: null,
  },
  {
    id: 'TRV003',
    employeeId: 'EMP004',
    employeeName: 'James Wilson',
    destination: 'Chicago, IL',
    purpose: 'Annual Sales Conference 2025',
    startDate: '2025-04-01',
    endDate: '2025-04-04',
    estimatedCost: 3200.00,
    status: 'approved',
    approvedBy: 'EMP019',
  },
  {
    id: 'TRV004',
    employeeId: 'EMP016',
    employeeName: 'Olivia Brown',
    destination: 'Boston, MA',
    purpose: 'Prospect visits for new territory development',
    startDate: '2025-03-15',
    endDate: '2025-03-17',
    estimatedCost: 1800.00,
    status: 'pending',
    approvedBy: null,
  },
  {
    id: 'TRV005',
    employeeId: 'EMP007',
    employeeName: 'Elena Rodriguez',
    destination: 'Dallas, TX',
    purpose: 'Warehouse operations audit',
    startDate: '2025-01-20',
    endDate: '2025-01-22',
    estimatedCost: 1500.00,
    status: 'rejected',
    approvedBy: 'EMP019',
  },
  {
    id: 'TRV006',
    employeeId: 'EMP017',
    employeeName: 'Raj Krishnan',
    destination: 'Las Vegas, NV',
    purpose: 'Google Cloud Next 2025 conference',
    startDate: '2025-04-08',
    endDate: '2025-04-11',
    estimatedCost: 3800.00,
    status: 'completed',
    approvedBy: 'EMP025',
  },
];

export function getExpenseClaimById(id: string): ExpenseClaim | undefined {
  return expenseClaims.find((e) => e.id === id);
}

export function getEmployeeAdvanceById(id: string): EmployeeAdvance | undefined {
  return employeeAdvances.find((a) => a.id === id);
}

export function getTravelRequestById(id: string): TravelRequest | undefined {
  return travelRequests.find((t) => t.id === id);
}
