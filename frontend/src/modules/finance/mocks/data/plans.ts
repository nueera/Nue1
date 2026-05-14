// @ts-nocheck
export interface MockPlan {
  id: string;
  name: string;
  productId: string;
  price: number;
  frequency: 'monthly' | 'quarterly' | 'annually';
  trialDays: number;
  features: string[];
}

export const mockPlans: MockPlan[] = [
  {
    id: 'plan-001',
    name: 'Starter',
    productId: 'prod-001',
    price: 29.0,
    frequency: 'monthly',
    trialDays: 14,
    features: ['5 invoices/month', 'Basic expense tracking', 'Email support'],
  },
  {
    id: 'plan-002',
    name: 'Professional',
    productId: 'prod-001',
    price: 79.0,
    frequency: 'monthly',
    trialDays: 14,
    features: ['Unlimited invoices', 'Advanced expense tracking', 'Multi-currency', 'Priority support'],
  },
  {
    id: 'plan-003',
    name: 'Basic',
    productId: 'prod-002',
    price: 39.0,
    frequency: 'monthly',
    trialDays: 7,
    features: ['1 warehouse', '500 SKUs', 'Basic reporting'],
  },
  {
    id: 'plan-004',
    name: 'Enterprise',
    productId: 'prod-002',
    price: 149.0,
    frequency: 'monthly',
    trialDays: 14,
    features: ['Unlimited warehouses', 'Unlimited SKUs', 'Advanced analytics', 'API access'],
  },
  {
    id: 'plan-005',
    name: 'Standard',
    productId: 'prod-003',
    price: 49.0,
    frequency: 'monthly',
    trialDays: 14,
    features: ['Up to 25 employees', 'Auto tax filing', 'Direct deposit', 'Pay stubs'],
  },
  {
    id: 'plan-006',
    name: 'Annual Professional',
    productId: 'prod-001',
    price: 790.0,
    frequency: 'annually',
    trialDays: 14,
    features: ['Unlimited invoices', 'Advanced expense tracking', 'Multi-currency', 'Priority support', '2 months free'],
  },
];
