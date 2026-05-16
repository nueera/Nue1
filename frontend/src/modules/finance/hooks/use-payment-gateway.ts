'use client';

// ============================================================================
// usePaymentGateway Hook
// Gateway integration for processing payments, refunds, and status checks.
// ============================================================================

import { useState, useCallback, useMemo } from 'react';
import type { PaymentStatus, Money } from '../types';
import { financeApiClient } from '../api/client';
import { FINANCE_ENDPOINTS } from '../api/endpoints';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type GatewayProvider = 'stripe' | 'razorpay' | 'paypal' | 'square' | 'adyen';

export interface PaymentIntent {
  id: string;
  amount: Money;
  status: PaymentStatus;
  provider: GatewayProvider;
  clientSecret?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RefundRequest {
  paymentId: string;
  amount: Money;
  reason?: string;
}

export interface RefundResult {
  id: string;
  paymentId: string;
  amount: Money;
  status: PaymentStatus;
  createdAt: string;
}

export interface GatewayConfig {
  provider: GatewayProvider;
  publicKey: string;
  isConfigured: boolean;
  isTestMode: boolean;
}

// ---------------------------------------------------------------------------
// Hook Return Type
// ---------------------------------------------------------------------------

interface UsePaymentGatewayReturn {
  /** Current gateway configuration */
  gatewayConfig: GatewayConfig | null;
  /** Whether a payment is being processed */
  isProcessing: boolean;
  /** Create a payment intent */
  createPaymentIntent: (amount: Money, metadata?: Record<string, string>) => Promise<PaymentIntent>;
  /** Confirm a payment */
  confirmPayment: (intentId: string, paymentMethod: unknown) => Promise<PaymentIntent>;
  /** Process a refund */
  processRefund: (request: RefundRequest) => Promise<RefundResult>;
  /** Get payment status */
  getPaymentStatus: (paymentId: string) => Promise<PaymentStatus>;
  /** Check if a gateway is configured */
  isGatewayConfigured: (provider: GatewayProvider) => boolean;
  /** Load gateway configuration */
  loadGatewayConfig: () => Promise<void>;
  /** Last error */
  error: string | null;
  /** Clear error */
  clearError: () => void;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function usePaymentGateway(): UsePaymentGatewayReturn {
  const [gatewayConfig, setGatewayConfig] = useState<GatewayConfig | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const loadGatewayConfig = useCallback(async () => {
    try {
      setError(null);
      const config = await financeApiClient.get<GatewayConfig>('/checkout/gateway-config');
      setGatewayConfig(config);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load gateway config');
    }
  }, []);

  const createPaymentIntent = useCallback(
    async (amount: Money, metadata?: Record<string, string>): Promise<PaymentIntent> => {
      setIsProcessing(true);
      setError(null);
      try {
        const intent = await financeApiClient.post<PaymentIntent>(
          FINANCE_ENDPOINTS.checkout.paymentPages.create,
          { amount, metadata }
        );
        return intent;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to create payment intent';
        setError(message);
        throw err;
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  const confirmPayment = useCallback(
    async (intentId: string, paymentMethod: unknown): Promise<PaymentIntent> => {
      setIsProcessing(true);
      setError(null);
      try {
        const intent = await financeApiClient.post<PaymentIntent>(
          `/checkout/payments/${intentId}/confirm`,
          { paymentMethod }
        );
        return intent;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to confirm payment';
        setError(message);
        throw err;
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  const processRefund = useCallback(
    async (request: RefundRequest): Promise<RefundResult> => {
      setIsProcessing(true);
      setError(null);
      try {
        const result = await financeApiClient.post<RefundResult>(
          FINANCE_ENDPOINTS.checkout.transactions.refund(request.paymentId),
          { amount: request.amount, reason: request.reason }
        );
        return result;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to process refund';
        setError(message);
        throw err;
      } finally {
        setIsProcessing(false);
      }
    },
    []
  );

  const getPaymentStatus = useCallback(
    async (paymentId: string): Promise<PaymentStatus> => {
      try {
        setError(null);
        const result = await financeApiClient.get<{ status: PaymentStatus }>(
          FINANCE_ENDPOINTS.checkout.transactions.detail(paymentId)
        );
        return result.status;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to get payment status';
        setError(message);
        throw err;
      }
    },
    []
  );

  const isGatewayConfigured = useCallback(
    (provider: GatewayProvider): boolean => {
      return gatewayConfig?.provider === provider && gatewayConfig.isConfigured;
    },
    [gatewayConfig]
  );

  return useMemo(
    () => ({
      gatewayConfig,
      isProcessing,
      createPaymentIntent,
      confirmPayment,
      processRefund,
      getPaymentStatus,
      isGatewayConfigured,
      loadGatewayConfig,
      error,
      clearError,
    }),
    [
      gatewayConfig,
      isProcessing,
      createPaymentIntent,
      confirmPayment,
      processRefund,
      getPaymentStatus,
      isGatewayConfigured,
      loadGatewayConfig,
      error,
      clearError,
    ]
  );
}
