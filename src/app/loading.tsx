import { PageHeroSkeleton, Skeleton } from "@/components/shared/Skeletons";

export default function HomeLoading() {
  return (
    <div className="animate-in fade-in duration-300">
      {/* Hero skeleton */}
      <div className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Skeleton className="h-8 w-64 mx-auto rounded-full" />
          <Skeleton className="h-14 w-[600px] max-w-full mx-auto" />
          <Skeleton className="h-14 w-[500px] max-w-full mx-auto" />
          <Skeleton className="h-5 w-[450px] max-w-full mx-auto" />
          <div className="flex justify-center gap-4 pt-4">
            <Skeleton className="h-14 w-44 rounded-2xl" />
            <Skeleton className="h-14 w-40 rounded-2xl" />
          </div>
        </div>
      </div>

      {/* AI Strip skeleton */}
      <div className="py-6 border-y border-border">
        <div className="flex gap-4 justify-center px-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-48 rounded-xl shrink-0" />
          ))}
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>

      {/* Sections skeleton */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <Skeleton className="h-10 w-80 mx-auto" />
          <Skeleton className="h-5 w-96 max-w-full mx-auto" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
