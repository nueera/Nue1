import type { CrmRecord } from "../../core/types";

export type SocialChannel = "twitter" | "linkedin" | "facebook" | "instagram";

export interface SocialProfile { id: string; channel: SocialChannel; handle: string; displayName: string; avatar: string; followers: number; linkedContactId?: string; }

export interface SocialPost { id: string; channel: SocialChannel; content: string; postedAt: string; likes: number; comments: number; shares: number; profileId: string; }
