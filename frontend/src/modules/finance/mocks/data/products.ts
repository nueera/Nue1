export interface MockBillingPlan {
  id: string;
  name: string;
  price: number;
  frequency: 'monthly' | 'quarterly' | 'annually';
  trialDays: number;
  features: string[];
}

export interface MockBillingProduct {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived';
  plans: MockBillingPlan[];
}

export const mockBillingProducts: MockBillingProduct[] = [
  {
    id: 'prod-001',
    name: 'Finance Suite',
    description: 'Complete financial management platform with invoicing, billing, and expense tracking',
    status: 'active',
    plans: [
      {
        id: 'plan-001',
        name: 'Starter',
        price: 29.0,
        frequency: 'monthly',
        trialDays: 14,
        features: ['5 invoices/month', 'Basic expense tracking', 'Email support'],
      },
      {
        id: 'plan-002',
        name: 'Professional',
        price: 79.0,
        frequency: 'monthly',
        trialDays: 14,
        features: ['Unlimited invoices', 'Advanced expense tracking', 'Multi-currency', 'Priority support'],
      },
    ],
  },
  {
    id: 'prod-002',
    name: 'Inventory Manager',
    description: 'Real-time inventory tracking with warehouse management and stock alerts',
    status: 'active',
    plans: [
      {
        id: 'plan-003',
        name: 'Basic',
        price: 39.0,
        frequency: 'monthly',
        trialDays: 7,
        features: ['1 warehouse', '500 SKUs', 'Basic reporting'],
      },
      {
        id: 'plan-004',
        name: 'Enterprise',
        price: 149.0,
        frequency: 'monthly',
        trialDays: 14,
        features: ['Unlimited warehouses', 'Unlimited SKUs', 'Advanced analytics', 'API access'],
      },
    ],
  },
  {
    id: 'prod-003',
    name: 'Payroll Pro',
    description: 'Automated payroll processing with tax compliance and employee self-service',
    status: 'active',
    plans: [
      {
        id: 'plan-005',
        name: 'Standard',
        price: 49.0,
        frequency: 'monthly',
        trialDays: 14,
        features: ['Up to 25 employees', 'Auto tax filing', 'Direct deposit', 'Pay stubs'],
      },
    ],
  },
  {
    id: 'prod-004',
    name: 'Expense Tracker',
    description: 'Streamlined expense management with receipt scanning and approval workflows',
    status: 'active',
    plans: [
      {
        id: 'plan-006',
        name: 'Team',
        price: 19.0,
        frequency: 'monthly',
        trialDays: 7,
        features: ['Receipt scanning', 'Mileage tracking', 'Approval workflows', 'Per diem'],
      },
    ],
  },
  {
    id: 'prod-005',
    name: 'Checkout Gateway',
    description: 'Secure payment processing with multiple payment methods and fraud detection',
    status: 'active',
    plans: [
      {
        id: 'plan-007',
        name: 'Growth',
        price: 0.0,
        frequency: 'monthly',
        trialDays: 0,
        features: ['2.9% + $0.30 per transaction', 'Credit & debit cards', 'ACH payments', 'Fraud detection'],
      },
    ],
  },
  {
    id: 'prod-006',
    name: 'Commerce Platform',
    description: 'All-in-one commerce solution with storefront, checkout, and subscription management',
    status: 'archived',
    plans: [
      {
        id: 'plan-008',
        name: 'Launch',
        price: 99.0,
        frequency: 'monthly',
        trialDays: 30,
        features: ['Online storefront', 'Product catalog', 'Shopping cart', 'Subscription billing'],
      },
    ],
  },
];
