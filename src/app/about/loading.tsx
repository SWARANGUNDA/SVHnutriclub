import { PageHeroSkeleton, Skeleton } from "@/components/shared/Skeletons";

export default function AboutLoading() {
  return (
    <div className="animate-in fade-in duration-300">
      <PageHeroSkeleton />
      {/* Mission & Vision */}
      <div className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
          </div>
        </div>
      </div>
      {/* Values */}
      <div className="bg-gradient-section py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-10 w-64 mx-auto" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-48 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
