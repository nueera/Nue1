'use client';

import { useState } from 'react';
import { MessageSquare, Send, Clock } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Comment {
  id: string;
  authorName: string;
  authorRole: 'applicant' | 'approver' | 'system';
  content: string;
  createdAt: string;
}

interface LeaveCommentProps {
  leaveId: string;
  comments: Comment[];
  onAddComment?: (content: string) => void;
  isLoading?: boolean;
  className?: string;
}

const ROLE_COLORS = {
  applicant: 'text-emerald-500 bg-emerald-500/10',
  approver: 'text-module-erp bg-module-erp/10',
  system: 'text-zinc-500 bg-zinc-500/10',
};

const ROLE_LABELS = {
  applicant: 'Applicant',
  approver: 'Approver',
  system: 'System',
};

export function LeaveComment({ leaveId, comments, onAddComment, isLoading, className }: LeaveCommentProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && onAddComment) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className={cn('bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-6 space-y-4', className)}>
      <div className="flex items-center gap-2">
        <MessageSquare className="h-5 w-5 text-module-erp" strokeWidth={1.8} />
        <h3 className="font-semibold text-foreground text-base">Comments</h3>
        {comments.length > 0 && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-muted-foreground">
            {comments.length}
          </span>
        )}
      </div>

      {/* Comment List */}
      <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
        {comments.length === 0 ? (
          <div className="py-6 text-center">
            <MessageSquare className="h-6 w-6 text-muted-foreground/20 mx-auto mb-2" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">No comments yet</p>
          </div>
        ) : (
          comments.map((comment) => {
            const initials = comment.authorName
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);
            const roleColor = ROLE_COLORS[comment.authorRole];
            const roleLabel = ROLE_LABELS[comment.authorRole];

            return (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-7 w-7 shrink-0">
                  <AvatarFallback className="bg-module-erp/15 text-module-erp text-[9px] font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-foreground">{comment.authorName}</span>
                    <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full font-medium', roleColor)}>
                      {roleLabel}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/80 mt-0.5">{comment.content}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground/50" strokeWidth={1.8} />
                    <span className="text-[10px] text-muted-foreground/50">
                      {new Date(comment.createdAt).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Comment */}
      {onAddComment && (
        <form onSubmit={handleSubmit} className="flex items-start gap-2 pt-3 border-t border-white/10">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-colors duration-200"
          />
          <Button
            type="submit"
            size="sm"
            disabled={isLoading || !newComment.trim()}
            className="bg-module-erp hover:bg-module-erp/90 text-white press-scale h-9"
          >
            <Send className="h-3.5 w-3.5" strokeWidth={1.8} />
          </Button>
        </form>
      )}
    </div>
  );
}

export type { Comment };
