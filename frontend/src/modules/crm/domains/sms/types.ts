// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export interface SMSMessage { id: string; from: string; to: string; body: string; status: "sent" | "delivered" | "failed"; sentAt: string; linkedRecordId?: string; }

export interface SMSConversation { id: string; contactId: string; contactName: string; lastMessage: string; lastMessageAt: string; unreadCount: number; }
