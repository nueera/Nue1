// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export type SalesOrderStatus = "draft" | "confirmed" | "fulfilled" | "cancelled";

export interface SalesOrder { id: string; subject: string; quoteId?: string; accountId: string; accountName: string; status: SalesOrderStatus; subtotal: number; discount: number; tax: number; total: number; lineItems: SalesOrderLineItem[]; createdAt: string; updatedAt: string; owner: string; }

export interface SalesOrderLineItem { id: string; productId: string; productName: string; quantity: number; unitPrice: number; discount: number; total: number; fulfilled: number; }
