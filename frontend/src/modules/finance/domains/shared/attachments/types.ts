// @ts-nocheck
'use client';
// Attachments Types — Finance Shared

export interface Attachment {
  id: string;
  entityType: string;
  entityId: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  uploadedBy: string;
  uploadedByName: string;
  createdAt: string;
}
