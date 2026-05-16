import type { CrmRecord } from "../../core/types";

export interface PriceBook { id: string; name: string; description: string; isActive: boolean; currency: string; entries: PriceBookEntry[]; createdAt: string; updatedAt: string; owner: string; }

export interface PriceBookEntry { id: string; productId: string; productName: string; unitPrice: number; discount?: number; }
