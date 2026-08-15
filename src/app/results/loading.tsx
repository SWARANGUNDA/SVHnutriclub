import { PageHeroSkeleton, TransformationCardSkeleton, Skeleton } from "@/components/shared/Skeletons";

export default function ResultsLoading() {
  return (
    <div className="animate-in fade-in duration-300">
      <PageHeroSkeleton />
      {/* Stats bar */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-4 w-28" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Cards */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <TransformationCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
