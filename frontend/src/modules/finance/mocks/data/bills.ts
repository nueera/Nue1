import type { Money, LineItem, BillStatus } from '../../types/finance-common';

export interface MockBill {
  id: string;
  billNumber: string;
  vendorId: string;
  vendorName: string;
  lineItems: LineItem[];
  subtotal: Money;
  taxTotal: Money;
  total: Money;
  status: BillStatus;
  date: string;
  dueDate: string;
}

export const mockBills: MockBill[] = [
  {
    id: 'bill-001',
    billNumber: 'BILL-2024-0001',
    vendorId: 'vend-001',
    vendorName: 'Global Office Supply Co.',
    lineItems: [
      {
        id: 'bli-001',
        item: 'Office Supplies Bundle',
        description: 'Paper, toner, pens, and general office supplies',
        quantity: 1,
        rate: { amount: 2340.0, currency: 'USD' },
        total: { amount: 2340.0, currency: 'USD' },
      },
    ],
    subtotal: { amount: 2340.0, currency: 'USD' },
    taxTotal: { amount: 198.9, currency: 'USD' },
    total: { amount: 2538.9, currency: 'USD' },
    status: 'paid',
    date: '2024-05-01T00:00:00Z',
    dueDate: '2024-05-31T00:00:00Z',
  },
  {
    id: 'bill-002',
    billNumber: 'BILL-2024-0002',
    vendorId: 'vend-002',
    vendorName: 'CloudHosting Solutions',
    lineItems: [
      {
        id: 'bli-002',
        item: 'Cloud Infrastructure - Monthly',
        description: 'Monthly cloud infrastructure and hosting charges',
        quantity: 1,
        rate: { amount: 4250.0, currency: 'USD' },
        total: { amount: 4250.0, currency: 'USD' },
      },
    ],
    subtotal: { amount: 4250.0, currency: 'USD' },
    taxTotal: { amount: 0, currency: 'USD' },
    total: { amount: 4250.0, currency: 'USD' },
    status: 'approved',
    date: '2024-07-01T00:00:00Z',
    dueDate: '2024-07-15T00:00:00Z',
  },
  {
    id: 'bill-003',
    billNumber: 'BILL-2024-0003',
    vendorId: 'vend-003',
    vendorName: 'Premier Cleaning Services',
    lineItems: [
      {
        id: 'bli-003',
        item: 'Office Cleaning - Monthly',
        description: 'Monthly office cleaning and sanitation service',
        quantity: 1,
        rate: { amount: 1600.0, currency: 'USD' },
        total: { amount: 1600.0, currency: 'USD' },
      },
    ],
    subtotal: { amount: 1600.0, currency: 'USD' },
    taxTotal: { amount: 0, currency: 'USD' },
    total: { amount: 1600.0, currency: 'USD' },
    status: 'awaiting_approval',
    date: '2024-07-10T00:00:00Z',
    dueDate: '2024-07-10T00:00:00Z',
  },
  {
    id: 'bill-004',
    billNumber: 'BILL-2024-0004',
    vendorId: 'vend-004',
    vendorName: 'TechGard Hardware',
    lineItems: [
      {
        id: 'bli-004',
        item: 'Server Rack Components',
        description: 'Server rack, cable management, and PDU units',
        quantity: 2,
        rate: { amount: 5800.0, currency: 'USD' },
        total: { amount: 11600.0, currency: 'USD' },
      },
      {
        id: 'bli-005',
        item: 'Network Switch - 48 Port',
        description: 'Enterprise 48-port managed network switch',
        quantity: 3,
        rate: { amount: 1250.0, currency: 'USD' },
        total: { amount: 3750.0, currency: 'USD' },
      },
    ],
    subtotal: { amount: 15350.0, currency: 'USD' },
    taxTotal: { amount: 1304.75, currency: 'USD' },
    total: { amount: 16654.75, currency: 'USD' },
    status: 'overdue',
    date: '2024-06-01T00:00:00Z',
    dueDate: '2024-07-16T00:00:00Z',
  },
  {
    id: 'bill-005',
    billNumber: 'BILL-2024-0005',
    vendorId: 'vend-005',
    vendorName: 'Precision Print Co.',
    lineItems: [
      {
        id: 'bli-006',
        item: 'Marketing Collateral Print Run',
        description: 'Brochures, business cards, and banner printing',
        quantity: 1,
        rate: { amount: 3400.0, currency: 'USD' },
        total: { amount: 3400.0, currency: 'USD' },
      },
    ],
    subtotal: { amount: 3400.0, currency: 'USD' },
    taxTotal: { amount: 289.0, currency: 'USD' },
    total: { amount: 3689.0, currency: 'USD' },
    status: 'draft',
    date: '2024-07-08T00:00:00Z',
    dueDate: '2024-08-07T00:00:00Z',
  },
  {
    id: 'bill-006',
    billNumber: 'BILL-2024-0006',
    vendorId: 'vend-006',
    vendorName: 'SecureIT Logistics',
    lineItems: [
      {
        id: 'bli-007',
        item: 'Equipment Shipping & Handling',
        description: 'Shipping and handling for Q2 equipment delivery',
        quantity: 1,
        rate: { amount: 6200.0, currency: 'USD' },
        total: { amount: 6200.0, currency: 'USD' },
      },
    ],
    subtotal: { amount: 6200.0, currency: 'USD' },
    taxTotal: { amount: 0, currency: 'USD' },
    total: { amount: 6200.0, currency: 'USD' },
    status: 'approved',
    date: '2024-07-05T00:00:00Z',
    dueDate: '2024-08-04T00:00:00Z',
  },
];
