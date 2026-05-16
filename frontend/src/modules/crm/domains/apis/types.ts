import type { CrmRecord } from "../../core/types";

export interface APIKey { id: string; name: string; key: string; createdAt: string; lastUsedAt?: string; isRevoked: boolean; }

export interface APIWebhook { id: string; url: string; events: string[]; isActive: boolean; createdAt: string; }

export interface APIEndpoint { id: string; method: "GET" | "POST" | "PUT" | "DELETE"; path: string; description: string; }
