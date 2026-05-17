export default function MarketingLoading() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      <div className="space-y-2">
        <div className="h-7 w-48 bg-muted/50 rounded-lg animate-pulse" />
        <div className="h-4 w-64 bg-muted/30 rounded animate-pulse" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="glass-surface rounded-xl p-4 border border-glass-border">
            <div className="h-4 w-20 bg-muted/30 rounded animate-pulse mb-2" />
            <div className="h-8 w-16 bg-muted/50 rounded animate-pulse" />
          </div>
        ))}
      </div>
      <div className="glass-surface rounded-xl border border-glass-border p-4 space-y-3">
        <div className="h-10 w-full bg-muted/30 rounded animate-pulse" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-12 w-full bg-muted/20 rounded animate-pulse" />
        ))}
      </div>
    </div>
  );
}
