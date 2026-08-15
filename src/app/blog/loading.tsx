import { PageHeroSkeleton, BlogCardSkeleton, Skeleton } from "@/components/shared/Skeletons";

export default function BlogLoading() {
  return (
    <div className="animate-in fade-in duration-300">
      <PageHeroSkeleton />
      {/* Categories */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-24 rounded-xl shrink-0" />
          ))}
        </div>
      </div>
      {/* Featured post */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-64 w-full rounded-3xl" />
        </div>
      </div>
      {/* Grid */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
