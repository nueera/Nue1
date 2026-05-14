// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export type ChannelType = "email" | "chat" | "phone" | "social";

export interface OmniChannelConfig { id: string; channels: { type: ChannelType; enabled: boolean; config: Record<string, unknown> }[]; routingStrategy: "round-robin" | "least-busy" | "skill-based"; }

export interface QueueConfig { id: string; name: string; channel: ChannelType; priority: number; maxWaitTime: number; }
