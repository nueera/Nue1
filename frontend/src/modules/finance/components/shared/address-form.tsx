// @ts-nocheck
'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Address } from '../../types/finance-common';

export interface AddressFormProps {
  address: Address;
  onChange: (address: Address) => void;
  type?: 'billing' | 'shipping';
  className?: string;
}

const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France',
  'Australia', 'India', 'Japan', 'Brazil', 'Mexico',
  'Singapore', 'UAE', 'South Africa', 'South Korea', 'Switzerland',
] as const;

export function AddressForm({
  address,
  onChange,
  type = 'billing',
  className,
}: AddressFormProps) {
  const labelPrefix = type === 'billing' ? 'Billing' : 'Shipping';

  const handleChange = (field: keyof Address, value: string) => {
    onChange({ ...address, [field]: value });
  };

  return (
    <div className={cn('space-y-4', className)}>
      <h4 className="text-sm font-medium text-foreground">{labelPrefix} Address</h4>

      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor={`${type}-street`} className="text-xs">
            Street Address
          </Label>
          <Input
            id={`${type}-street`}
            value={address.street ?? ''}
            onChange={(e) => handleChange('street', e.target.value)}
            placeholder="123 Main St"
            className="h-9"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor={`${type}-city`} className="text-xs">
              City
            </Label>
            <Input
              id={`${type}-city`}
              value={address.city ?? ''}
              onChange={(e) => handleChange('city', e.target.value)}
              placeholder="City"
              className="h-9"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`${type}-state`} className="text-xs">
              State / Province
            </Label>
            <Input
              id={`${type}-state`}
              value={address.state ?? ''}
              onChange={(e) => handleChange('state', e.target.value)}
              placeholder="State"
              className="h-9"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor={`${type}-zip`} className="text-xs">
              ZIP / Postal Code
            </Label>
            <Input
              id={`${type}-zip`}
              value={address.zip ?? ''}
              onChange={(e) => handleChange('zip', e.target.value)}
              placeholder="12345"
              className="h-9"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor={`${type}-country`} className="text-xs">
              Country
            </Label>
            <select
              id={`${type}-country`}
              value={address.country ?? ''}
              onChange={(e) => handleChange('country', e.target.value)}
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select country</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
