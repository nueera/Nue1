import type { Money, Address } from '../../types/finance-common';

export interface MockVendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  type: 'vendor';
  balance: Money;
  currency: string;
  paymentTerms: string;
  address: Address;
  status: 'active' | 'inactive';
  createdAt: string;
}

export const mockVendors: MockVendor[] = [
  {
    id: 'vend-001',
    name: 'Michael Torres',
    email: 'mtorres@globalofficesupply.com',
    phone: '+1 (404) 555-0101',
    company: 'Global Office Supply Co.',
    type: 'vendor',
    balance: { amount: 7800.0, currency: 'USD' },
    currency: 'USD',
    paymentTerms: 'Net 30',
    address: {
      street: '1500 Peachtree Street NE',
      city: 'Atlanta',
      state: 'GA',
      zip: '30309',
      country: 'US',
    },
    status: 'active',
    createdAt: '2024-01-10T09:00:00Z',
  },
  {
    id: 'vend-002',
    name: 'Linda Park',
    email: 'l.park@cloudhostingsolutions.com',
    phone: '+1 (408) 555-0224',
    company: 'CloudHosting Solutions',
    type: 'vendor',
    balance: { amount: 12500.0, currency: 'USD' },
    currency: 'USD',
    paymentTerms: 'Net 15',
    address: {
      street: '2000 University Avenue',
      city: 'Palo Alto',
      state: 'CA',
      zip: '94303',
      country: 'US',
    },
    status: 'active',
    createdAt: '2024-01-25T11:30:00Z',
  },
  {
    id: 'vend-003',
    name: 'David Brooks',
    email: 'dbrooks@premiercleaningsvcs.com',
    phone: '+1 (720) 555-0356',
    company: 'Premier Cleaning Services',
    type: 'vendor',
    balance: { amount: 3200.0, currency: 'USD' },
    currency: 'USD',
    paymentTerms: 'Due on Receipt',
    address: {
      street: '600 17th Street',
      city: 'Denver',
      state: 'CO',
      zip: '80202',
      country: 'US',
    },
    status: 'active',
    createdAt: '2024-02-14T08:15:00Z',
  },
  {
    id: 'vend-004',
    name: 'Karen Walsh',
    email: 'k.walsh@techgardhardware.com',
    phone: '+1 (503) 555-0487',
    company: 'TechGard Hardware',
    type: 'vendor',
    balance: { amount: 28450.75, currency: 'USD' },
    currency: 'USD',
    paymentTerms: 'Net 45',
    address: {
      street: '121 SW Morrison Street',
      city: 'Portland',
      state: 'OR',
      zip: '97204',
      country: 'US',
    },
    status: 'active',
    createdAt: '2024-03-01T14:00:00Z',
  },
  {
    id: 'vend-005',
    name: 'Ahmed Hassan',
    email: 'ahassan@precisionprintco.com',
    phone: '+1 (313) 555-0599',
    company: 'Precision Print Co.',
    type: 'vendor',
    balance: { amount: 5600.0, currency: 'USD' },
    currency: 'USD',
    paymentTerms: 'Net 30',
    address: {
      street: '1000 Woodward Avenue',
      city: 'Detroit',
      state: 'MI',
      zip: '48226',
      country: 'US',
    },
    status: 'inactive',
    createdAt: '2024-03-20T10:45:00Z',
  },
  {
    id: 'vend-006',
    name: 'Jennifer Liu',
    email: 'jliu@secureitlogistics.com',
    phone: '+1 (214) 555-0712',
    company: 'SecureIT Logistics',
    type: 'vendor',
    balance: { amount: 15800.5, currency: 'USD' },
    currency: 'USD',
    paymentTerms: 'Net 30',
    address: {
      street: '2200 Ross Avenue',
      city: 'Dallas',
      state: 'TX',
      zip: '75201',
      country: 'US',
    },
    status: 'active',
    createdAt: '2024-04-08T16:30:00Z',
  },
];
