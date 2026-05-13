'use client';

import { useState } from 'react';
import { Plane, Send, MapPin, Calendar, Hotel, DollarSign } from 'lucide-react';
import { TRAVEL_MODES, PER_DIEM_RATES } from '../constants';
import { calcTravelDays, calcPerDiem, fmtExpenseAmount } from '../expense.utils';

interface TravelRequestFormProps {
  onSubmit: (data: {
    purpose: string;
    destination: string;
    startDate: string;
    endDate: string;
    travelMode: 'Flight' | 'Train' | 'Bus' | 'Car' | 'Other';
    estimatedCost: number;
    accommodationRequired: boolean;
    advanceRequired: boolean;
    advanceAmount?: number;
    notes?: string;
  }) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function TravelRequestForm({ onSubmit, onCancel, isLoading }: TravelRequestFormProps) {
  const [purpose, setPurpose] = useState('');
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [travelMode, setTravelMode] = useState<string>('');
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [accommodationRequired, setAccommodationRequired] = useState(false);
  const [advanceRequired, setAdvanceRequired] = useState(false);
  const [advanceAmount, setAdvanceAmount] = useState<number>(0);
  const [notes, setNotes] = useState('');

  const travelDays = startDate && endDate ? calcTravelDays(startDate, endDate) : 0;
  const perDiemAmount = travelDays > 0 ? calcPerDiem(travelDays, 'domestic') : 0;

  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 focus:ring-1 focus:ring-module-erp/20 transition-all duration-200';

  const isValid = purpose && destination && startDate && endDate && travelMode && estimatedCost > 0;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({
          purpose,
          destination,
          startDate,
          endDate,
          travelMode: travelMode as 'Flight' | 'Train' | 'Bus' | 'Car' | 'Other',
          estimatedCost,
          accommodationRequired,
          advanceRequired,
          advanceAmount: advanceRequired && advanceAmount > 0 ? advanceAmount : undefined,
          notes: notes || undefined,
        });
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Purpose <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="e.g., Client meeting"
            className={inputClass}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Destination <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g., Mumbai"
            className={inputClass}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Start Date <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            End Date <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            min={startDate}
            className={inputClass}
            required
          />
        </div>
      </div>

      {/* Travel mode */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Travel Mode <span className="text-red-400">*</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {TRAVEL_MODES.map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setTravelMode(mode)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all duration-200 ${
                travelMode === mode
                  ? 'bg-module-erp/10 border-module-erp/30 text-module-erp'
                  : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Estimated Cost */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Estimated Cost <span className="text-red-400">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
          <input
            type="number"
            min={0}
            step={100}
            value={estimatedCost || ''}
            onChange={(e) => setEstimatedCost(Number(e.target.value))}
            placeholder="0"
            className={`${inputClass} pl-7`}
            required
          />
        </div>
      </div>

      {/* Per Diem hint */}
      {travelDays > 0 && (
        <div className="flex items-center gap-2 px-3 py-2 bg-module-erp/5 border border-module-erp/20 rounded-lg">
          <DollarSign className="h-3.5 w-3.5 text-module-erp" />
          <span className="text-xs text-module-erp">
            Per diem: {fmtExpenseAmount(perDiemAmount)} ({travelDays} days × {fmtExpenseAmount(PER_DIEM_RATES.domestic)}/day)
          </span>
        </div>
      )}

      {/* Toggles */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hotel className="h-3.5 w-3.5 text-muted-foreground/50" />
            <span className="text-sm text-foreground">Accommodation Required</span>
          </div>
          <button
            type="button"
            onClick={() => setAccommodationRequired(!accommodationRequired)}
            className={`relative w-10 h-5 rounded-full transition-all duration-200 ${accommodationRequired ? 'bg-module-erp' : 'bg-white/10'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${accommodationRequired ? 'translate-x-5' : ''}`} />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-3.5 w-3.5 text-muted-foreground/50" />
            <span className="text-sm text-foreground">Advance Required</span>
          </div>
          <button
            type="button"
            onClick={() => setAdvanceRequired(!advanceRequired)}
            className={`relative w-10 h-5 rounded-full transition-all duration-200 ${advanceRequired ? 'bg-module-erp' : 'bg-white/10'}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${advanceRequired ? 'translate-x-5' : ''}`} />
          </button>
        </div>

        {advanceRequired && (
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Advance Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
              <input
                type="number"
                min={0}
                value={advanceAmount || ''}
                onChange={(e) => setAdvanceAmount(Number(e.target.value))}
                className={`${inputClass} pl-7`}
              />
            </div>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Additional details..."
          rows={2}
          className={`${inputClass} resize-none`}
          maxLength={1000}
        />
      </div>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-module-erp text-white text-sm font-medium hover:bg-module-erp/90 press-scale transition-all duration-200 disabled:opacity-50"
        >
          <Plane className="h-4 w-4" />
          {isLoading ? 'Submitting...' : 'Submit Travel Request'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm text-muted-foreground hover:bg-white/10 transition-all duration-200">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
