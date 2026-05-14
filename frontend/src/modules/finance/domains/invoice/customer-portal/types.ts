// @ts-nocheck
// CustomerPortal Types — Zoho Invoice
import type { Money, Address, LineItem, TaxRate, InvoiceStatus, EstimateStatus, BillStatus, PaymentStatus, SubscriptionStatus, ExpenseStatus, OrderStatus, ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';

export interface PortalPreference {
  id: string;
  organizationId: string;
  portalUrl: string;
  allowViewInvoices: boolean;
  allowMakePayments: boolean;
  allowDownload: boolean;
  customLogo: string;
  primaryColor: string;
  welcomeMessage: string;
  createdAt: string;
}
export interface PortalSession {
  id: string;
  contactId: string;
  token: string;
  expiresAt: string;
  lastAccessedAt: string;
}
