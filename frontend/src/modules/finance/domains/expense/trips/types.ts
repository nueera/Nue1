'use client';
// Trips Types — Zoho Expense
import type { Money } from '../../../types/finance-common';

export type TripStatus = 'upcoming' | 'in_progress' | 'completed' | 'cancelled';
export interface ItinerarySegment {
  type: 'flight' | 'hotel' | 'car' | 'train';
  departure: string;
  arrival: string;
  date: string;
  confirmationCode: string;
}
export interface Trip {
  id: string;
  name: string;
  employeeId: string;
  employeeName: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: TripStatus;
  budget: Money;
  spent: Money;
  itinerary: ItinerarySegment[];
  createdAt: string;
}
