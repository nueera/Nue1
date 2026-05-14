// @ts-nocheck
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ArrowLeft, ShoppingCart, Mail, MessageSquare, Send, User, Package, DollarSign, Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { AbandonedCart, CartRecovery } from '@/modules/marketing/types';

interface AbandonedCartDetailProps {
  cart: AbandonedCart;
  onBack?: () => void;
  onSendRecoveryEmail?: (cartId: string) => void;
  onSendRecoverySms?: (cartId: string) => void;
}

const MOCK_RECOVERIES: CartRecovery[] = [
  { id: '1', cartId: 'c1', type: 'email', sentAt: '2024-01-15T10:00:00Z', openedAt: '2024-01-15T11:30:00Z', clickedAt: undefined, convertedAt: undefined, revenue: undefined },
  { id: '2', cartId: 'c1', type: 'sms', sentAt: '2024-01-16T14:00:00Z', openedAt: undefined, clickedAt: undefined, convertedAt: undefined, revenue: undefined },
];

export function AbandonedCartDetail({ cart, onBack, onSendRecoveryEmail, onSendRecoverySms }: AbandonedCartDetailProps) {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBack && (
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          )}
          <div>
            <h1 className="text-xl font-bold tracking-tight flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-amber-600" />
              Abandoned Cart
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Abandoned {new Date(cart.abandonedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={cart.status === 'active' ? 'destructive' : cart.status === 'recovered' ? 'default' : 'secondary'}>
            {cart.status}
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Cart items */}
        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Package className="h-4 w-4 text-emerald-600" />
              Cart Items
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {cart.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                  <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                    <Package className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">{item.price.toFixed(2)}</p>
                </div>
              ))}
            </div>
            <Separator className="my-3" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total</span>
              <span className="text-lg font-bold">{cart.currency} {cart.total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Recovery actions */}
        <div className="space-y-4">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Send className="h-4 w-4 text-emerald-600" />
                Recovery Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                className="w-full justify-start gap-2"
                variant="outline"
                onClick={() => onSendRecoveryEmail?.(cart.id)}
                disabled={cart.recoveryEmailSent || cart.status !== 'active'}
              >
                <Mail className="h-4 w-4" />
                {cart.recoveryEmailSent ? 'Recovery Email Sent' : 'Send Recovery Email'}
              </Button>
              <Button
                className="w-full justify-start gap-2"
                variant="outline"
                onClick={() => onSendRecoverySms?.(cart.id)}
                disabled={cart.recoverySmsSent || cart.status !== 'active'}
              >
                <MessageSquare className="h-4 w-4" />
                {cart.recoverySmsSent ? 'Recovery SMS Sent' : 'Send Recovery SMS'}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold">Recovery History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {MOCK_RECOVERIES.map((recovery) => (
                  <div key={recovery.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                    {recovery.type === 'email' ? (
                      <Mail className="h-4 w-4 text-blue-500" />
                    ) : (
                      <MessageSquare className="h-4 w-4 text-emerald-500" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium capitalize">{recovery.type} sent</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(recovery.sentAt).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      {recovery.openedAt && <Badge variant="secondary" className="text-xs">Opened</Badge>}
                      {recovery.clickedAt && <Badge variant="secondary" className="text-xs">Clicked</Badge>}
                      {recovery.convertedAt && <Badge className="text-xs bg-emerald-600">Converted</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
