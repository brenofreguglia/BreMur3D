export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 overflow-hidden rounded-xs border border-[rgb(var(--border))]">
      <div className="aspect-square animate-pulse bg-[rgb(var(--surface-muted))]" />
      <div className="flex flex-col gap-3 p-5">
        <div className="h-4 w-2/3 animate-pulse rounded-xs bg-[rgb(var(--surface-muted))]" />
        <div className="h-3 w-full animate-pulse rounded-xs bg-[rgb(var(--surface-muted))]" />
        <div className="h-9 w-full animate-pulse rounded-xs bg-[rgb(var(--surface-muted))]" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
