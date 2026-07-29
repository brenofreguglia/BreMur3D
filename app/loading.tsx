import { ProductGridSkeleton } from "@/components/shared/skeletons";

export default function Loading() {
  return (
    <div className="container-page py-14">
      <div className="mb-10 flex flex-col gap-3">
        <div className="h-3 w-32 animate-pulse rounded-xs bg-[rgb(var(--surface-muted))]" />
        <div className="h-8 w-72 animate-pulse rounded-xs bg-[rgb(var(--surface-muted))]" />
      </div>
      <ProductGridSkeleton />
    </div>
  );
}
