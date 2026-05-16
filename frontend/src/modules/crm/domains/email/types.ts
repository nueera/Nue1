import type { CrmRecord } from "../../core/types";

export interface EmailMessage { id: string; from: string; to: string[]; cc: string[]; bcc: string[]; subject: string; body: string; isRead: boolean; isStarred: boolean; folder: string; attachments: { name: string; size: number; url: string }[]; sentAt: string; linkedRecords: { id: string; type: string; name: string }[]; }

export interface EmailTemplate { id: string; name: string; subject: string; body: string; category: string; mergeFields: string[]; }
