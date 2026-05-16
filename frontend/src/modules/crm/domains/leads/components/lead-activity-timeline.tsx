'use client';

import { Mail, Phone, MessageSquare, Calendar } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'email' | 'call' | 'note' | 'meeting';
  description: string;
  date: string;
}

interface LeadActivityTimelineProps {
  activities: ActivityItem[];
}

const iconMap = { email: Mail, call: Phone, note: MessageSquare, meeting: Calendar };
const colorMap = { email: 'text-status-info', call: 'text-status-success', note: 'text-status-warning', meeting: 'text-status-accent' };

export function LeadActivityTimeline({ activities }: LeadActivityTimelineProps) {
  return (
    <div className="space-y-3">
      {activities.map((activity, i) => {
        const Icon = iconMap[activity.type];
        return (
          <div key={activity.id} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full bg-glass-bg flex items-center justify-center ${colorMap[activity.type]}`}>
                <Icon className="h-4 w-4" />
              </div>
              {i < activities.length - 1 && <div className="w-px h-full bg-glass-hover mt-1" />}
            </div>
            <div className="flex-1 pb-4">
              <p className="text-sm text-foreground">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{new Date(activity.date).toLocaleDateString()}</p>
            </div>
          </div>
        );
      })}
      {activities.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">No activities yet</p>
      )}
    </div>
  );
}
