import { PageHeroSkeleton, ProductCardSkeleton, Skeleton } from "@/components/shared/Skeletons";

export default function ProductsLoading() {
  return (
    <div className="animate-in fade-in duration-300">
      <PageHeroSkeleton />
      {/* Search */}
      <div className="mx-auto max-w-xl px-4 -mt-4 mb-6">
        <Skeleton className="h-14 w-full rounded-2xl" />
      </div>
      {/* Filter bar */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 flex gap-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-xl shrink-0" />
          ))}
        </div>
      </div>
      {/* Products grid */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
