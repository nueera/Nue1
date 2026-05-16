'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import type { Campaign } from '@/modules/marketing/types';

interface CalendarPost {
  id: string;
  title: string;
  platform: string;
  time: string;
  status: 'scheduled' | 'published' | 'draft';
}

interface SocialCalendarProps {
  posts?: CalendarPost[];
  onPostClick?: (post: CalendarPost) => void;
  onDateClick?: (date: Date) => void;
  className?: string;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MOCK_POSTS: CalendarPost[] = [
  { id: '1', title: 'Product Launch', platform: 'instagram', time: '9:00 AM', status: 'scheduled' },
  { id: '2', title: 'Team Culture', platform: 'linkedin', time: '12:00 PM', status: 'scheduled' },
  { id: '3', title: 'Flash Sale', platform: 'twitter', time: '3:00 PM', status: 'draft' },
  { id: '4', title: 'Customer Story', platform: 'facebook', time: '10:00 AM', status: 'published' },
];

const PLATFORM_COLORS: Record<string, string> = {
  instagram: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
  twitter: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  facebook: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  linkedin: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
};

export function SocialCalendar({ posts = MOCK_POSTS, onPostClick, onDateClick, className }: SocialCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const isToday = (day: number) =>
    today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;

  // Distribute mock posts across the month
  const getPostsForDay = (day: number) => {
    const dayIndex = day % posts.length;
    return day <= 14 ? [posts[dayIndex % posts.length]] : [];
  };

  return (
    <Card className={cn('border-border/50', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            Content Calendar
          </CardTitle>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium px-2 min-w-[140px] text-center">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAYS.map((day) => (
            <div key={day} className="text-center text-[10px] font-medium text-muted-foreground py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => (
            <div
              key={index}
              className={cn(
                'min-h-[80px] p-1 rounded-md border border-transparent transition-colors',
                day && 'border-border/50 hover:bg-muted/30 cursor-pointer',
                day && isToday(day) && 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
              )}
              onClick={() => day && onDateClick?.(new Date(year, month, day))}
            >
              {day && (
                <>
                  <span
                    className={cn(
                      'text-xs font-medium',
                      isToday(day) ? 'text-emerald-600' : 'text-foreground'
                    )}
                  >
                    {day}
                  </span>
                  <div className="mt-0.5 space-y-0.5">
                    {getPostsForDay(day).map((post) => (
                      <button
                        key={post.id}
                        className={cn(
                          'w-full text-left text-[9px] px-1 py-0.5 rounded truncate',
                          PLATFORM_COLORS[post.platform] ?? 'bg-gray-100 text-gray-600'
                        )}
                        onClick={(e) => { e.stopPropagation(); onPostClick?.(post); }}
                      >
                        {post.title}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
