'use client';

import { useState } from 'react';
import { FileText, Send, DollarSign, Calendar, CheckCircle2 } from 'lucide-react';

interface OfferLetterProps {
  candidateName: string;
  jobTitle: string;
  department: string;
  salaryMin: number;
  salaryMax: number;
  onSend: (data: {
    salary: number;
    startDate: string;
    conditions: string;
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function OfferLetter({ candidateName, jobTitle, department, salaryMin, salaryMax, onSend, onCancel, isLoading }: OfferLetterProps) {
  const [salary, setSalary] = useState<number>(Math.round((salaryMin + salaryMax) / 2));
  const [startDate, setStartDate] = useState('');
  const [conditions, setConditions] = useState('Subject to successful background verification and medical examination.');
  const [previewMode, setPreviewMode] = useState(false);

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  const isValid = salary > 0 && startDate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend({ salary, startDate, conditions });
  };

  if (previewMode) {
    return (
      <div className="space-y-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 font-serif">
          <div className="text-center mb-8">
            <h2 className="text-lg font-bold text-foreground">Offer of Employment</h2>
            <p className="text-xs text-muted-foreground mt-1">NueOne Technologies Pvt. Ltd.</p>
          </div>

          <div className="space-y-4 text-sm text-foreground/90 leading-relaxed">
            <p>Dear {candidateName},</p>
            <p>
              We are pleased to extend an offer of employment for the position of{' '}
              <strong>{jobTitle}</strong> in the <strong>{department}</strong> department.
            </p>
            <div className="grid grid-cols-2 gap-4 bg-white/5 rounded-xl p-4">
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Annual CTC</p>
                <p className="text-sm font-semibold text-foreground">₹{salary.toLocaleString('en-IN')} LPA</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Start Date</p>
                <p className="text-sm font-semibold text-foreground">{startDate || 'TBD'}</p>
              </div>
            </div>
            {conditions && (
              <div>
                <p className="font-medium mb-1">Conditions:</p>
                <p className="text-xs text-muted-foreground">{conditions}</p>
              </div>
            )}
            <p>
              This offer is contingent upon the successful completion of background verification and
              any other pre-employment requirements. Please review the attached documents for detailed
              terms and conditions.
            </p>
            <p className="mt-6">We look forward to welcoming you aboard!</p>
            <p className="mt-4 text-muted-foreground">HR Department<br />NueOne Technologies</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreviewMode(false)}
            className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 transition-all duration-200"
          >
            Back to Edit
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isValid || isLoading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 press-scale transition-all duration-200 disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            {isLoading ? 'Sending...' : 'Send Offer Letter'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); setPreviewMode(true); }} className="space-y-6">
      {/* Candidate info */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
        <p className="text-sm font-semibold text-foreground">{candidateName}</p>
        <p className="text-xs text-muted-foreground">{jobTitle} · {department}</p>
      </div>

      {/* Salary */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Offered CTC (LPA) <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="number"
            min={salaryMin}
            max={salaryMax * 1.2}
            step={0.5}
            value={salary || ''}
            onChange={(e) => setSalary(Number(e.target.value))}
            className={`${inputClass} pl-9`}
            required
          />
        </div>
        <p className="text-[10px] text-muted-foreground/50">
          Budget range: {salaryMin}–{salaryMax} LPA
        </p>
      </div>

      {/* Start Date */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Start Date <span className="text-red-400">*</span>
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={inputClass}
          required
        />
      </div>

      {/* Conditions */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Conditions</label>
        <textarea
          value={conditions}
          onChange={(e) => setConditions(e.target.value)}
          rows={3}
          className={`${inputClass} resize-none`}
          maxLength={500}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={!isValid}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50"
        >
          <FileText className="h-4 w-4" />
          Preview Offer
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
