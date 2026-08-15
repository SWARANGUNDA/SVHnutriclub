import { PageHeroSkeleton, Skeleton } from "@/components/shared/Skeletons";

export default function ConsultationLoading() {
  return (
    <div className="animate-in fade-in duration-300">
      <PageHeroSkeleton />
      {/* Step indicator */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-3xl px-4 py-6">
          <div className="flex items-center justify-between">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="hidden h-4 w-16 sm:block" />
                {i < 2 && <Skeleton className="ml-3 hidden h-px w-16 sm:block lg:w-24" />}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Form area */}
      <div className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-6 w-56 mb-6" />
          <div className="grid gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
          <Skeleton className="mt-6 h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
