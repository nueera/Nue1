'use client';
// Notes Types — Finance Shared

export interface Note {
  id: string;
  entityType: string;
  entityId: string;
  content: string;
  authorId: string;
  authorName: string;
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}
