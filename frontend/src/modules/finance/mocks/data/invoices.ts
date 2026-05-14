// @ts-nocheck
import type { Money, LineItem, InvoiceStatus } from '../../types/finance-common';

export interface MockInvoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  lineItems: LineItem[];
  subtotal: Money;
  taxTotal: Money;
  total: Money;
  status: InvoiceStatus;
  date: string;
  dueDate: string;
  notes: string;
}

export const mockInvoices: MockInvoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: 'INV-2024-0001',
    customerId: 'cust-001',
    customerName: 'Apex Industries',
    lineItems: [
      {
        id: 'li-001',
        item: 'Ergonomic Office Chair',
        description: 'Premium ergonomic office chair with lumbar support',
        quantity: 10,
        rate: { amount: 549.99, currency: 'USD' },
        total: { amount: 5499.9, currency: 'USD' },
      },
      {
        id: 'li-002',
        item: 'Standing Desk - Electric',
        description: 'Electric height-adjustable standing desk',
        quantity: 5,
        rate: { amount: 899.0, currency: 'USD' },
        total: { amount: 4495.0, currency: 'USD' },
      },
    ],
    subtotal: { amount: 9994.9, currency: 'USD' },
    taxTotal: { amount: 849.57, currency: 'USD' },
    total: { amount: 10844.47, currency: 'USD' },
    status: 'paid',
    date: '2024-06-01T00:00:00Z',
    dueDate: '2024-07-01T00:00:00Z',
    notes: 'Thank you for your business. Please reference invoice number on remittance.',
  },
  {
    id: 'inv-002',
    invoiceNumber: 'INV-2024-0002',
    customerId: 'cust-002',
    customerName: 'Nova Health Corp',
    lineItems: [
      {
        id: 'li-003',
        item: 'IT Support - Monthly Retainer',
        description: 'Monthly IT support and maintenance retainer',
        quantity: 3,
        rate: { amount: 2000.0, currency: 'USD' },
        total: { amount: 6000.0, currency: 'USD' },
      },
    ],
    subtotal: { amount: 6000.0, currency: 'USD' },
    taxTotal: { amount: 0, currency: 'USD' },
    total: { amount: 6000.0, currency: 'USD' },
    status: 'sent',
    date: '2024-06-15T00:00:00Z',
    dueDate: '2024-06-30T00:00:00Z',
    notes: 'Quarterly IT support retainer for Q3 2024.',
  },
  {
    id: 'inv-003',
    invoiceNumber: 'INV-2024-0003',
    customerId: 'cust-003',
    customerName: 'Pinnacle Logistics',
    lineItems: [
      {
        id: 'li-004',
        item: 'USB-C Docking Station',
        description: 'Universal USB-C docking station with dual monitor support',
        quantity: 25,
        rate: { amount: 189.99, currency: 'USD' },
        total: { amount: 4749.75, currency: 'USD' },
      },
      {
        id: 'li-005',
        item: '27" 4K Monitor',
        description: '27-inch 4K UHD IPS monitor with USB-C connectivity',
        quantity: 25,
        rate: { amount: 479.0, currency: 'USD' },
        total: { amount: 11975.0, currency: 'USD' },
      },
    ],
    subtotal: { amount: 16724.75, currency: 'USD' },
    taxTotal: { amount: 1421.6, currency: 'USD' },
    total: { amount: 18146.35, currency: 'USD' },
    status: 'overdue',
    date: '2024-05-10T00:00:00Z',
    dueDate: '2024-06-09T00:00:00Z',
    notes: 'Equipment for new warehouse office setup. Please remit at your earliest convenience.',
  },
  {
    id: 'inv-004',
    invoiceNumber: 'INV-2024-0004',
    customerId: 'cust-004',
    customerName: 'BrightWave Technologies',
    lineItems: [
      {
        id: 'li-006',
        item: 'Consulting - Strategic Planning',
        description: 'Strategic business planning and consulting',
        quantity: 16,
        rate: { amount: 350.0, currency: 'USD' },
        total: { amount: 5600.0, currency: 'USD' },
      },
    ],
    subtotal: { amount: 5600.0, currency: 'USD' },
    taxTotal: { amount: 0, currency: 'USD' },
    total: { amount: 5600.0, currency: 'USD' },
    status: 'viewed',
    date: '2024-07-01T00:00:00Z',
    dueDate: '2024-07-31T00:00:00Z',
    notes: 'Consulting engagement for Q3 strategic review.',
  },
  {
    id: 'inv-005',
    invoiceNumber: 'INV-2024-0005',
    customerId: 'cust-005',
    customerName: 'GreenLeaf Partners',
    lineItems: [
      {
        id: 'li-007',
        item: 'Graphic Design - Brand Package',
        description: 'Complete brand identity design package',
        quantity: 1,
        rate: { amount: 4500.0, currency: 'USD' },
        total: { amount: 4500.0, currency: 'USD' },
      },
      {
        id: 'li-008',
        item: 'Cloud Hosting - Business Tier',
        description: 'Cloud hosting service, business tier',
        quantity: 12,
        rate: { amount: 299.0, currency: 'USD' },
        total: { amount: 3588.0, currency: 'USD' },
      },
    ],
    subtotal: { amount: 8088.0, currency: 'USD' },
    taxTotal: { amount: 0, currency: 'USD' },
    total: { amount: 8088.0, currency: 'USD' },
    status: 'draft',
    date: '2024-07-10T00:00:00Z',
    dueDate: '2024-08-09T00:00:00Z',
    notes: 'Annual brand package and hosting services.',
  },
  {
    id: 'inv-006',
    invoiceNumber: 'INV-2024-0006',
    customerId: 'cust-006',
    customerName: 'Summit Dynamics',
    lineItems: [
      {
        id: 'li-009',
        item: 'Ergonomic Office Chair',
        description: 'Premium ergonomic office chair with lumbar support',
        quantity: 30,
        rate: { amount: 549.99, currency: 'USD' },
        total: { amount: 16499.7, currency: 'USD' },
      },
      {
        id: 'li-010',
        item: 'Wireless Keyboard & Mouse Combo',
        description: 'Ergonomic wireless keyboard and mouse combo',
        quantity: 30,
        rate: { amount: 79.99, currency: 'USD' },
        total: { amount: 2399.7, currency: 'USD' },
      },
    ],
    subtotal: { amount: 18899.4, currency: 'USD' },
    taxTotal: { amount: 1606.45, currency: 'USD' },
    total: { amount: 20505.85, currency: 'USD' },
    status: 'sent',
    date: '2024-07-05T00:00:00Z',
    dueDate: '2024-09-03T00:00:00Z',
    notes: 'Office furniture for new floor renovation. 60-day terms as agreed.',
  },
  {
    id: 'inv-007',
    invoiceNumber: 'INV-2024-0007',
    customerId: 'cust-007',
    customerName: 'Coastal Ventures',
    lineItems: [
      {
        id: 'li-011',
        item: 'Cloud Hosting - Business Tier',
        description: 'Cloud hosting service, business tier',
        quantity: 6,
        rate: { amount: 299.0, currency: 'USD' },
        total: { amount: 1794.0, currency: 'USD' },
      },
    ],
    subtotal: { amount: 1794.0, currency: 'USD' },
    taxTotal: { amount: 0, currency: 'USD' },
    total: { amount: 1794.0, currency: 'USD' },
    status: 'void',
    date: '2024-04-20T00:00:00Z',
    dueDate: '2024-05-20T00:00:00Z',
    notes: 'Voided — account migrated to enterprise hosting plan.',
  },
  {
    id: 'inv-008',
    invoiceNumber: 'INV-2024-0008',
    customerId: 'cust-008',
    customerName: 'Ironside Consulting',
    lineItems: [
      {
        id: 'li-012',
        item: 'IT Support - Monthly Retainer',
        description: 'Monthly IT support and maintenance retainer',
        quantity: 6,
        rate: { amount: 2000.0, currency: 'USD' },
        total: { amount: 12000.0, currency: 'USD' },
      },
      {
        id: 'li-013',
        item: 'Consulting - Strategic Planning',
        description: 'Strategic business planning and consulting',
        quantity: 8,
        rate: { amount: 350.0, currency: 'USD' },
        total: { amount: 2800.0, currency: 'USD' },
      },
    ],
    subtotal: { amount: 14800.0, currency: 'USD' },
    taxTotal: { amount: 0, currency: 'USD' },
    total: { amount: 14800.0, currency: 'USD' },
    status: 'draft',
    date: '2024-07-12T00:00:00Z',
    dueDate: '2024-08-11T00:00:00Z',
    notes: 'Semi-annual IT support and strategic consulting retainer.',
  },
];
