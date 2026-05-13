'use client';
// Shipments Types — Zoho Inventory
import type { Money, Address } from '../../../types/finance-common';

export type ShipmentStatus = 'pending' | 'in_transit' | 'delivered' | 'returned' | 'failed';
export interface TrackingEvent {
  timestamp: string;
  location: string;
  status: string;
  description: string;
}
export interface Shipment {
  id: string;
  shipmentNumber: string;
  salesOrderId: string;
  packageId: string;
  customerId: string;
  customerName: string;
  origin: Address;
  destination: Address;
  carrier: string;
  trackingNumber: string;
  status: ShipmentStatus;
  shippedDate: string;
  estimatedDelivery: string;
  actualDelivery: string;
  shippingCost: Money;
  trackingEvents: TrackingEvent[];
  createdAt: string;
}
