import type { CrmRecord } from "../../core/types";

export type InvoiceStatus = "draft" | "sent" | "paid" | "partial" | "overdue" | "void";

export interface Invoice { id: string; invoiceNumber: string; salesOrderId?: string; accountId: string; accountName: string; status: InvoiceStatus; invoiceDate: string; dueDate: string; subtotal: number; discount: number; tax: number; total: number; balance: number; lineItems: InvoiceLineItem[]; createdAt: string; updatedAt: string; owner: string; }

export interface InvoiceLineItem { id: string; productId: string; productName: string; quantity: number; unitPrice: number; discount: number; total: number; }
