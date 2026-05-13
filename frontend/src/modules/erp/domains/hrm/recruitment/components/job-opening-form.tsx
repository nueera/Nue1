'use client';

import { useState } from 'react';
import { Briefcase, Save, MapPin } from 'lucide-react';
import { EMPLOYMENT_TYPES, EXPERIENCE_LEVELS } from '../constants';

interface JobOpeningFormProps {
  initialData?: {
    title?: string;
    department?: string;
    position?: string;
    employmentType?: string;
    experienceLevel?: string;
    minExperience?: number;
    maxExperience?: number;
    salaryMin?: number;
    salaryMax?: number;
    description?: string;
    requirements?: string;
    positions?: number;
    deadline?: string;
    location?: string;
    skills?: string[];
  };
  onSubmit: (data: {
    title: string;
    department: string;
    position: string;
    employmentType: string;
    experienceLevel: string;
    minExperience: number;
    maxExperience: number;
    salaryMin: number;
    salaryMax: number;
    description: string;
    requirements: string;
    positions: number;
    deadline: string;
    location?: string;
    skills?: string[];
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function JobOpeningForm({ initialData, onSubmit, onCancel, isLoading }: JobOpeningFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [department, setDepartment] = useState(initialData?.department ?? '');
  const [position, setPosition] = useState(initialData?.position ?? '');
  const [employmentType, setEmploymentType] = useState(initialData?.employmentType ?? '');
  const [experienceLevel, setExperienceLevel] = useState(initialData?.experienceLevel ?? '');
  const [minExperience, setMinExperience] = useState(initialData?.minExperience ?? 0);
  const [maxExperience, setMaxExperience] = useState(initialData?.maxExperience ?? 0);
  const [salaryMin, setSalaryMin] = useState(initialData?.salaryMin ?? 0);
  const [salaryMax, setSalaryMax] = useState(initialData?.salaryMax ?? 0);
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [requirements, setRequirements] = useState(initialData?.requirements ?? '');
  const [positions, setPositions] = useState(initialData?.positions ?? 1);
  const [deadline, setDeadline] = useState(initialData?.deadline ?? '');
  const [location, setLocation] = useState(initialData?.location ?? '');
  const [skillsInput, setSkillsInput] = useState(initialData?.skills?.join(', ') ?? '');

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  const isValid = title && department && position && employmentType && experienceLevel && description && requirements && positions > 0 && deadline;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      department,
      position,
      employmentType,
      experienceLevel,
      minExperience,
      maxExperience,
      salaryMin,
      salaryMax,
      description,
      requirements,
      positions,
      deadline,
      location: location || undefined,
      skills: skillsInput ? skillsInput.split(',').map((s) => s.trim()).filter(Boolean) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title & Department */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Job Title <span className="text-red-400">*</span>
          </label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Senior Software Engineer" className={inputClass} required />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Department <span className="text-red-400">*</span>
          </label>
          <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g., Engineering" className={inputClass} required />
        </div>
      </div>

      {/* Position & Location */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Position <span className="text-red-400">*</span>
          </label>
          <input type="text" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="e.g., Individual Contributor" className={inputClass} required />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground/50" />
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., Bangalore / Remote" className={`${inputClass} pl-9`} />
          </div>
        </div>
      </div>

      {/* Employment Type & Experience Level */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Employment Type <span className="text-red-400">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {EMPLOYMENT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setEmploymentType(type)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                  employmentType === type ? 'bg-module-erp/10 border-module-erp/30 text-module-erp' : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Experience Level <span className="text-red-400">*</span>
          </label>
          <select value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} className={inputClass} required>
            <option value="" disabled>Select level</option>
            {EXPERIENCE_LEVELS.map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Experience range & Salary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Min Exp (yrs)</label>
          <input type="number" min={0} value={minExperience} onChange={(e) => setMinExperience(Number(e.target.value))} className={inputClass} />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Max Exp (yrs)</label>
          <input type="number" min={0} value={maxExperience} onChange={(e) => setMaxExperience(Number(e.target.value))} className={inputClass} />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Min Salary (LPA)</label>
          <input type="number" min={0} value={salaryMin || ''} onChange={(e) => setSalaryMin(Number(e.target.value))} className={inputClass} />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] text-muted-foreground uppercase tracking-wider">Max Salary (LPA)</label>
          <input type="number" min={0} value={salaryMax || ''} onChange={(e) => setSalaryMax(Number(e.target.value))} className={inputClass} />
        </div>
      </div>

      {/* Description & Requirements */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Job Description <span className="text-red-400">*</span>
        </label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the role, responsibilities, and what makes it exciting..." rows={4} className={`${inputClass} resize-none`} required />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Requirements <span className="text-red-400">*</span>
        </label>
        <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} placeholder="Required skills, qualifications, certifications..." rows={3} className={`${inputClass} resize-none`} required />
      </div>

      {/* Positions, Deadline, Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Positions <span className="text-red-400">*</span>
          </label>
          <input type="number" min={1} value={positions} onChange={(e) => setPositions(Number(e.target.value))} className={inputClass} required />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Deadline <span className="text-red-400">*</span>
          </label>
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className={inputClass} required />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Skills (comma-separated)</label>
          <input type="text" value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)} placeholder="React, TypeScript, Node.js" className={inputClass} />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50"
        >
          <Briefcase className="h-4 w-4" />
          {isLoading ? 'Saving...' : initialData ? 'Update Job Opening' : 'Create Job Opening'}
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
