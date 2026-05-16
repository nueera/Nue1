import type { CrmRecord } from "../../core/types";

export type CaseStatus = "open" | "in-progress" | "on-hold" | "escalated" | "resolved" | "closed";

export type CasePriority = "low" | "medium" | "high" | "urgent";

export type CaseOrigin = "email" | "phone" | "web" | "chat" | "social";

export interface Case { id: string; subject: string; description: string; status: CaseStatus; priority: CasePriority; origin: CaseOrigin; accountId: string; accountName: string; contactId: string; contactName: string; assignedTo: string; resolution?: string; slaDeadline?: string; createdAt: string; updatedAt: string; owner: string; }
