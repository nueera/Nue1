// @ts-nocheck
'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ContactTimeline } from './contact-timeline';
import { ContactPreferences } from './contact-preferences';
import { useContact } from '@/modules/marketing/hooks/use-contacts';
import type { MarketingContact } from '@/modules/marketing/types';
import { Mail, Phone, Building2, Calendar, Edit } from 'lucide-react';
import { motion } from 'framer-motion';

interface ContactDetailsProps {
  contactId: string;
  contact?: MarketingContact;
  onEdit?: (contact: MarketingContact) => void;
  className?: string;
}

export function ContactDetails({
  contactId,
  contact: externalContact,
  onEdit,
  className,
}: ContactDetailsProps) {
  const { data: contactData, isLoading } = useContact(contactId);
  const contact = externalContact ?? contactData?.data;

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-48 bg-muted rounded-xl" />
        <div className="h-96 bg-muted rounded-xl" />
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Contact not found
      </div>
    );
  }

  const initials = `${contact.firstName[0]}${contact.lastName[0]}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn('flex flex-col lg:flex-row gap-6', className)}
    >
      {/* Sidebar */}
      <div className="w-full lg:w-80 shrink-0 space-y-4">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-16 w-16 mb-3">
                <AvatarFallback className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-lg font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <h2 className="text-lg font-semibold text-foreground">
                {contact.firstName} {contact.lastName}
              </h2>
              {contact.jobTitle && (
                <p className="text-sm text-muted-foreground">{contact.jobTitle}</p>
              )}
              {contact.company && (
                <p className="text-sm text-muted-foreground">{contact.company}</p>
              )}
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-foreground truncate">{contact.email}</span>
              </div>
              {contact.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-foreground">{contact.phone}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-muted-foreground">
                  Subscribed {new Date(contact.subscribedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            {contact.tags.length > 0 && (
              <>
                <Separator className="my-4" />
                <div className="flex flex-wrap gap-1.5">
                  {contact.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </>
            )}

            <Separator className="my-4" />

            <Button
              variant="outline"
              size="sm"
              className="w-full"
              onClick={() => onEdit?.(contact)}
            >
              <Edit className="h-3.5 w-3.5 mr-1" />
              Edit Contact
            </Button>
          </CardContent>
        </Card>

        {/* Preferences */}
        <ContactPreferences preferences={contact.preferences} contactId={contact.id} />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <Tabs defaultValue="timeline" className="space-y-4">
          <TabsList>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="forms">Forms</TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="mt-0">
            <ContactTimeline contactId={contact.id} timeline={contact.timeline} />
          </TabsContent>

          <TabsContent value="campaigns" className="mt-0">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-sm">Campaign History</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No campaigns associated with this contact yet.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forms" className="mt-0">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-sm">Form Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  No form submissions recorded yet.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
