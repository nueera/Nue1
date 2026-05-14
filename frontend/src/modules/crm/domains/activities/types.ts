// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export type ActivityType = "task" | "event" | "call";

export type ActivityStatus = "pending" | "in-progress" | "completed" | "cancelled";

export type ActivityPriority = "low" | "medium" | "high" | "urgent";

export interface Task { id: string; subject: string; dueDate: string; status: ActivityStatus; priority: ActivityPriority; assignedTo: string; description: string; parentId: string; parentType: string; completedDate?: string; }

export interface Event { id: string; subject: string; startDate: string; endDate: string; location: string; status: ActivityStatus; assignedTo: string; description: string; isAllDay: boolean; }

export interface Call { id: string; subject: string; direction: "inbound" | "outbound"; duration: number; status: ActivityStatus; assignedTo: string; description: string; callPurpose: string; relatedTo: string; }

export type Activity = Task | Event | Call;
