// @ts-nocheck
'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Send, Phone, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isFromContact: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

interface WhatsappChatWindowProps {
  contactName?: string;
  contactPhone?: string;
  isOnline?: boolean;
  messages?: Message[];
  onSendMessage?: (text: string) => void;
  className?: string;
}

const MOCK_MESSAGES: Message[] = [
  { id: '1', text: 'Hi! I saw your promotion on WhatsApp.', timestamp: '10:30 AM', isFromContact: true },
  { id: '2', text: 'Hello! Welcome to our service. How can I help you today?', timestamp: '10:31 AM', isFromContact: false, status: 'read' },
  { id: '3', text: 'I\'d like to know more about your pricing plans.', timestamp: '10:32 AM', isFromContact: true },
  { id: '4', text: 'Great question! We have three plans: Starter ($29/mo), Pro ($79/mo), and Enterprise (custom). Would you like me to walk you through the differences?', timestamp: '10:33 AM', isFromContact: false, status: 'read' },
  { id: '5', text: 'Yes, please tell me about the Pro plan.', timestamp: '10:34 AM', isFromContact: true },
];

export function WhatsappChatWindow({
  contactName = 'John Doe',
  contactPhone = '+1 555-0101',
  isOnline = true,
  messages: externalMessages,
  onSendMessage,
  className,
}: WhatsappChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>(externalMessages ?? MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: String(Date.now()),
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isFromContact: false,
      status: 'sent',
    };
    setMessages([...messages, msg]);
    onSendMessage?.(newMessage.trim());
    setNewMessage('');
  };

  return (
    <Card className={cn('border-border/50 flex flex-col h-full', className)}>
      {/* Header */}
      <div className="flex items-center gap-3 p-3 border-b bg-emerald-50 dark:bg-emerald-950/20">
        <Avatar className="h-9 w-9">
          <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
            {contactName.split(' ').map((n) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{contactName}</p>
          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
            {isOnline && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
            {isOnline ? 'Online' : contactPhone}
          </p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Phone className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[400px]" style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23e5e7eb\' fill-opacity=\'0.15\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}>
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15, delay: index * 0.02 }}
            className={cn('flex', msg.isFromContact ? 'justify-start' : 'justify-end')}
          >
            <div
              className={cn(
                'max-w-[75%] rounded-xl px-3 py-2 text-sm',
                msg.isFromContact
                  ? 'bg-white dark:bg-gray-700 text-foreground rounded-tl-sm'
                  : 'bg-emerald-100 dark:bg-emerald-900/40 text-foreground rounded-tr-sm'
              )}
            >
              <p className="whitespace-pre-wrap">{msg.text}</p>
              <div className="flex items-center justify-end gap-1 mt-1">
                <span className="text-[10px] text-muted-foreground">{msg.timestamp}</span>
                {!msg.isFromContact && msg.status && (
                  <span className="text-[10px] text-emerald-600">✓✓</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 p-3 border-t">
        <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
          <Smile className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
          <Paperclip className="h-4 w-4" />
        </Button>
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
          placeholder="Type a message..."
          className="h-9 text-sm"
        />
        <Button
          size="icon"
          className="h-9 w-9 bg-emerald-600 hover:bg-emerald-700 shrink-0"
          onClick={handleSend}
          disabled={!newMessage.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
