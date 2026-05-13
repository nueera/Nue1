// Comments Types — Cross-product
import type { Money, Address, LineItem, TaxRate, InvoiceStatus, EstimateStatus, BillStatus, PaymentStatus, SubscriptionStatus, ExpenseStatus, OrderStatus, ApiResponse, PaginatedResponse, PaginatedRequest } from '../../../types/finance-common';

export interface Comment {
  id: string;
  entityType: string;
  entityId: string;
  content: string;
  authorId: string;
  authorName: string;
  parentCommentId: string;
  mentions: string[];
  reactions: { emoji: string; userIds: string[] }[];
  createdAt: string;
  updatedAt: string;
}
