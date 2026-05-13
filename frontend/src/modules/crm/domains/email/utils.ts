import type { EmailMessage } from "./types";

export function getEmailMessageLabel(item: EmailMessage): string { return item.name || item.id; }