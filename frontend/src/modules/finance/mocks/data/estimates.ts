// @ts-nocheck
import type { Money, LineItem, EstimateStatus } from '../../types/finance-common';

export interface MockEstimate {
  id: string;
  estimateNumber: string;
  customerId: string;
  customerName: string;
  lineItems: LineItem[];
  subtotal: Money;
  taxTotal: Money;
  total: Money;
  status: EstimateStatus;
  date: string;
  expiryDate: string;
}

export const mockEstimates: MockEstimate[] = [
  {
    id: 'est-001',
    estimateNumber: 'EST-2024-0001',
    customerId: 'cust-001',
    customerName: 'Apex Industries',
    lineItems: [
      {
        id: 'eli-001',
        item: 'Standing Desk - Electric',
        description: 'Electric height-adjustable standing desk',
        quantity: 20,
        rate: { amount: 899.0, currency: 'USD' },
        total: { amount: 17980.0, currency: 'USD' },
      },
      {
        id: 'eli-002',
        item: 'Ergonomic Office Chair',
        description: 'Premium ergonomic office chair',
        quantity: 20,
        rate: { amount: 549.99, currency: 'USD' },
        total: { amount: 10999.8, currency: 'USD' },
      },
    ],
    subtotal: { amount: 28979.8, currency: 'USD' },
    taxTotal: { amount: 2463.28, currency: 'USD' },
    total: { amount: 31443.08, currency: 'USD' },
    status: 'approved',
    date: '2024-05-15T00:00:00Z',
    expiryDate: '2024-06-14T00:00:00Z',
  },
  {
    id: 'est-002',
    estimateNumber: 'EST-2024-0002',
    customerId: 'cust-003',
    customerName: 'Pinnacle Logistics',
    lineItems: [
      {
        id: 'eli-003',
        item: 'USB-C Docking Station',
        description: 'Universal USB-C docking station',
        quantity: 50,
        rate: { amount: 189.99, currency: 'USD' },
        total: { amount: 9499.5, currency: 'USD' },
      },
    ],
    subtotal: { amount: 9499.5, currency: 'USD' },
    taxTotal: { amount: 807.46, currency: 'USD' },
    total: { amount: 10306.96, currency: 'USD' },
    status: 'sent',
    date: '2024-06-20T00:00:00Z',
    expiryDate: '2024-07-20T00:00:00Z',
  },
  {
    id: 'est-003',
    estimateNumber: 'EST-2024-0003',
    customerId: 'cust-004',
    customerName: 'BrightWave Technologies',
    lineItems: [
      {
        id: 'eli-004',
        item: 'Consulting - Strategic Planning',
        description: 'Strategic business planning and consulting',
        quantity: 40,
        rate: { amount: 350.0, currency: 'USD' },
        total: { amount: 14000.0, currency: 'USD' },
      },
    ],
    subtotal: { amount: 14000.0, currency: 'USD' },
    taxTotal: { amount: 0, currency: 'USD' },
    total: { amount: 14000.0, currency: 'USD' },
    status: 'draft',
    date: '2024-07-01T00:00:00Z',
    expiryDate: '2024-08-01T00:00:00Z',
  },
  {
    id: 'est-004',
    estimateNumber: 'EST-2024-0004',
    customerId: 'cust-005',
    customerName: 'GreenLeaf Partners',
    lineItems: [
      {
        id: 'eli-005',
        item: 'Graphic Design - Brand Package',
        description: 'Complete brand identity design package',
        quantity: 1,
        rate: { amount: 4500.0, currency: 'USD' },
        total: { amount: 4500.0, currency: 'USD' },
      },
      {
        id: 'eli-006',
        item: 'Cloud Hosting - Business Tier',
        description: 'Cloud hosting service, business tier',
        quantity: 24,
        rate: { amount: 299.0, currency: 'USD' },
        total: { amount: 7176.0, currency: 'USD' },
      },
    ],
    subtotal: { amount: 11676.0, currency: 'USD' },
    taxTotal: { amount: 0, currency: 'USD' },
    total: { amount: 11676.0, currency: 'USD' },
    status: 'converted',
    date: '2024-04-10T00:00:00Z',
    expiryDate: '2024-05-10T00:00:00Z',
  },
  {
    id: 'est-005',
    estimateNumber: 'EST-2024-0005',
    customerId: 'cust-006',
    customerName: 'Summit Dynamics',
    lineItems: [
      {
        id: 'eli-007',
        item: 'IT Support - Monthly Retainer',
        description: 'Monthly IT support retainer',
        quantity: 12,
        rate: { amount: 2000.0, currency: 'USD' },
        total: { amount: 24000.0, currency: 'USD' },
      },
    ],
    subtotal: { amount: 24000.0, currency: 'USD' },
    taxTotal: { amount: 0, currency: 'USD' },
    total: { amount: 24000.0, currency: 'USD' },
    status: 'declined',
    date: '2024-03-25T00:00:00Z',
    expiryDate: '2024-04-25T00:00:00Z',
  },
  {
    id: 'est-006',
    estimateNumber: 'EST-2024-0006',
    customerId: 'cust-008',
    customerName: 'Ironside Consulting',
    lineItems: [
      {
        id: 'eli-008',
        item: '27" 4K Monitor',
        description: '27-inch 4K UHD IPS monitor',
        quantity: 15,
        rate: { amount: 479.0, currency: 'USD' },
        total: { amount: 7185.0, currency: 'USD' },
      },
      {
        id: 'eli-009',
        item: 'USB-C Docking Station',
        description: 'Universal USB-C docking station',
        quantity: 15,
        rate: { amount: 189.99, currency: 'USD' },
        total: { amount: 2849.85, currency: 'USD' },
      },
    ],
    subtotal: { amount: 10034.85, currency: 'USD' },
    taxTotal: { amount: 852.96, currency: 'USD' },
    total: { amount: 10887.81, currency: 'USD' },
    status: 'expired',
    date: '2024-02-01T00:00:00Z',
    expiryDate: '2024-03-03T00:00:00Z',
  },
];
