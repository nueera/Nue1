'use client';

import { useState } from 'react';
import { Plus, Trash2, Plane, Building, Car, Utensils, GripVertical } from 'lucide-react';

export interface ItinerarySegment {
  id: string;
  type: 'flight' | 'hotel' | 'transport' | 'meal' | 'other';
  description: string;
  date: string;
  endDate?: string;
  cost: number;
  notes?: string;
}

interface TravelItineraryProps {
  segments?: ItinerarySegment[];
  onChange: (segments: ItinerarySegment[]) => void;
  readOnly?: boolean;
}

const SEGMENT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  flight: Plane,
  hotel: Building,
  transport: Car,
  meal: Utensils,
  other: GripVertical,
};

const SEGMENT_COLORS: Record<string, string> = {
  flight: 'bg-blue-500/10 text-blue-400 border-blue-500/15',
  hotel: 'bg-purple-500/10 text-purple-400 border-purple-500/15',
  transport: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/15',
  meal: 'bg-amber-500/10 text-amber-400 border-amber-500/15',
  other: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/15',
};

export function TravelItinerary({ segments: initialSegments = [], onChange, readOnly }: TravelItineraryProps) {
  const [segments, setSegments] = useState<ItinerarySegment[]>(initialSegments);

  const addSegment = () => {
    const newSegment: ItinerarySegment = {
      id: `seg-${Date.now()}`,
      type: 'flight',
      description: '',
      date: '',
      cost: 0,
    };
    const updated = [...segments, newSegment];
    setSegments(updated);
    onChange(updated);
  };

  const updateSegment = (id: string, data: Partial<ItinerarySegment>) => {
    const updated = segments.map((s) => s.id === id ? { ...s, ...data } : s);
    setSegments(updated);
    onChange(updated);
  };

  const removeSegment = (id: string) => {
    const updated = segments.filter((s) => s.id !== id);
    setSegments(updated);
    onChange(updated);
  };

  const totalCost = segments.reduce((sum, s) => sum + (s.cost || 0), 0);
  const inputClass = 'w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:border-module-erp/50 transition-all duration-200';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Itinerary Segments
        </h4>
        {!readOnly && (
          <button
            type="button"
            onClick={addSegment}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-module-erp/10 border border-module-erp/20 text-module-erp rounded-lg hover:bg-module-erp/20 transition-all duration-200"
          >
            <Plus className="h-3.5 w-3.5" />
            Add Segment
          </button>
        )}
      </div>

      {segments.length === 0 ? (
        <div className="py-8 text-center text-sm text-muted-foreground/50">
          No segments added yet. Click "Add Segment" to build your itinerary.
        </div>
      ) : (
        <div className="space-y-3">
          {segments.map((segment, index) => {
            const Icon = SEGMENT_ICONS[segment.type] || GripVertical;
            const colorClass = SEGMENT_COLORS[segment.type] || SEGMENT_COLORS.other;

            return (
              <div
                key={segment.id}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${colorClass}`}>
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      Segment {index + 1}
                    </span>
                  </div>
                  {!readOnly && (
                    <button
                      type="button"
                      onClick={() => removeSegment(segment.id)}
                      className="p-1 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-all duration-200"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground">Type</label>
                    <select
                      value={segment.type}
                      onChange={(e) => updateSegment(segment.id, { type: e.target.value as ItinerarySegment['type'] })}
                      className={inputClass}
                      disabled={readOnly}
                    >
                      <option value="flight">Flight</option>
                      <option value="hotel">Hotel</option>
                      <option value="transport">Transport</option>
                      <option value="meal">Meal</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground">Date</label>
                    <input
                      type="date"
                      value={segment.date}
                      onChange={(e) => updateSegment(segment.id, { date: e.target.value })}
                      className={inputClass}
                      readOnly={readOnly}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground">End Date</label>
                    <input
                      type="date"
                      value={segment.endDate || ''}
                      onChange={(e) => updateSegment(segment.id, { endDate: e.target.value })}
                      className={inputClass}
                      readOnly={readOnly}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-muted-foreground">Cost (₹)</label>
                    <input
                      type="number"
                      min={0}
                      value={segment.cost || ''}
                      onChange={(e) => updateSegment(segment.id, { cost: Number(e.target.value) })}
                      className={inputClass}
                      readOnly={readOnly}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-muted-foreground">Description</label>
                  <input
                    type="text"
                    value={segment.description}
                    onChange={(e) => updateSegment(segment.id, { description: e.target.value })}
                    placeholder="e.g., Flight to Mumbai via Indigo"
                    className={inputClass}
                    readOnly={readOnly}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Total */}
      {segments.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Total Itinerary Cost
          </span>
          <span className="text-sm font-bold text-foreground">
            ₹{totalCost.toLocaleString('en-IN')}
          </span>
        </div>
      )}
    </div>
  );
}
