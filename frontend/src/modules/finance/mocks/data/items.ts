import type { Money } from '../../types/finance-common';

export interface MockItem {
  id: string;
  name: string;
  sku: string;
  description: string;
  type: 'goods' | 'service';
  rate: Money;
  tax: number;
  stock: number;
  unit: string;
  status: 'active' | 'inactive';
}

export const mockItems: MockItem[] = [
  {
    id: 'item-001',
    name: 'Ergonomic Office Chair',
    sku: 'FRN-CHR-001',
    description: 'Premium ergonomic office chair with lumbar support and adjustable armrests',
    type: 'goods',
    rate: { amount: 549.99, currency: 'USD' },
    tax: 8.5,
    stock: 120,
    unit: 'piece',
    status: 'active',
  },
  {
    id: 'item-002',
    name: 'Standing Desk - Electric',
    sku: 'FRN-DSK-002',
    description: 'Electric height-adjustable standing desk, 60" x 30" surface',
    type: 'goods',
    rate: { amount: 899.0, currency: 'USD' },
    tax: 8.5,
    stock: 45,
    unit: 'piece',
    status: 'active',
  },
  {
    id: 'item-003',
    name: 'IT Support - Monthly Retainer',
    sku: 'SVC-ITS-001',
    description: 'Monthly IT support and maintenance retainer, up to 40 hours',
    type: 'service',
    rate: { amount: 2000.0, currency: 'USD' },
    tax: 0,
    stock: 999,
    unit: 'month',
    status: 'active',
  },
  {
    id: 'item-004',
    name: 'USB-C Docking Station',
    sku: 'TEC-DSK-003',
    description: 'Universal USB-C docking station with dual monitor support',
    type: 'goods',
    rate: { amount: 189.99, currency: 'USD' },
    tax: 8.5,
    stock: 230,
    unit: 'piece',
    status: 'active',
  },
  {
    id: 'item-005',
    name: 'Cloud Hosting - Business Tier',
    sku: 'SVC-CLD-002',
    description: 'Cloud hosting service, business tier with 99.9% SLA and 500GB storage',
    type: 'service',
    rate: { amount: 299.0, currency: 'USD' },
    tax: 0,
    stock: 999,
    unit: 'month',
    status: 'active',
  },
  {
    id: 'item-006',
    name: '27" 4K Monitor',
    sku: 'TEC-MON-004',
    description: '27-inch 4K UHD IPS monitor with USB-C connectivity',
    type: 'goods',
    rate: { amount: 479.0, currency: 'USD' },
    tax: 8.5,
    stock: 85,
    unit: 'piece',
    status: 'active',
  },
  {
    id: 'item-007',
    name: 'Consulting - Strategic Planning',
    sku: 'SVC-CON-003',
    description: 'Strategic business planning and consulting, per engagement',
    type: 'service',
    rate: { amount: 350.0, currency: 'USD' },
    tax: 0,
    stock: 999,
    unit: 'hour',
    status: 'active',
  },
  {
    id: 'item-008',
    name: 'Wireless Keyboard & Mouse Combo',
    sku: 'TEC-KBM-005',
    description: 'Ergonomic wireless keyboard and mouse combo with USB receiver',
    type: 'goods',
    rate: { amount: 79.99, currency: 'USD' },
    tax: 8.5,
    stock: 310,
    unit: 'piece',
    status: 'active',
  },
  {
    id: 'item-009',
    name: 'Office Filing Cabinet',
    sku: 'FRN-CAB-003',
    description: '4-drawer vertical filing cabinet, fireproof rated',
    type: 'goods',
    rate: { amount: 349.0, currency: 'USD' },
    tax: 8.5,
    stock: 0,
    unit: 'piece',
    status: 'inactive',
  },
  {
    id: 'item-010',
    name: 'Graphic Design - Brand Package',
    sku: 'SVC-DES-004',
    description: 'Complete brand identity design package including logo, color palette, and style guide',
    type: 'service',
    rate: { amount: 4500.0, currency: 'USD' },
    tax: 0,
    stock: 999,
    unit: 'project',
    status: 'active',
  },
];
