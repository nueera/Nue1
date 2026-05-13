'use client';

import { Cake, Gift } from 'lucide-react';
import { EmptyState } from '../../../../shared/components/empty-state';

interface BirthdayEmployee {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  dateOfBirth: string;
  avatar?: string;
}

interface BirthdayListProps {
  thisMonth: BirthdayEmployee[];
  nextMonth: BirthdayEmployee[];
  isLoading?: boolean;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export function BirthdayList({ thisMonth, nextMonth, isLoading }: BirthdayListProps) {
  const now = new Date();
  const currentMonthName = MONTH_NAMES[now.getMonth()];
  const nextMonthIndex = (now.getMonth() + 1) % 12;
  const nextMonthName = MONTH_NAMES[nextMonthIndex];

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i}>
            <div className="h-5 w-32 bg-white/10 rounded mb-3 animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 animate-pulse">
                  <div className="w-10 h-10 rounded-full bg-white/10 mx-auto mb-3" />
                  <div className="h-3 w-20 bg-white/10 rounded mx-auto mb-2" />
                  <div className="h-2 w-16 bg-white/10 rounded mx-auto" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  const allEmpty = thisMonth.length === 0 && nextMonth.length === 0;

  if (allEmpty) {
    return <EmptyState icon={Cake} title="No upcoming birthdays" description="Employee birthdays will appear here when available" />;
  }

  return (
    <div className="space-y-8">
      {/* This Month */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Cake className="h-4 w-4 text-module-erp" />
          <h3 className="text-sm font-semibold text-foreground">{currentMonthName} Birthdays</h3>
          <span className="px-1.5 py-0.5 text-[10px] bg-module-erp/10 text-module-erp rounded-md border border-module-erp/20">{thisMonth.length}</span>
        </div>
        {thisMonth.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center">No birthdays this month</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {thisMonth
              .sort((a, b) => getDayOfMonth(a.dateOfBirth) - getDayOfMonth(b.dateOfBirth))
              .map((emp) => (
                <BirthdayCard key={emp.id} employee={emp} isCurrentMonth />
              ))}
          </div>
        )}
      </div>

      {/* Next Month */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Gift className="h-4 w-4 text-violet-400" />
          <h3 className="text-sm font-semibold text-foreground">{nextMonthName} Birthdays</h3>
          <span className="px-1.5 py-0.5 text-[10px] bg-violet-500/10 text-violet-400 rounded-md border border-violet-500/15">{nextMonth.length}</span>
        </div>
        {nextMonth.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center">No birthdays next month</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {nextMonth
              .sort((a, b) => getDayOfMonth(a.dateOfBirth) - getDayOfMonth(b.dateOfBirth))
              .map((emp) => (
                <BirthdayCard key={emp.id} employee={emp} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BirthdayCard({ employee, isCurrentMonth }: { employee: BirthdayEmployee; isCurrentMonth?: boolean }) {
  const day = getDayOfMonth(employee.dateOfBirth);
  const month = new Date(employee.dateOfBirth).toLocaleString('default', { month: 'short' });
  const isToday = isCurrentMonth && isBirthdayToday(employee.dateOfBirth);

  return (
    <div className={`bg-white/5 backdrop-blur-xl border rounded-xl p-4 text-center hover:bg-white/[0.07] transition-all duration-200 ${isToday ? 'border-module-erp/30 bg-module-erp/5' : 'border-white/10'}`}>
      {/* Avatar */}
      <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${isToday ? 'bg-module-erp/20' : 'bg-white/5'}`}>
        {employee.avatar ? (
          <img src={employee.avatar} alt={`${employee.firstName} ${employee.lastName}`} className="w-full h-full rounded-full object-cover" />
        ) : (
          <span className={`text-sm font-semibold ${isToday ? 'text-module-erp' : 'text-foreground'}`}>
            {employee.firstName.charAt(0)}{employee.lastName.charAt(0)}
          </span>
        )}
      </div>

      {/* Name */}
      <p className="text-xs font-semibold text-foreground truncate">{employee.firstName} {employee.lastName}</p>

      {/* Department */}
      <p className="text-[10px] text-muted-foreground truncate mt-0.5">{employee.department}</p>

      {/* Date */}
      <div className={`inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-md text-[10px] ${isToday ? 'bg-module-erp/10 text-module-erp border border-module-erp/20' : 'bg-white/5 text-muted-foreground border border-white/5'}`}>
        <Cake className="h-2.5 w-2.5" />
        {month} {day}
      </div>

      {isToday && (
        <p className="text-[9px] text-module-erp font-medium mt-1.5">🎂 Today!</p>
      )}
    </div>
  );
}

function getDayOfMonth(dateStr: string): number {
  return new Date(dateStr).getDate();
}

function isBirthdayToday(dateStr: string): boolean {
  const now = new Date();
  const dob = new Date(dateStr);
  return dob.getMonth() === now.getMonth() && dob.getDate() === now.getDate();
}
