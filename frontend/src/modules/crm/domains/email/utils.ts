import type { EmailMessage } from "./types";

export function getEmailMessageLabel(item: EmailMessage): string { return item.subject || item.id; }