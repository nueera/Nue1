'use client';

import { Briefcase, ArrowRight, Award, Calendar, UserPlus, LogOut } from 'lucide-react';
import type { Employee } from '../types';

interface TimelineEvent {
  id: string;
  type: 'join' | 'promotion' | 'transfer' | 'leave' | 'offboarding' | 'milestone' | 'update';
  title: string;
  description: string;
  date: string;
}

interface EmployeeTimelineProps {
  employee: Employee;
  events?: TimelineEvent[];
}

const EVENT_ICONS: Record<TimelineEvent['type'], React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  join: UserPlus,
  promotion: Award,
  transfer: ArrowRight,
  leave: Calendar,
  offboarding: LogOut,
  milestone: Award,
  update: Briefcase,
};

const EVENT_COLORS: Record<TimelineEvent['type'], string> = {
  join: 'bg-green-500/15 text-green-500',
  promotion: 'bg-amber-500/15 text-amber-500',
  transfer: 'bg-blue-500/15 text-blue-500',
  leave: 'bg-purple-500/15 text-purple-500',
  offboarding: 'bg-red-500/15 text-red-500',
  milestone: 'bg-module-erp/15 text-module-erp',
  update: 'bg-zinc-500/15 text-zinc-500',
};

function generateDefaultEvents(employee: Employee): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  events.push({
    id: 'join',
    type: 'join',
    title: 'Joined the organization',
    description: `${employee.firstName} joined as ${employee.position} in ${employee.department} department.`,
    date: employee.joinDate,
  });

  const joinDate = new Date(employee.joinDate);
  const now = new Date();
  const yearsDiff = now.getFullYear() - joinDate.getFullYear();

  for (let i = 1; i <= yearsDiff; i++) {
    const milestoneDate = new Date(joinDate);
    milestoneDate.setFullYear(milestoneDate.getFullYear() + i);
    if (milestoneDate <= now) {
      events.push({
        id: `milestone-${i}`,
        type: 'milestone',
        title: `${i} Year${i > 1 ? 's' : ''} Anniversary`,
        description: `Completed ${i} year${i > 1 ? 's' : ''} of service.`,
        date: milestoneDate.toISOString(),
      });
    }
  }

  return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function EmployeeTimeline({ employee, events }: EmployeeTimelineProps) {
  const timelineEvents = events ?? generateDefaultEvents(employee);

  if (timelineEvents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Calendar className="h-10 w-10 text-muted-foreground/20 mb-4" />
        <p className="text-sm font-medium text-muted-foreground">No timeline events</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10" />

      <div className="space-y-6">
        {timelineEvents.map((event) => {
          const Icon = EVENT_ICONS[event.type];
          const colorClass = EVENT_COLORS[event.type];

          return (
            <div key={event.id} className="relative flex gap-4 pl-0">
              {/* Icon */}
              <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${colorClass} shrink-0`}>
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </div>

              {/* Content */}
              <div className="flex-1 pt-1">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all duration-200">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-foreground">{event.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground shrink-0 whitespace-nowrap">
                      {new Date(event.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
