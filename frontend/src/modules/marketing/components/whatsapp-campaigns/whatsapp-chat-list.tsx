// @ts-nocheck
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Phone } from 'lucide-react';

interface ChatContact {
  id: string;
  name: string;
  phone: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

const MOCK_CHATS: ChatContact[] = [
  { id: '1', name: 'John Doe', phone: '+1 555-0101', lastMessage: 'Thanks for the update!', lastMessageTime: '2 min', unreadCount: 2, isOnline: true },
  { id: '2', name: 'Jane Smith', phone: '+1 555-0102', lastMessage: 'When is the next event?', lastMessageTime: '15 min', unreadCount: 0, isOnline: true },
  { id: '3', name: 'Bob Wilson', phone: '+1 555-0103', lastMessage: 'I need help with my order', lastMessageTime: '1 hr', unreadCount: 1, isOnline: false },
  { id: '4', name: 'Alice Brown', phone: '+1 555-0104', lastMessage: 'Great, looks good!', lastMessageTime: '3 hr', unreadCount: 0, isOnline: false },
  { id: '5', name: 'Charlie Davis', phone: '+1 555-0105', lastMessage: 'Can I schedule a demo?', lastMessageTime: '5 hr', unreadCount: 3, isOnline: true },
];

interface WhatsappChatListProps {
  onSelectChat?: (chatId: string) => void;
  selectedChatId?: string;
  className?: string;
}

export function WhatsappChatList({ onSelectChat, selectedChatId, className }: WhatsappChatListProps) {
  const [search, setSearch] = useState('');

  const filteredChats = MOCK_CHATS.filter(
    (c) => !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  return (
    <Card className={cn('border-border/50 h-full', className)}>
      {/* Search */}
      <div className="p-3 border-b">
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-sm"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="max-h-[500px] overflow-y-auto">
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={cn(
              'flex items-center gap-3 p-3 cursor-pointer transition-colors hover:bg-muted/30',
              selectedChatId === chat.id && 'bg-emerald-50 dark:bg-emerald-950/20'
            )}
            onClick={() => onSelectChat?.(chat.id)}
          >
            <div className="relative">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-sm font-semibold">
                  {chat.name.split(' ').map((n) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {chat.isOnline && (
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground truncate">{chat.name}</p>
                <span className="text-[10px] text-muted-foreground shrink-0">{chat.lastMessageTime}</span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-xs text-muted-foreground truncate">{chat.lastMessage}</p>
                {chat.unreadCount > 0 && (
                  <Badge className="bg-emerald-600 text-white text-[10px] px-1.5 py-0 min-w-[18px] h-[18px] flex items-center justify-center shrink-0">
                    {chat.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
