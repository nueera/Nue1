'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Users,
  Plus,
  Crown,
  Shield,
  UserCircle,
  MoreHorizontal,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { MarketingPlan } from '@/modules/marketing/types';

interface PlanCollaboratorsProps {
  plan: MarketingPlan;
  onAddCollaborator?: () => void;
  onRemoveCollaborator?: (userId: string) => void;
}

const MOCK_COLLABORATORS = [
  { id: '1', name: 'Sarah Chen', email: 'sarah@example.com', role: 'owner', avatar: 'SC' },
  { id: '2', name: 'Mike Johnson', email: 'mike@example.com', role: 'editor', avatar: 'MJ' },
  { id: '3', name: 'Emily Davis', email: 'emily@example.com', role: 'viewer', avatar: 'ED' },
  { id: '4', name: 'Alex Kim', email: 'alex@example.com', role: 'editor', avatar: 'AK' },
];

const ROLE_CONFIG: Record<string, { icon: typeof Crown; label: string; color: string }> = {
  owner: { icon: Crown, label: 'Owner', color: 'text-amber-600' },
  editor: { icon: Shield, label: 'Editor', color: 'text-blue-600' },
  viewer: { icon: UserCircle, label: 'Viewer', color: 'text-muted-foreground' },
};

export function PlanCollaborators({ plan, onAddCollaborator, onRemoveCollaborator }: PlanCollaboratorsProps) {
  return (
    <Card className="border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-emerald-600" />
            Team Members
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onAddCollaborator}>
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {MOCK_COLLABORATORS.map((collaborator, idx) => {
            const roleConfig = ROLE_CONFIG[collaborator.role] ?? ROLE_CONFIG.viewer;
            const RoleIcon = roleConfig.icon;

            return (
              <motion.div
                key={collaborator.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300">
                    {collaborator.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{collaborator.name}</p>
                  <p className="text-xs text-muted-foreground">{collaborator.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs gap-1">
                    <RoleIcon className={cn('h-3 w-3', roleConfig.color)} />
                    {roleConfig.label}
                  </Badge>
                  {collaborator.role !== 'owner' && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => onRemoveCollaborator?.(collaborator.id)}
                        >
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

