'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { StickyNote, Pencil, Trash2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface Note {
  id: string;
  content: string;
  author: string;
  avatar: string;
  timestamp: string;
}

interface NoteListProps {
  notes?: Note[];
  onEdit?: (note: Note) => void;
  onDelete?: (noteId: string) => void;
}

const MOCK_NOTES: Note[] = [
  { id: '1', content: 'Follow up with the client about the Q2 campaign proposal. They seemed interested but need budget approval.', author: 'Sarah Chen', avatar: 'SC', timestamp: '2024-03-15T14:30:00Z' },
  { id: '2', content: 'Updated the target audience segment based on the latest analytics data. Open rates improved by 15%.', author: 'Mike Johnson', avatar: 'MJ', timestamp: '2024-03-14T10:15:00Z' },
  { id: '3', content: 'Need to schedule a review meeting for the email template redesign.', author: 'Emily Davis', avatar: 'ED', timestamp: '2024-03-13T16:45:00Z' },
];

export function NoteList({ notes = MOCK_NOTES, onEdit, onDelete }: NoteListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <StickyNote className="h-5 w-5 text-emerald-600" />
        <h3 className="text-lg font-semibold">Notes</h3>
      </div>

      <div className="space-y-3">
        {notes.map((note, idx) => (
          <motion.div key={note.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
            <Card className="border-border/50">
              <CardContent className="p-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-7 w-7 shrink-0">
                    <AvatarFallback className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">{note.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium">{note.author}</span>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(note.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                    <p className="text-sm text-foreground">{note.content}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit?.(note)}><Pencil className="h-3.5 w-3.5" /></Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => onDelete?.(note.id)}><Trash2 className="h-3.5 w-3.5" /></Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
