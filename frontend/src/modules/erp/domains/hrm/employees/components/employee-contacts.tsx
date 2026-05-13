'use client';

import { Phone, Mail, Heart, AlertTriangle } from 'lucide-react';
import { DataCard } from '../../../../shared/components/data-card/data-card';
import type { Employee, EmergencyContact } from '../types';

interface EmployeeContactsProps {
  employee: Employee;
}

export function EmployeeContacts({ employee }: EmployeeContactsProps) {
  const contacts = employee.emergencyContacts ?? [];

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      <DataCard title="Contact Information">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-module-erp/15 text-module-erp shrink-0">
              <Mail className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground">{employee.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-module-erp/15 text-module-erp shrink-0">
              <Phone className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone</p>
              <p className="text-sm font-medium text-foreground">{employee.phone}</p>
            </div>
          </div>
        </div>
      </DataCard>

      {/* Emergency Contacts Summary */}
      <DataCard title="Emergency Contacts">
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <AlertTriangle className="h-6 w-6 text-amber-500/40 mb-2" />
            <p className="text-sm text-muted-foreground">No emergency contacts added</p>
            <p className="text-xs text-muted-foreground/60 mt-1">Please add at least one emergency contact.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {contacts.map((contact, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-center w-9 h-9 rounded-full bg-module-erp/15 text-module-erp shrink-0">
                  <Heart className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{contact.name}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-muted-foreground">{contact.relationship}</span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">{contact.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </DataCard>
    </div>
  );
}
