'use client';

import { useState } from 'react';
import { GraduationCap, Save, MapPin } from 'lucide-react';
import { TRAINING_CATEGORIES, DELIVERY_MODES, DELIVERY_MODE_LABELS } from '../constants';

interface TrainingProgramFormProps {
  initialData?: {
    title?: string;
    description?: string;
    category?: string;
    deliveryMode?: string;
    startDate?: string;
    endDate?: string;
    durationHours?: number;
    maxParticipants?: number;
    trainer?: string;
    location?: string;
    isMandatory?: boolean;
    skills?: string[];
    prerequisites?: string[];
  };
  onSubmit: (data: {
    title: string;
    description: string;
    category: string;
    deliveryMode: string;
    startDate: string;
    endDate: string;
    durationHours: number;
    maxParticipants: number;
    trainer: string;
    location?: string;
    isMandatory: boolean;
    skills?: string[];
    prerequisites?: string[];
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function TrainingProgramForm({ initialData, onSubmit, onCancel, isLoading }: TrainingProgramFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [category, setCategory] = useState(initialData?.category ?? '');
  const [deliveryMode, setDeliveryMode] = useState(initialData?.deliveryMode ?? '');
  const [startDate, setStartDate] = useState(initialData?.startDate ?? '');
  const [endDate, setEndDate] = useState(initialData?.endDate ?? '');
  const [durationHours, setDurationHours] = useState(initialData?.durationHours ?? 0);
  const [maxParticipants, setMaxParticipants] = useState(initialData?.maxParticipants ?? 20);
  const [trainer, setTrainer] = useState(initialData?.trainer ?? '');
  const [location, setLocation] = useState(initialData?.location ?? '');
  const [isMandatory, setIsMandatory] = useState(initialData?.isMandatory ?? false);
  const [skillsInput, setSkillsInput] = useState(initialData?.skills?.join(', ') ?? '');
  const [prereqsInput, setPrereqsInput] = useState(initialData?.prerequisites?.join(', ') ?? '');

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  const isValid = title && description && category && deliveryMode && startDate && endDate && durationHours > 0 && maxParticipants > 0 && trainer;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title, description, category, deliveryMode, startDate, endDate,
      durationHours, maxParticipants, trainer,
      location: location || undefined,
      isMandatory,
      skills: skillsInput ? skillsInput.split(',').map((s) => s.trim()).filter(Boolean) : undefined,
      prerequisites: prereqsInput ? prereqsInput.split(',').map((s) => s.trim()).filter(Boolean) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Title <span className="text-red-400">*</span></label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., React Advanced Workshop" className={inputClass} required />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Trainer <span className="text-red-400">*</span></label>
          <input type="text" value={trainer} onChange={(e) => setTrainer(e.target.value)} placeholder="Trainer name" className={inputClass} required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Description <span className="text-red-400">*</span></label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Program description..." rows={3} className={`${inputClass} resize-none`} required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Category <span className="text-red-400">*</span></label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass} required>
            <option value="" disabled>Select category</option>
            {TRAINING_CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Delivery Mode <span className="text-red-400">*</span></label>
          <div className="flex flex-wrap gap-2">
            {DELIVERY_MODES.map((mode) => (
              <button key={mode} type="button" onClick={() => setDeliveryMode(mode)} className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${deliveryMode === mode ? 'bg-module-erp/10 border-module-erp/30 text-module-erp' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'}`}>
                {DELIVERY_MODE_LABELS[mode]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Start Date <span className="text-red-400">*</span></label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className={inputClass} required />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider">End Date <span className="text-red-400">*</span></label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} min={startDate} className={inputClass} required />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Duration (hours) <span className="text-red-400">*</span></label>
          <input type="number" min={0.5} step={0.5} value={durationHours || ''} onChange={(e) => setDurationHours(Number(e.target.value))} className={inputClass} required />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Max Participants <span className="text-red-400">*</span></label>
          <input type="number" min={1} value={maxParticipants} onChange={(e) => setMaxParticipants(Number(e.target.value))} className={inputClass} required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Room / Link" className={`${inputClass} pl-9`} />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Mandatory</label>
          <div className="flex items-center gap-3 mt-2">
            <button type="button" onClick={() => setIsMandatory(!isMandatory)} className={`relative w-10 h-5 rounded-full transition-all duration-200 ${isMandatory ? 'bg-module-erp' : 'bg-white/10'}`}>
              <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${isMandatory ? 'translate-x-5' : ''}`} />
            </button>
            <span className="text-sm text-muted-foreground">{isMandatory ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Skills (comma-separated)</label>
          <input type="text" value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} placeholder="React, TypeScript" className={inputClass} />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Prerequisites (comma-separated)</label>
          <input type="text" value={prereqsInput} onChange={(e) => setPrereqsInput(e.target.value)} placeholder="Basic JavaScript" className={inputClass} />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={!isValid || isLoading} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50">
          <GraduationCap className="h-4 w-4" />
          {isLoading ? 'Saving...' : initialData ? 'Update Program' : 'Create Program'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 transition-all duration-200">Cancel</button>
        )}
      </div>
    </form>
  );
}
