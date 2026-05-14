// @ts-nocheck
export interface MockCoupon {
  id: string;
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minPurchase: number;
  maxRedemptions: number;
  usedCount: number;
  validFrom: string;
  validTo: string;
  status: 'active' | 'expired' | 'disabled';
}

export const mockCoupons: MockCoupon[] = [
  {
    id: 'coup-001',
    code: 'LAUNCH20',
    discountType: 'percentage',
    discountValue: 20,
    minPurchase: 100,
    maxRedemptions: 500,
    usedCount: 342,
    validFrom: '2024-01-01T00:00:00Z',
    validTo: '2024-12-31T23:59:59Z',
    status: 'active',
  },
  {
    id: 'coup-002',
    code: 'SUMMER50',
    discountType: 'flat',
    discountValue: 50,
    minPurchase: 200,
    maxRedemptions: 200,
    usedCount: 198,
    validFrom: '2024-06-01T00:00:00Z',
    validTo: '2024-08-31T23:59:59Z',
    status: 'active',
  },
  {
    id: 'coup-003',
    code: 'EARLYBIRD',
    discountType: 'percentage',
    discountValue: 15,
    minPurchase: 0,
    maxRedemptions: 100,
    usedCount: 100,
    validFrom: '2023-11-01T00:00:00Z',
    validTo: '2024-01-31T23:59:59Z',
    status: 'expired',
  },
  {
    id: 'coup-004',
    code: 'REFERRAL25',
    discountType: 'flat',
    discountValue: 25,
    minPurchase: 75,
    maxRedemptions: 1000,
    usedCount: 56,
    validFrom: '2024-03-15T00:00:00Z',
    validTo: '2025-03-15T23:59:59Z',
    status: 'active',
  },
];
