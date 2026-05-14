// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export type QuoteStatus = "draft" | "sent" | "accepted" | "rejected" | "expired";

export interface Quote { id: string; subject: string; dealId: string; dealName: string; accountId: string; accountName: string; status: QuoteStatus; validUntil: string; subtotal: number; discount: number; tax: number; total: number; lineItems: QuoteLineItem[]; terms: string; createdAt: string; updatedAt: string; owner: string; }

export interface QuoteLineItem { id: string; productId: string; productName: string; quantity: number; unitPrice: number; discount: number; total: number; }
