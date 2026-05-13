'use client';
// Mileage Types — Zoho Expense
import type { Money } from '../../../types/finance-common';

export interface RoutePoint {
  address: string;
  lat: number;
  lng: number;
}
export interface Mileage {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  distance: number;
  distanceUnit: 'miles' | 'km';
  rate: Money;
  amount: Money;
  route: RoutePoint[];
  fromAddress: string;
  toAddress: string;
  purpose: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  createdAt: string;
}
