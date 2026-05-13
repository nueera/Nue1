'use client';

import { LogOut, Settings, User } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface UserMenuProps {
  name: string;
  email: string;
  avatar: string;
  onLogout?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
}

export function UserMenu({ name, email, avatar, onLogout, onSettingsClick, onProfileClick }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center justify-center h-8 w-8 rounded-full bg-module-erp/15 text-module-erp font-semibold text-xs hover:ring-1 hover:ring-module-erp/20 transition-all duration-[var(--motion-fast)]" aria-label="User profile">
          {avatar}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{name}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onProfileClick}>
          <User className="h-4 w-4 mr-2" strokeWidth={1.8} />
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onSettingsClick}>
          <Settings className="h-4 w-4 mr-2" strokeWidth={1.8} />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={onLogout}>
          <LogOut className="h-4 w-4 mr-2" strokeWidth={1.8} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
