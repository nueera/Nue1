import type { Attachment } from "./types";

export function getAttachmentLabel(item: Attachment): string { return item.name || item.id; }