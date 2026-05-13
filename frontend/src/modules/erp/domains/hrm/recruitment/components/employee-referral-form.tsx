'use client';

import { useState } from 'react';
import { UserPlus, Send, Link2 } from 'lucide-react';
import type { JobOpening } from '../types';

interface EmployeeReferralFormProps {
  jobOpenings: JobOpening[];
  onSubmit: (data: {
    candidateName: string;
    candidateEmail: string;
    candidatePhone: string;
    jobId: string;
    relationship: string;
    notes?: string;
    resumeUrl?: string;
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

const RELATIONSHIPS = ['Colleague', 'Friend', 'Former Colleague', 'Classmate', 'Relative', 'Other'];

export function EmployeeReferralForm({ jobOpenings, onSubmit, onCancel, isLoading }: EmployeeReferralFormProps) {
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [jobId, setJobId] = useState('');
  const [relationship, setRelationship] = useState('');
  const [notes, setNotes] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  const isValid = candidateName && candidateEmail && candidatePhone && jobId && relationship;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      candidateName,
      candidateEmail,
      candidatePhone,
      jobId,
      relationship,
      notes: notes || undefined,
      resumeUrl: resumeUrl || undefined,
    });
  };

  const openJobs = jobOpenings.filter((j) => j.status === 'open');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Candidate Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Candidate Name <span className="text-red-400">*</span>
          </label>
          <input type="text" value={candidateName} onChange={(e) => setCandidateName(e.target.value)} placeholder="Full name" className={inputClass} required />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Email <span className="text-red-400">*</span>
          </label>
          <input type="email" value={candidateEmail} onChange={(e) => setCandidateEmail(e.target.value)} placeholder="candidate@email.com" className={inputClass} required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Phone <span className="text-red-400">*</span>
          </label>
          <input type="tel" value={candidatePhone} onChange={(e) => setCandidatePhone(e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputClass} required />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Resume Link
          </label>
          <div className="relative">
            <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
            <input type="url" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} placeholder="https://drive.google.com/..." className={`${inputClass} pl-9`} />
          </div>
        </div>
      </div>

      {/* Job Opening */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Job Opening <span className="text-red-400">*</span>
        </label>
        <select value={jobId} onChange={(e) => setJobId(e.target.value)} className={inputClass} required>
          <option value="" disabled>Select a job opening</option>
          {openJobs.map((job) => (
            <option key={job.id} value={job.id}>{job.title} — {job.department}</option>
          ))}
        </select>
      </div>

      {/* Relationship */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Relationship <span className="text-red-400">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {RELATIONSHIPS.map((rel) => (
            <button
              key={rel}
              type="button"
              onClick={() => setRelationship(rel)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                relationship === rel
                  ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                  : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
              }`}
            >
              {rel}
            </button>
          ))}
        </div>
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Why do you recommend this candidate?"
          rows={3}
          className={`${inputClass} resize-none`}
          maxLength={500}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50"
        >
          <UserPlus className="h-4 w-4" />
          {isLoading ? 'Submitting...' : 'Refer Candidate'}
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
