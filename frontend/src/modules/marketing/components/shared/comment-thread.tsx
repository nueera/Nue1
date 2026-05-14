// @ts-nocheck
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send } from 'lucide-react';

export interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  avatar?: string;
}

export interface CommentThreadProps {
  comments: Comment[];
  onAdd: (content: string) => void;
  className?: string;
}

function formatTimestamp(ts: string): string {
  try {
    const date = new Date(ts);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return ts;
  }
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function CommentThread({ comments, onAdd, className }: CommentThreadProps) {
  const [newComment, setNewComment] = React.useState('');
  const threadRef = React.useRef<HTMLDivElement>(null);

  const handleSubmit = () => {
    const trimmed = newComment.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setNewComment('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  React.useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [comments.length]);

  return (
    <div className={cn('flex flex-col', className)}>
      <h4 className="text-sm font-medium text-foreground mb-3">
        Comments
        {comments.length > 0 && (
          <span className="ml-1.5 text-muted-foreground font-normal">({comments.length})</span>
        )}
      </h4>

      {/* Thread */}
      <div
        ref={threadRef}
        className="max-h-72 overflow-y-auto space-y-3 pr-1 mb-3"
      >
        {comments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">
            No comments yet. Start the conversation!
          </p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="size-8 shrink-0">
                <AvatarImage src={comment.avatar} alt={comment.author} />
                <AvatarFallback className="text-xs font-medium bg-muted text-muted-foreground">
                    {getInitials(comment.author)}
                  </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-medium">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(comment.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-foreground mt-0.5 break-words">{comment.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <Input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a comment..."
          className="flex-1 h-9"
        />
        <Button
          size="icon"
          variant="outline"
          onClick={handleSubmit}
          disabled={!newComment.trim()}
          aria-label="Send comment"
          className="shrink-0"
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}
