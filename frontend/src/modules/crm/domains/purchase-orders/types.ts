// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export type PurchaseOrderStatus = "draft" | "sent" | "received" | "partial" | "cancelled";

export interface PurchaseOrder { id: string; subject: string; vendorId: string; vendorName: string; status: PurchaseOrderStatus; subtotal: number; tax: number; total: number; lineItems: PurchaseOrderLineItem[]; createdAt: string; updatedAt: string; owner: string; }

export interface PurchaseOrderLineItem { id: string; productId: string; productName: string; quantity: number; unitPrice: number; total: number; received: number; }
