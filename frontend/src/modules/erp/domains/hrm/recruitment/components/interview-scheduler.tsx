'use client';

import { useState } from 'react';
import { Calendar, Clock, Video, Phone, MapPin, Send } from 'lucide-react';
import type { Application } from '../types';
import { INTERVIEW_TYPES } from '../constants';

interface InterviewSchedulerProps {
  application: Application;
  interviewers: Array<{ id: string; name: string }>;
  onSchedule: (data: {
    applicationId: string;
    interviewerIds: string[];
    type: 'phone' | 'video' | 'onsite' | 'panel';
    scheduledAt: string;
    duration: number;
    location?: string;
    notes?: string;
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  phone: Phone,
  video: Video,
  onsite: MapPin,
  panel: Users,
};

function Users({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}

export function InterviewScheduler({ application, interviewers, onSchedule, onCancel, isLoading }: InterviewSchedulerProps) {
  const [type, setType] = useState<string>('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [duration, setDuration] = useState(60);
  const [selectedInterviewers, setSelectedInterviewers] = useState<string[]>([]);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const toggleInterviewer = (id: string) => {
    setSelectedInterviewers((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  const isValid = type && scheduledAt && duration >= 15 && selectedInterviewers.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSchedule({
      applicationId: application.id,
      interviewerIds: selectedInterviewers,
      type: type as 'phone' | 'video' | 'onsite' | 'panel',
      scheduledAt,
      duration,
      location: location || undefined,
      notes: notes || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Candidate info */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-module-erp/10 flex items-center justify-center">
            <svg className="h-4 w-4 text-module-erp" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{application.candidateName}</p>
            <p className="text-[10px] text-muted-foreground">{application.jobTitle}</p>
          </div>
        </div>
      </div>

      {/* Interview Type */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Interview Type <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {INTERVIEW_TYPES.map((intType) => {
            const Icon = TYPE_ICONS[intType] || Phone;
            return (
              <button
                key={intType}
                type="button"
                onClick={() => setType(intType)}
                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200 ${
                  type === intType
                    ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                    : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium capitalize">{intType}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Date/Time & Duration */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Date & Time <span className="text-red-400">*</span>
          </label>
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Duration (minutes) <span className="text-red-400">*</span>
          </label>
          <select value={duration} onChange={(e) => setDuration(Number(e.target.value))} className={inputClass}>
            {[15, 30, 45, 60, 90, 120].map((d) => (
              <option key={d} value={d}>{d} min</option>
            ))}
          </select>
        </div>
      </div>

      {/* Interviewers */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Interviewers <span className="text-red-400">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {interviewers.map((person) => (
            <button
              key={person.id}
              type="button"
              onClick={() => toggleInterviewer(person.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all duration-200 ${
                selectedInterviewers.includes(person.id)
                  ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                  : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
              }`}
            >
              <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                selectedInterviewers.includes(person.id) ? 'bg-module-erp border-module-erp' : 'border-white/20'
              }`}>
                {selectedInterviewers.includes(person.id) && (
                  <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              {person.name}
            </button>
          ))}
        </div>
      </div>

      {/* Location (for onsite) */}
      {(type === 'onsite' || type === 'panel') && (
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Meeting Room 3, Floor 5" className={inputClass} />
        </div>
      )}

      {/* Notes */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Notes</label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional information for the interviewer..." rows={2} className={`${inputClass} resize-none`} maxLength={500} />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50"
        >
          <Calendar className="h-4 w-4" />
          {isLoading ? 'Scheduling...' : 'Schedule Interview'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 transition-all duration-200">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
