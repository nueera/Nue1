import type { CrmRecord } from "../../core/types";

export type ChatStatus = "waiting" | "active" | "closed";

export interface ChatSession { id: string; visitorName: string; visitorEmail: string; status: ChatStatus; agentId?: string; agentName?: string; startedAt: string; endedAt?: string; rating?: number; linkedRecordId?: string; }

export interface ChatMessage { id: string; sessionId: string; sender: "visitor" | "agent" | "bot"; content: string; sentAt: string; }
