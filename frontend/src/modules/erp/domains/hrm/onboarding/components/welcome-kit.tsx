'use client';

import { cn } from '@/lib/utils';
import { Gift, MapPin, Calendar, Monitor, Users, Coffee, Building2 } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
}

interface ScheduleItem {
  time: string;
  title: string;
  location?: string;
}

interface WelcomeKitProps {
  companyName: string;
  companyDescription?: string;
  officeAddress?: string;
  teamMembers?: TeamMember[];
  firstDaySchedule?: ScheduleItem[];
  itSetup?: Array<{ item: string; status: 'ready' | 'pending' | 'in-progress' }>;
  buddy?: string;
  manager?: string;
  className?: string;
}

const IT_STATUS_COLORS: Record<string, string> = {
  ready: 'bg-green-500/10 text-green-500',
  pending: 'bg-amber-500/10 text-amber-500',
  'in-progress': 'bg-blue-500/10 text-blue-500',
};

export function WelcomeKit({
  companyName,
  companyDescription,
  officeAddress,
  teamMembers = [],
  firstDaySchedule = [],
  itSetup = [],
  buddy,
  manager,
  className,
}: WelcomeKitProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Company Welcome */}
      <div className="bg-gradient-to-br from-module-erp/10 to-module-erp/5 backdrop-blur-xl border border-module-erp/20 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-module-erp/10 text-module-erp">
            <Gift className="h-5 w-5" strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="font-bold text-foreground" style={{ fontSize: 'var(--text-lg)' }}>Welcome to {companyName}!</h3>
            <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>We're excited to have you on board</p>
          </div>
        </div>
        {companyDescription && (
          <p className="text-sm text-muted-foreground leading-relaxed">{companyDescription}</p>
        )}
        {officeAddress && (
          <div className="flex items-center gap-2 mt-3 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" strokeWidth={1.8} />
            <span>{officeAddress}</span>
          </div>
        )}
      </div>

      {/* Key Contacts */}
      {(buddy || manager) && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <h4 className="font-semibold text-foreground mb-3" style={{ fontSize: 'var(--text-sm)' }}>Key Contacts</h4>
          <div className="space-y-2">
            {manager && (
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 text-xs font-bold">
                  {manager.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{manager}</p>
                  <p className="text-xs text-muted-foreground">Reporting Manager</p>
                </div>
              </div>
            )}
            {buddy && (
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 text-xs font-bold">
                  {buddy.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{buddy}</p>
                  <p className="text-xs text-muted-foreground">Onboarding Buddy</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Team Introductions */}
      {teamMembers.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-4 w-4 text-module-erp" strokeWidth={1.8} />
            <h4 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-sm)' }}>Your Team</h4>
          </div>
          <div className="space-y-2">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-module-erp/10 flex items-center justify-center text-module-erp text-xs font-bold">
                  {member.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* First Day Schedule */}
      {firstDaySchedule.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-module-erp" strokeWidth={1.8} />
            <h4 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-sm)' }}>First Day Schedule</h4>
          </div>
          <div className="space-y-0">
            {firstDaySchedule.map((item, i) => (
              <div key={i} className="flex gap-4 pb-3">
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-module-erp mt-2" />
                  {i < firstDaySchedule.length - 1 && <div className="w-0.5 flex-1 bg-white/10 mt-1" />}
                </div>
                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-module-erp">{item.time}</span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  {item.location && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" strokeWidth={1.8} /> {item.location}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* IT Setup */}
      {itSetup.length > 0 && (
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Monitor className="h-4 w-4 text-module-erp" strokeWidth={1.8} />
            <h4 className="font-semibold text-foreground" style={{ fontSize: 'var(--text-sm)' }}>IT Setup</h4>
          </div>
          <div className="space-y-2">
            {itSetup.map((item, i) => (
              <div key={i} className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                <span className="text-sm text-foreground">{item.item}</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium capitalize ${IT_STATUS_COLORS[item.status]}`}>
                  {item.status.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export type { TeamMember, ScheduleItem };
