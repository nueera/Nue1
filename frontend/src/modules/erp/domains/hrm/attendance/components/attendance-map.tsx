'use client';

import { MapPin, Wifi, WifiOff } from 'lucide-react';

interface AttendanceMapProps {
  locations?: Array<{
    id: string;
    employeeName: string;
    latitude: number;
    longitude: number;
    checkInTime: string;
    address?: string;
  }>;
}

export function AttendanceMap({ locations = [] }: AttendanceMapProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
      {/* Map Placeholder */}
      <div className="relative h-64 sm:h-80 bg-white/5 flex items-center justify-center">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Placeholder Content */}
        <div className="relative text-center">
          <MapPin className="h-10 w-10 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-sm font-medium text-muted-foreground">Map View</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Check-in locations will be displayed here</p>
        </div>

        {/* Location Dots (simulated) */}
        {locations.length > 0 && (
          <div className="absolute inset-0">
            {locations.map((loc, idx) => (
              <div
                key={loc.id}
                className="absolute"
                style={{
                  left: `${20 + (idx * 15) % 60}%`,
                  top: `${20 + (idx * 20) % 50}%`,
                }}
              >
                <div className="relative group">
                  <div className="w-3 h-3 rounded-full bg-module-erp animate-pulse" />
                  <div className="w-6 h-6 rounded-full bg-module-erp/20 absolute -top-1.5 -left-1.5" />
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-md bg-foreground text-background text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {loc.employeeName} · {loc.checkInTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Location List */}
      {locations.length > 0 && (
        <div className="p-4 border-t border-white/10">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">Recent Check-ins</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {locations.map((loc) => (
              <div key={loc.id} className="flex items-center gap-2 text-xs">
                <MapPin className="h-3 w-3 text-module-erp shrink-0" />
                <span className="font-medium text-foreground">{loc.employeeName}</span>
                <span className="text-muted-foreground">at {loc.checkInTime}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
