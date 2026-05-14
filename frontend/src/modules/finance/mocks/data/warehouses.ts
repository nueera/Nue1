// @ts-nocheck
import type { Money, Address } from '../../types/finance-common';

export interface MockWarehouse {
  id: string;
  name: string;
  address: Address;
  isDefault: boolean;
  stockValue: Money;
}

export const mockWarehouses: MockWarehouse[] = [
  {
    id: 'wh-001',
    name: 'Main Distribution Center',
    address: {
      street: '4500 Industrial Parkway',
      city: 'Reno',
      state: 'NV',
      zip: '89502',
      country: 'US',
    },
    isDefault: true,
    stockValue: { amount: 892450.0, currency: 'USD' },
  },
  {
    id: 'wh-002',
    name: 'East Coast Warehouse',
    address: {
      street: '200 Commerce Drive',
      city: 'Edison',
      state: 'NJ',
      zip: '08817',
      country: 'US',
    },
    isDefault: false,
    stockValue: { amount: 534200.0, currency: 'USD' },
  },
  {
    id: 'wh-003',
    name: 'Southeast Hub',
    address: {
      street: '785 Logistics Boulevard',
      city: 'Savannah',
      state: 'GA',
      zip: '31407',
      country: 'US',
    },
    isDefault: false,
    stockValue: { amount: 321800.0, currency: 'USD' },
  },
  {
    id: 'wh-004',
    name: 'West Coast Fulfillment',
    address: {
      street: '3200 Harbor Gateway',
      city: 'Ontario',
      state: 'CA',
      zip: '91761',
      country: 'US',
    },
    isDefault: false,
    stockValue: { amount: 478600.0, currency: 'USD' },
  },
];
