'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DEPARTMENTS, EMPLOYMENT_TYPES, GENDERS } from '../../../../core/utils/constants';
import { createEmployeeSchema, type CreateEmployeeInput } from '../employee.schema';
import type { Employee, EmploymentType, Gender } from '../types';

interface EmployeeFormProps {
  employee?: Employee;
  onSubmit: (data: CreateEmployeeInput) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function EmployeeForm({ employee, onSubmit, onCancel, isLoading }: EmployeeFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<CreateEmployeeInput>({
    firstName: employee?.firstName ?? '',
    lastName: employee?.lastName ?? '',
    email: employee?.email ?? '',
    phone: employee?.phone ?? '',
    department: employee?.department ?? '',
    position: employee?.position ?? '',
    employmentType: employee?.employmentType ?? 'full-time',
    joinDate: employee?.joinDate ?? '',
    salary: employee?.salary ?? 0,
    reportingManager: employee?.reportingManager ?? '',
    gender: employee?.gender,
    dateOfBirth: employee?.dateOfBirth ?? '',
    address: employee?.address
      ? { present: employee.address.present, permanent: employee.address.permanent }
      : undefined,
    bankDetails: employee?.bankDetails
      ? { ...employee.bankDetails }
      : undefined,
    emergencyContacts: employee?.emergencyContacts
      ? employee.emergencyContacts.map((c) => ({ ...c }))
      : undefined,
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = createEmployeeSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const path = err.path.join('.');
        if (!fieldErrors[path]) fieldErrors[path] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    onSubmit(result.data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">First Name *</Label>
            <Input
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              className="bg-white/5 border-white/10"
              placeholder="Enter first name"
            />
            {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Last Name *</Label>
            <Input
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              className="bg-white/5 border-white/10"
              placeholder="Enter last name"
            />
            {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Email *</Label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className="bg-white/5 border-white/10"
              placeholder="email@company.com"
            />
            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Phone *</Label>
            <Input
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className="bg-white/5 border-white/10"
              placeholder="+91 XXXXX XXXXX"
            />
            {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Gender</Label>
            <Select
              value={formData.gender ?? ''}
              onValueChange={(v) => handleChange('gender', v as Gender)}
            >
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                {GENDERS.map((g) => (
                  <SelectItem key={g} value={g} className="capitalize">
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Date of Birth</Label>
            <Input
              type="date"
              value={formData.dateOfBirth ?? ''}
              onChange={(e) => handleChange('dateOfBirth', e.target.value)}
              className="bg-white/5 border-white/10"
            />
          </div>
        </div>
      </div>

      {/* Employment Details */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wide">Employment Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Department *</Label>
            <Select value={formData.department} onValueChange={(v) => handleChange('department', v)}>
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {DEPARTMENTS.map((d) => (
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.department && <p className="text-xs text-red-500">{errors.department}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Position *</Label>
            <Input
              value={formData.position}
              onChange={(e) => handleChange('position', e.target.value)}
              className="bg-white/5 border-white/10"
              placeholder="e.g. Senior Engineer"
            />
            {errors.position && <p className="text-xs text-red-500">{errors.position}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Employment Type *</Label>
            <Select
              value={formData.employmentType}
              onValueChange={(v) => handleChange('employmentType', v as EmploymentType)}
            >
              <SelectTrigger className="bg-white/5 border-white/10">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {EMPLOYMENT_TYPES.map((t) => (
                  <SelectItem key={t} value={t} className="capitalize">
                    {t.replace('-', ' ')}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.employmentType && <p className="text-xs text-red-500">{errors.employmentType}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Join Date *</Label>
            <Input
              type="date"
              value={formData.joinDate}
              onChange={(e) => handleChange('joinDate', e.target.value)}
              className="bg-white/5 border-white/10"
            />
            {errors.joinDate && <p className="text-xs text-red-500">{errors.joinDate}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Salary (CTC) *</Label>
            <Input
              type="number"
              value={formData.salary || ''}
              onChange={(e) => handleChange('salary', Number(e.target.value))}
              className="bg-white/5 border-white/10"
              placeholder="Annual CTC"
            />
            {errors.salary && <p className="text-xs text-red-500">{errors.salary}</p>}
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Reporting Manager</Label>
            <Input
              value={formData.reportingManager ?? ''}
              onChange={(e) => handleChange('reportingManager', e.target.value)}
              className="bg-white/5 border-white/10"
              placeholder="Manager name"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Cancel
          </Button>
        )}
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-module-erp hover:bg-module-erp/90 text-white"
        >
          {isLoading ? 'Saving...' : employee ? 'Update Employee' : 'Create Employee'}
        </Button>
      </div>
    </form>
  );
}
