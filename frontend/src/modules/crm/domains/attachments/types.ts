// @ts-nocheck
import type { CrmRecord } from "../../core/types";

export type AttachmentType = "image" | "document" | "spreadsheet" | "pdf" | "video" | "audio" | "other";

export interface Attachment { id: string; name: string; type: AttachmentType; size: number; url: string; parentId: string; parentType: string; createdAt: string; owner: string; }
